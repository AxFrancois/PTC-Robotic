# -*- coding: utf-8 -*-
"""
Created on Thu Mar 24 10:47:20 2022

@author: Axel François
"""

import re

CommandList = []

with open('Documentation commandes.md', 'r') as f:
    lines = f.readlines()
    #print(lines)
    for line in lines:
        x = re.findall("[a-zA-Z0-9]+\\\\r\\\\n",line)
        if len(x) != 0 and x != ['commande\\r\\n']:
            CommandList.append(x[0])
f.close()
#print(CommandList)
with open('Liste Commandes.txt', 'w') as f:
    f.write('\n'.join(CommandList))
f.close()
