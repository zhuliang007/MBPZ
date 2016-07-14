/**
 * Created by Administrator on 2016/6/21.
 */
angular.module('controllers.orderPreview',[])
    .controller('OrderPreviewCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$state',
        '$stateParams',
        '$alert',
        '$rootScope',
        '$locals',
        function($scope,$config,$console,$httpService,$state,$stateParams,$alert,$rootScope,$locals){
            var id = $stateParams.productId;
            var userInfo ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }
            checkOrderAddressObject();
            function checkOrderAddressObject(){
                if($rootScope.orderAddressObject && $rootScope.orderAddressObject.receiveName){
                    $rootScope.orderAddressCacheObject = angular.copy($rootScope.orderAddressObject);
                }
            }
            getOrderPreview();

            function getOrderPreview(){
                var data = {
                    "cmd":$config.cmds.reserve,
                    "parameters":{
                        "productId":id
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result);
                        $scope.product = result.data.product;
                        $scope.order = result.data;
                        if($rootScope.orderAddressCacheObject){
                            $scope.order.receiveName = $rootScope.orderAddressCacheObject.receiveName;
                            $scope.order.receivePhone = $rootScope.orderAddressCacheObject.receivePhone;
                            $scope.order.address = $rootScope.orderAddressCacheObject.address;
                        }
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack();
                        }
                    })
            }

            $scope.submitOrder = function(){
                if(!$scope.order.receiveName && !$scope.order.receivePhone && !$scope.order.address){
                    $alert.show("请选择您的收货地址")
                    return ;
                }

                var data = {
                    "cmd":$config.cmds.orderCommit,
                    "parameters":{
                        "productId":$scope.order.product.id,
                        "price":$scope.order.price,
                        "freight":$scope.order.freight,
                        "receiveName":$scope.order.receiveName,
                        "receivePhone":$scope.order.receivePhone,
                        "address":$scope.order.address,
                        "postCode":$scope.order.postCode
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //显示支付选择
                        //将生成的订单信息传递给支付操作页面，选择支付方式
                        //$console.show("选择支付方式")
                        //$console.show(result)
                        var userToken = 'token';
                        result.data[userToken]=$scope.userInfo.loginToken;
                        $state.go($config.controllers.pay.name,{id:id,obj:result.data,routers:1});
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack();
                        }
                    })
            }

            $scope.goOwnBack = function(){
                $scope.goBack().then(function(){
                    $rootScope.orderAddressObject= null
                    $rootScope.orderAddressCacheObject= null
                })
            }

            $scope.setOrderAddress = function(){
                //$console.show("设置收货地址")
                $state.go($config.controllers.orderAddress.name,{type:1});
            }

        }
    ])

