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
                    "numberOfPerPage":2,
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

        getProductHome()

        function getProductHome(){
            var data = {
                "cmd": "product/getPage",
                "parameters":{
                    "numberOfPerPage":1,
                    "pageNo":0,
                    "type":0
                }
            }

            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $console.show(result)
                    $scope.productList = result.response.data.content;
                })

        }








}])