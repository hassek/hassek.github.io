---
layout: default
title: Fix branch created from a rebased branch
date: 2018-01-09 21:50:45
category: git
tags: [rebase]
---

Let's say you have setup these branches:

```
A
 \
   B --> C
    \
     D
```

Sometimes someone coding in branch C will finish it's development, merge to `B` and _rebase iteractely_, creating a new branch of itself and kind leaving `D` without a real parent branch (not exactly since B still exists in the _reflog_):

```
A
 \
  B'

  D
```

The issue been faced here is that `D` parent should be `B'` now, if we want to be able to merge in a fast-forward manner and avoid unnecessary conflicts, we need to fix this. Here is a way to do it:

```
git branch -m D D-old
git checkout -b D B'
git cherry-pick <All-commits-from old D>
git push -f origin D
```

We are just getting our commits from `old-D` into a new `D` which is based on `B'`. This may sound unnecessary but when you have a pull request, we don't want to close it and lose all comments/history of the pull request, this does the trick.
