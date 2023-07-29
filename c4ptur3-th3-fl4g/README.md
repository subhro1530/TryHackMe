#   Tryhackme - c4ptur3-th3-fl4g
##  Walkthrough by:
```
Shaswata Saha
06-07-23
10:45PM
```

##  Steps followed:

1.  The first flag is absolutely clear.

2.  To find the next flag convert the binary text to decimal using tools such as CyberChef.
We found the encrypted binary code..
```bash
01101100 01100101 01110100 01110011 00100000 01110100 01110010 01111001 00100000 01110011 01101111 01101101 01100101 00100000 01100010 01101001 01101110 01100001 01110010 01111001 00100000 01101111 01110101 01110100 00100001

lets try some binary out!
```

3.  Next one:(b32)
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ echo 'MJQXGZJTGIQGS4ZAON2XAZLSEBRW63LNN5XCA2LOEBBVIRRHOM======' | base32 -d

base32 is super common in CTF's   
```

4.  Next one: (b64)
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ hash=RWFjaCBCYXNlNjQgZGlnaXQgcmVwcmVzZW50cyBleGFjdGx5IDYgYml0cyBvZiBkYXRhLg==

                                                                                             
┌──(subhro1530㉿subhro)-[~]
└─$ echo $hash                                                                 
RWFjaCBCYXNlNjQgZGlnaXQgcmVwcmVzZW50cyBleGFjdGx5IDYgYml0cyBvZiBkYXRhLg==
                                                                                             
┌──(subhro1530㉿subhro)-[~]
└─$ echo $hash | base64 -d
Each Base64 digit represents exactly 6 bits of data.

```

5.  Next one : (hex)
```bash
┌──(subhro1530㉿subhro)-[~]
└─$ hash='68 65 78 61 64 65 63 69 6d 61 6c 20 6f 72 20 62 61 73 65 31 36 3f'

                                                                                             
┌──(subhro1530㉿subhro)-[~]
└─$ echo $hash | xxd -r -p
hexadecimal or base16?    
```

6.  rot13 -- decoder online
7.  rot47 -- decoder online

8.      
