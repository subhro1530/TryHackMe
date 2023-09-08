#   Tryhackme - Madness

##  IP=10.10.227.137

##  Notes
```bash
┌──(subhro1530㉿subhro)-[~/Madness]
└─$ steghide info thm.jpg 
"thm.jpg":
  format: jpeg
  capacity: 1.0 KB
Try to get information about embedded data ? (y/n) y
Enter passphrase: 
steghide: could not extract any data with that passphrase!
                                                                                             
┌──(subhro1530㉿subhro)-[~/Madness]
└─$ steghide info thm.jpg
"thm.jpg":
  format: jpeg
  capacity: 1.0 KB
Try to get information about embedded data ? (y/n) y
Enter passphrase: 
  embedded file "hidden.txt":
    size: 101.0 Byte
    encrypted: rijndael-128, cbc
    compressed: yes
                                                                                             
┌──(subhro1530㉿subhro)-[~/Madness]
└─$ ll
total 36
-rw-r--r-- 1 subhro1530 subhro1530  2261 Sep  7 14:44 nmap.nmap
-rw-r--r-- 1 subhro1530 subhro1530    45 Sep  7 14:32 README.md
-rw-r--r-- 1 subhro1530 subhro1530   301 Sep  7 15:01 secret_decode.py
-rw-r--r-- 1 subhro1530 subhro1530 22210 Sep  7 14:50 thm.jpg
                                                                                             
┌──(subhro1530㉿subhro)-[~/Madness]
└─$ steghide extract -sf 'thm.jpg' 
Enter passphrase: 
wrote extracted data to "hidden.txt".
                                                                                             
┌──(subhro1530㉿subhro)-[~/Madness]
└─$ ll
total 40
-rw-r--r-- 1 subhro1530 subhro1530   101 Sep  7 15:07 hidden.txt
-rw-r--r-- 1 subhro1530 subhro1530  2261 Sep  7 14:44 nmap.nmap
-rw-r--r-- 1 subhro1530 subhro1530    45 Sep  7 14:32 README.md
-rw-r--r-- 1 subhro1530 subhro1530   301 Sep  7 15:01 secret_decode.py
-rw-r--r-- 1 subhro1530 subhro1530 22210 Sep  7 14:50 thm.jpg
                                                                                             
┌──(subhro1530㉿subhro)-[~/Madness]
└─$ cat hidden.txt 
Fine you found the password! 

Here's a username 

wbxre

I didn't say I would make it easy for you!
                                                                                             
┌──(subhro1530㉿subhro)-[~/Madness]
└─$ echo "wbxre" | rot13       
joker

##  Found the username as [joker]

 
```

##  Getting user.txt
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Madness]
└─$ steghide extract -sf '5iW7kC8.jpg' 
Enter passphrase: 
wrote extracted data to "password.txt".
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Madness]
└─$ cat password.txt 
I didn't think you'd find me! Congratulations!

Here take my password

*axA&GF8dP

                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Madness]
└─$ echo "*axA&GF8dP" | rot13
*nkN&TS8qC
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Madness]
└─$ echo "*axA&GF8dP" | base64
KmF4QSZHRjhkUAo=
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Madness]
└─$ ssh joker@*axA&GF8dP              
[1] 20655
ssh: Could not resolve hostname *axa: Name or service not known
[1]  + exit 255   ssh joker@*axA
GF8dP: command not found
                                                                                             
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Madness]
└─$ ssh joker@10.10.227.137
The authenticity of host '10.10.227.137 (10.10.227.137)' can't be established.
ED25519 key fingerprint is SHA256:B0gcnLQ9MrwK4uUZINN4JI6gd+EofSsF2e8c5ZMDrwY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.227.137' (ED25519) to the list of known hosts.
joker@10.10.227.137's password: 
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-170-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage


The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

Last login: Sun Jan  5 18:51:33 2020 from 192.168.244.128
joker@ubuntu:~$ ls
user.txt
joker@ubuntu:~$ cat user.txt
THM{d5781e53b130efe2f94f9b0354a5e4ea}
```