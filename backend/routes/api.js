var User = require('../models/user'); // Important the database User Model created with Mongoose Schema
var jwt = require('jsonwebtoken');
var secret = 'valarmorghulis';
// Export routes to the main server.js file
module.exports = function(router) {
    router.post('/profile', function(req, res) { //enregistrer un profil
        var user = new User(); 
        user.username = req.body.username; 
        user.password = req.body.password;
        user.age = req.body.age;
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '') {
            res.json({ success: false, message: 'Identifiant et/ou mot de passe doivent être spécifiés' });
        } else {
            user.save(function(err) { //sauver dans la base de données
                if (err) {
                    res.json({ success: false, message: 'Cet identifiant existe déja / age doit être un nombre' });
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
            User.findOne({ username: req.body.username}).select('username age password').exec(function(err,user){
                if(err){
                    throw err;
                }
                if(!user){
                    res.json({success: false, message: 'authentication impossible' });
                }
                else if(user){            //= mot de passe soumis
                    if(user.checkPassword(req.body.password)){  //user est connecté
                        var token = jwt.sign({username: user.username, age: user.age, password: user.password}, secret, {expiresIn: '1h'});
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
                    req.decoded = decoded;    //maintenant accessible dans req de /profil
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
        //res.send('blabla');
    });

    return router; // Retourne le router vers le serveur
}

