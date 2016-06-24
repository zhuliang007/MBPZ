/**
 * Created by Administrator on 2016/6/7.
 */
angular.module('controllers.start',[])
    .controller('StartCtrl',[
        '$scope',
        '$console',
        '$config',
        '$state',
        '$rootScope',
        '$state',
        '$stateParams',
        '$city',
        '$ionicModal',
        '$location',
        '$interval',
        '$httpService',
        '$ionicHistory',
        '$q',
        '$keywords',
        function($scope,$console,$config,$state,$rootScope,$state,$stateParams,$city,$ionicModal,$location,$interval,$httpService,$ionicHistory,$q,$keywords){

            var url = $location.url();
            if(!url){
                $state.go($config.controllers.tabsHome.name);
            }

            $scope.showMsg = function(msg){
                $console.show(msg);
            }

            $scope.resizeImage = function(id,imgUrl,scale){
                if(imgUrl){
                    var element = document.getElementById(id);
                    var $element = angular.element(element);
                    scale = scale || "1:1";
                    var scaleOption = parseFloat(scale.split(":")[0])/parseFloat(scale.split(":")[1]);
                    var imgWidth = element.offsetWidth || document.body.offsetWidth;
                    //var imgWidth = element.offsetWidth;
                    $element.css({"width":imgWidth + "px","height":(imgWidth/scaleOption)+"px"});
                    return {"background-image":"url("+imgUrl+")","-webkit-background-image":"url("+imgUrl+")"};
                }
            }

            $scope.setBackGroundImage = function(imgUrl){
                return {"background-image":"url("+imgUrl+")","-webkit-background-image":"url("+imgUrl+")"};

            }

            $scope.parseTime = function(time){
                if(time){
                    return DateFormat.format.prettyDate(time);
                }
            }

            $scope.defaultHead = $config.getImageUrlDebug() + $config.assets.defaultHead;
            $scope.homeQGXX = $config.getImageUrlDebug() + $config.assets.qgxx;
            $scope.halfCircle = $config.getImageUrlDebug() + $config.assets.halfCircle;
            $scope.loginBg = $config.getImageUrlDebug() + $config.assets.loginBg;
            $scope.launcher = $config.getImageUrlDebug() + $config.assets.launcher;


            /*$scope.orderReceive = {
                receiveName : '',
                receivePhone : '',
                address : ''
            }*/

            $rootScope.provinceCityList = {
                provinceList: [],
                cityList: [],
                districtList: []
            }



            $keywords.getProvinceCity()
                .then(function(result){
                    $rootScope.provinceCityList.provinceList = result.provinceList;
                    $rootScope.provinceCityList.cityList = result[110000];
                    $rootScope.provinceCityList.districtList = result[110100];
                })

            $scope.showProduct = function(id,type){
                var params = {type:type,id:id};
                $state.go($config.controllers.productDetail.name,params)
            }

            //联系卖家
            $scope.contactSeller = function (seller) {

            }

            $scope.showProductListByType = function(type){
                var params = {type:type};
                $state.go($config.controllers.productListByType.name,params)
            }

            $scope.myCenterSetup = function(_value){
                $state.go(_value)
            }

            $scope.backupDown = function(_value){
                $state.go(_value)
            }


            $scope.goBack = function(){
                var deferred = $q.defer();
                window.history.go(-1);
                deferred.resolve();
                return deferred.promise;
            }

            $city.setHotCity()
                .then(function(){
                    $scope.hotCityList = $city.hotCity;
                })

            $city.setAllCity()
                .then(function(){
                    $scope.allCityList = $city.allCity;
                })

            $scope.citySearch = '';

            $scope.openModal = function(modalName) {
                var deferred = $q.defer();
                if(!$scope[modalName]){
                    $ionicModal.fromTemplateUrl($config.modals[modalName].templateUrl, {
                        scope: $scope,
                        animation: $config.modals[modalName].animation
                    }).then(function(modal) {
                        $scope[modalName] = modal;
                        $scope[modalName].show();
                        deferred.resolve();
                    });
                }
                else{
                    deferred.resolve();
                }
                return deferred.promise;
            };
            $scope.closeModal = function(modalName) {
                $scope[modalName].hide().then(function(){
                    $scope[modalName].remove();
                })
            };
            $scope.$on('modal.removed', function() {
                if($scope['cityModal']){
                    $scope['cityModal'] = null;
                }

                if($scope['loginModal']){
                    $scope['loginModal'] = null;
                }

                if($scope['provinceCityModal']){
                    $scope['provinceCityModal'] = null;
                }
            });

            $scope.clearTel = function(){
                $scope.$$childTail.$$childTail.$$childTail.telNumber = '';
            }

            $scope.clearCode = function(){
                $scope.$$childTail.$$childTail.$$childTail.codeNumber = '';
            }

            $scope.codeTarget = '获取验证码';
            $scope.codeFlag = true;
            $scope.totalTime = 60;
            var time = $scope.totalTime;
            $scope.getCode = function(telNumber){

                if(!telNumber){
                    $console.show($config.messages.noTel);
                    return;
                }

                if($scope.codeFlag){
                    $scope.codeFlag = false;
                    $scope.codeTarget = '验证码'+time+'s';
                    var data = {
                        "cmd": $config.cmds.getSecurityCode,
                        "parameters":{
                            "loginAccount":telNumber
                        }
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $console.show(result)
                        })


                    var timeInterval = $interval(function(){
                        time--;
                        if(time<0){
                            $interval.cancel(timeInterval);
                            $scope.codeFlag = true;
                            time = $scope.totalTime;
                            $scope.codeTarget = '获取验证码';
                        }
                        else{
                            $scope.codeTarget = '验证码'+time+'s';
                        }
                    },1000)
                }
            }

        }
    ])