'use strict';
 angular.module('mytodoApp',[])
 .controller('MainCtrl',function($scope){
   var todoSet = [];
   var activeSet = [];
   var completedSet = [];
   $scope.showSet = todoSet;
   $scope.totalLen = 0;
   $scope.activeLen = 0;
   $scope.doneAll = false;
   $scope.type = 'all';
   $scope.totalLen = 0;

   $scope.addTodo = function() {

      $scope.doneAll = false;
      if (!$scope.todo) {
         return;
      }
      todoSet.push({
         content: $scope.todo,
         isDone: false
      });
      activeSet.push({
         content: $scope.todo,
         isDone: false
      })
      $scope.todo = '';
      $scope.activeLen ++;
      $scope.totalLen ++;
      $scope.changeListType($scope.type);
   };

   $scope.removeTodo = function(todo) {  
   
      todoSet.splice(todoSet.indexOf(todo) , 1);
      activeSet.splice(activeSet.indexOf(todo) , 1);
      $scope.activeLen --;
      $scope.totalLen --;
      $scope.changeListType($scope.type);
   };
   
   $scope.completeTodo = function(todo) {
   
      if (todoSet.indexOf(todo) != -1) {
         todoSet[todoSet.indexOf(todo)].isDone = todo.isDone;
      }

      activeSet = todoSet.filter(function(x) {
         return x.isDone == false;
      });

      completedSet = todoSet.filter(function(x){
         return x.isDone == true;
      });

      $scope.activeLen = activeSet.length;

      $scope.changeListType($scope.type);
   };

   $scope.changeListType = function(thisType) {

      $scope.type = thisType;

      if (thisType == 'all') {
      $scope.showSet = todoSet;
      }

      if (thisType == 'active') {
         $scope.showSet = activeSet;
      }

      if (thisType == 'complete') {
         $scope.showSet = completedSet;
      }
   }

   $scope.clearComplete = function() {

      var imcomplete = todoSet.filter(function(x){
         return x.isDone == false;
      });
      angular.copy(imcomplete,todoSet);
      completedSet = [];

      $scope.changeListType($scope.type);

      $scope.totalLen = todoSet.length;
   }

   $scope.toggleAll = function() {

      if ($scope.doneAll) {
         completedSet = todoSet;
         todoSet.forEach(function(x) {
            x.isDone = true;});
         activeSet = [];
      }
      else {
         activeSet = todoSet;
         todoSet.forEach(function(x) {
            x.isDone = false;
         });
         completedSet = [];
      }
      $scope.activeLen = activeSet.length;

      $scope.changeListType($scope.type);
   }

   $scope.showBtn = function() {

      $scope.show =  true;
   }

   $scope.disappearBtn = function() {

      $scope.show = false; 
   }
 });
