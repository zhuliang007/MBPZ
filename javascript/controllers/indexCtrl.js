/**
 * Created by Administrator on 2016/6/7.
 */
angular.module('controllers.index',[])
    .controller('IndexCtrl',[
        '$rootScope',
        '$console',
        '$stateParams',
        '$state',
        '$config',
        function($rootScope,$console,$stateParams,$state,$config){
            $rootScope.token = $stateParams.token;
            $state.go($config.controllers.tabsHome.name,{token:$rootScope.token});
        }
    ])