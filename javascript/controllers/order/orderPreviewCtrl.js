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

            getOrderPreview();
            function getOrderPreview(){
                var data = {
                    "cmd":$config.cmds.reserve,
                    "parameters":{
                        "productId":id
                    },
                    "token":$locals.get('token','')
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $scope.order = result.data;
                        $scope.product = result.data.product;
                    },function(error){
                        if(error.systemError){
                            var systemError = error.systemError;
                            if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                $scope.openModal('loginModal');
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


               /* if(!$scope.order.receiveName && !$scope.order.receivePhone && !$scope.order.address){
                    $console.show("请选择您的收货地址")
                    return ;
                }*/



                $scope.goBack().then(
                    function(){
                        $scope.orderReceive = {
                            receiveName : '',
                            receivePhone : '',
                            address : ''
                        }
                    }
                );

            }

            $scope.goOwnBack = function(){
                $scope.goBack().then(function(){
                    $scope.orderReceive = {
                        receiveName : '',
                        receivePhone : '',
                        address : ''
                    }
                })
            }

            $scope.setOrderAddress = function(){
                $console.show("设置收货地址")

                if(!$locals.get('token','')){
                    $scope.openModal('loginModal');
                    return ;
                }

                $state.go($config.controllers.orderAddress.name,{type:0});


            }

        }
    ])
