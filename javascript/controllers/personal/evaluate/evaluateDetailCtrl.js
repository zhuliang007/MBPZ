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
    function($scope,$console,$config,$alert,$state,$stateParams,$httpService){
        $console.show($stateParams);
        $scope.childEvaluateObject = {
            parentId:0,
            content:''
        }
        getEvaluateDetail();
        function getEvaluateDetail(){
            $scope.checkLogin()
                .then(function(){
                    var data = {
                        "cmd":$config.cmds.evaluateDetail,
                        "parameters":{
                            "orderId":$stateParams.orderId
                        },
                        "token":$scope.userInfo.loginToken
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $console.show(result);
                            $scope.detailObject = result.data;
                            $scope.childEvaluateObject.parentId = $scope.detailObject.id
                        },function(error){
                            $console.show(error)
                            if(error.systemError){
                                var systemError = error.systemError;
                                $alert.confirm(systemError.errorInfo)
                                    .then(function(){
                                        if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                            $scope.autoLogin()
                                                .then(function(){
                                                    getEvaluateDetail();
                                                })
                                        }
                                    },function(){
                                        $scope.goBack();
                                    })
                            }
                        })
                },function(){
                    $alert.confirm('请登录')
                        .then(function(){
                            $scope.autoLogin()
                                .then(function(){
                                    getEvaluateDetail();
                                })
                        },function(){
                            $scope.goBack();
                        })
                })

        }

        $scope.submit = function(){

            $scope.checkLogin()
                .then(function(){
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
                        "token":$scope.userInfo.loginToken
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $console.show(result);
                            $alert.show(result.msg)
                                .then(function(){
                                    getEvaluateDetail();
                                })
                        },function(error){
                            $console.show(error)
                            if(error.systemError){
                                var systemError = error.systemError;
                                $alert.confirm(systemError.errorInfo)
                                    .then(function(){
                                        if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                            $scope.autoLogin();
                                        }
                                    })
                            }
                        })

                },function(){
                    $alert.confirm('请登录')
                        .then(function(){
                            $scope.autoLogin();
                        })
                })

        }

    }
])