const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); 
const app = express();
const cors = require('cors');


// Configuration de la connexion à la base de données
const dbConfig = {
    host: '192.168.65.243',
    user: 'userWeb', // Remplacez par votre nom d'utilisateur
    password: 'userWeb1234', // Remplacez par votre mot de passe
    database: 'localisation'
};

// Création d'une connexion à la base de données
const conn = mysql.createConnection(dbConfig);

// Middleware pour permettre les requêtes POST avec bodyParser
app.use(bodyParser.json());
app.use(cors());


// Endpoint pour ajouter une localisation à la base de données
app.post('/ajouterlocalisation', (req, res) => {
    const { ville } = req.body;

    const sql = `INSERT INTO localisations (ville) VALUES (?)`;
    conn.query(sql, [ville], (err, result) => {
        if (err) {
            console.error('Erreur:', err);
            res.status(500).json({ message: 'Erreur interne du serveur.' });
            return;
        }

        console.log('localisation ajoutée avec succès:', result);
        res.status(200).json({ message: 'localisation ajoutée avec succès.' });
    });
});

// Démarrage du serveur sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});