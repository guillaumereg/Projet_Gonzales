var User = require('../models/user');
var Offer = require('../models/offer');

var jwt = require('jsonwebtoken');
var secret = 'valarmorghulis';

// Export routes to the main server.js file
module.exports = function(router) {
    router.post('/profile', function(req, res) { //enregistrer un profil
        var user = new User(); 
        user.username = req.body.username; 
        user.password = req.body.password;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        user.country = req.body.country;
        user.city = req.body.city;
        if (req.body.username == null || req.body.username == '' 
         || req.body.password == null || req.body.password == '' 
         || req.body.age == null || req.body.age == '' 
         || req.body.phoneNumber == null|| req.body.phoneNumber == '' 
         || req.body.country == null || req.body.country == '' 
         || req.body.city == null || req.body.city == '') {
            res.json({ success: false, message: 'données ne sont pas complètes' });
        } 
        else {
            user.save(function(err) { //sauver dans la base de données
                if (err) {
                    res.json({ success: false, message: 'Cet identifiant existe déja ou faute de format d entrée' });
                } else {
                    res.json({ success: true, message: 'user created!' }); //utilisateur a été sauvé, renvoyer réponse
                }
            });
        }
    });

    router.post('/login', function(req, res) { //login d'un utilisateur
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == ''){
            res.json({ success: false, message: 'Identifiant et/ou mot de passe doivent être spécifiés' });
        }
        else{                                                   //attributs qu'on veut avoir dans variable user
            User.findOne({ username: req.body.username}).select('username password age phoneNumber country city').exec(function(err,user){
                if(err){
                    throw err;
                }
                if(!user){
                    res.json({success: false, message: 'authentication impossible' });
                }
                else if(user){            //= mot de passe soumis
                    if(user.checkPassword(req.body.password)){  //user est connecté
                        var token = jwt.sign({username: user.username, password: user.password, age: user.age, 
                                           phoneNumber: user.phoneNumber, country: user.country, city: user.city }, secret, {expiresIn: '1h'});
                        res.json({ success: true, message: 'user loggs in' , token: token});
                    }
                    else{
                        res.json({ success: false, message: 'wrong password' });
                    }
                }
            });
        }
    });

    router.use(function(req, res, next){ //middleware pour /getInfo
        var token = req.body.token || req.body.query || req.headers['x-access-token']; //récuperer le token de la requete
        if(token){ //si il y a un token
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({ success: false, message: 'token non valide' });
                }
                else{
                    req.decoded = decoded;    //maintenant accessible dans req de /getInfo
                    next(); // prochain route
                }
            });
        }
        else{
            res.json({ success: false, message: 'pas de token présent' });
        }
    });

    router.post('/getInfo', function(req, res){ //decrypte le token en utilisant middleware et renvoie au client
        res.send(req.decoded);
    });

    router.post('/offer', function(req, res) { //enregistrer une offre de louage
        var offer = new Offer(); 
        offer.username = req.body.username; 
        offer.brand = req.body.brand;
        offer.model = req.body.model;
        offer.price = req.body.price;
        if (req.body.username == null || req.body.username == '' 
         || req.body.brand == null || req.body.brand == '' 
         || req.body.model == null || req.body.model == '' 
         || req.body.price == null|| req.body.price == '' ) {
            res.json({ success: false, message: 'données ne sont pas complètes' });
        } 
        else {
            offer.save(function(err) { //sauver dans la base de données
                if (err) {
                    res.json({ success: false, message: 'Faute de format d entrée' });
                } else {
                    res.json({ success: true, message: 'offre crée!' }); //utilisateur a été sauvé, renvoyer réponse
                }
            });
        }
    });

    router.post('/myOffers', function(req, res) { //envoie liste des offres de louage l'utilisateur
        Offer.find({ username: req.body.username})
        .select('brand model price').exec(function(err,offers){
            if(err){
                throw err;
            }
            else{
                res.json({ success: true, message: 'offer sent back to user' , offers: offers});
            }
        });
    });


    router.post('/removeOffer', function(req, res) { //envoie liste des offres de louage l'utilisateur
        Offer.remove({ _id: req.body.offerId})
        .exec(function(err,offers){
            if(err){
                res.json({ success: false, message: 'impossible de supprimer cette offre' });
            }
            else{
                res.json({ success: true, message: 'offre supprimée' });
            }
        });
    });


    return router; // Retourne le router vers le serveur
}

