/**
 * Created by sam on 16/7/6.
 */

angular.module('controllers.orderDetailCtrl',[])
    .controller('OrderDetailCtrl',[
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

            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        var data = {
                            "cmd":$config.cmds.orderDetail,
                            "parameters":{
                                "id":$stateParams.id
                            },
                            "token":$scope.userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                console.log(result)
                                $scope.userHeaderImg=result.data.product.publicUser.userImg;
                                $scope.nickName = result.data.product.publicUser.nickName;
                                $scope.currentUserId = result.data.product.publicUserId;
                                $scope.items=result.data;

                                var processScroll = document.getElementById('processScrolls')
                                var $element = angular.element(processScroll);
                                $element.children('.scroll').css({'width':(120*result.data.process.length)+"px"});
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }
            initToken();



            $scope.backParent = function(){
                switch (parseInt($stateParams.type)){
                    case 0:
                        $state.go($config.controllers.myBought.name);
                        break;
                    case 1:
                        $state.go($config.controllers.mySold.name);
                        break;
                    case 2:
                        $state.go($config.controllers.boughtRefundsRelease.name);
                        break;
                    case 3:
                        $state.go($config.controllers.sellRefundsRelease.name);
                        break;
                }
            }

            //申请退货
            $scope.submitDelivery = function(){
                $state.go($config.controllers.submitDelivery.name,{id:$stateParams.id,type:$stateParams.type})
            }


            $scope.displayRef = function(status){
                if(status=='REFUNDING'){
                    return false;
                }
                return true;
            }

            //查看评价
            $scope.evaluationShow = function(id){
                $state.go($config.controllers.evaluateDetail.name,{orderId:id,type:2,orderDetail:$stateParams.type})
            }

            //提醒收货
            $scope.remindDeliverySell =function(id){
                $scope.checkLogin()
                    .then(function(){
                        var remindData = {
                            "cmd":$config.cmds.noticOrder,
                            "parameters":{
                                "id":id,
                                "orderType":"order",
                                "saleType":"sell"
                            },
                            "token":$scope.userInfo.loginToken
                        }

                        $httpService.getJsonFromPost($config.getRequestAction(),remindData)
                            .then(function(result){
                                console.log(result.msg)
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

            //取消订单
            $scope.cancalOrder = function(id){
                $state.go($config.controllers.cancalOrder.name,{id:id})
            }


        }])