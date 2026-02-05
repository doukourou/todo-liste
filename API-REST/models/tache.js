// on vas importer le modulr mongoose
const mongoose = require('mongoose')

// on vas passer a la creation du schema de donné
const tacheSchema = mongoose.Schema({
    Nom:{type:String, required:true},
    Description:{type:String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required:true}  //la je rajoute un champ pour sauvegarder l'id de lutilisateur a chaque fois qu'il vas enregistrer une nouvel tache pour ce faire j'utilise cette ligne avec type: mongoose.Schema.Types.ObjectId, et je mais la reference ref: 'User'
})

// on vas maintenant exporter ce model afin qu'il soit accessible depuis tout le backend
module.exports = mongoose.model("Tache", tacheSchema)