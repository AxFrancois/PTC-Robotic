#include <stdio.h>
#include <string.h>

void slice_str(const char * str, char * buffer, size_t start, size_t end)
{
    size_t j = 0;
    for ( size_t i = start; i <= end; ++i ) {
        buffer[j++] = str[i];
    }
    buffer[j] = 0;
}

void API(char* string){
   if (strcmp(string, "stop") == 0) 
   {
       void functionstop();
   }
   else if (strcmp(string, "droite") == 0) 
   {
       void functiondroite();
   }
   else if (strcmp(string, "gauche") == 0) 
   {
       void functiongauche();
   }
   else if (strcmp(string, "avant") == 0) 
   {
       void functionavant();
   }
   else if (strcmp(string, "arriere") == 0) 
   {
       void functionarriere();
   }
   else if (strncmp(string, "trajet @", 6) == 0) 
   {
       char param[20];
       slice_str(string, param, 8, strlen(string));
       void functiontrajet(char *param);
   }
   else if (strncmp(string, "hautparleur @", 11) == 0) 
   {
       char param[20];
       slice_str(string, param, 13, strlen(string));
       void functionhautparleur(char *param);
   }
   else
   {
       // error case
   }
};