angular.module('loginCtrl', ['authServices'])
    .controller('logCtrl', function($location, Auth, $route, $rootScope) {   
        var app = this;

        $rootScope.$on('$routeChangeStart', function(){ // à chaque changement de route
            if(Auth.isLoggedIn()){
                console.log('user is logged in');
                Auth.getUser().then(function(data){
                    console.log(data.data.username);
                    app.username = data.data.username;
                });
            }
            else{
                console.log('user is NOT logged in');
                app.username = '';
            }
        })

        app.logUser = function(logData) {
            Auth.login(app.logData)  // démarrer service du factory Auth dans le module authServices
            .then(function(data) { //une fois que service est terminé, prend le data retourné en paramêtre
                if (data.data.success) {  // rediriger vers la page principale en cas de succes
                    $location.path('/home');
                } 
                else {
                    console.log(data.data.message);
                }
            });
        };

        app.logout = function(){
            Auth.logout();
            $location.path('/login');
        };
    });