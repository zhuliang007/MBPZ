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
        '$alert',
        function($scope,$console,$config,$state,$rootScope,$state,$stateParams,$city,$ionicModal,$location,$interval,$httpService,$ionicHistory,$q,$keywords,$alert){

            $scope.thirdType = 4;
            $scope.userPhone = purl().param('loginAccount');

            var url = $location.url();
            if(!url){
                $state.go($config.controllers.tabsHome.name);
            }


            $scope.autoLogin = function(){
                var deferred = $q.defer();
                var data = {
                    "cmd": $config.cmds.login,
                    "parameters":{
                        "loginAccount":$scope.userPhone,
                        "thirdType":$scope.thirdType
                    }
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $scope.userInfo = {
                            loginToken:result.data.loginToken,
                            loginAccount:result.data.loginAccount,
                            id:result.data.id,
                            city:result.data.city,
                            cityText:result.data.cityText,
                            introduce:result.data.introduce,
                            nickName:result.data.nickName,
                            province:result.data.province,
                            provinceText:result.data.provinceText,
                            sex:result.data.sex,
                            userImg:result.data.userImg,
                            userLevel:result.data.userLevel
                        }
                        $console.show($scope.userInfo);
                        $alert.show(result.msg);
                        deferred.resolve();
                    },function(error){
                        deferred.reject(error);
                    })

                return deferred.promise;
            }

            $scope.checkLogin = function(){
                var deferred = $q.defer();
                if($scope.userInfo){
                    $console.show("登录成功");
                    deferred.resolve();
                }
                else{
                    $console.show("需要登录");
                    deferred.reject();
                }
                return deferred.promise;
            }

            $scope.showMsg = function(msg,$event){
                $event.stopPropagation();
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
            $scope.icSale = $config.getImageUrlDebug()  + $config.assets.icSale;
            $scope.icWant = $config.getImageUrlDebug()  + $config.assets.icWant;
            $scope.icCancel = $config.getImageUrlDebug()  + $config.assets.icCancel;
            $scope.icAddPhoto = $config.getImageUrlDebug()  + $config.assets.icAddPhoto;
            $scope.mineAdd=$config.getImageUrlDebug() + $config.assets.mineAdd;
            $scope.mineBuy=$config.getImageUrlDebug() + $config.assets.mineBuy;
            $scope.mineCollect=$config.getImageUrlDebug() + $config.assets.mineCollect;
            $scope.mineRefunds=$config.getImageUrlDebug() + $config.assets.mineRefunds;
            $scope.mineRelease=$config.getImageUrlDebug() + $config.assets.mineRelease;
            $scope.mineSold=$config.getImageUrlDebug() + $config.assets.mineSold;
            $scope.mineUndercarriage=$config.getImageUrlDebug() + $config.assets.mineUndercarriage;
            $scope.mineWallet=$config.getImageUrlDebug() + $config.assets.mineWallet;
            $scope.mineAlipay=$config.getImageUrlDebug() + $config.assets.alipay;
            $scope.progresBar = $config.getImageUrlDebug()+$config.assets.progresBar;

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

            $scope.showProduct = function(id){
                var params = {id:id};
                $state.go($config.controllers.productDetail.name,params)
            }

            $scope.showShop = function(id){
                var params = {id:id};
                $state.go($config.controllers.shopDetail.name,params)
            }

            $scope.showDetail = function(product){
                switch (product.type){
                    case 'SELL':
                        $scope.showProduct(product.id)
                        break;
                    case 'ASK_TO_BUY':
                        $scope.showShop(product.id)
                        break;
                }
            }

            //联系卖家
            $scope.contactSeller = function (seller) {
                $scope.checkLogin()
                    .then(function(){
                        if($scope.userInfo.loginAccount == seller.loginAccount){
                            $alert.show("当前用户是您")
                            return;
                        }

                        $state.go($config.controllers.messageChat.name,{
                            uid:$scope.userInfo.loginAccount,
                            credential:$scope.userInfo.loginAccount,
                            touid:seller.loginAccount,
                            nickName:seller.nickName,
                            type:2})

                    },function(){
                        $alert.confirm('请登录')
                            .then(function(){
                                $scope.autoLogin()
                                    .then(function(){
                                        $scope.contactSeller(seller);
                                    })
                            })
                    })
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

            $rootScope.orderPreviewObject = {};

            $scope.openModal = function(modalName) {
                var deferred = $q.defer();
                if(!$scope[modalName]){
                    $ionicModal.fromTemplateUrl($config.modals[modalName].templateUrl, {
                        scope: $scope,
                        animation: $config.modals[modalName].animation
                    }).then(function(modal) {
                        if(!$scope[modalName]){
                            $scope[modalName] = modal;
                        }
                        if(!$scope[modalName].isShown()){
                            $scope[modalName].show();
                        }
                        deferred.resolve();
                    });
                }
                else{
                    deferred.resolve();
                }
                return deferred.promise;
            };

            //开启支付
            $scope.openPayModal = function(modalName) {
                var deferred = $q.defer();
                if(!$scope[modalName]){
                    $ionicModal.fromTemplateUrl($config.modals[modalName].templateUrl, {
                        scope: $rootScope,
                        animation: $config.modals[modalName].animation
                    }).then(function(modal) {
                        if(!$rootScope[modalName]){
                            $rootScope[modalName] = modal;
                        }
                        if(!$rootScope[modalName].isShown()){
                            $rootScope[modalName].show();
                        }
                        deferred.resolve();
                    });
                }
                else{
                    deferred.resolve();
                }
                return deferred.promise;
            };

            //关闭支付
            $rootScope.closePayModal = function(modalName) {
                $rootScope[modalName].hide().then(function(){
                    $rootScope[modalName].remove();
                })
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

                if($scope['publishModal']){
                    $scope['publishModal'] = null;
                }
            });

            $scope.clearTel = function(){
                $scope.$$childTail.$$childTail.$$childTail.telNumber = '';
            }

            $scope.clearCode = function(){
                $scope.$$childTail.$$childTail.$$childTail.codeNumber = '';
            }

            $scope.goPublish = function(type,id){
                $scope.checkLogin()
                    .then(function(){
                        if(id){
                            $state.go($config.controllers.publish.name,{type:type,id:id});
                        }
                        else{
                            $state.go($config.controllers.publish.name,{type:type});
                            $scope.closeModal('publishModal');
                        }
                    },function(){
                        $alert.confirm('请登录')
                            .then(function(){
                                $scope.autoLogin()
                                    .then(function(){
                                        $scope.goPublish(type);
                                    })
                            },function(){
                                $scope.closeModal('publishModal');
                            })
                    })

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

            $scope.checkProductImages = function(productImageList){
                if(productImageList == null || productImageList.length==0){
                    return []
                }
                return productImageList.slice(0,3);
            }

            //是否当前登陆用户,判断按钮权限
            $scope.isCurrentUser = function (currentUserId,userId) {
                if (currentUserId == userId) {
                    return false;
                }
                return true;
            }
            $scope.showPersonalCenter = function($event,userId){
                $event.stopPropagation();
                $state.go($config.controllers.personalCenter.name,{userId:userId});
            }
        }
    ])