/**
 * Created by Administrator on 2016/6/8.
 */
angular.module('controllers.productDetail',[])
    .controller('ProductDetailCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$rootScope',
        '$state',
        '$stateParams',
        function($scope,$config,$console,$httpService,$rootScope,$state,$stateParams){
                $rootScope.token = $stateParams.token;
                $scope.productType = $stateParams.type;
                $scope.product = angular.fromJson($stateParams.product);
        }])