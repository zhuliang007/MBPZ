/**
 * Created by zl_sam on 16/6/13.
 */

angular.module('controllers.FeedbackCtrl',[])
    .controller('FeedbackCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        function($scope,$console,$config,$rootScope,$stateParams,$state){
            $rootScope.token = $stateParams.token;


        }])