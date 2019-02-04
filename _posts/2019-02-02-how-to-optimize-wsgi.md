---
layout: default
title: how to optimize uwsgi for python
date: 2019-02-02 21:22 +0100
category: python
tags: [uwsgi,profiling]
---


Load test your application as "real" as possible. I like to use siege for this but there are many tools for the job.

Monitor your server, to manage anything you need to measure things up! For this I loved the `uwsgitop` tool which gives me a very descriptive live data of the state of the server.

![image](https://user-images.githubusercontent.com/778410/52209410-20a52a00-2884-11e9-8429-1cbb74a0dd7e.png)

If you are able to setup a instrumentation tool like `datadog`, `nagios` or `prometheus`, the better!

Setup a `somaxconn` size that makes sense, to me a size of 1024 did on my case.
I wouldn't advice to add a huge number here unless you have a good reason. A good fast service is king and having a huge backlog won't help that.

To measure this on your tests you can inspect the backlog in a `top` like fashion with:
```
watch -n1 "ss -l | grep <socket_name>"
```

To see the `somaxconn` backlog current status.

Then I played with `processess`, `threads` and `ugreen and async` to find the best bang for my buck.
