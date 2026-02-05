// on vas placer au midlware qui vas etre placer sur toute nos route afin de verifier si l'utilisateur est authentifié et authoriser a poser une action 
// par exemple un utilisateur ne pourra pas modifer les element d'un autre utilisateur car il n'est pas autoriser et son id est different de celui de l'autre utilisateur 
// pour commencer je vais importer le module jsonwebtoken 
const jwt =require('jsonwebtoken')

// ensuite on vas creer un module exportable afin de l'appliquer sur nos futur route 
module.exports = (req,res, next)=>{
    // comme beauceaup d'erreur peuvent se produire au moment de l'authentification on vas les mettre a l'interieur d'un try et d'un catch 
    try{
        // On vas recuperer le token contenu dans la requette 
        const token = req.headers.authorization.split(' ')[1] //la on le recuperer et on le place dans un tableau pour mieux le traiter 
        // ensuite on va sdevoir le decoder 
        // pour se faire on vas utiliser la methode verify de jwt
        const decodeToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN') //la methode verify prend en argument le token recuperer dans la requette puis le mot secret qui peut etre generer aleatoirement 
        // on vas ensuite recuperer l'id dans le token decoder 
        const userId = decodeToken.userId
        // on vas ensuite creer un objet qui vas contenir l'id de l'utilisateur  pour qu'il soit utiliser par notre gestionnaire de route 
        req.auth={
            userId: userId
        }
        // on termine par la fonction next 
        next()

    }catch(error){
        res.status(500).json({error})
    }
}
