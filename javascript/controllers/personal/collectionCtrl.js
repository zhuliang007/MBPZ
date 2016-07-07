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

            var token ='';

            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        token = $scope.userInfo.loginToken;
                        $scope.collectionLoadMore();
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }

            $scope.collectionLoadMore = function(){
                if(token!=''){
                    var data = {
                        "cmd": $config.cmds.myProductList,
                        "parameters":{
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
                                var items = result.data.content;
                                for(var item in items){
                                    $scope.productList.push(items[item].product);
                                }
                                console.log(items)
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
        }])