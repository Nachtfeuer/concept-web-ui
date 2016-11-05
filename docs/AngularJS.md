## Welcome to my own AngularJS FAQ


## Introduction

Basically I would like to have all together in this project
with details and links for easier searching and navigating.
The example does use the external resources via CDN.

## How to write a simple application?

The relevant HTML part is
```
<html ng-app="simple">
```

Usually you would write a `simple.js` to implement the module;
for the demo I put everything into one file:

```
angular.module('simple');
```

Have a look at [simple.html](examples/simple.html)!

## How to write a simple controller?

```
angular.module('simple').controller("SimpleController", ['$scope', function($scope) {
    $scope.data = [ "one", "two", "three"];
}]);
```

Have a look at [simple.html](examples/simple.html)!

## How to use a simple controller?

```
<div ng-controller="SimpleController">
    <span ng-repeat="entry in data"> {{entry}}</span>
</div>
```

The output is then "one two three".
Have a look at [simple.html](examples/simple.html)!

