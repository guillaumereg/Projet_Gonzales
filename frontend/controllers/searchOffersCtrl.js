angular.module('searchOffersController', ['offerServices', 'authServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('searchOffersCtrl', function($location, Offer, Auth, $route, $scope) {   //add factory User !!!! pour utiliser ce factory du module  userservices

        $scope.resultsArrived=false;
        $scope.results={};
        $scope.findOffers = function() {
            $scope.results={};
            if($scope.searchData === undefined){
                $scope.searchData=null;
            }
            else{
                if($scope.searchData.brand ===""){
                    delete $scope.searchData.brand;
                }
                if($scope.searchData.model ===""){
                    delete $scope.searchData.model;
                }
            }
            Offer.searchOffers($scope.searchData).then(function(data){
                $scope.resultsArrived=true;
                if (data.data.success) {  // rediriger vers la page de login en cas de succes
                    $scope.results=data.data.offers;
                } else {
                    console.log(data.data.message);
                }
            });
        };
    });