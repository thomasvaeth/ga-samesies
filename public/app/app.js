var app = angular.module('SamesiesApplication', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/samesies.html',
	})
	.when('/templates', {
		templateUrl: 'app/views/templates.html',
	})
	.when('/about', {
		templateUrl: 'app/views/about.html',
	})
	.otherwise({
		templateUrl: 'app/views/404.html'
	});

	$locationProvider.html5Mode(true);
}]);