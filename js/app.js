var app = angular.module('app', ['ngMaterial', 'ngMdIcons', 'ngMessages', 'appControllers', 'ngRoute']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink');
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'template/instance-add.html',
        controller: 'InstanceAddCtrl'
      }).
      when('/search', {
        templateUrl: 'template/instance-search.html',
        controller: 'InstanceSearchCtrl'
      }).
      when('/instance/:op', {
        templateUrl: 'template/instance-manage.html',
        controller: 'InstanceCtrl'
      }).
      when('/dashboard', {
        templateUrl: '/template/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }]);

app.factory('Title', function() {
   const projectName = 'ESPstack manager';
   var title;
   return {
     getTitle: function() { return title + " | " + projectName; },
     setTitle: function(newTitle) { title = newTitle }
   };
});

app.factory('Menu', function() {
  var links = [];
  return {
    init: function () { 
      console.log(links); 
      links = [
        {
          "title": "Dashboard",
          "path": "",
          "icon": "home"
        },
        {
          "title": "Add instance",
          "path": "add",
          "icon": "add"
        },
        {
          "title": "Search",
          "path": "search",
          "icon": "search"
        }
      ];
      console.log(links); 
    },
    addLink: function(title, path, icon) { links.push({ 
      "title": title,
      "path": path,
      "icon": icon
      });
    },
    getLinks: function() { console.log(links); return links; }
  };
});

app.factory('Instance', function($http, $q) {
  
  var ip = null;

  var Instance = function() {
    // return this;
  }

  Instance.prototype.search = function(ip) {

    var self = this;
    var deferred = $q.defer();
    
    $http.get('http://' + ip + '/espstack/status')
      .success(function (data) {
        // Debug.
        console.log(data);

        $http.get('https://raw.githubusercontent.com/zaporylie/christmas-tree/2015/espstack.json')
          .success(function (data2) {
        
            console.log(data2);

            // Store ip.
            self.ip = ip;

            // Store data.
            self.status = data;

            // espstack.json
            self.config = data2;

            deferred.resolve();
          })
          .error(function (data, status){
            deferred.reject(status);
          });
      })
      .error(function (data, status){
        deferred.reject(status);
      });

    return deferred.promise;
  };

  Instance.prototype.getIp = function() {
    return this.ip;
  };

  Instance.prototype.getHostname = function() {
    console.log(this.status);
    if (!this.status || !this.status.hostname) {
      return null;
    }
    return this.status.hostname;
  };

  Instance.prototype.getPaths = function(type) {
    console.log(this.config);
    if (!this.config || !this.config[type]) {
      return null;
    }
    return this.config[type];
  };
   // {
   //  current: function() { return currentInstance; },
   //  setInstance: function(instanceId, data) { currentInstance = instanceId; status = data;  },
   //  unsetInstance: function() { currentInstance = null },
   //  label: function () { 
   //    return status.hostname ? status.hostname : null;
   //  },
   //  menu: function(Menu) {
   //    if (!currentInstance) {
   //   		Menu.init();
   //      return;
   //    }
   //   	// @todo: Otherwise populate menu links.
   //    Menu.init();
   //    Menu.addLink("View", "/instance/view");
   //    Menu.addLink("Edit", "/instance/edit");
   //    Menu.addLink("Delete", "/instance/delete");
   //   }
   // };
   return Instance;
});