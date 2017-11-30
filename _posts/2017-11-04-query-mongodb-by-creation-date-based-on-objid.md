---
layout: default
title: Query mongodb by creation date based on objId
date: 2017-11-04 12:23:00
category: mongodb
tags: [query]
---

```js
var objIdMin = ObjectId(Math.floor((new Date('2017/10/01'))/1000).toString(16) + "0000000000000000")
```

Based on [this post](https://stackoverflow.com/questions/8749971/can-i-query-mongodb-objectid-by-date) in stackoverflow.
