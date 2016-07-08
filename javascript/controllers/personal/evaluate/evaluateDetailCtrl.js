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

    }
])