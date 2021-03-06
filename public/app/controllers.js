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
		$location.path('/');
	}
}])
.controller('SignupController', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
	$scope.customer = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	$scope.signup = function() {
		$http.post('/api/customers', $scope.customer).then(function success(res) {
			$http.post('/api/auth', $scope.customer).then(function success(res) {
				if (res.data.token) {
					Auth.saveToken(res.data.token);
					$location.path('/');
				} else {
					Alerts.add('danger', 'A user previously signed up with that email address.');
					$location.path('/signup');
				}
			}, function error(res) {
				Alerts.add('danger', res.data.message);
				console.log(res);
			});
		}, function error(res) {
			Alerts.add('danger', res.data.message);
			console.log(res);
		});
	}
}])
.controller('SigninController', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
	$scope.customer = {
		email: '',
		password: ''
	};

	$scope.signin = function() {
		$http.post('/api/auth', $scope.customer).then(function success(res) {
			if (res.data.token) {
				Auth.saveToken(res.data.token);
				$location.path('/');
			} else {
				Alerts.add('danger', 'Incorrect email or password.');
				$location.path('/signin');
			}
		}, function error(res) {
			Alerts.add('danger', error.data.message);
			console.log(res.data);
		});
	}
}])
.controller('BackController', ['$scope', function($scope) {
	$scope.previous = function() {
		window.history.back();
	}
}])
.controller('AlertController', ['$scope', 'Alerts', function($scope, Alerts) {
  $scope.alerts = Alerts.get();

  $scope.closeAlert = function(idx) {
    Alerts.remove(idx);
  };
}]);