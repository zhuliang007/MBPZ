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

            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        var data = {
                            "cmd":$config.cmds.walletNum,
                            "parameters":{
                            },
                            "token":$scope.userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                $scope.balance = result.data.balance==null?0:result.data.balance;
                                $scope.prePayment = result.data.prePayment==null?0:result.data.prePayment;
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }

            initToken();



        }])
