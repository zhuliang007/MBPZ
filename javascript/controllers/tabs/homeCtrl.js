/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('controllers.home',[])
    .controller('HomeCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$httpService',
        '$ionicSlideBoxDelegate',
        '$timeout',
        '$cache',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$ionicSlideBoxDelegate,$timeout,$cache){

            $rootScope.token = $stateParams.token;

            $scope.homeQGXX = $config.getImageUrlDebug() + $config.assets.qgxx;

            var adSlideBox = $ionicSlideBoxDelegate.$getByHandle("adSlideBox");

            getAds();

            function getAds(){
                var data = {
                    "cmd":$config.cmds.adInfo,
                    "parameters":{
                        "adType" : $config.types.ad.Index
                    },
                    "token":$rootScope.token
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $scope.adList = result.response.data;
                        adSlideBox.update();
                        $timeout(function(){
                            /*if(adSlideBox.slidesCount()){
                             $scope.showPager = false;
                             }
                             else{
                             $scope.showPager = true;
                             adSlideBox.start();
                             }*/
                        })
                    })
            }

            getQGXX();
            var QGXXListCache = [];
            var QGXXListCacheIndex = 0;

            function getQGXX(){
                var data = {
                    "cmd":$config.cmds.getPage,
                    "parameters":{
                        "type":1,
                        "numberOfPerPage":10,
                        "pageNo":0
                    }
                }

                $cache.setValue($config.getRequestAction(),data,'qgHome')
                    .then(function(result){
                        QGXXListCache = $cache.getValue('qgHome');
                        slideQGXX();
                    })
            }

            function slideQGXX(){
                $scope.QGXXList = [];
                if(QGXXListCache.length>2){
                    if(QGXXListCacheIndex == QGXXListCache.length){
                        QGXXListCacheIndex = 0
                    }
                    $scope.QGXXList.push(QGXXListCache[QGXXListCacheIndex]);
                    QGXXListCacheIndex++;
                    if(QGXXListCacheIndex == QGXXListCache.length){
                        QGXXListCacheIndex = 0
                    }
                    $scope.QGXXList.push(QGXXListCache[QGXXListCacheIndex]);
                    QGXXListCacheIndex++;
                }
                else{
                    $scope.QGXXList = QGXXListCache;
                }
                $timeout(function(){
                    slideQGXX();
                },2000)
            }


            $scope.loadMore = function() {
                getProductHome();
            };

            $scope.productList = []
            var numberOfPerPage = 10;
            var pageNo = 0;
            function getProductHome(){
                var data = {
                    "cmd": "product/getPage",
                    "parameters":{
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo,
                        "type":0
                    }
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result)
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
                    $scope.productList.push(items[item]);
                }
            }

            $scope.checkProductImages = function(productImageList){
                if(productImageList == null || productImageList.length==0){
                    return []
                }
                return productImageList.slice(0,3);
            }

            $scope.infiniteFlag = true;

        }])