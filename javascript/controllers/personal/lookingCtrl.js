/**
 * Created by Administrator on 2016/6/30.
 */
angular.module('controllers.lookingCtrl',[])
    .controller('LookingCtrl',[
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
                        $scope.lookLoadMore();
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }


            $scope.lookLoadMore = function () {
                if(token!=''){
                    var data = {
                        "cmd":$config.cmds.productPublic,
                        "parameters":{
                            "type":1,
                            "numberOfPerPage":numberOfPerPage,
                            "pageNo":pageNo
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
                        })

                }else{
                    initToken();
                }

            }

            $scope.releaseDel = function(productid){
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
                    initToken();
                }

            }

            $scope.releaseDetail=function(id,type){
                $state.go($config.controllers.publish.name,{type:type,id:id})
            }

        }])
