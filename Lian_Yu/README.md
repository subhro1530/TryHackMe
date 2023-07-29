# Tryhackme - Lian Yu

##  export IP=10.10.163.134
##  Walkthrough by
```
Shaswata Saha
16-07-23
01:38PM
```

##  Steps:
1.  nmap
```bash

```

2.  Gobuster
```bash
                                                                                             
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.163.134 -w Documents/gobuster-wordlist/dsstorewordlist.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.163.134
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/17 13:10:14 Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 199]
/.htpasswd            (Status: 403) [Size: 199]
/.htpasswds           (Status: 403) [Size: 199]
Progress: 1818 / 1829 (99.40%)
/island           (Status: 300) [Size: 120]
===============================================================
2023/07/17 13:11:01 Finished
===============================================================

```

3.  I went to a walkthrough to fine=d a vulnerable folder island
```
Ohhh Noo, Don't Talk...............

I wasn't Expecting You at this Moment. I will meet you there

You should find a way to Lian_Yu as we are planed. The Code Word is:
vigilante
```

4.  Further gobuster scan:
```bash
    gobuster dir -u http://10.10.41.172/ -w /root/Desktop/Tools/wordlists/SecLists/Discovery/Web-Content/directory-list-2.3-medium.txt
```

5.  Next, I went to Target_IP/island on the browser to see what’s inside. I inspected it on the browser and found the code word which on the default browser cannot be seen… it’s _vigilante_.

6.  You can actually also view the code word without inspecting by highlighting all the text.

Moving on…….

I gobusted again on this discovered directory and discovered another directory.
```
    /2100

```

7.  Ip change :
```
export IP=10.10.161.125
```

8.  We find using gobuster the file green_arrow.txt.

9.  A message :
```
This is just a token to get into Queen's Gambit(Ship)


RTy8yhBQdscX
```

Base58 decode :
```
!#th3h00d
```

10. On logging into ftp we find a malicious image file with header different from normal png header files:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Lian_Yu]
└─$ xxd Leave_me_alone.png | head -n 1
00000000: 5845 6fae 0a0d 1a0a 0000 000d 4948 4452  XEo.........IHDR

```

11. 