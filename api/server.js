const express = require("express");
const app = express();
app.use(express.json());


let jeux = [
  { id: 1, nom: "Aatrox", categorie: "bruiser" },
  { id: 2, nom: "Ahri", categorie: "mage" },
  { id: 3, nom: "Akali", categorie: "assassin/mage" }
];

app.get("/jeux", (req, res) => {
  res.json(jeux);
});



// Route de test : GET /
app.get("/", (req, res) => {
  res.json({ message: "Mon API fonctionne" });
});

// On demarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});


// GET /produits/2 -> renvoie le produit dont l id vaut 2
app.get("/jeux/:id", (req, res) => {
  const id = Number(req.params.id);            // ":id" arrive en texte -> on convertit
  const jeu = jeux.find((p) => p.id === id);
  if (!jeu) {                              // rien trouve
    return res.status(404).json({ erreur: "jeu introuvable" });
  }
  res.json(jeu);
});

// POST /produits -> ajoute un produit envoye dans le corps de la requete
app.post("/jeux", (req, res) => {
  if (!req.body.nom) {                          // donnee obligatoire manquante
    return res.status(400).json({ erreur: "Le nom est obligatoire" });
  }
  const nouveau = {
    id: jeux.length + 1,
    nom: req.body.nom,
    prix: req.body.prix
  };
  jeux.push(nouveau);                       // on ajoute au tableau
  res.status(201).json(nouveau);                // 201 = cree
});


// DELETE /produits/2 -> supprime le produit n 2
app.delete("/jeux/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = jeux.findIndex((p) => p.id === id);
  if (index === -1) {                           // -1 = pas trouve
    return res.status(404).json({ erreur: "jeu introuvable" });
  }
  jeux.splice(index, 1);                    // retire 1 element a cette position
  res.status(200).json({ message: "jeu supprime" });
});