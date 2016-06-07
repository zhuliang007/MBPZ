/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('controllers.shop',[])
.controller('ShopCtrl',[
    '$scope',
    '$console',
    '$config',
    '$rootScope',
    '$stateParams',
    '$state',
    function($scope,$console,$config,$rootScope,$stateParams,$state){
        $rootScope.token = $stateParams.token;


    }])