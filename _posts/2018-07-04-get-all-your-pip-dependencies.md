---
layout: default
title: Get all your pip dependencies
date: 2018-07-04 13:09 +0200
category: python
tags: [pip]
---

There is a great tool to get pip package dependencies called [pipdeptree](https://github.com/naiquevin/pipdeptree).

To see the output of my whole requirements file I did this script:

```bash
cat requirements.txt | cut -d "=" -f 1 | cut -d "[" -f 1 | xargs -I{} pipdeptree -p {}
```

Here is an example result

```bash
celery==4.2.0
  - billiard [required: >=3.5.0.2,<3.6.0, installed: 3.5.0.3]
  - kombu [required: >=4.2.0,<5.0, installed: 4.2.1]
    - amqp [required: >=2.1.4,<3.0, installed: 2.3.2]
      - vine [required: >=1.1.3, installed: 1.1.4]
  - pytz [required: >dev, installed: 2018.5]
environs==2.1.1
  - marshmallow [required: >=2.7.0, installed: 2.15.3]
  - read-env [required: >=1.1.0, installed: 1.1.0]
future==0.16.0
```
