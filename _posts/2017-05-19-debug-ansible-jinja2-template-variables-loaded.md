---
layout: default
title: Debug ansible jinja2 template variables loaded
date: 2017-05-19 21:50:45
category: ansible
tags: [devops,automation,debug]
---

Debugging variables in _Ansible_ can be a pain sometimes, to make it easier there are debug modules to help out with it.

```
{% raw %}
ansible -m debug -a "msg={{hostvars[inventory_hostname]}}" -i inventories/vagrant/hosts mahmachine.localhost
{% endraw %}
```

This will print all the variables belonging to the pointed inventory,
also, we could add [debug strategy on a playbook](https://docs.ansible.com/ansible/playbooks_debugger.html) too:

```
# playbook.yml
- hosts: mahmachine.localhost
  strategy: debug
  roles:
    - base
```

And if there is any issue with the playbook it will open a kind of `pdb` or `gdb` so you can interactively investigate!
