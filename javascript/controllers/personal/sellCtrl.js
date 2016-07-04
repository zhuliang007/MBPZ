/**
 * Created by Administrator on 2016/6/30.
 */

/**
 * Created by zl_sam on 16/6/14.
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
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals){
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.noMoreLoad = false;
            $scope.items = [];

            $scope.publicLoadMore = function () {
                var data = {
                    "cmd":$config.cmds.productPublic,
                    "parameters":{
                        "type":0,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo
                    },
                    "token":$locals.get('token','ODkxOGJjZTItNDhiMy00NTVjLTlmNTAtMjVlYzI2MmQyMGI2')
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

            }



            $scope.releaseDel = function(productid){
                var delData =  {
                    "cmd": $config.cmds.productDel,
                    "parameters":{
                        "productId":productid
                    },
                    "token":"N2MyYThhODktNTZkNi00ZDdmLTljMTQtY2UxYzFmMjY0MTIz"
                }
                $httpService.getJsonFromPost($config.getRequestAction(),delData)
                    .then(function(result){
                        alert(result.msg);
                        $state.reload();
                    })
            }

            $scope.releaseDetail=function(id,type){
                $state.go($config.controllers.publish.name,{type:type,id:id})
            }

        }])