var User = require('../models/user'); // Important the database User Model created with Mongoose Schema

// Export routes to the main server.js file
module.exports = function(router) {
    router.post('/users', function(req, res) { //enregistrer un profil
        var user = new User(); 
        user.username = req.body.username; 
        user.password = req.body.password;
        user.age = req.body.age;
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '') {
            res.json({ success: false, message: 'Identifiant et/ou mot de passe doivent être spécifiés' });
        } else {
            user.save(function(err) { //sauver dans la base de données
                if (err) {
                    res.json({ success: false, message: 'Cet identifiant existe déja, veuillez en choisir un autre' });
                } else {
                    res.json({ success: true, message: 'user created!' }); //utilisateur a été sauvé, renvoyer réponse
                }
            });
        }
    });

    router.post('/authenticate', function(req, res) { //User login route
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == ''){
            res.json({ success: false, message: 'Identifiant et/ou mot de passe doivent être spécifiés' });
        }
        else{
            User.findOne({ username: req.body.username}).select('username password').exec(function(err,user){
                if(err){
                    throw err;
                }
                if(!user){
                    res.json({success: false, message: 'authentication impossible' });
                }
                else if(user){
                    if(user.checkPassword(req.body.password)){  //user est connecté
                        res.json({ success: true, message: 'user is logged in' });
                    }
                    else{
                        res.json({ success: false, message: 'wrong password' });
                    }
                }
            });
        }
    });

    return router; // Retourne le router vers le serveur
}
