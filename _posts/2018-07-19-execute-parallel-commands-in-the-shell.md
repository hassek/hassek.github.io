---
layout: post
title: execute parallel commands in the shell
date: 2018-07-19 10:52 +0200
category: shell
tags: [unix]
---

Replace all files in parallel 

```
find . -type f -print0 | parallel -q0 perl -i -pe 's/FOO BAR/FUBAR/g'
```

It works similar to `xargs` where each line found is send through the pipe and catch by `parallel` to be processed.

Also, sometimes you want to run commands with many arguments, for example, an _ansible_ release

```
cat release
my-playbook1.yml -i my_inventory
my-playbook2.yml -i my_inventory

cat release | parallel --colsep ' ' ansible-playbook
# parallel execution happening here
```

If we don't add the `--colsep` it will treat it as 1 argument which is not really desirable.
