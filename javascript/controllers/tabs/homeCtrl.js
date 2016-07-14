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
        '$ionicScrollDelegate',
        '$alert',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$ionicSlideBoxDelegate,$timeout,$cache,$ionicModal,$city,$ionicScrollDelegate,$alert){
            var adSlideBox = $ionicSlideBoxDelegate.$getByHandle("adSlideBox");
            var productHomeHandle = $ionicScrollDelegate.$getByHandle('productHomeHandle');
            var QGXXListCache = [];
            var QGXXListCacheIndex = 0;
            $scope.productList = []
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.infiniteFlag = true;

            getAds();
            getQGXX();
            function getAds(){
                var data = {
                    "cmd":$config.cmds.adInfo,
                    "parameters":{
                        "adType" : 'INDEX'
                    }
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $scope.adList = result.data;
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

            function getProductHome(){
                var data = {
                    "cmd": $config.cmds.getPage,
                    "parameters":{
                        "numberOfPerPage":numberOfPerPage,
                        "city":$rootScope.currentCity&&$rootScope.currentCity!='城市'?$rootScope.currentCity:'',
                        "pageNo":pageNo,
                        "type":0
                    }
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result)
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        if(result.data.totalPages == 0){
                            $scope.infiniteFlag = false;
                            $scope.productList = null;
                            return ;
                        }
                        var items = result.data.content;
                        if(items==null||items.length==0){
                            $scope.infiniteFlag = false;
                            return ;
                        }
                        addItem(items);
                        if(pageNo == result.data.totalPages-1 ){
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

            $rootScope.changeCity = function(city){
                if($rootScope.currentCity != city.name){
                    $rootScope.currentCity = city.name;
                    pageNo = 0;
                    $scope.infiniteFlag = true;
                    $scope.productList = [];
                    productHomeHandle.resize();
                    productHomeHandle.scrollTop();
                }
                $scope.closeModal('cityModal');

            }

        }])
