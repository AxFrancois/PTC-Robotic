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
    # print(lines)
    for line in lines:
        x = re.findall("`[a-zA-Z0-9 @]+`", line)
        if len(x) != 0 and x != ['`commande`']:
            x = re.findall("[a-zA-Z0-9 @]+", x[0])
            if x != ['commande']:
                CommandList.append(x[0])
                if FirstPart == True:
                    IHMCommandList.append(x[0])
                else:
                    RobotCommandList.append(x[0])
        if "vers l'IHM" in line:
            FirstPart = False

f.close()
# print(CommandList)


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
functionNameList = []
with open('API.c', 'w') as f:
    f.write("#include <stdio.h>\n")
    f.write("#include <string.h>\n\n")
    # source : https://stackoverflow.com/questions/26620388/c-substrings-c-string-slicing
    stolenfunction = """void slice_str(const char * str, char * buffer, size_t start, size_t end)
{
    size_t j = 0;
    for ( size_t i = start; i <= end; ++i ) {
        buffer[j++] = str[i];
    }
    buffer[j] = 0;
}\n
"""
    f.write(stolenfunction)
    f.write("void API(char* string){\n")
    openbracket = "   {\n"
    closingbracket = "   }\n"
    for element in IHMCommandList:
        x = re.findall("[a-zA-Z0-9@]+", element)
        if '@' not in x:
            functionName = "void function" + element + "();"
        else:
            functionName = "void function" + x[0] + "(char *param);"
        functionNameList.append(functionName)
        if FirstLine == True:
            f.write("   ")
            FirstLine = False
        else:
            f.write("   else ")
        if '@' not in x:
            f.write("if (strcmp(string, \"{0}\") == 0) \n".format(x[0]))
        else:
            f.write("if (strncmp(string, \"{0}\", {1}) == 0) \n".format(
                element, len(x[0])))
        f.write(openbracket)
        if '@' in x:
            f.write("       char param[20];\n")
            f.write(
                "       slice_str(string, param, {0}, strlen(string));\n".format(len(x[0])+2))
        f.write("       "+functionName+"\n")
        f.write(closingbracket)
    f.write("   else\n")
    f.write(openbracket)
    f.write("       // error case\n")
    f.write(closingbracket)
    f.write("};")
f.close()

with open('API.h', 'w') as f:
    f.write("char* API(char* string);\n")
    for name in functionNameList:
        f.write(name+'\n')
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
FirstLine = True
with open('API.js', 'w') as f:
    f.write("function API(message) {\n")
    for element in RobotCommandList:
        x = re.findall("[a-zA-Z0-9@]+", element)
        if FirstLine == True:
            f.write("   ")
            FirstLine = False
        else:
            f.write("   else ")
        f.write("if (message.indexOf(\"{}\") > -1)".format(x[0]))
        f.write("{\n")
        if '@' not in x:
            f.write("       fct"+x[0]+"();\n")
        else:
            f.write(
                "       let param = message.substring({});\n".format(len(x[0])+1))
            f.write("       fct"+x[0]+"(param);\n")
        f.write("   }\n")
    f.write("}")
f.close()
