/**
 * Created by sam on 16/7/4.
 */
angular.module('controllers.cancalOrderCtrl',[])
    .controller('CancalOrderCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$state',
        '$stateParams',
        '$locals',
        '$rootScope',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope){

            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        //取消订单原因
                        var data = {
                            "cmd": $config.cmds.systemDict,
                            "parameters": {
                                "typeCode":"cancel_reason"
                            },
                            "token":$scope.userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                $scope.items = result.data.cancel_reason;
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }
            initToken();

            $scope.cancelResponse = {
                chooseType:"",
                textValue:""
            }

            $scope.submitOrder = function () {
                if($scope.cancelResponse.chooseType==''){
                    $alert('请选择取消订单原因')
                    return;
                }
                var _value = $scope.cancelResponse.chooseType;
                if($scope.cancelResponse.chooseType=='其他原因'){
                    _value=$scope.cancelResponse.textValue;
                }

                $scope.checkLogin()
                    .then(function(){
                        //取消订单原因
                        var responseData = {
                            "cmd":$config.cmds.cancelOrder,
                            "parameters": {
                                "id":$stateParams.id,
                                "cancelReason":_value
                            },
                            "token":$scope.userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),responseData)
                            .then(function(result){
                                alert(result.msg)
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

            $scope.goBackUp = function () {
                switch (parseInt($stateParams.type)){
                    case 0:
                        $state.go($config.controllers.orderDetail.name,{id:$stateParams.id,type:$stateParams.orderType});
                        break;
                    case 1:
                        $state.go($config.controllers.myBought.name);
                        break;
                }
            }



        }])
