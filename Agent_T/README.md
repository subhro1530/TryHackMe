#   Tryhackme - Agent T

##  export IP=10.10.83.65

##  Steps:
1.  Nmap scan:  
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-08-11 05:11 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 05:11
Completed NSE at 05:11, 0.00s elapsed
Initiating NSE at 05:11
Completed NSE at 05:11, 0.00s elapsed
Initiating NSE at 05:11
Completed NSE at 05:11, 0.00s elapsed
Initiating Ping Scan at 05:11
Scanning 10.10.83.65 [2 ports]
Completed Ping Scan at 05:11, 0.36s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 05:11
Completed Parallel DNS resolution of 1 host. at 05:11, 0.01s elapsed
Initiating Connect Scan at 05:11
Scanning 10.10.83.65 [1000 ports]
Discovered open port 80/tcp on 10.10.83.65
Increasing send delay for 10.10.83.65 from 0 to 5 due to 13 out of 43 dropped probes since last increase.
Increasing send delay for 10.10.83.65 from 5 to 10 due to 11 out of 16 dropped probes since last increase.
Increasing send delay for 10.10.83.65 from 10 to 20 due to 11 out of 16 dropped probes since last increase.
Increasing send delay for 10.10.83.65 from 20 to 40 due to 11 out of 16 dropped probes since last increase.
Increasing send delay for 10.10.83.65 from 40 to 80 due to 11 out of 14 dropped probes since last increase.
Increasing send delay for 10.10.83.65 from 80 to 160 due to max_successful_tryno increase to 4
Connect Scan Timing: About 23.03% done; ETC: 05:14 (0:01:44 remaining)
Connect Scan Timing: About 40.97% done; ETC: 05:14 (0:01:28 remaining)
Connect Scan Timing: About 58.22% done; ETC: 05:14 (0:01:05 remaining)
Connect Scan Timing: About 76.02% done; ETC: 05:14 (0:00:38 remaining)
Completed Connect Scan at 05:14, 165.23s elapsed (1000 total ports)
Initiating Service scan at 05:14
Scanning 1 service on 10.10.83.65
Completed Service scan at 05:14, 8.60s elapsed (1 service on 1 host)
NSE: Script scanning 10.10.83.65.
Initiating NSE at 05:14
Completed NSE at 05:15, 11.87s elapsed
Initiating NSE at 05:15
Completed NSE at 05:15, 1.57s elapsed
Initiating NSE at 05:15
Completed NSE at 05:15, 0.00s elapsed
Nmap scan report for 10.10.83.65
Host is up (0.25s latency).
Not shown: 999 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
80/tcp open  http    PHP cli server 5.5 or later (PHP 8.1.0-dev)
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title:  Admin Dashboard

NSE: Script Post-scanning.
Initiating NSE at 05:15
Completed NSE at 05:15, 0.00s elapsed
Initiating NSE at 05:15
Completed NSE at 05:15, 0.00s elapsed
Initiating NSE at 05:15
Completed NSE at 05:15, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 188.09 seconds
```

2.  Ran gobuster but no outcome..

3.  Ran burpsuite, got a vuln.
```
HTTP/1.1 200 OK
Host: 10.10.83.65
Date: Fri, 11 Aug 2023 09:34:41 GMT
Connection: close
X-Powered-By: PHP/8.1.0-dev
Content-type: text/html; charset=UTF-8
```

4.  Searched about 
```
PHP/8.1.0-dev
```

5.  Got a reverse backdoor option.

6.  
python3 -c 'import pty;pty.spawn("/bin/bash')'