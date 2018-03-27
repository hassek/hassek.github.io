---
layout: default
title: Paste huge payload from clipboard on vim
date: 2018-03-27 08:40 -0700
category: vim
tags: [clipboard]
---

Pasting huge payload in a vim buffer can take a very long time if not careful. To manage this easily we need:

#### to have vim compiled with +clipboard

Check it by running `:version` to see if you have it

#### magic paste

Use the `"*p` or `"*P` and it will instantly paste :)
