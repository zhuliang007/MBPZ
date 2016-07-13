/**
 * Created by Administrator on 2016/7/7.
 */
angular.module('controllers.orderEvaluate',[])
.controller('OrderEvaluateCtrl',[
    '$scope',
    '$console',
    '$config',
    '$alert',
    '$state',
    '$stateParams',
    '$httpService',
    function($scope,$console,$config,$alert,$state,$stateParams,$httpService){
        //$console.show($stateParams);

        $scope.orderEvaluateObject = {
            content:'',
            productMatche:0,
            expressSpeed:0
        }

        $scope.selectStar = function(type,starValue){
            if(type==0)
            {
                $scope.orderEvaluateObject.productMatche = starValue;
            }
            else if(type==1)
            {
                $scope.orderEvaluateObject.expressSpeed = starValue;
            }
        }



        $scope.checkLogin()
            .then(function(){
            },function(){
                $scope.autoLogin()
            })


        $scope.submit = function(){
            $scope.checkLogin()
                .then(function(){
                    if(!$scope.orderEvaluateObject.content){
                        $alert.show("评价内容不能为空");
                        return ;
                    }

                    if(!$scope.orderEvaluateObject.productMatche){
                        $alert.show("请选择描述相符星级");
                        return ;
                    }

                    if(!$scope.orderEvaluateObject.expressSpeed){
                        $alert.show("请选择物流速度星级");
                        return ;
                    }

                    var data = {
                        "cmd":$config.cmds.evaluateSave,
                        "parameters":{
                            "orderId":$stateParams.orderId,
                            "expressSpeed":$scope.orderEvaluateObject.expressSpeed,
                            "productMatche":$scope.orderEvaluateObject.productMatche,
                            "content":$scope.orderEvaluateObject.content
                        },
                        "token":$scope.userInfo.loginToken
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            //$console.show(result);
                            $alert.show(result.msg)
                                .then(function(){
                                    $scope.goBack();
                                })
                        },function(error){
                            //$console.show(error)
                        })

                },function(){
                    $scope.autoLogin()
                        .then(function(){
                            $scope.submit();
                        })
                })
        }
    }
])