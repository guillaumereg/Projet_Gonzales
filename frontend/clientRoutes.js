angular.module('appRoutes', ['ngRoute'])      //ng route to create route

    .config(function($routeProvider, $locationProvider) {  //location.path pour changer ou href
        $routeProvider

            .when('/', {  //= default location
                templateUrl: 'views/login.html',
                isLogin: true  //ne requiert pas de login pour y accéder
            })
           
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'regCtrl',
                isLogin: true
            })

            .when('/home', { 
                templateUrl: 'views/home.html'
            })
           
            .when('/rentCar', {
                templateUrl: 'views/rentCar.html'
            })

            .when('/rentMyCar', {
                templateUrl: 'views/rentMyCar.html',
                controller: 'offerCtrl'
            })

            .when('/myOffers', {
                templateUrl: 'views/myOffers.html',
                controller: 'myOffersCtrl'
            })
      
            .otherwise({ 
                templateUrl: 'views/unknown.html' 
            });

        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });