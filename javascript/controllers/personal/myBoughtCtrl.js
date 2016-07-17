/**
 * Created by sam on 16/7/4.
 */
angular.module('controllers.myBoughtCtrl',[])
    .controller('MyBoughtCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$httpService',
        '$locals',
        '$alert',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals,$alert){
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.noMoreLoad = false;
            $scope.items = [];
            var userInfo = {};
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            $scope.boughtLoadMore= function () {
                var data = {
                    "cmd": $config.cmds.myOrderList,
                    "parameters":{
                        "orderType":$stateParams.orderType,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo,
                        "saleType":$stateParams.saleType
                    },
                    "token":userInfo.loginToken
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        if(result.data.content.length==0||result.data.content==null){
                            $scope.noMoreLoad=true;
                            return;
                        }else{
                            var arry = result.data.content;
                            arry.forEach(function(item){
                                $scope.items.push(item);
                            });
                        }
                        if(result.data.totalPages==0){
                            $scope.noMoreLoad=true;
                            $scope.items=null;
                            return;
                        }
                        if(pageNo==(result.data.totalPages-1)){
                            $scope.noMoreLoad=true;
                            return;
                        }
                        pageNo++;
                    })

            }

            $scope.releaseDetail=function(id,type){
                $state.go($config.controllers.publish.name,{type:type,id:id})
            }

            $scope.myContant = function(item,type){
                var data = {
                    "uid":item.product.publicUser.imUserId,
                    "nickname":item.product.publicUser.nickName,
                    "userImage":item.buyUser.userImg,
                    "avators":item.product.publicUser.userImg
                }
                $scope.clickChats(data,type);
                //$state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                //    touid:item.product.publicUser.imUserId,nickName:item.product.publicUser.nickName,type:type,
                //    userImage:item.buyUser.userImg,toUserImage:item.product.publicUser.userImg})
            }

            //订单详情
            $scope.orderDetail = function(id,type){
                $state.go($config.controllers.orderDetail.name,{id:id,type:type})
            }

            //立即支付
            $scope.showPay = function(obj,value){
                var userToken = "token";
                obj[userToken]=userInfo.loginToken;
                var backImage = "backImg";
                obj[backImage] = $scope.mineAlipay;
                $state.go($config.controllers.pay.name,{obj:obj,routers:value});

            }

            //取消订单
            $scope.cancalOrder = function(id){
                $state.go($config.controllers.cancalOrder.name,{id:id,type:1})
            }

            //申请退款
            $scope.applyRefund = function(id,price,freight){
                $state.go($config.controllers.applyRefund.name,{id:id,price:price,freight:freight});
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
                        $alert.show(result.msg)
                    })
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
                        //提示收货成功

                        if(result.msg=='确认收货成功'){
                            $state.go($config.controllers.myBought.name,null,{reload:true});
                        }
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

        }])

