// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// Code goes here

var nodebb_link = 'http://localhost:4567/api/'
var app = angular.module('ionicApp', [ 'ionic','ui.bootstrap'])

app.config(function($stateProvider, $urlRouterProvider,$httpProvider, $ionicConfigProvider) {
$httpProvider.defaults.withCredentials = true;
  $ionicConfigProvider.views.maxCache(0);
     $ionicConfigProvider.views.transition('none');
  $urlRouterProvider.otherwise('/homepage')
  $stateProvider.state('start', {
    abstract: true,
    templateUrl: 'templates/start.html'
  })
  $stateProvider.state('start.homepage', {
    url: '/homepage', 
    controller: 'HomeControl',
    views: {
      home: {
        templateUrl: 'templates/home.html'
      }
    }  
  })
  $stateProvider.state('start.about', {
    url: '/about', 
    views: {
      home: {
        templateUrl: 'templates/about.html'
      }
    }  
  })
  $stateProvider.state('start.blog', {
    url: '/blog',
    views: {
      home: {
        templateUrl: 'templates/blog.html'
      }
    }  
  })
  $stateProvider.state('start.place', {
    url: '/place',
    conreoller : 'PlaceControl',  
    views: {
      home: {
        templateUrl: 'templates/place.html'
      }
    }  
  })
})

app.controller('MyCtrl', function($scope) {
    
})

app.controller('HomeControl', function($scope, $http,TodosService,$timeout) {
    $scope.topics = {}
    $scope.place = {}
    $scope.crousalimage = TodosService.crousalimage
    $scope.myInterval = 5000;
    $timeout(function() {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
//            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false,
            speed: 700,
            loop: true
        });
    });
    
    $scope.init = function () {
        $http.get(nodebb_link  +  'recent').
          success(function(data, status, headers, config) {
            if(data)
            {
                topics = data.topics
                topics = topics.slice(0, 3);
                console.log(data);
                for ( i = 0; i < topics.length; i++ )
                {
                    console.log(topics[i].tid)
                    $http.get(nodebb_link  +  'post/'+topics[i].tid).
                      success(function(data, status, headers, config) {
                        if(data)
                        {
                            console.log(data.content)
                            topics.content = data.content
                        }
                    })
                }
                $scope.topics = topics
            }
        });
        $http.get('http://localhost:4567/site/place/1').
          success(function(data, status, headers, config) {
            if(data)
            {
                console.log(data.result[0]);
                $scope.place = data.result[0]
            }
        });
    };
    
})

app.controller('PlaceControl', function($scope,weatherService,$http) {
    $scope.weather = weatherService.getWeather();
    console.log($scope.weather)
    $http.get('http://localhost:4567/site/gallery/swat',
              {headers: {'accept': 'application/json'}}).
      success(function(data, status, headers, config) {
        if(data)
        {
            console.log(data);
        }
    });
})

app.factory('TodosService', function() {
    crousalimage = [
        {
            'image' : 'assets/a2.jpg',
            'text' : 'First'
        },
        {
            'image' : 'assets/a1.jpg',
            'text' : 'Second'
        },
        {
            'image' : 'assets/a3.jpg',
            'text' : 'Third'
        },
        {
            'image' : 'assets/a4.jpg',
            'text' : 'Fourth'
        },
        {
            'image' : 'assets/a5.jpg',
            'text' : 'Five'
        },
        {
            'image' : 'assets/a6.jpg',
            'text' : 'Six'
        },
        {
            'image' : 'assets/a7.jpg',
            'text' : 'Seven'
        },
        {
            'image' : 'assets/a8.jpg',
            'text' : 'Eight'
        }
    ]
return {
    crousalimage: crousalimage
  }
})

//    weather service 
app.factory('weatherService', function($http) {
    return { 
      getWeather: function() {
        var weather = { temp: {}, clouds: null };
        $http.jsonp('http://api.openweathermap.org/data/2.5/weather?zip=44000,pk&units=metric&callback=JSON_CALLBACK').success(function(data) {
            if (data) {
                console.log(data)
                if (data.main) {
                    weather.temp.current = data.main.temp;
                    weather.temp.min = data.main.temp_min;
                    weather.temp.max = data.main.temp_max;
                    weather.name = data.name;
                }
                weather.clouds = data.clouds ? data.clouds.all : undefined;
            }
        });

        return weather;
      }
    }; 
});

app.filter('temp', function($filter) {
    return function(input, precision) {
        if (!precision) {
            precision = 1;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0C';
    };
});

app.directive('weatherIcon', function() {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@'
        },
        controller: function($scope) {
            $scope.imgurl = function() {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.cloudiness < 20) {
                    return baseUrl + 'sunny.png';
                } else if ($scope.cloudiness < 90) {
                   return baseUrl + 'partly_cloudy.png';
                } else {
                    return baseUrl + 'cloudy.png';
                }
            };
        },
        template: '<div style="float:left"><img ng-src="{{ imgurl() }}"></div>'
    };
});


//    weather service 