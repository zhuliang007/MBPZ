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
                            $scope.refundsSellLoadMore();
                        },function(){
                            $scope.autoLogin()
                                .then(function(){
                                    initToken()
                                })
                        })
                }

                $scope.refundsSellLoadMore= function () {
                    if(token!=''){
                        var data = {
                            "cmd": $config.cmds.myOrderList,
                            "parameters":{
                                "orderType":"refund",
                                "numberOfPerPage":numberOfPerPage,
                                "pageNo":pageNo,
                                "saleType":"sell"
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

                $scope.myContant = function(buyPhone,nickName,type){
                        $state.go($config.controllers.messageChat.name,{uid:'13524183387',credential:'13524183387',touid:buyPhone,nickName:nickName,type:type})
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
                    $scope.checkLogin()
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
                                    if(result.data.msg=='操作成功'){
                                        $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true})
                                    }
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

            //确认收货
            $scope.submitGoods = function(id){
                $scope.checkLogin()
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
                                if(result.msg=='操作成功'){
                                    $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true})
                                }
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

        }])