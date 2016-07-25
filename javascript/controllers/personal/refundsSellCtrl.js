/**
 * Created by sam on 16/7/4.
 * 退款管理-出售
 */
angular.module('controllers.refundsSellCtrl',[])
    .controller('RefundsSellCtrl',[
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

            $scope.refundsSellLoadMore= function () {
                //var data = {
                //    "cmd": $config.cmds.myOrderList,
                //    "parameters":{
                //        "orderType":"refund",
                //        "numberOfPerPage":numberOfPerPage,
                //        "pageNo":pageNo,
                //        "saleType":"sell"
                //    },
                //    "token":userInfo.loginToken
                //}

                $scope.commonBean.cmd = $config.cmds.myOrderList;
                $scope.commonBean.token = userInfo.loginToken;
                $scope.commonBean.parameters={
                    "orderType":"refund",
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo,
                    "saleType":"sell"
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        console.log(result)
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

            $scope.myContant = function(item,type){
                var data = {
                    "uid":item.buyUser.imUserId,
                    "nickname":item.buyUser.nickName,
                    "userImage":item.product.publicUser.userImg,
                    "avators":item.buyUser.userImg
                    }
                $scope.clickChats(data,type);
                //$state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                //    touid:item.buyUser.imUserId,nickName:item.buyUser.nickName,type:type,
                //    userImage:item.product.publicUser.userImg,toUserImage:item.buyUser.userImg})
            }

            //退款详情
            $scope.refoundsDetail = function(id,price,items){
                $state.go($config.controllers.applyRefund.name,{id:id,price:price,obj:items,type:1})
            }

            //拒绝
            $scope.refusedApply = function(id,type,items,routers){
                $state.go($config.controllers.refusedApply.name,{id:id,type:type,obj:items,routers:routers})
            }

            //同意
            $scope.agreeApply = function(id){
                $alert.confirm("是否同意退款?")
                    .then(function(){
                        //var data = {
                        //    "cmd": $config.cmds.applyRefused,
                        //    "parameters":{
                        //        "id":id,
                        //        "refundStatus":"AGREE"
                        //    },
                        //    "token":userInfo.loginToken
                        //}
                        $scope.commonBean.cmd = $config.cmds.applyRefused;
                        $scope.commonBean.token = userInfo.loginToken;
                        $scope.commonBean.parameters={
                            "id":id,
                            "refundStatus":"AGREE"
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                            .then(function(result){
                                $alert.show(result.msg);
                                if(result.msg=='操作成功'){
                                    $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true})
                                }
                            })
                    })

            }

            //订单详情
            $scope.orderDetail=function(id,type){
                $state.go($config.controllers.orderDetail.name,{id:id,type:type})
            }

            //确认收货
            $scope.submitGoods = function(id){
                $alert.confirm('是否确认收货')
                    .then(function(){
                        //var data =  {
                        //    "cmd":$config.cmds.sellerReceive,
                        //    "parameters":{
                        //        "id":id
                        //    },
                        //    "token":userInfo.loginToken
                        //}
                        $scope.commonBean.cmd = $config.cmds.sellerReceive;
                        $scope.commonBean.token = userInfo.loginToken;
                        $scope.commonBean.parameters={
                            "id":id
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                            .then(function(result){
                                $alert.show(result.msg);
                                if(result.msg=='操作成功'){
                                    $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true})
                                }
                            })
                    })

            }

            //提醒发货
            $scope.remindDelivery = function(id){
                //var remindData = {
                //    "cmd":$config.cmds.noticOrder,
                //    "parameters":{
                //        "id":id,
                //        "orderType":"refund",
                //        "saleType":"sell"
                //    },
                //    "token":userInfo.loginToken
                //}
                $scope.commonBean.cmd = $config.cmds.noticOrder;
                $scope.commonBean.token = userInfo.loginToken;
                $scope.commonBean.parameters={
                    "id":id,
                    "orderType":"refund",
                    "saleType":"sell"
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        $alert.show(result.msg);
                    })
            }

        }])
