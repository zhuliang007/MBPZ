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
                    var id = $stateParams.id
                    var productSlideBox = $ionicSlideBoxDelegate.$getByHandle("productSlideBox");

                    getProductDetail();
                    function getProductDetail(){
                            var data = {
                                    "cmd": $config.cmds.details,
                                    "parameters":{
                                            "productId":id
                                    }
                            }

                            $httpService.getJsonFromPost($config.getRequestAction(),data)
                                .then(function(result){
                                        $console.show(result);
                                        $scope.product = result.response.data;
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
                                })
                    }






            }])