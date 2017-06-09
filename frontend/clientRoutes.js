angular.module('appRoutes', ['ngRoute'])      //ng route to create route

    .config(function($routeProvider, $locationProvider) {  //location.path pour changer ou href
        $routeProvider

            .when('/login', {  //= default location
                templateUrl: 'views/login.html',
            })
           
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'regCtrl',
                controllerAs: 'register' //utiliser dans register.html pour on submit
            })

            .when('/home', { 
                templateUrl: 'views/home.html'
            })
           
            .when('/about', {
                templateUrl: 'views/about.html'
            })
      
            .otherwise({ redirectTo: '/login' });

        // Required for no base (remove '#' from address bar)
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });