---
layout: default
title: Reclaim disk space
date: 2017-07-16 12:23:00
category: shell
tags: [linux,ubuntu]
---

When you think about reclaiming space on a machine, the first thing that comes to mind is to delete files, but what if you delete files and the space is not yet reclaimed?

This may happen if those files are still open by a process, therefore not releasing the space until they close them. To find these files you can run:

```shell
sudo find /proc/*/fd -ls | grep  '(deleted)'
```

This will show all files that have been deleted but haven't been released by the system. On my must recent case, `rsyslog` was the one not releasing any files, restarting it did the job.
