angular.module('SamesiesControllers', ['CustomerServices'])
.controller('NavController', ['$scope', 'Auth', function($scope, Auth) {
	$scope.signout = function() {
		Auth.removeToken();
	};
}])
.controller('SignupController', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
	$scope.customer = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	$scope.signup = function() {
		$http.post('/api/customers', $scope.customer).then(function success(res) {
			$http.post('/api/auth', $scope.customer).then(function success(res) {
				Auth.saveToken(res.data.token);
				$location.path('/');
			}, function error(res) {
				console.log(res);
			});
		}, function error(res) {
			console.log(res);
		});
	}
}])
.controller('SigninController', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
	$scope.customer = {
		email: '',
		password: ''
	};

	$scope.signin = function() {
		$http.post('/api/auth', $scope.customer).then(function success(res) {
			Auth.saveToken(res.data.token);
			$location.path('/');
		}, function error(res) {
			console.log(res.data);
		});
	};
}]);