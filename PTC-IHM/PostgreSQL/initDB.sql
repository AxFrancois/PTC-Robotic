-- Suppression des tables

drop table if exists COMMANDE cascade;
drop table if exists CONFIGURATION cascade;

-- Génération des tables

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
/* Table : CONFIGURATION                                             */
/*==============================================================*/
create table COMMANDE  (
	ID_CONFIGURATION	INTEGER	not null,
	LABEL			VARCHAR(25)	not null,
	DESCRIPTION		VARCHAR(250)	not null,
	VALEUR			INTEGER	not null,
	constraint ID_CONFIGURATION_PK primary key (ID_CONFIGURATION)
);


-- suppression des séquences
Drop sequence if exists COMMANDE_SEQ;
Drop sequence if exists CONFIGURATION_SEQ;


-- génération des séquences
Create sequence COMMANDE_SEQ OWNED BY commande.id_commande;
Create sequence CONFIGURATION_SEQ OWNED BY configuration.id_configuration;


-- Init insert
INSERT INTO COMMANDE (ID_COMMANDE, COMMANDE, DESCRIPTION) VALUES
	(Nextval('ID_COMMANDE'), 'avancer', 'fait rouler le robot en avant.');
