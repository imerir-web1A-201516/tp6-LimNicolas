DROP TABLE IF EXISTS prets;

CREATE TABLE prets (
  pret_id SERIAL NOT NULL PRIMARY KEY,
  pret_quoi VARCHAR(64) NOT NULL,
  pret_qui VARCHAR(64) NOT NULL,
  pret_etat VARCHAR(16) NOT NULL
);

INSERT INTO prets(pret_quoi, pret_qui, pret_etat) VALUES('Cable DVI', 'Jean-Patate', 'prete');
INSERT INTO prets(pret_quoi, pret_qui, pret_etat) VALUES('Cable HDMI', 'Jean-Moustache', 'rendu');
INSERT INTO prets(pret_quoi, pret_qui, pret_etat) VALUES('Cable DisplayPort', 'Jean-Rémi', 'rendu');
INSERT INTO prets(pret_quoi, pret_qui, pret_etat) VALUES('Cable VGA', 'Jean-Tomate', 'annule');
