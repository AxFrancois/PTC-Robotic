# -*- coding: utf-8 -*-
"""
Created on Thu Mar 24 10:47:20 2022

@author: Axel François
"""

import re

CommandList = []
IHMCommandList = []
RobotCommandList = []
FirstPart = True

with open('Documentation commandes.md', 'r') as f:
    lines = f.readlines()
    #print(lines)
    for line in lines:
        x = re.findall("[a-zA-Z0-9 @]+\\\\r\\\\n",line)
        if len(x) != 0 and x != ['commande\\r\\n']:
            CommandList.append(x[0])
            if FirstPart == True:
                IHMCommandList.append(x[0])
            else:
                RobotCommandList.append(x[0])
        if "vers l'IHM" in line:
            FirstPart = False

f.close()
#print(CommandList)


# Génération list des commandes
with open('Liste Commandes.txt', 'w') as f:
    f.write('\n'.join(CommandList))
f.close()



# Génération du code en C pour STM32
"""
if (strcmp(string, "B1") == 0) 
{
  // do something
} 
else if (strcmp(string, "xxx") == 0)
{
  // do something else
}
/* more else if clauses */
else /* default: */
{
}
"""

FirstLine = True
with open('API.c', 'w') as f:
    f.write("char* API(char* string){\n")
    for element in IHMCommandList:
        if FirstLine == True:
            f.write("   if (strcmp(string, \"{0}\") == 0) \n".format(element))
            f.write("   {\n")
            f.write("       // do something\n")
            f.write("   }\n")
            FirstLine = False
        else:
            f.write("   else if (strcmp(string, \"{0}\") == 0) \n".format(element))
            f.write("   {\n")
            f.write("       // do something\n")
            f.write("   }\n")
    f.write("   else {\n")
    f.write("       // error case\n")
    f.write("   }\n")
    f.write("return;\n")
    f.write("};Z")
f.close()
with open('API.h', 'w') as f:
    f.write("char* API(char* string);\n")
f.close()


# Génération du code en JS pour IHM
"""
switch (expression) {
  case valeur1:
    // Instructions à exécuter lorsque le résultat
    // de l'expression correspond à valeur1
    instructions1;
    [break;]
  ...
  case valeurN:
    // Instructions à exécuter lorsque le résultat
    // de l'expression à valeurN
    instructionsN;
    [break;]
  default:
    // Instructions à exécuter lorsqu'aucune des valeurs
    // ne correspond
    instructions_def;
    [break;]
}

function calcRectArea(width, height) {
  return width * height;
}

console.log(calcRectArea(5, 6));
// expected output: 30
"""
with open('API.js', 'w') as f:
    f.write("function API(message) {\n")
    f.write("    switch(message) {\n")
    for element in RobotCommandList:
        f.write("       case \"{}\":\n".format(element))
        f.write("           // do somthing\n")
        f.write("           break;\n")
    f.write("       default:\n")
    f.write("           // error case\n")
    f.write("           break;\n")
    f.write("   };\n")
    f.write("};")
f.close()