/**
 * Created by Administrator on 2016/7/8.
 */
angular.module('controllers.personalCenter',[])
    .controller('PersonalCenterCtrl',[
        '$scope',
        '$console',
        '$config',
        '$alert',
        '$state',
        '$stateParams',
        '$httpService',
        function($scope,$console,$config,$alert,$state,$stateParams,$httpService){
            $console.show($stateParams)
        }])