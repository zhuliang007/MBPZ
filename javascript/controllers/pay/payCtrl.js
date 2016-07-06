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
            $scope.goPay=function(obj){
                console.log(obj)
                if($scope.choice=='alipay'){
                    window.location.href='http://erpuat.mengbp.com:8094/wine-market-rest/market/order/h5payOrder?orderCode='+obj.orderCode+'&token='+obj.token;
                }
            }

            $scope.changePay = function(value){
                $scope.choice=value;
            }



        }])