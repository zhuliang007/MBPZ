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

            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            init = function(){
                //取消订单原因
                var data = {
                    "cmd": $config.cmds.systemDict,
                    "parameters": {
                        "typeCode":"cancel_reason"
                    },
                    "token":userInfo.loginToken
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $scope.items = result.data.cancel_reason;
                    })
            }
            init();

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
                //取消订单原因
                var responseData = {
                    "cmd":$config.cmds.cancelOrder,
                    "parameters": {
                        "id":$stateParams.id,
                        "cancelReason":_value
                    },
                    "token":userInfo.loginToken
                }
                $httpService.getJsonFromPost($config.getRequestAction(),responseData)
                    .then(function(result){
                        $alert.show(result.msg);
                        $state.go($config.controllers.tabsPersonal.name,null,{reload:true});
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

