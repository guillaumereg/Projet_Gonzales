angular.module('appRoutes', ['ngRoute'])      //ng route to create route

    .config(function($routeProvider, $locationProvider) {
        $routeProvider   
            .when('/', {  //= default location
                templateUrl: 'views/home.html'
            })
           
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'regCtrl',
                controllerAs: 'register' //utiliser dans register.html pour le submit
            })
           
            .when('/about', {
                templateUrl: 'views/about.html'
            })

      
            .otherwise({ redirectTo: '/' });

        // Required for no base (remove '#' from address bar)
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });