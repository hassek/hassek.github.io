---
layout: default
title: Delete Rabbitmq queues/exchanges by api
date: 2017-04-27 18:50:00
category: rabbitmq
tags: [amqp,api,shell,bash,zsh]
---

When you have a lot of unwanted queues/exchanges on _rabbitmq_, either by legacy or spawned by a bad configuration, deleting them by hand is very painful.  The _rabbitmq_ management plugin offers an API where you can delete all those queues automatically, here is the command I ended up with:

```
rabbitmqctl list_queues -p rabbit |\
grep -v "top\|medium\|low" |\
tr "[:blank:]" " " |\
cut -d " " -f 1 |\
xargs -I{} curl -i -u guest:guest -H "content-type:application/json" -XDELETE http://localhost:15672/api/queues/rabbit/{}
```

Let's break it down:

* `rabbitmqctl list_queues -p <VHOST_NAME>` lists the queues existing on the specified vhost.
* `grep -v "queue\|another_queue\|etc"` filters some queues that we _don't_ want to delete.
* `tr "[:blank:]" " " |\` normalizes the delimiter in the _list_queues_ print.
* `cut -d " " -f 1 |\` picks the queue name (first column) removing the other data we don't need.
* `xargs -I{} curl -i -u <user>:<password> -H "content-type:application/json" -XDELETE http://localhost:15672/api/queues/<VHOST_NAME>/{}` This is the actual call to delete the queue, the `-I` let's us pick where we want to put the queue name in the call (which is at the end).


This same command can also be applied to delete exchanges by changing the initial command to `rabbitmqctl list_exchanges`.
