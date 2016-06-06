DROP TABLE IF EXISTS prets;

CREATE TABLE prets (
  pret_id SERIAL NOT NULL PRIMARY KEY,
  pret_quoi VARCHAR(255) NOT NULL,
  pret_qui VARCHAR(255) NOT NULL,
  pret_etat INT NOT NULL
);

INSERT INTO prets(pret_quoi, pret_qui, pret_etat) VALUES('Cable DVI', 'Jean-Patate', 0);
INSERT INTO prets(pret_quoi, pret_qui, pret_etat) VALUES('Cable HDMI', 'Jean-Moustache', 1);
INSERT INTO prets(pret_quoi, pret_qui, pret_etat) VALUES('Cable DisplayPort', 'Jean-Rémi', 0);
INSERT INTO prets(pret_quoi, pret_qui, pret_etat) VALUES('Cable VGA', 'Jean-Tomate', 2);
