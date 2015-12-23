/*!
 * angular-validation-match
 * Checks if one input matches another
 * @version v1.5.1
 * @link https://github.com/TheSharpieOne/angular-validation-match
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */!function(a,b,c){"use strict";function d(a){return{require:"?ngModel",restrict:"A",link:function(c,d,e,f){function g(){var a=h(c);return b.isObject(a)&&a.hasOwnProperty("$viewValue")&&(a=a.$viewValue),a}if(!f)return void(console&&console.warn&&console.warn("Match validation requires ngModel to be on the element"));var h=a(e.match),i=a(e.matchCaseless);c.$watch(g,function(){f.$$parseAndValidate()}),f.$validators.match=function(){var a=g();return i(c)&&b.isString(a)&&b.isString(f.$viewValue)?f.$viewValue.toLowerCase()===a.toLowerCase():f.$viewValue===a}}}}b.module("validation.match",[]),b.module("validation.match").directive("match",d),d.$inject=["$parse"]}(window,window.angular);

/*!
 *	 Angular Smooth Scroll (ngSmoothScroll)
 *	 Animates scrolling to elements, by David Oliveros.
 * 
 *   Callback hooks contributed by Ben Armston https://github.com/benarmston
 *	 Easing support contributed by Willem Liu. https://github.com/willemliu
 *	 Easing functions forked from Gaëtan Renaudeau. https://gist.github.com/gre/1650294
 *	 Infinite loop bugs in iOS and Chrome (when zoomed) by Alex Guzman. https://github.com/alexguzman
 *	 Support for scrolling in custom containers by Joseph Matthias Goh. https://github.com/zephinzer
 *	 Influenced by Chris Ferdinandi
 *	 https://github.com/cferdinandi
 *
 *	 Version: 1.7.3
 * 	 License: MIT
 */
(function(){var b=angular.module("smoothScroll",[]);var a=function(j,n){n=n||{};var h=n.duration||800,i=n.offset||0,l=n.easing||"easeInOutQuart",e=n.callbackBefore||function(){},g=n.callbackAfter||function(){},d=document.getElementById(n.containerId)||null,c=(d!=undefined&&d!=null);var f=function(){if(c){return d.scrollTop}else{if(window.pageYOffset){return window.pageYOffset}else{return document.documentElement.scrollTop}}};var m=function(o,p){switch(o){case"easeInQuad":return p*p;case"easeOutQuad":return p*(2-p);case"easeInOutQuad":return p<0.5?2*p*p:-1+(4-2*p)*p;case"easeInCubic":return p*p*p;case"easeOutCubic":return(--p)*p*p+1;case"easeInOutCubic":return p<0.5?4*p*p*p:(p-1)*(2*p-2)*(2*p-2)+1;case"easeInQuart":return p*p*p*p;case"easeOutQuart":return 1-(--p)*p*p*p;case"easeInOutQuart":return p<0.5?8*p*p*p*p:1-8*(--p)*p*p*p;case"easeInQuint":return p*p*p*p*p;case"easeOutQuint":return 1+(--p)*p*p*p*p;case"easeInOutQuint":return p<0.5?16*p*p*p*p*p:1+16*(--p)*p*p*p*p;default:return p}};var k=function(p){var o=0;if(p.offsetParent){do{o+=p.offsetTop;p=p.offsetParent}while(p)}o=Math.max(o-i,0);return o};setTimeout(function(){var v=null,x=f(),w=k(j),u=0,q=w-x,y,t,z,s;var p=function(){v=f();s=window.innerHeight+v;if(c){z=d.scrollHeight}else{z=document.body.scrollheight}if((t==w)||(v==w)||(s>=z)){clearInterval(o);g(j)}};var r=function(){u+=16;y=(u/h);y=(y>1)?1:y;t=x+(q*m(l,y));if(c){d.scrollTop=t}else{window.scrollTo(0,t)}p()};e(j);var o=setInterval(r,16)},0)};b.factory("smoothScroll",function(){return a});b.directive("smoothScroll",["smoothScroll",function(c){return{restrict:"A",scope:{callbackBefore:"&",callbackAfter:"&"},link:function(f,e,d){if(typeof d.scrollIf==="undefined"||d.scrollIf==="true"){setTimeout(function(){var g=function(i){if(d.callbackBefore){var j=f.callbackBefore({element:i});if(typeof j==="function"){j(i)}}};var h=function(i){if(d.callbackAfter){var j=f.callbackAfter({element:i});if(typeof j==="function"){j(i)}}};c(e[0],{duration:d.duration,offset:d.offset,easing:d.easing,callbackBefore:g,callbackAfter:h,containerId:d.containerId})},0)}}}}]);b.directive("scrollTo",["smoothScroll",function(c){return{restrict:"A",scope:{callbackBefore:"&",callbackAfter:"&"},link:function(f,e,d){var g;e.on("click",function(j){j.preventDefault();g=document.getElementById(d.scrollTo);if(!g){return}var h=function(k){if(d.callbackBefore){var l=f.callbackBefore({element:k});if(typeof l==="function"){l(k)}}};var i=function(k){if(d.callbackAfter){var l=f.callbackAfter({element:k});if(typeof l==="function"){l(k)}}};c(g,{duration:d.duration,offset:d.offset,easing:d.easing,callbackBefore:h,callbackAfter:i,containerId:d.containerId});return false})}}}])}());
angular.module('CustomerServices', ['ngResource'])
.factory('Template', ['$resource', function($resource) {
	return $resource('/api/templates/:id');
}])
.factory('Auth', ['$window', function($window) {
	return {
		saveToken: function(token) {
			$window.localStorage['samesies-token'] = token;
		},
		getToken: function() {
			return $window.localStorage['samesies-token'];
		},
		removeToken: function() {
			$window.localStorage.removeItem('samesies-token');
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
}])
.factory('Alerts', [function() {
  var alerts = [];

  return {
    clear: function() {
      alerts = [];
    },
    add: function(type, msg) {
      alerts.push({type: type, msg: msg});
    },
    get: function() {
      return alerts;
    },
    remove: function(idx) {
      alerts.splice(idx, 1);
    }
  }
}]);
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
var app = angular.module('SamesiesApplication', ['ui.bootstrap', 'ngRoute', 'ngAnimate', 'CustomerServices', 'SamesiesControllers', 'validation.match', 'smoothScroll']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/samesies.html',
		controller: 'TemplateController'
	})
	.when('/templates', {
		templateUrl: 'app/views/templates.html',
		controller: 'TemplateController'
	})
	.when('/about', {
		templateUrl: 'app/views/about.html'
	})
	.when('/signup', {
		templateUrl: 'app/views/signup.html',
		controller: 'SignupController'
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