---
layout: default
title: Auto configuration for apt packages on ansible
date: 2017-06-28 12:23:00
category: ansible
tags: [linux,ubuntu,apt,postfix]
---

When installing packages on _debian/ubuntu_, there is a chance the package installation will include some questions to be answered.

On _ansible_ you shouldn't setup any terminal expectation since it will be defeating the purpose of automation, to add automatic answers to `apt`, you should add them to _debconf_ like this:

```yml
- name: debconf pre-selection for postfix install
  debconf:
    name: postfix
    question: postfix/main_mailer_type
    vtype: string
    value: "Internet Site"
  tags: postfix
```

To read more about _debconf_, please check this [stackoverflow answer](https://serverfault.com/questions/143968/automate-the-installation-of-postfix-on-ubuntu).
