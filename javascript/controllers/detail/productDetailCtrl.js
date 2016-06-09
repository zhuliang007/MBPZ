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


            var numberOfPerPage = 1;
            var pageNo = 0;
            $scope.replyList = []
            $scope.infiniteFlag = true;


            function getReplyList(){
                var data = {
                    "cmd": $config.cmds.replyList,
                    "parameters":{
                        "productId":id,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo,
                        "type": $scope.productType
                    }
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        var items = result.response.data.content;
                        if(items==null||items.length==0){
                            $scope.infiniteFlag = false;
                            return ;
                        }
                        addItem(items);
                        if(pageNo == result.response.data.totalPages-1 ){
                            $scope.infiniteFlag = false;
                            return;
                        }
                        pageNo++;
                    })
            }

            function addItem(items){
                for(var item in items){
                    $scope.replyList.push(items[item]);
                }
            }


            $scope.loadMore = function() {
                getReplyList();
            };



        }])