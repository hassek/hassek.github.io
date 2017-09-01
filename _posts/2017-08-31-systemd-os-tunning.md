---
layout: post
title: Postgres 9.4 systemd os tunning
date: 2017-08-31 12:00:00
category: postgres
tags: [systemd,kernel]
---

Tweaking the OS for a database is pretty common and we are used to do a full OS tweak. With _systemd_ this changed (for the best I believe) and now you need to set it up for the process instead. _PostgreSQL 9.6_ is all ready for these changes but _PostgreSQL 9.4_ is not, here is how to handle it for the older version:

##### Apply the change to _postgresql@.service_

When you install _postgres 9.4_ on ubuntu 16.04, two files will be created for _systemd_:

* /lib/systemd/system/postgresql.service
* /lib/systemd/system/postgresql@.service

The second file runs before the first one and is the one that actually sets the configuration changes, in fact, if you check _postgresql.service_ status, you will notice is in an [active (exited)](https://wiki.archlinux.org/index.php/Systemd_FAQ#Status_of_.service_says_.22active_.28exited.29.22_in_green._.28e.g._iptables.29) state, meaning, _systemd_ doesn't manages the process, it just knows it executed a start to it.

```bash
~$ sudo systemctl status postgresql
● postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
   Active: active (exited) since Fri 2017-09-01 15:44:28 EDT; 1h 26min ago
  Process: 30546 ExecStart=/bin/true (code=exited, status=0/SUCCESS)
 Main PID: 30546 (code=exited, status=0/SUCCESS)

Sep 01 15:44:28 postgres.db.int systemd[1]: Starting PostgreSQL RDBMS...
Sep 01 15:44:28 postgres.db.int systemd[1]: Started PostgreSQL RDBMS.
```

When setup on _postgresql@.service_ it will be set on the main _pid_ process which will delegate to all child processes properly.

```ini
[Unit]
Description=PostgreSQL Cluster %i
ConditionPathExists=/etc/postgresql/%I/postgresql.conf
PartOf=postgresql.service
ReloadPropagatedFrom=postgresql.service
Before=postgresql.service

[Service]
Type=forking
# @: use "postgresql@%i" as process name
ExecStart=@/usr/bin/pg_ctlcluster postgresql@%i --skip-systemctl-redirect %i start
ExecStop=/usr/bin/pg_ctlcluster --skip-systemctl-redirect -m fast %i stop
ExecReload=/usr/bin/pg_ctlcluster --skip-systemctl-redirect %i reload
PIDFile=/var/run/postgresql/%i.pid
SyslogIdentifier=postgresql@%i
# prevent OOM killer from choosing the postmaster (individual backends will
# reset the score to 0)
OOMScoreAdjust=-900
# restarting automatically will prevent "pg_ctlcluster ... stop" from working,
# so we disable it here. Also, the postmaster will restart by itself on most
# problems anyway, so it is questionable if one wants to enable external
# automatic restarts.
#Restart=on-failure
# (This should make pg_ctlcluster stop work, but doesn't:)
#RestartPreventExitStatus=SIGINT SIGTERM

# set NOFILE to the maximum amount
LimitNOFILE=infinity   # <<<<< HERE IS WHERE WE TWEAK OUR OS

[Install]
WantedBy=multi-user.target
```

##### Now that we have properly setup the _OS tweak_, lets verify it was applied

Checking a process limit values can be done by `cat /proc/<PROCESS PID>/limits` or by using `prlimit --pid <PROCESS PID>`

I would get this info by following this steps:

```bash
~# lsof -i -P | grep LISTEN | grep postgr
postgres  12423 postgres    6u  IPv4 880722124      0t0  TCP *:5432 (LISTEN)
postgres  12423 postgres    7u  IPv6 880722125      0t0  TCP *:5432 (LISTEN)

~# prlimit --pid 12423
RESOURCE   DESCRIPTION                             SOFT      HARD UNITS
AS         address space limit                unlimited unlimited bytes
CORE       max core file size                         0 unlimited blocks
CPU        CPU time                           unlimited unlimited seconds
DATA       max data size                      unlimited unlimited bytes
FSIZE      max file size                      unlimited unlimited blocks
LOCKS      max number of file locks held      unlimited unlimited
MEMLOCK    max locked-in-memory address space     65536     65536 bytes
MSGQUEUE   max bytes in POSIX mqueues            819200    819200 bytes
NICE       max nice prio allowed to raise             0         0
NOFILE     max number of open files               65536     65536  <<<< BOOM!
NPROC      max number of processes                64125     64125
RSS        max resident set size              unlimited unlimited pages
RTPRIO     max real-time priority                     0         0
RTTIME     timeout for real-time tasks        unlimited unlimited microsecs
SIGPENDING max number of pending signals          64125     64125
STACK      max stack size                       8388608 unlimited bytes
```

The main task have the changes setup, but does the child task have them
too? Let's check!

```bash
~# ps aux | grep postgres | grep writer
postgres 12427  0.0  0.1 3414332 31908 ?       Ss   15:54   0:00 postgres: writer process
postgres 12428  0.1  0.1 3414200 21108 ?       Ss   15:54   0:14 postgres: wal writer process
~# prlimit --pid 12427
RESOURCE   DESCRIPTION                             SOFT      HARD UNITS
AS         address space limit                unlimited unlimited bytes
CORE       max core file size                         0 unlimited blocks
CPU        CPU time                           unlimited unlimited seconds
DATA       max data size                      unlimited unlimited bytes
FSIZE      max file size                      unlimited unlimited blocks
LOCKS      max number of file locks held      unlimited unlimited
MEMLOCK    max locked-in-memory address space     65536     65536 bytes
MSGQUEUE   max bytes in POSIX mqueues            819200    819200 bytes
NICE       max nice prio allowed to raise             0         0
NOFILE     max number of open files               65536     65536  <<<< BOOM!
NPROC      max number of processes                64125     64125
RSS        max resident set size              unlimited unlimited pages
RTPRIO     max real-time priority                     0         0
RTTIME     timeout for real-time tasks        unlimited unlimited microsecs
SIGPENDING max number of pending signals          64125     64125
STACK      max stack size                       8388608 unlimited bytes
```

There we go, all set!
