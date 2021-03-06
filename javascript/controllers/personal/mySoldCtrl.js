angular.module('controllers.mySoldCtrl',[])
    .controller('MySoldCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$httpService',
        '$locals',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals){
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.noMoreLoad = false;
            $scope.items = [];
            var userInfo = {};
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            $scope.soldLoadMore= function () {
                //var data = {
                //    "cmd": $config.cmds.myOrderList,
                //    "parameters":{
                //        "orderType":$stateParams.orderType,
                //        "numberOfPerPage":numberOfPerPage,
                //        "pageNo":pageNo,
                //        "saleType":$stateParams.saleType
                //    },
                //    "token":userInfo.loginToken
                //}
                $scope.commonBean.cmd = $config.cmds.myOrderList;
                $scope.commonBean.token = userInfo.loginToken;
                $scope.commonBean.parameters={
                    "orderType":$stateParams.orderType,
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo,
                    "saleType":$stateParams.saleType
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
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

            //确认发货
            $scope.submitSoldDelivery = function(id){
                $state.go($config.controllers.submitDelivery.name,{id:id,type:0})
            }

            //提醒收货
            $scope.remindDeliverySell =function(id){
                //var remindData = {
                //    "cmd":$config.cmds.noticOrder,
                //    "parameters":{
                //        "id":id,
                //        "orderType":"order",
                //        "saleType":"sell"
                //    },
                //    "token":userInfo.loginToken
                //}

                $scope.commonBean.cmd = $config.cmds.noticOrder;
                $scope.commonBean.token = userInfo.loginToken;
                $scope.commonBean.parameters={
                    "id":id,
                    "orderType":"order",
                    "saleType":"sell"
                }

                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        $alert.show(result.msg);
                        $state.go($config.controllers.mySold.name,null,{reload:true});
                    })

            }

            //订单详情
            $scope.orderDetail=function(id,type){
                $state.go($config.controllers.orderDetail.name,{id:id,type:type})
            }

            //查看评价
            $scope.evaluationShow = function(id,type){
                $state.go($config.controllers.evaluateDetail.name,{orderId:id,type:type})
            }

        }])

