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
    function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$ionicSlideBoxDelegate,$timeout){
        $rootScope.token = $stateParams.token;

        $scope.homeQGXX = $config.getImageUrlDebug() + $config.assets.qgxx;

        var adSlideBox = $ionicSlideBoxDelegate.$getByHandle("adSlideBox");


        getAds();

        function getAds(){
            var data = {
                "cmd":$config.cmds.home.adInfo,
                "parameters":{
                    "adType" : $config.types.ad.Index
                },
                "token":$rootScope.token
            }
            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $console.show(result);
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



}])