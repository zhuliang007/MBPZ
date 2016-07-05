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

            //取消订单原因
            var data = {
                "cmd": $config.cmds.systemDict,
                "parameters": {
                    "typeCode":"cancel_reason"
                },
                "token":"ODkxOGJjZTItNDhiMy00NTVjLTlmNTAtMjVlYzI2MmQyMGI2"
            }
            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $scope.items = result.data.cancel_reason;
                })
            //$stateParams.id
        }])
