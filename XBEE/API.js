function API(message) {
   if (message.indexOf("obstacle") > -1){
       var param = message.substring(9);
       fctobstacle(param);
   }
   else if (message.indexOf("QR") > -1){
       var param = message.substring(3);
       fctQR(param);
   }
   else if (message.indexOf("Barre") > -1){
       var param = message.substring(6);
       fctBarre(param);
   }
   else if (message.indexOf("sortie") > -1){
       fctsortie();
   }
   else if (message.indexOf("erreur") > -1){
       var param = message.substring(7);
       fcterreur(param);
   }
};