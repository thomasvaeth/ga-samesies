angular.module('SamesiesControllers', ['CustomerServices'])
.controller('TemplateController', ['$scope', 'Template', function($scope, Template) {
	$scope.templates = [];

	Template.query(function success(data) {
  	var shuffleData = shuffle(data);
		$scope.templates = shuffleData;
	}, function error(data) {
		console.log(data);
	});

	// -> Fisher–Yates shuffle algorithm
	function shuffle(arr) {
		var m = arr.length, t, i;
		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);
			// And swap it with the current element.
			t = arr[m];
			arr[m] = arr[i];
			arr[i] = t;
		}
		return arr;
	}
}])
.controller('NavController', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
	$scope.signout = function() {
		Auth.removeToken();
		$location.path('/')
	}
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

	$scope.previous = function() {
		window.history.back();
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
	}

	$scope.previous = function() {
		window.history.back();
	}
}]);