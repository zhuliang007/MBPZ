/**
 * Created by sam on 16/7/6.
 */

angular.module('controllers.payCtrl',[])
    .controller('PayCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$state',
        '$stateParams',
        '$locals',
        '$rootScope',
        '$ionicActionSheet',
        '$http',
        '$ionicModal',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet,$http,$ionicModal) {

            $scope.backImg = $scope.mineAlipay;
            $console.show($stateParams);
            $scope.price = $stateParams.obj.price;

            $scope.goPay=function(obj){
                $state.go($config.controllers.payRouters.name,{id:$stateParams.id,obj:$stateParams.obj,routers:$stateParams.routers});
            }

            $scope.changePay = function(value){
                $scope.choice=value;
            }



        }])