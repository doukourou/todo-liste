// on vas importer le controller qui vas s'occuper de la gestion de nos taches
const tacheControlleur = require('../controllers/tache')
// on vas importer express pour creer nos differente route 
const express = require('express')
// on vas appeler la methode de router de express pour la creation de nos route 
const router = express.Router()
// on vas importer le midlware d'authentifications 
const authentification = require('../midlware/auth')

// on vas creer la route pour l'ajout avec le chemin (/ajout)
router.post('/ajout', authentification, tacheControlleur.Ajout) //on peut egalement rajouter le midlware d'authentification pour que chaque utilisateur gere ces tache mais pour le moment je ne vais pas le faire 
// on vas creer la route pour recuperer les taches d'un utilisateur 
router.get('/liste', authentification, tacheControlleur.RecupererTache)
// on vas creer la route pour la modification d'une tache 
router.put('/modifier/:id', authentification, tacheControlleur.UpdateTache)
// on vas creer la route charger de supprimer une tache 
router.delete('/supprimer/:id', authentification, tacheControlleur.SupprimerTache)

// on vas ensuite importer cette route dans le fichier app
module.exports = router