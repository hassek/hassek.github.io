---
layout: default
title: Setting up a wildcard certificate with dnsimple in Kubernetes
date: 2020-07-28 20:04 +0200
category: kubernetes
tags: [letsencrypt,certificate,security]
---

To setup a wildcard certificate with let's encrypt it's necessary to use a [DNS01](https://cert-manager.io/docs/configuration/acme/dns01/) challenge as opposed to the simpler [HTTP01](https://cert-manager.io/docs/configuration/acme/http01/) challenge.
This becomes a.... Challenge! because it requires support from your DNS provider, luckily `dnsimple` have api support for this and there is a web hook helm chart to get it up and running.

The [cert-manager-webhook-dnsimple](https://github.com/neoskop/cert-manager-webhook-dnsimple) project let's you set this up automatically, this will avoid any problems with an expired dns since it will renew itself automatically as long as the setup keeps working.
At the moment of configuring it up, sadly I found a few issues myself, here are the details:

##### Ingress setup

I setup an ingress to generate the certificate (as opposed to the example in the webhook project)

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: {{ template "ingress.name" . }}
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    ingress.kubernetes.io/secure-backends: "true"
    cert-manager.io/cluster-issuer: {{ .Values.ssl.cluster_issuer_name }}
  labels:
    chart: "{{ .Chart.Name }}-{{ .Chart.Version }}"
    release: "{{ .Release.Name }}"
    heritage: "{{ .Release.Service }}"
spec:
  rules:
  - host: '*.emailpref.com'
    http:
      paths:
      - path: /
        backend:
          serviceName: wizzy
          servicePort: http
  tls:
  - hosts:
    - '*.emailpref.com'
    - emailpref.com
    secretName: pewpew-cert # < cert-manager will store the created certificate in this secret.
{{- end }}

```

##### Certificate Generation

This generated automatically the certificate, certificate request and certificate challenges, checking them out helped me debug the issue very well

```bash
kubectl get cert
kubectl describe cert

kubectl get certificaterequests
kubectl describe certificaterequests

kubectl get challenges
kubectl describe challenges
```

##### Errors!
At this point I got an important error, the dns was not able to read the TXT challenge from `dnsimple`, these tools help me greatly on debugging that:

[letsdebug.net](https://letsdebug.net/)
It's a website where it checks if your domain is setup properly to be verified by let's encrypt.

[crt.sh](https://crt.sh/)
Here you can check the certificates that have been requested for your domain

Another guide that should help on debugging is [here](https://cert-manager.io/docs/faq/acme/)

##### DNSSEC
Configuring properly DNSSEC did the deal, after that the [letsdebug.net](https://letsdebug.net/) tool gave me the thumbs up and all started working properly.
