angular.module('SamesiesControllers', ['CustomerServices'])
.controller('NavController', ['$scope', 'Auth', function($scope, Auth) {
	$scope.logout = function() {
		Auth.removeToken();
	};
}])
.controller('LoginController', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
	$scope.customer = {
		email: "",
		password: ""
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