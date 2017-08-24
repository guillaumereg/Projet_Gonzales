angular.module('offerController', ['offerServices', 'authServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('offerCtrl', function($location, Offer, Auth, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices

        $scope.offerMessage={};
        $scope.offerError=false;
        var brandLower = {};
        var modelLower = {};
        var cityLower = {};
        $scope.createOffer = function() {
            Auth.getUser().then(function(data){
                var username = data.data.username;
                if($scope.brand == "" || $scope.brand === undefined){
                    brandLower = null;
                }
                else{
                    brandLower = $scope.brand.toLowerCase();
                }
                if($scope.model === "" || $scope.model === undefined){
                    modelLower = null;
                }
                else{
                    modelLower = $scope.model.toLowerCase();
                }
                if($scope.city === "" || $scope.city === undefined){
                    cityLower = null;
                }
                else{
                    cityLower = $scope.city.toLowerCase();
                }
                Offer.create({brand: brandLower, model: modelLower,
                              price: $scope.price, city: cityLower, username: data.data.username})
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