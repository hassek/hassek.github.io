---
layout: default
title: Run flake8 on recent changes
date: 2017-09-21 11:00:00
category: git
tags: [flake8]
---

To verify manually all your recent changes compared to the master branch
by name you can run

```bash
git diff --name-only master
package/file1.py
other/file3.py
```

Because of this we can run any script to it to verify our syntax is proper

```bash
git diff --name-only master | xargs flake8
package/file1.py:2:1: F401 'logging' imported but unused
other/file3.py:358:9: F821 undefined name 'logger'
```
