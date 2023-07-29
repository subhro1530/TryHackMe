#	Tryhackme - ColddBox:Easy

>>	Nmap scan results:
```

┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/ColddBox:Easy]
└─$ nmap -sC -sV $IP                     
Starting Nmap 7.92 ( https://nmap.org ) at 2023-06-08 13:44 EDT
Nmap scan report for 10.10.51.3
Host is up (0.24s latency).
Not shown: 999 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-generator: WordPress 4.1.31
|_http-title: ColddBox | One more machine
|_http-server-header: Apache/2.4.18 (Ubuntu)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 63.74 seconds

```


>> Gobuster Scan results:
```

┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://$IP -w Documents/gobuster-wordlist/dsstorewordlist.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.51.3
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/06/08 13:46:11 Starting gobuster in directory enumeration mode
===============================================================
/wp-includes          (Status: 301) [Size: 314] [--> http://10.10.51.3/wp-includes/]
/wp-content           (Status: 301) [Size: 313] [--> http://10.10.51.3/wp-content/]
/wp-admin             (Status: 301) [Size: 311] [--> http://10.10.51.3/wp-admin/]
/index.php            (Status: 301) [Size: 0] [--> http://10.10.51.3/]
/license.txt          (Status: 200) [Size: 19930]
/wp-login.php         (Status: 200) [Size: 2547]
/xmlrpc.php           (Status: 200) [Size: 42]
/wp-load.php          (Status: 200) [Size: 0]
/wp-blog-header.php   (Status: 200) [Size: 0]
/wp-trackback.php     (Status: 200) [Size: 135]
/wp-mail.php          (Status: 403) [Size: 2965]
/wp-links-opml.php    (Status: 200) [Size: 219]
/wp-cron.php          (Status: 200) [Size: 0]
/wp-comments-post.php (Status: 405) [Size: 0]
/wp-activate.php      (Status: 302) [Size: 0] [--> /wp-login.php?action=register]
/wp-settings.php      (Status: 500) [Size: 0]
/wp-signup.php        (Status: 302) [Size: 0] [--> /wp-login.php?action=register]
/wp-config-sample.php (Status: 500) [Size: 251]
/.htaccess            (Status: 403) [Size: 275]
/wp-config.php        (Status: 200) [Size: 0]
/.htpasswd            (Status: 403) [Size: 275]
/.htpasswds           (Status: 403) [Size: 275]

```	