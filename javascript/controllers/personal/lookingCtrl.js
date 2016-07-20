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
        '$alert',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals,$alert){
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.noMoreLoad = false;
            $scope.items = [];
            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            console.log(userInfo.loginToken)

            $scope.lookLoadMore = function () {
                var data = {
                    "cmd":$config.cmds.productPublic,
                    "parameters":{
                        "type":1,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo
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

            $scope.releaseDel = function(productid){
                var delData =  {
                    "cmd": $config.cmds.productDel,
                    "parameters":{
                        "productId":productid
                    },
                    "token":userInfo.loginToken
                }
                $httpService.getJsonFromPost($config.getRequestAction(),delData)
                    .then(function(result){
                        $alert.show(result.msg);
                        $state.reload();
                    })

            }

            $scope.releaseDetail=function(id,type){
                $state.go($config.controllers.publish.name,{type:type,id:id})
            }

        }])
