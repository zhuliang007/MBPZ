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
        function($scope,$console,$config,$rootScope,$stateParams,$state){
            $rootScope.token = $stateParams.token;


        }])