---
layout: default
title: Mock request errors
date: 2018-08-06 16:33 +0200
category: python
tags: [unit_test,mock]
---

A common use case in unit tests is to test request exceptions, I admit this is a weird one but works very well:

```python
from mock import patch
from requests.exceptions import HTTPError

response_mock = Mock(status_code=406, message='Revoked Token')
error_mock = HTTPError(response=response_mock)
with patch('accounts.models.Profile._refresh_credentials', side_effect=error_mock):
    # Do your test here that raises a request exception
```
