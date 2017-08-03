angular.module('offerController', ['offerServices', 'authServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('offerCtrl', function($location, Offer, Auth, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices

        $scope.createOffer = function() {
            Auth.getUser().then(function(data){
                var username = data.data.username;
                Offer.create({brand: $scope.offerData.brand, model: $scope.offerData.model,
                              price: $scope.offerData.price, city: $scope.offerData.city,username: data.data.username})
                .then(function(data){
                    if (data.data.success) {
                        $location.path('/home');
                    } else {
                        console.log(data.data.message);
                    }
                });
            });
        };
    });
