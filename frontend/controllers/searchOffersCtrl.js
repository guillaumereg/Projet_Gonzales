angular.module('searchOffersController', ['offerServices', 'authServices']) //utiliser module userServices entre [] de app.js
//ajouter nouveau module crée (userControllers) entre [] de app.js pour pouvoir l'utiliser dans d'autres modules
    .controller('searchOffersCtrl', function($location, Offer, Auth, $route, $scope, User) {   //add factory User !!!! pour utiliser ce factory du module  userservices

        $scope.showResults=false;
        $scope.showProfile=false;
        $scope.profile={};
        $scope.results={};
        $scope.findOffers = function() {
            $scope.results={};
            $scope.profile={};
            $scope.showProfile=false;
            if($scope.searchData === undefined || $scope.searchData === null){  // l'utilisateur n'a rien spécifié
                $scope.searchData=null;
            }
            else{
                if($scope.searchData.brand ===""){  // marque non spécifiée
                    delete $scope.searchData.brand;
                }
                if($scope.searchData.model ===""){ //modèle non spécifié
                    delete $scope.searchData.model;
                }
            }
            Offer.searchOffers($scope.searchData).then(function(data){
                if (data.data.success) {  // rediriger vers la page de login en cas de succes
                    $scope.showResults=true;
                    $scope.results=data.data.offers;
                } else {
                    console.log(data.data.message);
                }
            });
        };
        $scope.goToProfile = function(username){
            $scope.profile={};
            User.getUserByUsername({username: username}).then(function(data){    
                if (data.data.success) {
                    $scope.showProfile=true;
                    $scope.profile=data.data.user;

                }
                else{
                    console.log(data.data.message);
                }
            });
        }
        
    });