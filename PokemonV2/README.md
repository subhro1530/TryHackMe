#   Tryhackme - Pokemon v2

##  Steps:
1.  At first make a nmap scan and try to evaluate the machine .
2.  Go to the view-source and you will see that there is an ssh login and password given just above the message to go to the console.
3.  Go to the console as specified by the source file.
4.  Login to the ssh service and get the documents
```
grass-type.txt
water-type.txt
fire-type.txt
```

5.  We need to update privileges to the root to get the last flag.
6.  Final flag to go to the ash folder, a new user.
7.  Login to ssh after gettiing the ssh login and password.