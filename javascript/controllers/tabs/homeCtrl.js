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
    '$interval',
    function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$ionicSlideBoxDelegate,$timeout,$interval){
        $rootScope.token = $stateParams.token;

        $scope.homeQGXX = $config.getImageUrlDebug() + $config.assets.qgxx;

        var adSlideBox = $ionicSlideBoxDelegate.$getByHandle("adSlideBox");

        var numberOfPerPageQGXX = 1;
        var pageNoQGXX = 0;

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

        /*$interval(function(){
            getQGXX();
        },2000);*/
        getQGXX();


        function getQGXX(){
            $console.show(pageNoQGXX);
            var data = {
                "cmd":$config.cmds.getPage,
                "parameters":{
                    "type":1,
                    "numberOfPerPage":numberOfPerPageQGXX,
                    "pageNo":pageNoQGXX
                }
            }
            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $console.show(result);
                    $scope.QGXXList = result.response.data.content;
                    $console.show(result.response.data.totalPages);
                    //pageNoQGXX = ((pageNoQGXX+1) == result.response.data.totalPages)? 0 : pageNoQGXX+1;
                    //$console.show(pageNoQGXX);
                })
        }



}])