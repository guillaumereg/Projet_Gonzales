angular.module('myOffersController', ['offerServices', 'authServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('myOffersCtrl', function($location, Offer, Auth, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices

        Auth.getUser().then(function(data){
            Offer.getOffersByUsername({username: data.data.username}) //get all offers from user from database
            .then(function(data){
                if (data.data.success) {  
                    $scope.offers = data.data.offers;
                } else {
                    console.log(data.data.message);
                }
            });
        });

        $scope.deleteOffer = function(offer) {
            Offer.removeOffer({offerId: $scope.offers[ $scope.offers.indexOf(offer) ]._id})
            .then(function(data){
                $scope.offers.splice($scope.offers.indexOf(offer),1);
                if (!data.data.success) {  
                    console.log(data.data.message);
                }
            });
        }
    });