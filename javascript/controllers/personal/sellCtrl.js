/**
 * Created by Administrator on 2016/6/30.
 */

angular.module('controllers.sellCtrl',[])
    .controller('SellCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$httpService',
        '$locals',
        '$ionicPopup',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals,$ionicPopup){
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.noMoreLoad = false;
            $scope.items = [];

            var token ='';

            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        token=$scope.userInfo.loginToken;
                        $scope.publicLoadMore();
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }

            $scope.publicLoadMore = function () {
                if(token!=''){
                    var data = {
                        "cmd":$config.cmds.productPublic,
                        "parameters":{
                            "type":0,
                            "numberOfPerPage":numberOfPerPage,
                            "pageNo":pageNo
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



            $scope.releaseDel = function(productid){


            }

            $scope.releaseDetail=function(id,type){
                $state.go($config.controllers.publish.name,{type:type,id:id})
            }

            $scope.showConfirm = function(productid) {
                var confirmPopup = $ionicPopup.confirm({
                    title: '提示',
                    template: '是否确定删除?',
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        if(token!=''){
                            var delData =  {
                                "cmd": $config.cmds.productDel,
                                "parameters":{
                                    "productId":productid
                                },
                                "token":token
                            }
                            $httpService.getJsonFromPost($config.getRequestAction(),delData)
                                .then(function(result){
                                    alert(result.msg);
                                    $state.reload();
                                })
                        }else{
                            initToken()
                        }
                    } else {
                        return;
                    }
                });
            };


        }])