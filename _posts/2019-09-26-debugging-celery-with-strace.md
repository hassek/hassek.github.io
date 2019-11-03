---
layout: default
title: Debugging celery with strace
date: 2019-09-26 09:28 +0200
---

This will trace all system signals and calls from a specific process, in this case, celery

```
pgrep celery | xargs -I{} sudo strace -p {} -s 100000
```
