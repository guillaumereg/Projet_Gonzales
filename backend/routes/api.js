var User = require('../models/user');
var Offer = require('../models/offer');
var Evaluation = require('../models/evaluation');

var jwt = require('jsonwebtoken');
var secret = 'valarmorghulis';

// Export routes to the main server.js file
module.exports = function(router) {
    router.post('/profile', function(req, res) { //enregistrer un profil
        if (req.body.username == null || req.body.username == ''
         || req.body.password == null || req.body.password == ''
         || req.body.age == null || req.body.age == ''
         || req.body.phoneNumber == null|| req.body.phoneNumber == ''
         || req.body.country == null || req.body.country == ''
         || req.body.city == null || req.body.city == '') {
            res.json({ success: false, message: 'form is not complete' });
        }
        else {
            var user = new User();
            user.username = req.body.username;
            user.setPassword(req.body.password);
            user.age = req.body.age;
            user.phoneNumber = req.body.phoneNumber;
            user.country = req.body.country;
            user.city = req.body.city;
            user.save(function(err) { //sauver dans la base de données
                if (err) {
                    res.json({ success: false, message: 'Cet identifiant existe déja ou faute de format d entrée' });
                } else {
                    res.json({ success: true, message: 'user created!' }); //utilisateur a été sauvé, renvoyer réponse
                }
            });
        }
    });

    router.post('/getProfile', function(req, res) { //retourne les details d'un profil
        User.findOne({ username: req.body.username})
        .select('username age phoneNumber country city').exec(function(err,user){
            if(err){
                throw err;
            }
            if(!user){
                res.json({success: false, message: 'aucun utilisateur existe avec cet identifiant' });
            }
            else if(user){            //= mot de passe soumis
                res.json({ success: true, message: 'utilisateur trouvé, envoi des infos' , user: user});
            }
        });
    });

     router.post('/changeProfile', function(req, res) { //change les details d'un profil
         if (req.body.age == null || req.body.age == ''
                || req.body.phoneNumber == null|| req.body.phoneNumber == ''
                || req.body.country == null || req.body.country == ''
                || req.body.city == null || req.body.city == '') {
                   res.json({ success: false, message: 'Data Missed' });
         }
         else{
           User.findOne({ username: req.body.username})
           .select().exec(function(err,user){
               if(err){
                   throw err;
               }
               if(!user){
                   res.json({success: false, message: 'aucun utilisateur existe avec cet identifiant' });
               }
               else if(user){            //= mot de passe soumis
                 user.age=req.body.age;
                 user.phoneNumber=req.body.phoneNumber;
                 user.country=req.body.country;
                 user.city=req.body.city;
                 user.save(function(err) { //sauver dans la base de données
                     if (err) {
                         res.json({ success: false, message: 'Format Error' });
                     } else {
                         res.json({ success: true, message: 'user modified!' }); //utilisateur a été sauvé, renvoyer réponse
                     }
                 });
               }
           });
         }
     });


    router.post('/login', function(req, res) { //login d'un utilisateur
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == ''){
            res.json({ success: false, message: 'Form is not completed' });
        }
        else{                                                   //attributs qu'on veut avoir dans variable user
            User.findOne({ username: req.body.username}).select('username hash salt age phoneNumber country city').exec(function(err,user){
                if(err){
                    throw err;
                }
                if(!user){
                    res.json({success: false, message: 'Account does not exist' });
                }
                else if(user){            //= mot de passe soumis
                    if(user.checkPassword(req.body.password)){  //user est connecté
                        var token = jwt.sign({username: user.username, age: user.age,
                                           phoneNumber: user.phoneNumber, country: user.country, city: user.city }, secret, {expiresIn: '1h'});
                        res.json({ success: true, message: 'user loggs in' , token: token});
                    }
                    else{
                        res.json({ success: false, message: 'Wrong password'});
                        }
    }})}});

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


    router.post('/evaluation', function(req, res) { //enregistrer une evaluation
        if (req.body.username == null || req.body.username == ''
         || req.body.eval == null || req.body.eval == ''
         || req.body.commentary == null || req.body.commentary == ''
         || req.body.author == null || req.body.author == '') {
            res.json({ success: false, message: 'Form is not completed' });
        }
        else {
            var evaluation = new Evaluation();
            evaluation.username = req.body.username;
            evaluation.eval = req.body.eval;
            evaluation.commentary= req.body.commentary;
            evaluation.author=req.body.author;
            evaluation.save(function(err) { //sauver dans la base de données
                if (err) {
                    res.json({ success: false, message: 'Format Error' });
                } else {
                    res.json({ success: true, message: 'Evaluation créée!' }); //utilisateur a été sauvé, renvoyer réponse
                }
            });
        }
    });

    router.post('/evaluationByAuthor', function(req, res) {
        Evaluation.find({ author: req.body.author})
        .select('username eval commentary').exec(function(err,evaluations){
            if(err){
                throw err;
            }
            else{
                res.json({ success: true, message: 'evaluation sent back to user' , evaluations: evaluations});
            }
        });
    });

    router.post('/evaluationByUsername', function(req, res) {
        Evaluation.find({ username: req.body.username})
        .select('author eval commentary').exec(function(err,evaluations){
            if(err){
                throw err;
            }
            else{
                res.json({ success: true, message: 'evaluation sent back to user' , evaluations: evaluations});
            }
        });
    });

    router.post('/removeEvaluation', function(req, res) { //envoie liste des offres de louage l'utilisateur
        Evaluation.remove({ _id: req.body.evaluationId})
        .exec(function(err,evaluations){
            if(err){
                res.json({ success: false, message: 'impossible de supprimer cette évaluation' });
            }
            else{
                res.json({ success: true, message: 'évaluation supprimée' });
            }
        });
    });


    router.post('/offer', function(req, res) { //enregistrer une offre de location
        if (req.body.username == null || req.body.username == ''
         || req.body.brand == null || req.body.brand == ''
         || req.body.model == null || req.body.model == ''
         || req.body.price == null|| req.body.price == ''
         || req.body.city == null|| req.body.city == '' ) {
            res.json({ success: false, message: 'Data Missed' });
        }
        else {
            var offer = new Offer();
            offer.username = req.body.username;
            offer.brand = req.body.brand;
            offer.model = req.body.model;
            offer.price = req.body.price;
            offer.city = req.body.city;
            offer.save(function(err) { //sauver dans la base de données
                if (err) {
                    res.json({ success: false, message: 'Format Error' });
                } else {
                    res.json({ success: true, message: 'offre crée!' }); //utilisateur a été sauvé, renvoyer réponse
                }
            });
        }
    });



    router.post('/myOffers', function(req, res) { //envoie liste des offres de location l'utilisateur
        Offer.find({ username: req.body.username})
        .select('brand model price city usernameSelect').exec(function(err,offers){
            if(err){
                throw err;
            }
            else{
                res.json({ success: true, message: 'offer sent back to user' , offers: offers});
            }
        });
    });

    router.post('/yourOffers', function(req, res) { //envoie liste des offres de location l'utilisateur
        Offer.find({ usernameSelect: req.body.usernameSelect})
        .select('username brand model price city').exec(function(err,offers){
            if(err){
                throw err;
            }
            else{
                res.json({ success: true, message: 'offer sent back to user' , offers: offers});
            }
        });
    });


    router.post('/removeOffer', function(req, res) {
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

    router.post('/selectOffer', function(req, res) {
      Offer.findOne({username: req.body.username, brand: req.body.brand, model: req.body.model, price: req.body.price, city: req.body.city}).select()
      .exec(function(err,offer){
          if(err){
              throw err;
          }
          if(!offer){
              res.json({success: false, message: 'offre introuvable' });
          }
          else if(offer){
            if (offer.usernameSelect== null || offer.usernameSelect==""){
              offer.usernameSelect=req.body.usernameSelect;
              offer.save(function(err) { //sauver dans la base de données
                  if (err) {
                      res.json({ success: false, message: 'Faute de format d entrée' });
                  } else {
                      res.json({ success: true, message: 'offre modifiée!' });
                  }
              });
            }
          }
      });
    });

    router.post('/unselectOffer', function(req, res) {
      Offer.findOne({ _id: req.body.offerId}).select()
      .exec(function(err,offers){
          if(err){
              res.json({ success: false, message: 'impossible de supprimer cette offre' });
          }
          else{
              offers.usernameSelect="";
              offers.save(function(err) { //sauver dans la base de données
                  if (err) {
                      res.json({ success: false, message: 'Faute de format d entrée' });
                  } else {
                      res.json({ success: true, message: 'offre modifiée!' });
                  }
              });
          }
      });
    });




    router.post('/searchOffer', function(req, res) { //envoie liste des offres de location d'autres utilisateurs
        console.log(req.body);
        Offer.find(req.body)
        .select('username brand model price city usernameSelect').exec(function(err,offers){
            if(err){
                console.log(err);
                res.json({ success: false, message: 'impossible de chercher des offres' });
            }
            else{
                res.json({ success: true, message: 'existing offers sent to user' , offers: offers});
            }
        });
    });


    return router; // Retourne le router vers le serveur
}
