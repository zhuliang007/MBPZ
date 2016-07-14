/**
 * Created by zl_sam on 16/6/14.
 */
angular.module('controllers.walletCtrl',[])
    .controller('WalletCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$httpService',
        '$locals',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals){

            var userInfo ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            var data = {
                "cmd":$config.cmds.walletNum,
                "parameters":{
                },
                "token":userInfo.loginToken
            }
            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $scope.balance = result.data.balance==null?0:result.data.balance;
                    $scope.prePayment = result.data.prePayment==null?0:result.data.prePayment;
                })

        }])
