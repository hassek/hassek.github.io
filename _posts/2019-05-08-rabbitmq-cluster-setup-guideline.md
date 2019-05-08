---
layout: post
title: Rabbitmq cluster setup guideline
date: 2019-05-08 12:40 +0200
category: rabbitmq
tags: [cluster]
---

Here is a general guideline of how I setup a rabbitmq cluster to properly scale horizontally. Even if the need is to scale one specific queue this will work.

To scale a specific queue I used the `rabbitmq_consistent_hash_exchange` plugin, it sends tasks based on a hash, to make it round robin I decided to use a `uuid` for each task to make it so.
For more information check out the [documentation](https://github.com/rabbitmq/rabbitmq-consistent-hash-exchange).

By solving the issue of a queue horizontal scaling, we can move on to setting up a cluster in rabbit. My main concerns where:

Here is how to do it via the rabbitmqadmin

```
sudo rabbitmqadmin declare exchange -V rabbit name=<exchange-name> type=x-consistent-hash -u <user> -p <pwd>
for i in $(seq 4); do sudo rabbitmqadmin declare queue -V rabbit name=<queue-name>.$i  -u <user> -p <pwd>; done
for i in $(seq 4); do sudo rabbitmqadmin declare binding -V rabbit source=<exchange-name> destination=<queue-name>.$i routing_key="1" -u <user> -p <pwd>; done
```

### Setup the same erlang cookie on all nodes

This is required to be able to connection between nodes. It needs to be setup at `/var/lib/rabbitmq/.erlang.cookie` and to all users that may want to use the cli.

### Scalable queue Mirroring

If we mirror on all queues, we are not scaling quite well, to scale it up I setup impair nodes (3, 5, 7...) and add mirroring to 2 nodes, this way we can actually scale the system without touching all nodes for mirror queues.
To setup this, we add a policy:

```
rabbitmqctl set_policy ha-two "^two\." '{"ha-mode":"exactly","ha-params":2,"ha-sync-mode":"automatic"}'
```

### Queue balancing between nodes

There is a plugin to balance nodes automatically, but this is not my aim right now since it shouldn't be required while everything is stable. To move them manually I can simply add a policy

```
rabbitmqctl set_policy --apply-to queues --priority 100 my-queue '^my-queue$' '{"ha-mode":"nodes", "ha-params":["rabbit@new-master-node"]}' 
# wait for queues to migrate
rabbitmqctl clear_policy my-queue
```
