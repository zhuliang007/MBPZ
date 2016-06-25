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
        '$locals',
        '$rootScope',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope){
            var id = $stateParams.productId;

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
                    "token":$locals.get('token','')
                }

                $console.show($rootScope.orderAddressObject);
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $scope.product = result.data.product;
                        $scope.order = result.data;
                        if($rootScope.orderAddressCacheObject){
                            $scope.order.receiveName = $rootScope.orderAddressCacheObject.receiveName;
                            $scope.order.receivePhone = $rootScope.orderAddressCacheObject.receivePhone;
                            $scope.order.address = $rootScope.orderAddressCacheObject.address;
                        }
                    },function(error){
                        $console.show(error);
                        if(error.systemError){
                            var systemError = error.systemError;
                            if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                $scope.openModal('loginModal');
                                return ;
                            }
                            if(systemError.errorCode == 20){
                                $scope.goBack();
                                return ;
                            }
                        }
                    })
            }

            $rootScope.login = function(telNumber,codeNumber){
                if(!telNumber){
                    $console.show($config.messages.noTel);
                    return;
                }
                if(!codeNumber){
                    $console.show($config.messages.noCode);
                    return;
                }
                var data = {
                    "cmd": $config.cmds.login,
                    "parameters":{
                        "loginAccount":telNumber,
                        "securityCode":codeNumber
                    }
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $locals.set('token',result.data.loginToken);
                        $locals.set('userId',result.data.id);
                        $scope.closeModal('loginModal');
                        getOrderPreview();
                    })
            }

            $scope.submitOrder = function(){
                if(!$locals.get('token','')){
                    $scope.openModal('loginModal');
                    return ;
                }


                if(!$scope.order.receiveName && !$scope.order.receivePhone && !$scope.order.address){
                    $console.show("请选择您的收货地址")
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
                    "token":$locals.get('token','')
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //显示支付选择
                        $rootScope.orderPreviewObject = result.data;
                        $scope.openModal('payModal');
                        $console.show($rootScope.orderPreviewObject);
                        //支付操作还没做
                    },function(error){
                        $console.show(error);
                        $console.show($rootScope.orderPreviewObject);
                        if(error.systemError){
                            var systemError = error.systemError;
                            if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                $scope.openModal('loginModal');
                                return ;
                            }
                            if(systemError.errorCode == 20){
                                $console.show(systemError.errorInfo);
                                //$scope.openModal('payModal');
                                return ;
                            }
                        }
                    })


                /*$scope.goBack().then(
                 function(){
                 $rootScope.orderAddressObject= null
                 $rootScope.orderAddressCacheObject= null
                 }
                 );*/



            }

            $scope.goOwnBack = function(){
                $scope.goBack().then(function(){
                    $rootScope.orderAddressObject= null
                    $rootScope.orderAddressCacheObject= null
                })
            }

            $scope.setOrderAddress = function(){
                $console.show("设置收货地址")

                if(!$locals.get('token','')){
                    $scope.openModal('loginModal');
                    return ;
                }

                $state.go($config.controllers.orderAddress.name,{type:1});


            }

        }
    ])
