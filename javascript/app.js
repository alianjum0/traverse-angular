// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// Code goes here

var app = angular.module('ionicApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
$httpProvider.defaults.withCredentials = true;
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
})

app.controller('MyCtrl', function($scope) {
    
})
app.controller('HomeControl', function($scope, $http,TodosService) {
    $scope.topics = {}
    $scope.place = {}
    $scope.init = function () {
        $http.get('http://localhost:4567/api/recent').
          success(function(data, status, headers, config) {
            if(data)
            {
                console.log(data.topics);
                $scope.topics = data.topics
            }
        });
        $http.get('http://localhost:4567/site/place/1').
          success(function(data, status, headers, config) {
            if(data)
            {
                console.log(data);
                $scope.place = data.result[0]
            }
        });
    };
    
})

app.factory('TodosService', function() {
    topics = {
    "topics": [
        {
            "_key": "topic:5",
            "tid": 5,
            "uid": 1,
            "cid": "1",
            "mainPid": 5,
            "title": "Announcement 2",
            "slug": "5/announcement-2",
            "timestamp": 1435748383529,
            "lastposttime": 1435748383546,
            "postcount": 1,
            "viewcount": 2,
            "locked": false,
            "deleted": false,
            "pinned": false,
            "relativeTime": "2015-07-01T10:59:43.529Z",
            "lastposttimeISO": "2015-07-01T10:59:43.546Z",
            "category": {
                "_key": "category:1",
                "cid": 1,
                "name": "Announcements",
                "icon": "fa-bullhorn",
                "bgColor": "#fda34b",
                "color": "#fff",
                "slug": "1/announcements",
                "disabled": false
            },
            "user": {
                "_key": "user:1",
                "username": "ali",
                "userslug": "ali",
                "picture": "https://secure.gravatar.com/avatar/5e3bd112ff4002ec8ebc1d8ab04eca68?size=128&default=identicon&rating=pg",
                "uid": 1
            },
            "tags": [],
            "isOwner": true,
            "unread": false,
            "unreplied": true
        },
        {
            "_key": "topic:4",
            "tid": 4,
            "uid": 1,
            "cid": "1",
            "mainPid": 4,
            "title": "Announcements 1",
            "slug": "4/announcements-1",
            "timestamp": 1435748373459,
            "lastposttime": 1435748373506,
            "postcount": 1,
            "viewcount": 1,
            "locked": false,
            "deleted": false,
            "pinned": false,
            "relativeTime": "2015-07-01T10:59:33.459Z",
            "lastposttimeISO": "2015-07-01T10:59:33.506Z",
            "category": {
                "_key": "category:1",
                "cid": 1,
                "name": "Announcements",
                "icon": "fa-bullhorn",
                "bgColor": "#fda34b",
                "color": "#fff",
                "slug": "1/announcements",
                "disabled": false
            },
            "user": {
                "_key": "user:1",
                "username": "ali",
                "userslug": "ali",
                "picture": "https://secure.gravatar.com/avatar/5e3bd112ff4002ec8ebc1d8ab04eca68?size=128&default=identicon&rating=pg",
                "uid": 1
            },
            "tags": [],
            "isOwner": true,
            "unread": false,
            "unreplied": true
        },
        {
            "_key": "topic:3",
            "tid": 3,
            "uid": 1,
            "cid": "3",
            "mainPid": 3,
            "title": "Blog 2",
            "slug": "3/blog-2",
            "timestamp": 1435748350482,
            "lastposttime": 1435748350496,
            "postcount": 1,
            "viewcount": 2,
            "locked": false,
            "deleted": false,
            "pinned": false,
            "relativeTime": "2015-07-01T10:59:10.482Z",
            "lastposttimeISO": "2015-07-01T10:59:10.496Z",
            "category": {
                "_key": "category:3",
                "cid": 3,
                "name": "Blogs",
                "icon": "fa-newspaper-o",
                "bgColor": "#86ba4b",
                "color": "#fff",
                "slug": "3/blogs",
                "disabled": false
            },
            "user": {
                "_key": "user:1",
                "username": "ali",
                "userslug": "ali",
                "picture": "https://secure.gravatar.com/avatar/5e3bd112ff4002ec8ebc1d8ab04eca68?size=128&default=identicon&rating=pg",
                "uid": 1
            },
            "tags": [],
            "isOwner": true,
            "unread": false,
            "unreplied": true
        },
        {
            "_key": "topic:2",
            "tid": 2,
            "uid": 1,
            "cid": "3",
            "mainPid": 2,
            "title": "Blog 1",
            "slug": "2/blog-1",
            "timestamp": 1435748336985,
            "lastposttime": 1435748337147,
            "postcount": 1,
            "viewcount": 1,
            "locked": false,
            "deleted": false,
            "pinned": false,
            "relativeTime": "2015-07-01T10:58:56.985Z",
            "lastposttimeISO": "2015-07-01T10:58:57.147Z",
            "category": {
                "_key": "category:3",
                "cid": 3,
                "name": "Blogs",
                "icon": "fa-newspaper-o",
                "bgColor": "#86ba4b",
                "color": "#fff",
                "slug": "3/blogs",
                "disabled": false
            },
            "user": {
                "_key": "user:1",
                "username": "ali",
                "userslug": "ali",
                "picture": "https://secure.gravatar.com/avatar/5e3bd112ff4002ec8ebc1d8ab04eca68?size=128&default=identicon&rating=pg",
                "uid": 1
            },
            "tags": [],
            "isOwner": true,
            "unread": false,
            "unreplied": true
        },
        {
            "_key": "topic:1",
            "tid": 1,
            "uid": 1,
            "cid": 2,
            "mainPid": 1,
            "title": "Welcome to your NodeBB!",
            "slug": "1/welcome-to-your-nodebb",
            "timestamp": 1435150175758,
            "lastposttime": 1435150175781,
            "postcount": 1,
            "viewcount": 0,
            "locked": false,
            "deleted": false,
            "pinned": false,
            "relativeTime": "2015-06-24T12:49:35.758Z",
            "lastposttimeISO": "2015-06-24T12:49:35.781Z",
            "category": {
                "_key": "category:2",
                "cid": 2,
                "name": "General Discussion",
                "icon": "fa-comments-o",
                "bgColor": "#59b3d0",
                "color": "#fff",
                "slug": "2/general-discussion",
                "disabled": false
            },
            "user": {
                "_key": "user:1",
                "username": "ali",
                "userslug": "ali",
                "picture": "https://secure.gravatar.com/avatar/5e3bd112ff4002ec8ebc1d8ab04eca68?size=128&default=identicon&rating=pg",
                "uid": 1
            },
            "tags": [],
            "isOwner": true,
            "unread": false,
            "unreplied": true
        }
    ],
    "nextStart": 20,
    "feeds:disableRSS": false,
    "rssFeedUrl": "/recent.rss",
    "breadcrumbs": [
        {
            "text": "[[global:home]]",
            "url": "/"
        },
        {
            "text": "[[recent:title]]"
        }
    ],
    "loggedIn": true,
    "template": {
        "name": "recent",
        "recent": true
    }
}
return {
    topics: topics.topics,
  }
})