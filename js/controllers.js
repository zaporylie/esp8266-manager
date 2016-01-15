var appControllers = angular.module('appControllers', []);

appControllers.controller('MainCtrl', ['$scope', 'Title', 'Menu', 'Instance',
  function($scope, Title, Menu, Instance) {
    $scope.Title = Title;
    $scope.Menu = Menu;
    $scope.Menu.init();
    $scope.Instance = new Instance();
  }]);

appControllers.controller('DashboardCtrl', ['$scope',
  function($scope) {
    $scope.Title.setTitle('Dashboard');

    $scope.data = function() {
    	var paths = $scope.Instance.getPaths('GET');
    	console.log(paths);
    	for (path in paths) {
    		
    	}
    	return paths;
    }

  }]);

appControllers.controller('InstanceAddCtrl', ['$scope', '$location', 
  function($scope, $location) {
  	$scope.instance = {
  		ip: null
  	}
    $scope.Title.setTitle('Add Instance');
    $scope.ip = null;

    $scope.submit = function () {
    	console.log($scope.instance.ip);

		var promesa = $scope.Instance.search($scope.instance.ip);

    	promesa.then(function() {
            $location.path('/');
          }, function(reason) {
            console.log("Error status : " + reason);
          });
	    // $http.get('http://' + $scope.instance.ip + '/espstack/status').success(function(data) {
	    // 	Instance.setInstance($scope.instance.ip, data);
	    // 	Instance.menu($scope.Menu);
	    // 	console.log(data);
    	// 	$location.path('/');
	    // }).error(function (data, status){
	    //     console.log("Error status : " + status);
	    // });
    }
  }]);

appControllers.controller('InstanceSearchCtrl', ['$scope', '$http',
  function ($scope, $http) {
  	
  	// @todo: Go through local network to find all compatible devices.

    // $http.get('phones/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });

    // $scope.orderProp = 'age';
  }
  ]);

appControllers.controller('InstanceCtrl', ['$scope', '$route', '$routeParams', '$http', 'Title', 'Instance', 'Menu',
  function($scope, $route, $routeParams, $http, Title, Instance, Menu) {
  	console.log($route);
  	switch ($routeParams.op) {

  		case 'edit':
  			Title.setTitle('Instance edit');
  			break;

		case 'delete':
  			Title.setTitle('Instance delete');
  			break;

  		case 'view':
  		default:
  			Title.setTitle('Instance view');
  			break;
  	}
 //    // Instance.setInstance();
 //    if (Instance.current()) {
 //    	console.log('menu');
	//     Instance.menu(Menu);
	// }
  }]);