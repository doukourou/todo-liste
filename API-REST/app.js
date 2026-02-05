// on importe express
const express = require('express')
const app = express()
// on vas importer notre route
const userRoute= require('./routes/user')
// je vais importer notre route pour gerer les taches 
const tacheRoutes = require('./routes/tache')
// on vas appeler la dependance qui gere les erreur cors 
const cors = require('cors')

const mongoose = require('mongoose')
app.get('/',(req,res,next)=>{
    res.send("hello c'est le serveur")

})

// on vas appliquer la dependance cors 
app.use(cors())
// // on vas ajouter le midlware qui permette de traiter toute les requette dont le corp contient du json 
app.use(express.json())

// ON VAS AJOUTER le midlware pour connecter notre modle de shema a notre cluster 
const { MongoClient, ServerApiVersion } = require('mongodb');
const user = require('./models/user')
const uri = "mongodb+srv://doukourou:doukourou@cedric-cluster.ojg2pih.mongodb.net/?appName=cedric-cluster";
// j'ai rencontrer des soucis de connection a mongodb  car j'ouvrait un connecxion puis la refermais avant meme qu'il y ait un enregistrement 

mongoose.connect(uri)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(error => console.error("Erreur de connexion:", error));


// on vas ajouter egalement le midlware qui permet de regler le probleme de CORS 
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*"); //ici on dit que tout les monde peut y accerder avec l'etoile 
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS"); // ici on precise les mthode accepter 
//     next();
// });
// on cree le chemain permettant de s'incrire ou soit de se connecter 
app.use("/api/user", userRoute)

// je vais creer le chemain permettant de gerer les taches  
app.use('/api/tache', tacheRoutes)
// ici on vas exporter le module app
module.exports = app