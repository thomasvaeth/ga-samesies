var app = angular.module('SamesiesApplication', ['ngRoute', 'CustomerServices', 'SamesiesControllers', 'smoothScroll']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/samesies.html'
	})
	.when('/templates', {
		templateUrl: 'app/views/templates.html'
	})
	.when('/about', {
		templateUrl: 'app/views/about.html'
	})
	.when('/signup', {
		templateUrl: 'app/views/signup.html'
	})
	.when('/signin', {
		templateUrl: 'app/views/signin.html',
		controller: 'SigninController'
	})
	.otherwise({
		templateUrl: 'app/views/404.html'
	});

	$locationProvider.html5Mode(true);
}]).config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
}]).run(['$rootScope', 'Auth', function($rootScope, Auth) {
	$rootScope.isSignedIn = function() {
		return Auth.isSignedIn.apply(Auth);
	}
}]);