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
        '$locals',
        function($scope,$console,$config,$alert,$state,$stateParams,$httpService,$locals){
            //$console.show($stateParams);
            var userInfo ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }
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

            $scope.submit = function(){
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
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result);
                        $alert.show(result.msg)
                            .then(function(){
                                $scope.goBack();
                            })
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }
        }
    ])
