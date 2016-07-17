/**
 * Created by Administrator on 2016/7/7.
 */
angular.module('controllers.evaluateDetail',[])
    .controller('EvaluateDetailCtrl',[
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
            $scope.showType = $stateParams.showType?$stateParams.showType:0;
            $scope.childEvaluateObject = {
                parentId:0,
                content:''
            }
            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }
            getEvaluateDetail();
            function getEvaluateDetail(){
                var data = {
                    "cmd":$config.cmds.evaluateDetail,
                    "parameters":{
                        "orderId":$stateParams.orderId
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result);
                        $scope.detailObject = result.data;
                        $scope.childEvaluateObject.parentId = $scope.detailObject.id
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }

            $scope.submit = function(){

                $scope.checkLogin()
                if(!$scope.childEvaluateObject.content){
                    $alert.show('追评内容不能为空')
                    return;
                }

                var data = {
                    "cmd":$config.cmds.evaluateSave,
                    "parameters":{
                        "parentId":$scope.childEvaluateObject.parentId,
                        "content":$scope.childEvaluateObject.content
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result);
                        $alert.show('回复成功')
                            .then(function(){
                                getEvaluateDetail();
                            })
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })

            }

            //返回上一级页面
            $scope.goBackUp = function () {
                switch (parseInt($stateParams.type)){
                    case 1:
                        $state.go($config.controllers.myBought.name);
                        break;
                    case 2:
                        $state.go($config.controllers.mySold.name);
                        break;
                    default:
                        $scope.goBack();
                        break;
                }
            }

        }
    ])
