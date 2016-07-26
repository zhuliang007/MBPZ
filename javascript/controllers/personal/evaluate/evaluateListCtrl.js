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
        '$locals',
        function($scope,$console,$config,$alert,$state,$stateParams,$httpService,$locals){
            //$console.show($stateParams);
            $scope.evaluateList = []
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.infiniteFlag = true;
            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
                $scope.commonBean.token = userInfo.loginToken;
            }

            function getEvaluateList(){
                //var data = {
                //    "cmd":$config.cmds.evaluateList,
                //    "parameters":{
                //        "numberOfPerPage":numberOfPerPage,
                //        "pageNo":pageNo
                //    },
                //    "token":userInfo.loginToken
                //}
                $scope.commonBean.cmd = $config.cmds.evaluateList;
                $scope.commonBean.parameters={
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo
                }
                if($stateParams.userId){
                    //data.parameters = {
                    //    "userId":$stateParams.userId
                    //}
                    $scope.commonBean.parameters = {
                        "userId":$stateParams.userId
                    }
                }

                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
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
