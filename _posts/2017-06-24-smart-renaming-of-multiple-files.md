---
layout: default
title: Smart renaming of multiple files
date: 2017-06-24 12:30:00
category: shell
tags: [rename]
---

There are times when you want to rename multiple files by issuing a small modification on all of them. For this case the script `rename` is quite handy.

```bash
rename 's/tag_50_name_ypthon/tag_50_name_python/' tag_50_name_*
```

Let's break it down:

* The first argument follows a familiar syntax with many editors to replace text, it will find the first given text `tag_50_name_ypthon` and replace it with `tag_50_name_python`.

* The second argument will match the files with the given _regex_ and apply the previous command.

There are many other things `rename` can do, changing text to
_upper case_, _lower case_ and even _sanitizing_ it are supported.
