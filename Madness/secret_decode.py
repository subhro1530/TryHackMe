#!/usr/bin/env python3

import requests

host = '10.10.227.137'
url = 'http://{}/th1s_1s_h1dd3n/?secret={}'

for i in range(100):
	#print("Current: {}".i)
    r = requests.get(url.format(host, i))
    if not 'That is wrong!' in r.text:
        print("Found secret: {}".format(i))
        print(r.text)