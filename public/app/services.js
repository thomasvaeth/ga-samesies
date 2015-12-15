angular.module('CustomerServices', ['ngResource'])
.factory('Auth', ['$window', function($window) {
	return {
		saveToken: function(token) {
			$window.localStorage['secretrecipes-token'] = token;
		},
		getToken: function() {
			return $window.localStorage['secretrecipes-token'];
		},
		removeToken: function() {
			$window.localStorage.removeItem('secretrecipes-token');
		},
		isSignedIn: function() {
			var token = this.getToken();
			return token ? true : false;
		}
	}
}])
.factory('AuthInterceptor', ['Auth', function(Auth) {
	return {
		request: function(config) {
			var token = Auth.getToken();
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		}
	}
}]);