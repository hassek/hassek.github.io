---
layout: default
title: Removing Django signal for tests
date: 2017-12-13 12:50:45
category: python
tags: [django, tests]
---

I was caught up into a situation where an object had a signal to create in a 3rd party API a connection every time that object was saved into our database. For automated tests this is not ideal since we are not here to test the 3rd party API (always) but our own functionality. I ran into some issues when disconnecting the signal though. Here is what I end up figuring out to fix it:

```
class MyObj():
    @receiver(post_save, sender="MyObj")
    def create_obj_on_third_party_api(sender, instance, created, **kwargs):
        # Do your thing

----

from mock import patch

from django.db.models.signals import post_save

from factory import Sequence, SubFactory
from factory.django import DjangoModelFactory


class ObjFactory(DjangoModelFactory):
    class Meta:
        model = MyObj

    user = SubFactory(UserFactory)
    email = "bububibu@gmail.com"

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        post_save.disconnect(model_class.create_obj_on_third_party_api.__func__, sender=model_class)
        with patch.object(Obj, "is_refresh_token_valid", return_value=True):
            obj = super(ObjFactory, cls)._create(model_class, *args, **kwargs)
        post_save.connect(model_class.create_obj_on_third_party_api.__func__, sender=model_class, weak=False)
        return obj
```

_Django_ signals are handled by using the python `id` function, which compares identical objects. That means it will *not* disconnect the signal if we pass a _non identical object_ to which I realised the identical object was the `__func__` function.

Also, my  object checked if a _refresh_token_ was valid before saving into DB, I ended up mocking that function to always return True.

EXTRA: If you don't use _FactoryBoy_ for your testing, I highly recommend it!
