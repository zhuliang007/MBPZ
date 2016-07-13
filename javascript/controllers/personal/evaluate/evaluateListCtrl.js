/**
 * Created by Administrator on 2016/7/11.
 */
angular.module('controllers.evaluateList',[])
    .controller('EvaluateListCtrl',[
        '$scope',
        '$console',
        '$config',
        '$alert',
        '$state',
        '$stateParams',
        '$httpService',
        function($scope,$console,$config,$alert,$state,$stateParams,$httpService){
            //$console.show($stateParams);
            $scope.evaluateList = []
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.infiniteFlag = true;

            function getEvaluateList(){

                $scope.checkLogin()
                    .then(function(){
                        var data = {
                            "cmd":$config.cmds.evaluateList,
                            "token":$scope.userInfo.loginToken
                        }
                        if($stateParams.userId){
                            data.parameters = {
                                "userId":$stateParams.userId
                            }
                        }

                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                //$console.show(result)
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                                if(result.data.totalPages == 0){
                                    $scope.infiniteFlag = false;
                                    $scope.evaluateList = null;
                                    return ;
                                }
                                var items = result.data.content;
                                if(items==null||items.length==0){
                                    $scope.infiniteFlag = false;
                                    return ;
                                }
                                addItem(items);
                                if(pageNo == result.data.totalPages-1 ){
                                    $scope.infiniteFlag = false;
                                    return;
                                }
                                pageNo++;
                            },function(error){
                                //$console.show(error);
                                if(!error){
                                    $scope.goBack()
                                }
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                $scope.loadMore();
                            })
                    })

            }

            function addItem(items){
                for(var item in items){
                    $scope.evaluateList.push(items[item]);
                }
            }

            //查看评价
            $scope.evaluationShow = function(id){
                $state.go($config.controllers.evaluateDetail.name,{orderId:id,showType:1})
            }


            $scope.loadMore = function(){
                getEvaluateList();
            }
        }
    ])