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
                            $scope.boughtLoadMore();
                        },function(){
                            $scope.autoLogin()
                                .then(function(){
                                    initToken()
                                })
                        })
                }

                $scope.boughtLoadMore= function () {
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

                $scope.myContant = function(buyPhone,nickName,type){
                        $state.go($config.controllers.messageChat.name,{uid:'13524183387',credential:'13524183387',touid:buyPhone,nickName:nickName,type:type})
                }

                //立即支付
                $scope.showPay = function(obj){
                    $scope.checkLogin()
                        .then(function(){
                            var userToken = "token";
                            obj[userToken]=$scope.userInfo.loginToken;
                            var backImage = "backImg";
                            obj[backImage] = $scope.mineAlipay;
                            console.log(obj)
                            $rootScope.orderPreviewObject = obj;
                            $scope.openPayModal('payModal');
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
                        "token":"ODkxOGJjZTItNDhiMy00NTVjLTlmNTAtMjVlYzI2MmQyMGI2"
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),remindData)
                        .then(function(result){
                            console.log(result.msg)
                        })
                }
        }])
