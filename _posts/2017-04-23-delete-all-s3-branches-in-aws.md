---
layout: default
title: Delete all s3 branches in aws
date: 2017-04-23 12:30:00
category: shell
tags: [aws,s3]
---
With _awscli_ you can access your _aws_ account and manage everything from
there. I needed to remove all buckets from _S3_ so I did this:

```
aws s3 ls | cut -d " " -f 3 | xargs -I{} aws s3 rm s3://{} --dryrun --recursive
```

Let's break it down:

* `aws s3 ls` will show all the bucket names with their creation time (i.e. "2011-10-18 17:48:34 mah_bucket")
* `cut -d " " -f 3` will split the result and get the 3rd column, which is the name
* `xargs -I{} aws s3 rm s3://{} --dryrun --recursive` deletes all the buckets recursively

In this case, notice I added the flag `--dryrun` so we can test it
knowing it will do exactly what we want before executing it.

After deleting all objects in the buckets, let's delete the buckets!

```
aws s3 ls | cut -d " " -f 3 | xargs -I{} aws s3 rb s3://{}
```

Boom! Done!
