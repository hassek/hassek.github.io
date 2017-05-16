---
layout: default
title: Find the ruby source file of a method
date: 2017-05-16 12:00:00
category: ruby
tags: [irb,pry]
---

When you are looking for the source code in ruby, the easiest way to
find it is on the _irb/pry_ shell!

```ruby
Mongoid::Document.public_instance_method(:as_json).source_location
```
