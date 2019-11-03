---
layout: default
title: nice networking tools to remember
date: 2019-11-03 12:48 +0100
---

`nslookup` is a tool to check the IPs a given dns entry resolves too, this is quite handy when you are modifying the dns and want to check if it updated, together with `watch` is quite nice:

`traceroute` traces and measures hops on the internet, for example, here is a traceroute for www.google.com from spain, which clearly uses google/telefonica to reach

```
traceroute to www.google.com (216.58.201.132), 64 hops max, 52 byte packets
 1  192.168.1.1 (192.168.1.1)  3.364 ms  2.850 ms  4.378 ms
 2  * * *
 3  * * *
 4  150.red-81-46-66.customer.static.ccgg.telefonica.net (81.46.66.150)  16.320 ms *
    158.red-81-46-66.customer.static.ccgg.telefonica.net (81.46.66.158)  7.479 ms
 5  * 17.red-81-46-0.customer.static.ccgg.telefonica.net (81.46.0.17)  9.564 ms *
 6  176.52.253.93 (176.52.253.93)  7.814 ms * *
 7  google-be4-grcmadno1.net.telefonicaglobalsolutions.com (213.140.50.43)  6.385 ms
    72.14.211.154 (72.14.211.154)  5.863 ms
    google-be4-grcmadno1.net.telefonicaglobalsolutions.com (213.140.50.43)  5.482 ms
 8  108.170.253.225 (108.170.253.225)  6.664 ms * *
 9  209.85.142.101 (209.85.142.101)  7.615 ms
    209.85.142.147 (209.85.142.147)  7.333 ms
    mad06s25-in-f132.1e100.net (216.58.201.132)  6.360 ms
```
