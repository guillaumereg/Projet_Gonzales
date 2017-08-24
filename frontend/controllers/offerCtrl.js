angular.module('offerController', ['offerServices', 'authServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('offerCtrl', function($location, Offer, Auth, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices

        $scope.offerMessage={};
        $scope.offerError=false;
        $scope.createOffer = function() {
            Auth.getUser().then(function(data){
                var username = data.data.username;
                Offer.create({brand: $scope.brand.toLowerCase(), model: $scope.model.toLowerCase(),
                              price: $scope.price, city: $scope.city.toLowerCase(), username: data.data.username})
                .then(function(data){
                    if (data.data.success) {
                        $location.path('/home');
                    } else {
                        $scope.offerMessage = data.data.message;
                        $scope.offerError = true;
                        console.log(data.data.message);
                    }
                });
            });
        };
    });