angular.module('loginCtrl', ['authServices'])
    .controller('logCtrl', function($location, Auth, $route) {   
        var app = this;

        app.logUser = function(logData) {
            app.errorMsg = false; // enlever message d'erreur quand utilisateur appuye sur submit
            Auth.login(app.logData)  // démarrer service du factory Auth dans le module authServices
            .then(function(data) { //une fois que service est terminé, prend le data retourné en paramêtre
                if (data.data.success) {  // rediriger vers la page principale en cas de succes
                    console.log('succes');
                    $location.path('/home');
                } else {
                    console.log(data.data.message);
                    app.errorMsg = data.data.message; // Create an error message
                }
            });
        };
    });