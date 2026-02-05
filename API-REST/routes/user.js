// on vas importer le module express
const express = require('express')

// on vas utiliser la methode route fourni par express
const router = express.Router()


// on vas importer le controllers enregistrement pour le user
const userControlleur = require('../controllers/user')
// on vas importer le midleware pour l'authentification
const auth = require('../midlware/auth') //on peut l'utiliser pour securiser nos futur route 

// on vas creer unr route post pour enregistrer le mail et le mot de passe d'un utilisateur 
router.post("/signup",userControlleur.enregistrement)

// maintenant on vas creer une route pour la connection 
router.post('/login',userControlleur.connection)

// on vas exporte la route
module.exports = router