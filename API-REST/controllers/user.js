// je vais importer mongoose vue que je veux connecter mon model de shema a mon cluster 
const mongoose = require('mongoose')
// je vais importer bcrypt 
const bcrypt = require('bcrypt')
// on vas importer jsonwebtoken
const jwt = require('jsonwebtoken')
// on vas importer le model de schema
const User = require('../models/user')

// dans le controller on vas enregistrer la logique metier 
// on vas exporter la fonctin enregistrement charger de la connection 

exports.enregistrement = (req,res,next)=>{
    // on vas creer un model de doné avec mongoose pour enregister les données recu 
    // apres avoir cree le model on vas maintenant creer des instance de donnée a chaque requette post recu 
    // avec ...req.body on as plus besoin de creer manuellement chaque champ on lui donne seulement le corp de la requette 
    // on a egalement pas besoin de mettre d'id car la requette en contient deja une 
    const user = new User({
        ...req.body
    })
    console.log(user)
    // avant de pouvoir enregistrer les elment recu on vas d'abord hasher le mot de passe 
    // pour ce faire on vas utiliser bcrypt
    // avec la methode hash
    bcrypt.hash(user.password, 10) //ici on  fait tourner le hash 1à fois pour plus de securiter 
        .then(hash => {   // la on recupere le hash 
            user.password = hash; //la on remplace le password par le hash 
            // on vas sauvegarder cette instance 
            // la sauvegarde est une fonction asynchrone donc on vas utiliser un .then et un .catch
            user.save()
                .then(()=> res.status(201).json({message: 'utilisateur crée'}))
                .catch(error => res.status(400).json({error}))

        })
}


exports.connection = (req,res,next)=>{
    // on vas chercher dans la base de donnée l'email correspondant a celui dans la requette 
    // on vas le faire avec la methode findOne quii est un fonction asynchrone donc qui necessite un .then et un .catch
    User.findOne({ email: req.body.email})
        .then(user =>{ //la on recuperere l'oobjet donner par la methode findone 
            // on vas verifier si il existe belle et bien dans la base 
            if (user === null){
                res.status(401).json({message:"email ou mot de passe incorecte"})
            }else{
                // si il existe bien on vas le comparer les mot de passe maintenant 
                // pour la comparaison on vas utiliser la methode compare de bcrypt
                bcrypt.compare(req.body.password, user.password)
                    .then(valid =>{
                        // si il n'est pas valide on renvoie un message d'erreur 
                        if (!valid){
                            res.status(401).json({message:"email ou mot de passe incorrecte"})
                        }else{
                            // si il est valide on vas envoyer l'id de l'utilisateur puis envoyer un token
                            res.status(200).json({
                                userId: user._id,
                                // pour envoyer un token on aura besoin de l'encoder
                                // pour ce faire on vas le installer le module jsonwebtoken
                                // on vas l'encoder de maniere personaliser grace a la methode sign de jwt  
                                token: jwt.sign(
                                    {userId: user._id},//la on rajoute l'id de l'utilisateur pour qu'il soit encoder
                                    'RANDOM_SECRET_TOKEN', //on rajoute egalement un token qui peut etre generer aleatoirement 
                                    { expiresIn: '24h' } //on ajoute l'expiration de ce token 
                                    //tout ce ci vas etre coller a toute les requette vont etre faite car le serveur vas fournir ce token on front qui vas les collés directement a toutes ces requettes
                                    // maintenant on vas creer un midleware qui vas s'occuper de gerer le decodage et l'authentification 
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({error}))
            }
        })
        .catch(error => res.status(500).json({error}))
}