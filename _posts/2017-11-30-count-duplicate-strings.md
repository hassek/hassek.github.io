---
layout: default
title: Count duplicate strings
date: 2017-11-30 21:50:45
category: shell
tags: [unix]
---

When you have a file full of duplicates and you want to count them up for any reason, _unix_ like scripts are always there to help!
Let's say we have a file names *emails.txt*

```txt
lewl@gmail.com
boom@gmail.com
lewl@gmail.com
jhon.mcduck@hotmail.com
lewl@gmail.com
```

Now, applying _unix_ magic

```shell
sort emails.txt| uniq -c                                                                                                  [~/WebSites/hassek.github.io]
   1 boom@gmail.com
   1 jhon.mcduck@hotmail.com
   3 lewl@gmail.com
```
