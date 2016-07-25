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
        '$alert',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals,$ionicPopup,$alert){
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.noMoreLoad = false;
            $scope.items = [];
            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            $scope.items = [];
            $scope.publicLoadMore = function () {
                //var data = {
                //    "cmd":$config.cmds.productPublic,
                //    "parameters":{
                //        "type":0,
                //        "numberOfPerPage":numberOfPerPage,
                //        "pageNo":pageNo
                //    },
                //    "token":userInfo.loginToken
                //}
                $scope.commonBean.cmd = $config.cmds.productPublic;
                $scope.commonBean.token = userInfo.loginToken;
                $scope.commonBean.parameters={
                    "type":0,
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo
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


            $scope.showConfirm = function(productid) {
                $alert.confirm('是否确定删除?')
                    .then(function () {
                        //var delData =  {
                        //    "cmd": $config.cmds.productDel,
                        //    "parameters":{
                        //        "productId":productid
                        //    },
                        //    "token":userInfo.loginToken
                        //}
                        $scope.commonBean.cmd = $config.cmds.productDel;
                        $scope.commonBean.token = userInfo.loginToken;
                        $scope.commonBean.parameters={
                            "productId":productid
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                            .then(function(result){
                                $alert.show(result.msg);
                                $state.reload();
                            })
                    })
            };


        }])
