angular.module('mainController', ['authServices'])
    .controller('mainCtrl', function($location, Auth, $route, $rootScope, $scope) {
        var app = this;

        $rootScope.$on('$routeChangeStart', function(event, next){ // intercepter changement de route
            $scope.showError=false;
            $scope.error= {};
            if(!Auth.isLoggedIn()){//pas connecté
                console.log('user is NOT logged in');
                app.username = '';
                app.loggedIn = false;
                if(!next.isLogin){  //prochaine location requiert qu'il soit login
                    $location.path('/');  //rediriger vers page login
                }
            }
            else{  //connecté
                console.log('user is logged in');
                Auth.getUser().then(function(data){
                    app.username = data.data.username;
                });
                app.loggedIn = true;
                if($location.path() === '/'){
                    $location.path('/home');
                }
            }
        })

        app.logUser = function(logData) {
          $scope.error={};
          $scope.showError=false;
          Auth.login(app.logData)  // démarrer service du factory Auth dans le module authServices
            .then(function(data) { //une fois que service est terminé, prend le data retourné en paramêtre
                if (data.data.success) {  // rediriger vers la page principale en cas de succes
                    $location.path('/home');
                }
                else {
                    console.log(data.data.message);
                    $scope.error=data.data.message;
                    $scope.showError=true;
                }
            });
        };

        app.logout = function(){
            Auth.logout();
            $location.path('/');
            $route.reload();
        };
    });
