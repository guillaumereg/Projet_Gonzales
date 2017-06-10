angular.module('registerCtrl', ['userServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('regCtrl', function($location, User,$route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices

        $scope.regUser = function() {
            User.create($scope.regData).then(function(data){
                if (data.data.success) {  // rediriger vers la page de login en cas de succes
                    $location.path('/');
                } else {
                    console.log(data.data.message);
                }
            });
            $scope.regData = {};
        };
    });
