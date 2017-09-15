---
layout: default
title: Mongodb index stats
date: 2017-09-14 20:50:45
category: mongodb
tags: [index]
---

The easiest way I have found to verify which indexes to clean up is to use the `indexStats` command

```
mongo mydb --port 10000  # connect to mongod process
db.collection.aggregate( [ { $indexStats: { } } ] ).pretty()
```
