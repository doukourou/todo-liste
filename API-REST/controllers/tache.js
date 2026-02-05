// on vas importer notre schema de model des taches 
// const tache = require('../models/tache')
const tache = require('../models/tache')
const Tache = require('../models/tache')

// on vas creer une fonction que l'on vas exporter pour ajouter des taches a notre base 
exports.Ajout= (req,res,next)=>{
    // on vas creer une nouvell instance de tache a l'arriver de la requette 
    // pas besoin de rajouter l'id car mongodb vas en creer une au moment de l'enregistrement 
    console.log(req.body)
    const tache = new Tache({
        // ...req.body //avec ceci plus la peine de creer manuellement les champs 
        Nom: req.body.Nom, //la je recupere le nom pour l'enregistrement 
        Description: req.body.Description, //ici je recupere la description pour l'enregistrement 
        userId: req.auth.userId //a ce niveau je recupere l'id de l'utilisteur pour effectuer l'enregistrement on le recupere dans l'objet crerr et fourni par notre midlware
        
    })
    console.log(tache)
    // par la suite on vas enregistrer la tache et comme c'est une fonction asynchrone on vas utiliser un .then et un .catch
    tache.save()
        .then(() => res.status(201).json({ message: 'Tache enregistrée !' }))
        .catch(error => res.status(400).json({ error }))
}

// on vas creer un fonction qui vas recuperer les taches en fonctions de l'id de l'utilisateur pour ne pas les melanger 
exports.RecupererTache = (req,res,next)=>{
    // je dois d'abord verifier l'id de l'utilisateur  
    // on vas recuperer l'id contenu dans le token via le midlware 
    const userId = req.auth.userId //la on recupere l'id de l'utilisateur dans l'objet fourni par notre midlware 
    // on vas maintenant chercher toutes les taches qui ont ete enregistrer grace a cet id 
    Tache.find({userId: userId}) //la on place l'id pour la comparaison 
        .then(taches => res.status(200).json(taches)) // la o renvoie les objet retourner par find 
        .catch(error => res.status(404).json({ error }))//la on capture l'erreur pour la retourner 
        
}

// la c'est le controller charger d'enregistrer les modification d'une tache
exports.UpdateTache =(req,res,next)=>{
    //cette route vas etre la meme que celle de l'ajout a la seul difference que on vas recuperer l'id de la tache 
    // recuperons l'id de la tache 
    console.log(req.params.id)
    const tacheId = req.params.id   //est ce que le req du midlware vas contenir la tache de l'id 
    // on vas ensuite chercher la tache concerner grace a son id 
    Tache.findOne({_id: tacheId})  //comme il renvoie un objet on vas utiliser .then et .catch
        .then(tache => { //la on donne le nom de l'objet 
            // on verife si l'objet recuperer n'est pas vide 
            if(!tache){
                // on vas retourner le message disant que cette tache n'as pas ete trouver 
                return res.status(404).json({message: "tache non trouver"})
            }else{
                // on vas passer a la modification 
                Tache.updateOne({_id: tacheId}, {Nom: req.body.Nom, Description: req.body.Description}) //le premier argument prend l'id de la tache pour dire que ce id n'est pas modifiable et les autres argument sont les element que l'on souhaite modifier 
                    .then(() => res.status(200).json({message: "tache modifier"}))
                    .catch(error => res.status(400).json({ error }))
                
                console.log(Tache)
            }
        })
}

// on vas passer a la creation du controleur charger de supprimer une tache
exports.SupprimerTache = (req,res,next)=>{
    // on vas d'aborb recuperer l'id de la tache 
    const tacheId = req.params.id
    // on vas ensuite supprimer la tache grace a son id 
    Tache.deleteOne({_id: tacheId}) // la on recher la tache a supprimer grace a l'id 
        .then(() => res.status(200).json({message: "tache supprimer"}))
        .catch(error => res.status(400).json({ error }))
}