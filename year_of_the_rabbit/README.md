#   Tryhackme - Year of the Rabbit

##  IP=10.10.176.84
##  Walkthrough by
```
Shaswata Saha
26-07-23
06:14PM
```

##  Steps:
1.  Nmap Scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-26 08:39 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 08:39
Completed NSE at 08:39, 0.00s elapsed
Initiating NSE at 08:39
Completed NSE at 08:39, 0.00s elapsed
Initiating NSE at 08:39
Completed NSE at 08:39, 0.00s elapsed
Initiating Ping Scan at 08:39
Scanning 10.10.176.84 [2 ports]
Completed Ping Scan at 08:39, 0.39s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 08:39
Completed Parallel DNS resolution of 1 host. at 08:39, 0.14s elapsed
Initiating Connect Scan at 08:39
Scanning 10.10.176.84 [1000 ports]
Discovered open port 21/tcp on 10.10.176.84
Discovered open port 22/tcp on 10.10.176.84
Discovered open port 80/tcp on 10.10.176.84
Increasing send delay for 10.10.176.84 from 0 to 5 due to max_successful_tryno increase to 4
Increasing send delay for 10.10.176.84 from 5 to 10 due to max_successful_tryno increase to 5
Completed Connect Scan at 08:40, 46.39s elapsed (1000 total ports)
Initiating Service scan at 08:40
Scanning 3 services on 10.10.176.84
Completed Service scan at 08:40, 7.80s elapsed (3 services on 1 host)
NSE: Script scanning 10.10.176.84.
Initiating NSE at 08:40
Completed NSE at 08:40, 8.76s elapsed
Initiating NSE at 08:40
Completed NSE at 08:40, 1.64s elapsed
Initiating NSE at 08:40
Completed NSE at 08:40, 0.00s elapsed
Nmap scan report for 10.10.176.84
Host is up (0.22s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.2
22/tcp open  ssh     OpenSSH 6.7p1 Debian 5 (protocol 2.0)
| ssh-hostkey: 
|   1024 a0:8b:6b:78:09:39:03:32:ea:52:4c:20:3e:82:ad:60 (DSA)
|   2048 df:25:d0:47:1f:37:d9:18:81:87:38:76:30:92:65:1f (RSA)
|   256 be:9f:4f:01:4a:44:c8:ad:f5:03:cb:00:ac:8f:49:44 (ECDSA)
|_  256 db:b1:c1:b9:cd:8c:9d:60:4f:f1:98:e2:99:fe:08:03 (ED25519)
80/tcp open  http    Apache httpd 2.4.10 ((Debian))
| http-methods: 
|_  Supported Methods: POST OPTIONS GET HEAD
|_http-title: Apache2 Debian Default Page: It works
|_http-server-header: Apache/2.4.10 (Debian)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 08:40
Completed NSE at 08:40, 0.00s elapsed
Initiating NSE at 08:40
Completed NSE at 08:40, 0.00s elapsed
Initiating NSE at 08:40
Completed NSE at 08:40, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 65.80 seconds
```

2.  Gobuster Scan:
```bash

```