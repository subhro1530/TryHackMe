# Nmap 7.92 scan initiated Sun Jun 18 02:18:15 2023 as: nmap -oN nmap.txt -oC -sC 10.10.113.213
Nmap scan report for 10.10.113.213
Host is up (0.26s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT     STATE SERVICE
21/tcp   open  ftp
| ftp-anon: __Anonymous__ FTP login allowed (FTP code 230)
|_Can't get directory listing: TIMEOUT
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.17.28.202
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
80/tcp   open  http
|_http-title: Apache2 Ubuntu Default Page: It works
| http-robots.txt: 2 disallowed entries 
|_/ /openemr-5_0_1_3 
2222/tcp open  EtherNetIP-1
| ssh-hostkey: 
|   2048 29:42:69:14:9e:ca:d9:17:98:8c:27:72:3a:cd:a9:23 (RSA)
|   256 9b:d1:65:07:51:08:00:61:98:de:95:ed:3a:e3:81:1c (ECDSA)
|_  256 12:65:1b:61:cf:4d:e5:75:fe:f4:e8:d4:6e:10:2a:f6 (ED25519)

# Nmap done at Sun Jun 18 02:19:06 2023 -- 1 IP address (1 host up) scanned in 50.11 seconds
