/**
 * Created by sam on 16/7/6.
 */

angular.module('controllers.aliPayCtrl',[])
    .controller('AliPayCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$state',
        '$stateParams',
        '$locals',
        '$rootScope',
        '$ionicActionSheet',
        '$http',
        '$ionicModal',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet,$http,$ionicModal) {

        }])
.directive('pay', function(){
    return {
        restrict: 'E',
        transclude: true,
        template: '<iframe id="payWindow" width="100%" height="100%"></iframe>',
        controller: ['$scope', '$element', '$transclude','$stateParams', function ($scope, $element, $transclude,$stateParams) {
            document.getElementById("payWindow").src='http://erpuat.mengbp.com:8094/wine-market-rest/market/order/h5payOrder?orderCode='+$stateParams.obj.orderCode+'&token='+$stateParams.obj.token;
        }]
    };
});