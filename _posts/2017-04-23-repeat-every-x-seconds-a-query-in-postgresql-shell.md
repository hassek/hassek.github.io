---
layout: default
title: Repeat every X seconds a query in postgresql shell
date: 2017-04-23 12:45:00
category: postgres
tags: [query]
---
Sometimes you want to repeat a query constantly to see updated data, here is a way to do it on the _postgresql_ shell

```
# Execute query
SELECT count(*) FROM table;

# Tell postgres to repeat it every X seconds
\watch 5
```

And that's it!
