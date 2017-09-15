---
layout: default
title: Print data from multiple servers
date: 2017-09-14 21:50:45
category: shell
tags: [ssh]
---

To check if my servers have any extra process that shouldn't be running I did a quick script

```
for i in `seq 1 10`; do ssh my-machine$i.tomtom.com -t "pgrep -f celery -c"; done
```

Let's break it down

* ```for i in `seq 1 10` ``` is generating a forloop for us from 1 to 10
* `ssh my-machine$i.tomtom.com -t` will ssh into each machine from 1 to 10, the `-t` means it will create a terminal to execute the next command
* `pgrep -f celery -c` will count all the processes that have the word _celery_ in it and output the number.
