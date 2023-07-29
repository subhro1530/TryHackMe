#   Tryhackme - Anthem VM

##  export IP=10.10.77.119
##  Walkthrough by
```
Shaswata Saha
23-07-2023
12:37AM
```

##  Steps:
1.  Nmap scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-22 15:07 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 15:07
Completed NSE at 15:07, 0.00s elapsed
Initiating NSE at 15:07
Completed NSE at 15:07, 0.00s elapsed
Initiating NSE at 15:07
Completed NSE at 15:07, 0.00s elapsed
Initiating Ping Scan at 15:07
Scanning 10.10.77.119 [2 ports]
Completed Ping Scan at 15:07, 0.26s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 15:07
Completed Parallel DNS resolution of 1 host. at 15:07, 0.20s elapsed
Initiating Connect Scan at 15:07
Scanning 10.10.77.119 [1000 ports]
Discovered open port 3389/tcp on 10.10.77.119
Discovered open port 80/tcp on 10.10.77.119
Completed Connect Scan at 15:08, 20.63s elapsed (1000 total ports)
Initiating Service scan at 15:08
Scanning 2 services on 10.10.77.119
Completed Service scan at 15:08, 17.28s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.77.119.
Initiating NSE at 15:08
Completed NSE at 15:09, 73.85s elapsed
Initiating NSE at 15:09
Completed NSE at 15:09, 6.61s elapsed
Initiating NSE at 15:09
Completed NSE at 15:09, 0.00s elapsed
Nmap scan report for 10.10.77.119
Host is up (0.26s latency).
Not shown: 998 filtered tcp ports (no-response)
PORT     STATE SERVICE       VERSION
80/tcp   open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
3389/tcp open  ms-wbt-server Microsoft Terminal Services
|_ssl-date: 2023-07-22T19:09:45+00:00; +2s from scanner time.
| ssl-cert: Subject: commonName=WIN-LU09299160F
| Issuer: commonName=WIN-LU09299160F
| Public Key type: rsa
| Public Key bits: 2048
| Signature Algorithm: sha256WithRSAEncryption
| Not valid before: 2023-07-21T19:07:09
| Not valid after:  2024-01-20T19:07:09
| MD5:   f340 376c 5b5e 0404 2334 df9d f12f 52ae
|_SHA-1: 8c1d 96ad d569 1957 5c94 45a9 281f e70b 395d 098f
| rdp-ntlm-info: 
|   Target_Name: WIN-LU09299160F
|   NetBIOS_Domain_Name: WIN-LU09299160F
|   NetBIOS_Computer_Name: WIN-LU09299160F
|   DNS_Domain_Name: WIN-LU09299160F
|   DNS_Computer_Name: WIN-LU09299160F
|   Product_Version: 10.0.17763
|_  System_Time: 2023-07-22T19:08:32+00:00
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: mean: 1s, deviation: 0s, median: 1s

NSE: Script Post-scanning.
Initiating NSE at 15:09
Completed NSE at 15:09, 0.00s elapsed
Initiating NSE at 15:09
Completed NSE at 15:09, 0.00s elapsed
Initiating NSE at 15:09
Completed NSE at 15:09, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 120.02 seconds

```

### Ip change = 10.10.57.24
2.  Gobuster scan:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.57.24/ -w Documents/gobuster-wordlist/directory-list-2.3-medium.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.57.24/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/23 06:55:38 Starting gobuster in directory enumeration mode
===============================================================
/search               (Status: 200) [Size: 3414]
/blog                 (Status: 200) [Size: 5389]
/sitemap              (Status: 200) [Size: 1035]
/rss                  (Status: 200) [Size: 1869]
/archive              (Status: 301) [Size: 123] [--> /blog/]
/categories           (Status: 200) [Size: 3536]
/authors              (Status: 200) [Size: 4110]
/Search               (Status: 200) [Size: 3464]
/tags                 (Status: 200) [Size: 3539]
/install              (Status: 302) [Size: 126] [--> /umbraco/]
Progress: 796 / 220561 (0.36%)^C
[!] Keyboard interrupt detected, terminating.

===============================================================
2023/07/23 06:56:34 Finished
===============================================================

```

3.  Getiing a pass:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/AnthemVM]
└─$ curl -s http://10.10.57.24/robots.txt
UmbracoIsTheBest!

# Use for all search robots
User-agent: *

# Define the directories not to crawl
Disallow: /bin/
Disallow: /config/
Disallow: /umbraco/
Disallow: /umbraco_client/
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/AnthemVM]
└─$ 

```

4.  Get the admin name:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ curl -s http://10.10.57.24/archive/checkout/ | html2text 

****** Anthem.com ******
***** Welcome to our blog *****
    * Categories
    * Tags
    * [term                ]

****** We_are_hiring ******
 Monday, January 20, 2020

Hi fellow readers,We are currently hiring. We are looking for young talented to
join a good cause and keep this community alive!If you have an interest in
being a part of the movement send me your CV…
Read_this_article

****** A_cheers_to_our_IT_department ******
 Tuesday, December 31, 2019

During our hard times our beloved admin managed to save our business by
redesigning the entire website.As we all around here knows how much I love
writing poems I decided to write one about him:Born…
Read_this_article

```

This poem was written by Solomon Grudy.

5.  Get the admin email:
```
SG@anthem.com
```
Comparing the Jane Doe as JD@anthem.com.

6.  Getting the flags:
```bash
|──(subhro1530㉿subhro)-[~/Desktop/tryhackme/AnthemVM]
└─$ curl -s http://10.10.57.24/archive/we-are-hiring/ | grep THM
<meta content="THM{L0L_WH0_US3S_M3T4}" property="og:description" />
        <input type="text" name="term" placeholder="Search...                               THM{G!T_G00D}" />

```

7.  Let’s get into the box using the intel we gathered.
### 1 - Let’s figure out the username and password to log in to the box.(The box is not on a domain)

You can connect to http://10.10.29.47/umbraco/ using the information found previously: * username: SG@anthem.com * password: UmbracoIsTheBest!
### 2 - Gain initial access to the machine, what is the contents of user.txt?

Now, let’s try to connect via RDP with: * username: SG * password: UmbracoIsTheBest!

User flag: THM{N00T_NO0T}
### 3 - Can we spot the admin password?

Hint: It is hidden.

There is a hidden backup directory on the C:\ drive, that contains a file named restor.txt. Give it permissions:
```cmd
C:\>dir /a:hd
 Volume in drive C has no label.
 Volume Serial Number is 1225-5238

 Directory of C:\

15/09/2018  08:19    <DIR>          $Recycle.Bin
05/04/2020  23:42    <DIR>          backup
05/04/2020  10:56    <JUNCTION>     Documents and Settings [C:\Users]
05/04/2020  14:46    <DIR>          ProgramData
05/04/2020  10:56    <DIR>          Recovery
05/04/2020  10:55    <DIR>          System Volume Information
               0 File(s)              0 bytes
               6 Dir(s)  46,857,580,544 bytes free

C:\>cd backup

C:\backup>dir
 Volume in drive C has no label.
 Volume Serial Number is 1225-5238

 Directory of C:\backup

05/04/2020  23:42                21 restore.txt
               1 File(s)             21 bytes
               0 Dir(s)  46,857,580,544 bytes free

C:\backup>more restore.txt
ChangeMeBaby1MoreTime

C:\backup>
```
Answer: ChangeMeBaby1MoreTime
### 4 - Escalate your privileges to root, what is the contents of root.txt?

Root flag: THM{Y0U_4R3_1337} 