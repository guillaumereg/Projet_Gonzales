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
                templateUrl: 'views/rentCar.html',
                controller: 'searchOffersCtrl'
            })

            .when('/rentMyCar', {
                templateUrl: 'views/rentMyCar.html',
                controller: 'offerCtrl'
            })

            .when('/myOffers', {
                templateUrl: 'views/myOffers.html',
                controller: 'myOffersCtrl'
            })

            .when('/myProfil', {
                templateUrl: 'views/myProfil.html' ,
                controller: 'myProfilCtrl'

            })
            .when('/changeProfil', {
                templateUrl: 'views/changeProfil.html' ,
                controller: 'changeProfilCtrl'

            })
            .when('/createEvaluation', {
                templateUrl: 'views/createEvaluation.html' ,
                controller: 'createEvaluationCtrl'

            })

            .otherwise({
                templateUrl: 'views/unknown.html'
            });

        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });
