angular.module('authServices', [])

	.factory('Auth', function($http, AuthToken, $q) {   //  passer AuthToken !!!!

		var authFactory = {};

		authFactory.login = function(logData) {
			return $http.post('/api/login', logData).then(function(data){  //then utilise le return dernier return
				AuthToken.setToken(data.data.token);
				return data; //vers le controlleur
			});
		};

		authFactory.isLoggedIn = function(){
			if(AuthToken.getToken()){
				return true;
			}
			else{
				return false;
			}
		};

		authFactory.logout = function(){
			AuthToken.setToken();
		};

		authFactory.getUser = function(){
			if(AuthToken.getToken()){
				return $http.post('/api/getInfo');
			}
			else{
				$q.reject({message: 'utilisateur na pas de token'});
			}
		};


		return authFactory;
	}) 

	.factory('AuthToken', function($window){
		var authTokenFactory= {};

		authTokenFactory.setToken = function(token) {
			if(token){
				$window.localStorage.setItem('token', token); //sauve token sur le browser
			}
			else{
				$window.localStorage.removeItem('token');
			}
		};

		authTokenFactory.getToken = function() {  //pour utiliser: AuthToken.getToken()
			return $window.localStorage.getItem('token');
		};

		return authTokenFactory;
	})

	.factory('AuthEveryHttpRequest', function(AuthToken){ //est exécuté à chaque requete par fonction dans app.js
		var authEveryRequestFactory = {};

		authEveryRequestFactory.request = function(config){
			var token = AuthToken.getToken();
			if(token){
				config.headers['x-access-token'] = token  //attache le token à chaque http request s'il existe
			}
			return config;
		}
		return authEveryRequestFactory;
	});


