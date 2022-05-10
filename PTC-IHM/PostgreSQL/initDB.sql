-- Suppression des tables

drop table if exists ARTICLE cascade;
drop table if exists COMMANDE cascade;
drop table if exists RAYON cascade;

-- Génération des tables

/*==============================================================*/
/* Table : ARTICLE                                              */
/*==============================================================*/
create table ARTICLE  (
	ID_ARTICLE	INTEGER	not null,
	NOM		VARCHAR(250)	not null,
	CODE		CHAR(8)	not null,
	RAYON		INTEGER	not null,
	constraint ID_ARTICLE_PK primary key (ID_ARTICLE)
);

/*==============================================================*/
/* Table : COMMANDE                                             */
/*==============================================================*/
create table COMMANDE  (
	ID_COMMANDE	INTEGER	not null,
	COMMANDE	VARCHAR(25)	not null,
	DESCRIPTION	VARCHAR(250)	not null,
	constraint ID_COMMANDE_PK primary key (ID_COMMANDE)
);

/*==============================================================*/
/* Table : RAYON                                                */
/*==============================================================*/
create table RAYON  (
	ID_RAYON	INTEGER	not null,
	LABEL		VARCHAR(100)	not null,
	VALEUR		CHAR(8)	not null,
	constraint ID_RAYON_PK primary key (ID_RAYON)
);

-- suppression des séquences
Drop sequence if exists ARTICLE_SEQ;
Drop sequence if exists COMMANDE_SEQ;
Drop sequence if exists RAYON_SEQ;


-- génération des séquences
Create sequence ARTICLE_SEQ OWNED BY article.id_article;
Create sequence COMMANDE_SEQ OWNED BY commande.id_commande;
Create sequence RAYON_SEQ OWNED BY rayon.id_rayon;


-- Init insert
INSERT INTO COMMANDE (ID_COMMANDE, COMMANDE, DESCRIPTION) VALUES
	(Nextval('COMMANDE_SEQ'), 'stop', 'arrêter tout processus en rapport avec le déplacement du robot');
INSERT INTO COMMANDE (ID_COMMANDE, COMMANDE, DESCRIPTION) VALUES
	(Nextval('COMMANDE_SEQ'), 'avancer', 'rouler en avant');
INSERT INTO COMMANDE (ID_COMMANDE, COMMANDE, DESCRIPTION) VALUES
	(Nextval('COMMANDE_SEQ'), 'arriere', 'rouler en arriere');
INSERT INTO COMMANDE (ID_COMMANDE, COMMANDE, DESCRIPTION) VALUES
	(Nextval('COMMANDE_SEQ'), 'droite', 'tourner vers la droite');
INSERT INTO COMMANDE (ID_COMMANDE, COMMANDE, DESCRIPTION) VALUES
	(Nextval('COMMANDE_SEQ'), 'gauche', 'tourner vers la gauche');
INSERT INTO COMMANDE (ID_COMMANDE, COMMANDE, DESCRIPTION) VALUES
	(Nextval('COMMANDE_SEQ'), 'rayon @', 'envoie la valeur du QRcode du rayon @');



