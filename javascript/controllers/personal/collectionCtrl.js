/**
 * Created by zl_sam on 16/6/13.
 */
angular.module('controllers.collectionCtrl',[])
    .controller('CollectionCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$locals',
        '$httpService',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$locals,$httpService){
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.productList=[];
            $scope.noMoreLoad = false;

            var userInfo = {};
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            $scope.collectionLoadMore = function(){
                var data = {
                    "cmd": $config.cmds.myProductList,
                    "parameters":{
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
                            var items = result.data.content;
                            for(var item in items){
                                $scope.productList.push(items[item].product);
                            }
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
            
            $scope.goBackBefore= function () {
                $state.go($config.controllers.tabsPersonal.name);
            }
        }])
