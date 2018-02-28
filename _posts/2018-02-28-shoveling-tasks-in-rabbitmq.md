---
layout: default
title: Shoveling tasks in rabbitmq
date: 2018-02-28 21:50:45
category: rabbitmq
tags: []
---

This curious case happened to me were a lot of tasks end up in a queue called `celery` because of a misconfiguration when releasing.

Honestly I got very lucky at the time because no task were lost, but the tasks were on the wrong queue. There is were the [rabbitmq shovel plugin](https://www.rabbitmq.com/shovel.html) shined!

In a real world use case the plugin is used to move tasks reliably between WAN separated clusters or things like that, but on my case it came as the perfect ring to the finger.

```
rabbitmq-plugins enable rabbitmq_shovel
rabbitmqctl set_parameter shovel my-temp-shovel '{"src-uri": "amqp://", "src-queue": "celery", "dest-uri": "amqp://user:password@localhost:5672/rabbit", "dest-queue": "destiny"}'
```

Boom! Done here!
