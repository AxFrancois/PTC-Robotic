# Liste des commandes et des informations à transmettre entre le robot et l'IHM

## Règles générales et syntaxe

- Toutes les commandes utiliserons la syntaxe suivante : `commande\r\n`
- La taille maximale d'une commande sera de **25 caractères maximum, `\r\n` compris**

## Transmissions depuis l'IHM vers le robot

### Contrôle des moteurs

1. Arret/stop

La commande d'arret du robot sera : `stop\r\n`

2. Roue droite 

>**moteur 1 ou 2 ? à vérifier !**
La commande de la roue droite du robot sera : `droite\r\n`

3. Roue gauche

> **Idem**
La commande de la roue gauche du robot sera : `gauche\r\n`

4. Marche avant

La commande de la marche avant sera : `avant\r\n`

5. Marche arrière

La commande de la marche arrière sera : `arriere\r\n`

### Transmission du chemin

La transmission du chemin se fera sous ce format : `gffd\r\n` où 
 - g représente un virage à gauche
 - d représente un virage à droite
 - f représente aller en face
 Par exemple, le chamin gfffd désigne :
 1. Au prochain croisement, tourner à gauche,
 2. Dans 2 croisement, en face
 3. Dans 3 croisement, en face
 4. Au dernier croisement, tourner à droite.
 
### Contrôle de la pince
TO DO

### Autres fonctions/fonctions de test

1. Activation haut parleur:

Lorsque l'on veut activer le haut parleur, on transmet `haut parleur @\r\n` où @ représente un temps en seconde pendant lequel le robot émet le bruit.

2. Gyrophare
TO DO

## Transmissions depuis le robot vers l'IHM

1. Detection d'obstacle

La commande de détection d'obstacle sera `obstacle @\r\n` où @ sera la distance de l'obstacle (en cm ?). 
Pas de communication si rien n'est détecté.

2. Notification de scan de QR Code

Lorsque le robot scanne un QR Code, il transmet `QR @\r\n` où @ sera la donnée contenue par le QR Code.

3. Notification de scan de Code Barre

Lorsque le robot scanne un Code Barre, il transmet `Barre @\r\n` où @ sera la donnée contenue par le Code Barre.

4. Transmission de position

TO DO

5. Notification de sortie de ligne

Lorsque le robot quitte la ligne (par exemple pour poser un objet ou éviter un obstacle), il transmet `sortie\r\n`

5. Notification d'anomalie

Lorsque le robot consate une anomalie, il transmet `erreur @\r\n`, où @ représente un code d'erreur parmis
	- 100 : blocage
	- 200 : surconsommation
	- 300 : perdu (le robot est sorti de la ligne et ne la retrouve pas)
	




