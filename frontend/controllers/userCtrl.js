angular.module('userControllers', ['userServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('regCtrl', function($location, User,$route) {   //add factory User !!!! pour utiliser ce factory du module  userservices
        
        var app = this;
        app.regUser = function(regData) {
            app.errorMsg = false; // enlever message d'erreur quand utilisateur appuye sur submit
            User.create(app.regData)  // démarrer service du factory User dans le module userServices

            .then(function(data) { //une fois que service est terminé, prend le data retourné en paramêtre
                if (data.data.success) {  // rediriger vers la page principale en cas de succes
                    $location.path('/');
                } else {
                    app.errorMsg = data.data.message; // Create an error message
                }
            });
        };
    });