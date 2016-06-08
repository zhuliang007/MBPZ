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
            '$timeout',
            '$ionicSlideBoxDelegate',
            function($scope,$config,$console,$httpService,$rootScope,$state,$stateParams,$timeout,$ionicSlideBoxDelegate){
                    $rootScope.token = $stateParams.token;
                    $scope.productType = $stateParams.type;
                    $scope.product = angular.fromJson($stateParams.product);
                    $console.show($scope.product);
                    var productSlideBox = $ionicSlideBoxDelegate.$getByHandle("productSlideBox");
                    $timeout(function(){
                            if(productSlideBox){
                                    productSlideBox.update();
                                    $timeout(function(){
                                            if(productSlideBox.slidesCount()>1){
                                                    $scope.showPager = true;
                                                    productSlideBox.loop(true);
                                            }
                                            else{
                                                    $scope.showPager = false;
                                            }
                                    })
                            }
                    })





            }])