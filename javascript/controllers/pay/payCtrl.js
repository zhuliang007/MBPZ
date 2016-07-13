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
        '$alert',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet,$http,$ionicModal,$alert) {

            $scope.backImg = $scope.mineAlipay;
            //$console.show($stateParams);
            $scope.price = $stateParams.obj.price;
            $scope.choice = '';
            $scope.goPay=function(obj){
                if($scope.choice==''){
                    $alert.show('请选择支付方式');
                    return;
                }
                window.location.href = 'http://erpuat.mengbp.com:8094/wine-market-rest/market/order/h5payOrder?orderCode='+$stateParams.obj.orderCode+'&token='+$stateParams.obj.token;
                //$state.go($config.controllers.payRouters.name,{id:$stateParams.id,obj:$stateParams.obj,routers:$stateParams.routers});
            }

            $scope.changePay = function(value){
                $scope.choice=value;
            }

            $scope.goBackUp = function(){
                switch (parseInt($stateParams.routers)){
                    case 0:
                        $state.go($config.controllers.myBought.name);
                        break;
                    case 1:
                        $state.go($config.controllers.orderDetail.name,{id:$stateParams.obj.id,type:0});
                        break;

                }
            }


        }])