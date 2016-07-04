
angular.module('controllers.myShelvesCtrl',[])
    .controller('MyShelvesCtrl',[
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

                
                $scope.shelvesLoadMore= function () {
                        var data = {
                                "cmd": $config.cmds.productPublic,
                                "parameters":{
                                        "type":0,
                                        "numberOfPerPage":numberOfPerPage,
                                        "pageNo":pageNo,
                                        "status":1
                                },
                                "token":"ZGY4OGViNDItYTQ1Yy00ZjQyLTkyMGItOGI1OWMwZjlmNzJk"
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

                $scope.releaseDetail=function(id,type){
                    $state.go($config.controllers.publish.name,{type:type,id:id})
                }

        }])