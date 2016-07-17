angular.module('controllers.messagesCtrl',[])
    .controller('MessagesCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$locals',
        '$httpService',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$locals,$httpService){
            var pageNo=0;
            var numberOfPerPage=5;
            $scope.noMoreLoad = false;

            //上拉刷新
            $scope.items=[];

            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            $scope.loadMore = function() {
                var data = {
                    "cmd":$config.cmds.systemMessage,
                    "parameters":{
                        "modual" :$stateParams.modual,
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
                    });
            };

            $scope.messageDetails = function(id,type){
                var params = {id:id};
                switch (type){
                    case 0:
                        $state.go($config.controllers.productDetail.name,params);
                        break;
                    case 1:
                        $state.go($config.controllers.shopDetail.name,params);
                        break;
                }
            }

            $scope.messagesOrder = function (item) {
                $state.go($config.controllers.orderDetail.name,{id:item.relateField,type:10})
            }

        }
    ])
