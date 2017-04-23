---
layout: default
title: Python list flatenning
date: 2017-04-23 12:25:00
category: python
tags: [algorithm]
---
To flatten a list in a simple way we can use the `operator.concat` and a reduce function.

```python
In [1]: import operator

In [2]: my_list = [[1, 2], [3, 4, 5]]

In [3]: print reduce(operator.concat, my_list)
[1, 2, 3, 4, 5]
```
