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
                var data = {
                        "cmd":$config.cmds.walletNum,
                        "parameters":{
                        },
                        "token":$locals.get('token','MmY1Zjk5N2MtZGY1OC00YTE4LWJhZTItZjUxMTI2NjY0YjM2')
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                            console.log(result);
                        $scope.balance = result.data.balance==null?0:result.data.balance;
                        $scope.prePayment = result.data.prePayment==null?0:result.data.prePayment;
                    })


        }])