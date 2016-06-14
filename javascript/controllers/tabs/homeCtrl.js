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
        '$ionicModal',
        '$city',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$ionicSlideBoxDelegate,$timeout,$cache,$ionicModal,$city){

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
                    "token":$scope.token
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $scope.adList = result.response.data;
                        adSlideBox.update();
                        $timeout(function(){
                            if(adSlideBox.slidesCount()>1){
                                $scope.showPager = true;
                                adSlideBox.loop(true);
                            }
                            else{
                                $scope.showPager = false;
                            }
                        })
                    })
            }

            $city.setHotCity()
                .then(function(){
                    $console.show($city.hotCity);
                    $scope.hotCityList = $city.hotCity;
                })

            $city.setAllCity()
                .then(function(){
                    $console.show($city.allCity);
                    $scope.allCityList = $city.allCity;
                })

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
                    "cmd": $config.cmds.getPage,
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
                        if(result.response.data.totalPages == 0){
                            $scope.infiniteFlag = false;
                            return ;
                        }
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


            $ionicModal.fromTemplateUrl($config.modals.city.templateUrl, {
                scope: $scope,
                animation: $config.modals.city.animation
            }).then(function(modal) {
                $scope.cityModal = modal;
            });

            $scope.openModal = function(modalName) {
                $scope[modalName].show();
                $scope.$$childTail.$$childTail.citySearch = '';

            };
            $scope.closeModal = function(modalName) {
                if($scope.$$childTail.$$childTail.citySearch){
                    $scope.$$childTail.$$childTail.citySearch = '';
                }
                else{
                    $scope[modalName].hide();
                }

            };
            $scope.citySearch = '';


            //遗留城市选择
            //遗留搜索功能



        }])