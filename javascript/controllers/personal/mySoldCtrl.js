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
            var token ='';

            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        token = $scope.userInfo.loginToken;
                        $scope.soldLoadMore();
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }

            $scope.soldLoadMore= function () {
                if(token!=''){
                    var data = {
                        "cmd": $config.cmds.myOrderList,
                        "parameters":{
                            "orderType":$stateParams.orderType,
                            "numberOfPerPage":numberOfPerPage,
                            "pageNo":pageNo,
                            "saleType":$stateParams.saleType
                        },
                        "token":token
                    }
                    $httpService.getJsonFromPost($config.getRequestAction(),data)
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
                }else{
                    initToken();
                }

            }

            $scope.releaseDetail=function(id,type){
                $state.go($config.controllers.publish.name,{type:type,id:id})
            }

            $scope.myContant = function(item,type){
                $state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                    touid:item.buyUser.imUserId,nickName:item.buyUser.nickName,type:type,
                    userImage:item.product.publicUser.userImg,toUserImage:item.buyUser.userImg})
            }

            //确认发货
            $scope.submitDelivery = function(id){
                $state.go($config.controllers.submitDelivery.name,{id:id,type:0})
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

            //订单详情
            $scope.orderDetail=function(id,type){
                $state.go($config.controllers.orderDetail.name,{id:id,type:type})
            }

            //查看评价
            $scope.evaluationShow = function(id){
                $state.go($config.controllers.evaluateDetail.name,{orderId:id,type:0})
            }

        }])
