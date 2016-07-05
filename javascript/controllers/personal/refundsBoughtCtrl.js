/**
 * Created by sam on 16/7/4.
 * 退款管理-购买
 */
angular.module('controllers.refundsBoughtCtrl',[])
    .controller('RefundsBoughtCtrl',[
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
                            $scope.refundsBoughtLoadMore();
                        },function(){
                            $scope.autoLogin()
                                .then(function(){
                                    initToken()
                                })
                        })
                }
                $scope.refundsBoughtLoadMore= function () {
                    if(token!=''){
                        var data = {
                            "cmd": $config.cmds.myOrderList,
                            "parameters":{
                                "orderType":"refund",
                                "numberOfPerPage":numberOfPerPage,
                                "pageNo":pageNo,
                                "saleType":"buy"
                            },
                            "token":token
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
                            },function(error){
                                if(error.systemError){
                                    if(error.systemError.errorCode==14||error.systemError.errorCode==15){
                                        $scope.autoLogin()
                                            .then(function(){
                                            })
                                    }
                                }
                            })
                    }else{
                        initToken()
                    }
                }

                $scope.myContant = function(buyPhone,nickName,type){
                        $state.go($config.controllers.messageChat.name,{uid:'13524183387',credential:'13524183387',touid:buyPhone,nickName:nickName,type:type})
                }

            //重新申请退款
                $scope.applyRefund = function(id,price,freight){
                    $state.go($config.controllers.applyRefund.name,{id:id,price:price,freight:freight})
                }

            //拒绝
            $scope.refusedApply = function(id,type,items,routers){
                $state.go($config.controllers.refusedApply.name,{id:id,type:type,obj:items,routers:routers})
            }

        }])