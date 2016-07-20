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

            var userInfo = {};
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            init = function () {
                var data = {
                    "cmd":$config.cmds.orderDetail,
                    "parameters":{
                        "id":$stateParams.id
                    },
                    "token":userInfo.loginToken
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        console.log(result)
                        if(parseInt($stateParams.type)==0||parseInt($stateParams.type)==2){
                            $scope.userHeaderImg=result.data.product.publicUser.userImg;
                            $scope.nickName = result.data.product.publicUser.nickName;
                            $scope.currentUserId = result.data.product.publicUserId;
                        }else if(parseInt($stateParams.type)==1||parseInt($stateParams.type)==3
                            ||parseInt($stateParams.type)==10||parseInt($stateParams.type)==4) {
                            $scope.userHeaderImg=result.data.buyUser.userImg;
                            $scope.nickName = result.data.buyUser.nickName;
                            $scope.currentUserId = result.data.buyUser.id;
                        }
                        result.data['type']=$stateParams.type;
                        $scope.items=result.data;

                        var processScroll = document.getElementById('processScrolls');
                        var $element = angular.element(processScroll);
                        $element.children('.scroll').css({'width':(120*result.data.process.length)+"px"});
                    })
            }

            init();


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
                    case 4:
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
                var remindData = {
                    "cmd":$config.cmds.noticOrder,
                    "parameters":{
                        "id":id,
                        "orderType":"order",
                        "saleType":"sell"
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),remindData)
                    .then(function(result){
                        $alert.show(result.msg)
                    })

            }

            //取消订单
            $scope.cancalOrder = function(){
                $state.go($config.controllers.cancalOrder.name,{id:$stateParams.id,orderType:$stateParams.type,type:0})
            }

            //立即支付
            $scope.showPay = function(obj,value){
                var userToken = "token";
                obj[userToken]=userInfo.loginToken;
                var backImage = "backImg";
                obj[backImage] = $scope.mineAlipay;
                $state.go($config.controllers.pay.name,{obj:obj,routers:value});

            }

            //提醒发货
            $scope.remindDelivery = function(id){
                var remindData = {
                    "cmd":$config.cmds.noticOrder,
                    "parameters":{
                        "id":id,
                        "orderType":"order",
                        "saleType":"buy"
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),remindData)
                    .then(function(result){
                        $alert.show(result.msg);
                    })
            }
            //申请退款
            $scope.applyRefund = function(id,price,freight){
                $state.go($config.controllers.applyRefund.name,{id:id,price:price,freight:freight});
            }

            //确认收货
            $scope.submitBuyer = function(id){
                var remindData = {
                    "cmd":$config.cmds.orderReceive,
                    "parameters":{
                        "id":id
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),remindData)
                    .then(function(result){
                        $alert.show(result.msg);
                        //提示收货成功
                        if(result.msg=='确认收货成功'){
                            $state.go($config.controllers.myBought.name,null,{reload:true});
                        }
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
                $alert.confirm("是否同意退款?")
                    .then(function(){
                        var data = {
                            "cmd": $config.cmds.applyRefused,
                            "parameters":{
                                "id":id,
                                "refundStatus":"AGREE"
                            },
                            "token":userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                $alert.show(result.msg);
                                if(result.msg=='操作成功'){
                                    $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true});
                                }
                            })
                    })

            }

            //确认收货
            $scope.submitGoods = function(id){
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

            }

            $scope.clickChat = function () {
                var data ;
                if(parseInt($stateParams.type)==0){
                     data={
                        "uid":$scope.items.product.publicUser.imUserId,
                        "nickname":$scope.items.product.publicUser.nickName,
                        "userImage":$scope.items.buyUser.userImg,
                        "avators":$scope.items.product.publicUser.userImg,
                         "orderType":$stateParams.type,
                         "orderId":$stateParams.id
                    };
                    //$state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                    //    touid: ,nickName:,type:2,
                    //    userImage:,toUserImage:});
                }else if(parseInt($stateParams.type)==1||parseInt($stateParams.type)==3){
                     data={
                        "uid":$scope.items.buyUser.imUserId,
                        "nickname":$scope.items.buyUser.nickName,
                        "userImage":$scope.items.product.publicUser.userImg,
                        "avators":$scope.items.buyUser.userImg,
                         "orderType":$stateParams.type,
                         "orderId":$stateParams.id
                    };

                    //$state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                    //    touid:$scope.items.buyUser.imUserId,nickName:$scope.items.buyUser.nickName,type:2,
                    //    userImage:$scope.items.product.publicUser.userImg,toUserImage:$scope.items.buyUser.userImg});
                }else if(parseInt($stateParams.type)==2){
                     data={
                        "uid":$scope.items.product.publicUser.imUserId,
                        "nickname":$scope.items.product.publicUser.nickName,
                        "userImage":$scope.items.buyUser.userImg,
                        "avators":$scope.items.product.publicUser.userImg,
                         "orderType":$stateParams.type,
                         "orderId":$stateParams.id
                    };
                    //$state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                    //    touid:$scope.items.buyUser.imUserId,nickName:$scope.items.product.publicUser.nickName,type:2,
                    //    userImage:$scope.items.buyUser.userImg,toUserImage:$scope.items.product.publicUser.userImg});
                }else if(parseInt($stateParams.type)==4){
                    data={
                        "uid":$scope.items.buyUser.imUserId,
                        "nickname":$scope.items.buyUser.nickName,
                        "userImage":$scope.items.product.publicUser.userImg,
                        "avators":$scope.items.buyUser.userImg,
                        "orderType":$stateParams.type,
                        "orderId":$stateParams.id
                    };
                }

                $scope.clickChats(data,2);


            }
            //提醒发货
            $scope.remindDelivery = function(){
                var remindData = {
                    "cmd":$config.cmds.noticOrder,
                    "parameters":{
                        "id":$stateParams.id,
                        "orderType":"refund",
                        "saleType":"sell"
                    },
                    "token":$scope.userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),remindData)
                    .then(function(result){
                        $alert.show(result.msg);
                    })
            }

            //立即评价
            $scope.evaluation = function (id) {
                $state.go($config.controllers.orderEvaluate.name,{orderId:id})
            }

            //查看评价
            $scope.evaluationShow = function(id,type){
                $state.go($config.controllers.evaluateDetail.name,{orderId:id,type:type})
            }

            //确认发货
            //确认发货
            $scope.submitSoldDelivery = function(id){
                $state.go($config.controllers.submitDelivery.name,{id:id,type:0})
            }



        }])
