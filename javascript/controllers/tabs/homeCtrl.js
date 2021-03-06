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
        '$locals',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$ionicSlideBoxDelegate,$timeout,$cache,$ionicModal,$city,$ionicScrollDelegate,$alert,$locals){
            var adSlideBox = $ionicSlideBoxDelegate.$getByHandle("adSlideBox");
            var productHomeHandle = $ionicScrollDelegate.$getByHandle('productHomeHandle');
            var QGXXListCache = [];
            var QGXXListCacheIndex = 0;
            $scope.productList = []
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.infiniteFlag = true;
            $locals.clearObject($config.home_type);

            var userInfo = {} ;
            setTimeout(function(){
                if($locals.getObject($config.user_local_info)!=null) {
                    userInfo =  $locals.getObject($config.user_local_info);
                    $scope.commonBean.token = userInfo.loginToken;
                }
                getAds();
                getQGXX();
            },200);
            $scope.loadMore = function() {
                if($locals.getObject($config.user_local_info)!=null) {
                    getProductHome();
                }
                else{
                    setTimeout(getProductHome,500);
                }
            };
            function getAds(){
                $scope.commonBean.cmd = $config.cmds.adInfo;
                $scope.commonBean.parameters={
                    "adType" : 'INDEX'
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
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
                $scope.commonBean.cmd = $config.cmds.getPage;
                $scope.commonBean.parameters={
                    "type":1,
                    "numberOfPerPage":10,
                    "pageNo":0
                }
                $cache.setValue($config.getRequestAction(),JSON.stringify($scope.commonBean),'qgHome')
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

            $scope.$on('$stateChangeSuccess', function() {
            });

            function getProductHome(){
                $scope.commonBean.cmd = $config.cmds.getPage;
                $scope.commonBean.parameters={
                    "numberOfPerPage":numberOfPerPage,
                    "city":$rootScope.currentCity&&$rootScope.currentCity!='城市'?$rootScope.currentCity:'',
                    "pageNo":pageNo,
                    "type":0
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //$console.show(result)
                        //console.log("home",result);
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
