---
layout: default
title: Double ssh automation
date: 2017-05-07 12:00:00
category: shell
tags: [linux,ssh]
---

When you have a 1 door entrance for your data center you will need to _ssh_ into the _door_ or _proxy_ machine and then _ssh_ to the wanted machine. To ease the pain, you can execute just one command instead.

```bash
$ ssh -tt door-machine.com ssh the-real-deal-machine.com
```

Let's break it down:

* the `-t` flag forces a _pseudo-terminal allocation_ and if we add multiple _t's_ it will force a _tty_ allocation, meaning, a terminal on the _door_ machine.
* Once the terminal is created, you execute another ssh as if you would normally.

Because this is still painful, we can configure it into our `~/.ssh/config` file instead:

```
Host door-machine
  User tomas
  Hostname door-machine.com

Host the-real-deal-machine
  User tomas
  IdentityFile ~/.ssh/id_rsa_for_real_machine
  ProxyCommand ssh door-machine nc the-real-deal-machine.com 22
```

I had a special issue when setting this up, I needed to use the `-v` flag to debug it, my _door_ machine has a _tomas_ user with a different identity file than I normally use. To fix this I needed to add locally that file and point to it in the configuration. Let's break these commands down:

* First we create the _door-machine_ configuration which is pretty basic.
* _IdentityFile_ points to the `id_rsa` from the _door machine_.
* _ProxyCommand_ is the real magic, it enters into the _door machine_ and extends the connection with the _nc_ command to the _target machine_.

If you want to read more about it, please check [this](http://sshmenu.sourceforge.net/articles/transparent-mulithop.html) and [this](https://www.cyberciti.biz/faq/linux-unix-ssh-proxycommand-passing-through-one-host-gateway-server/) post.
