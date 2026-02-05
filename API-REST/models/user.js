// on vas importer le module mongoose pour creer le schema 
const mongoose = require('mongoose')
// on vas importer mongoose unique validator
const uniqueValidator = require('mongoose-unique-validator')

// on vas passer a la creation du schema 
const userShema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, //la on donne le type on precise que le champ est requis et qu'il est unique 
    password:{type:String, required: true} //la on donne le type et on precise qu'il est requis 
})

// pour faire en sorte que un utilisateur possede un seul compt avec un seul email on vas install un module de mongoose
// ce module s'appel mongoose-unique-validator
// apres avoir installer le module on vas l'appliquer avc la methode plugin au schema avant de l'exporter 
userShema.plugin(uniqueValidator)

// ensuite on l'exporte
module.exports = mongoose.model('User',userShema)

