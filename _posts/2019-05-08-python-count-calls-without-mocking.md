---
layout: default
title: Python count calls without mocking
date: 2019-05-08 19:22 +0200
---

Sometimes when you mock in a unit test, you just do it because you want to verify something was called but you don't want the object itself to be
replaced in any way. This can be done by adding the `wraps` option on the python mocker.

```python
with patch.object(mocked_function, 'func', wraps=mocked_function.func) as func_mock:
    yourfunc()
    self.assertTrue(func_mock.called)
```
