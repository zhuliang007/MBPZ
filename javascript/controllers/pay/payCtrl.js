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
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet) {
            $scope.goPay=function(){
                console.log($scope.response.pay)
            }

            $scope.changePay = function(value){
console.log(value)
            }

        }])