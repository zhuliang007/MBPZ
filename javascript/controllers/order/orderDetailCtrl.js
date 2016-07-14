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
        '$alert',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet,$alert) {

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
                                //console.log(result)
                                if(parseInt($stateParams.type)==0||parseInt($stateParams.type)==2){
                                    $scope.userHeaderImg=result.data.product.publicUser.userImg;
                                    $scope.nickName = result.data.product.publicUser.nickName;
                                    $scope.currentUserId = result.data.product.publicUserId;
                                }else if(parseInt($stateParams.type)==1||parseInt($stateParams.type)==3) {
                                    $scope.userHeaderImg=result.data.buyUser.userImg;
                                    $scope.nickName = result.data.buyUser.nickName;
                                    $scope.currentUserId = result.data.buyUser.id;
                                }
                                $scope.items=result.data;

                                var processScroll = document.getElementById('processScrolls');
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
                    case 10:
                        $scope.goBack();
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
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

            //取消订单
            $scope.cancalOrder = function(){
                $state.go($config.controllers.cancalOrder.name,{id:$stateParams.id,orderType:$stateParams.type,type:0})
            }

            //立即支付
            $scope.showPay = function(obj,value){
                $scope.checkLogin()
                    .then(function(){
                        var userToken = "token";
                        obj[userToken]=$scope.userInfo.loginToken;
                        var backImage = "backImg";
                        obj[backImage] = $scope.mineAlipay;
                        $state.go($config.controllers.pay.name,{obj:obj,routers:value});
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

            //提醒发货
            $scope.remindDelivery = function(id){
                $scope.checkLogin()
                    .then(function(){
                        var remindData = {
                            "cmd":$config.cmds.noticOrder,
                            "parameters":{
                                "id":id,
                                "orderType":"order",
                                "saleType":"buy"
                            },
                            "token":$scope.userInfo.loginToken
                        }

                        $httpService.getJsonFromPost($config.getRequestAction(),remindData)
                            .then(function(result){
                                $alert.show(result.msg);
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })
            }
            //申请退款
            $scope.applyRefund = function(id,price,freight){
                $state.go($config.controllers.applyRefund.name,{id:id,price:price,freight:freight});
            }

            //确认收货
            $scope.submitBuyer = function(id){
                $scope.checkLogin()
                    .then(function(){
                        var remindData = {
                            "cmd":$config.cmds.orderReceive,
                            "parameters":{
                                "id":id
                            },
                            "token":$scope.userInfo.loginToken
                        }

                        $httpService.getJsonFromPost($config.getRequestAction(),remindData)
                            .then(function(result){
                                $alert.show(result.msg);
                                //提示收货成功
                                if(result.msg=='确认收货成功'){
                                    $state.go($config.controllers.myBought.name,null,{reload:true});
                                }
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })
            }
            //拒绝
            $scope.refusedApply = function(id,type,items,routers){
                $state.go($config.controllers.refusedApply.name,{id:id,type:type,obj:items,routers:routers})
            }

            //重新申请退款
            $scope.applyRefund = function(id,price,freight){
                $state.go($config.controllers.applyRefund.name,{id:id,price:price,freight:freight,type:5})
            }

            //同意
            $scope.agreeApplys = function(id){
                $scope.checkLogin()
                    .then(function(){
                        $alert.confirm("是否同意退款?")
                            .then(function(){
                                var data = {
                                    "cmd": $config.cmds.applyRefused,
                                    "parameters":{
                                        "id":id,
                                        "refundStatus":"AGREE"
                                    },
                                    "token":$scope.userInfo.loginToken
                                }
                                $httpService.getJsonFromPost($config.getRequestAction(),data)
                                    .then(function(result){
                                        $alert.show(result.msg)
                                        if(result.msg=='操作成功'){
                                            $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true})
                                        }
                                    })
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

            //确认收货
            $scope.submitGoods = function(id){
                $scope.checkLogin()
                    .then(function(){
                        $alert.confirm('是否确认收货')
                            .then(function(){
                                var data =  {
                                    "cmd":$config.cmds.sellerReceive,
                                    "parameters":{
                                        "id":id
                                    },
                                    "token":$scope.userInfo.loginToken
                                }
                                $httpService.getJsonFromPost($config.getRequestAction(),data)
                                    .then(function(result){
                                        $alert.show(result.msg);
                                        if(result.msg=='操作成功'){
                                            $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true})
                                        }
                                    })
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

            $scope.clickChat = function () {
                if(parseInt($stateParams.type)==0){
                    $state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                        touid: $scope.items.product.publicUser.imUserId,nickName:$scope.items.product.publicUser.nickName,type:2,
                        userImage:$scope.items.product.publicUser.userImg,toUserImage:$scope.items.buyUser.userImg});
                }else if(parseInt($stateParams.type)==1||parseInt($stateParams.type)==3){
                    $state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                        touid:$scope.items.buyUser.imUserId,nickName:$scope.items.buyUser.nickName,type:2,
                        userImage:$scope.items.product.publicUser.userImg,toUserImage:$scope.items.buyUser.userImg});
                }else if(parseInt($stateParams.type)==2){
                    $state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                        touid:$scope.items.buyUser.imUserId,nickName:$scope.items.product.publicUser.nickName,type:2,
                        userImage:$scope.items.buyUser.userImg,toUserImage:$scope.items.product.publicUser.userImg});
                }

            }


        }])
