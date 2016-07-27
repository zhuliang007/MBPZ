/**
 * Created by Administrator on 2016/6/7.
 */
angular.module('controllers.start',[])
    .controller('StartCtrl',[
        '$scope',
        '$console',
        '$config',
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
        '$locals',
        function($scope,$console,$config,$rootScope,$state,$stateParams,$city,$ionicModal,$location,$interval,$httpService,$ionicHistory,$q,$keywords,$alert,$locals){

            $scope.thirdType = 4;
            var token = purl().param('loginToken');
            var account = purl().param('loginAccount');
            $scope.userPhone = token?token:account;
//ZDEzYTlmNDAtOTBjYy00NTRhLTk4M2UtY2ViM2U5ZWZmNjU1
            $scope.commonBean = new commonBean();

            login = function(){
                if($scope.userPhone){
                //登录获取token
                //if($locals.getObject($config.user_local_info,$scope.userInfo)){
                //    $scope.userInfo = $locals.getObject($config.user_local_info);
                //}else if($scope.userPhone){
                    $locals.set($config.u_p, $scope.userPhone);
                    //var data = {
                    //    "cmd": $config.cmds.h5Login,
                    //    "parameters":{
                    //        "loginAccount":account,
                    //        "loginToken":token
                    //    }
                    //}

                    $scope.commonBean.cmd = $config.cmds.h5Login;
                    $scope.commonBean.parameters={
                        "loginAccount":account,
                        "loginToken":token
                    }
                    $scope.commonBean.token = null;
                    $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
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
                            if(result.data.loginToken){
                                $locals.setObject($config.user_local_info,$scope.userInfo);
                            }else{
                                $locals.clearObject($config.user_local_info);
                                $locals.clearObject($config.u_p);
                            }
                        })
                }else{
                    $locals.clearObject($config.user_local_info);
                    $locals.clearObject($config.u_p);
                }
            }
            //
            //console.log($scope.userPhone)
            //console.log($locals.get($config.u_p,null))

            //if(!$scope.userPhone||!$locals.get($config.u_p,null)){
            //    $locals.clearObject($config.user_local_info);
            //    $locals.clearObject($config.u_p);
            //    console.log('!$scope.userPhone||!$locals.get($config.u_p,null)')
            //    login();
            //}
            //else if($scope.userPhone&&$locals.get($config.u_p,null)&&$scope.userPhone!=$locals.get($config.u_p,null)){
            //    console.log('$scope.userPhone&&$locals.get($config.u_p,null)&&$scope.userPhone!=$locals.get($config.u_p,null)')
            //    $locals.clearObject($config.user_local_info);
            //    $locals.clearObject($config.u_p);
            //    login();
            //}
            //else{
                login();
            //}


            var url = $location.url();
            if(!url){
                $state.go($config.controllers.tabsHome.name);
            }

            $scope.autoLogin = function(){
                var deferred = $q.defer();
                if($scope.userPhone){
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
                            //var obj = $locals.getObject($config.USER_INFO_NAME);
                            //if(obj==null){
                            //    $locals.setObject($config.USER_INFO_NAME,$scope.userInfo);
                            //}
                            deferred.resolve();
                        },function(error){
                            deferred.reject(error);
                        })
                }
                else{
                    $alert.show('请先登录萌宝派');
                    deferred.reject();
                }
                return deferred.promise;
            }

            $scope.checkLogin = function(){
                var deferred = $q.defer();
                if($scope.userInfo){
                    //$console.show("登录成功");
                    deferred.resolve();
                }
                else{
                    //$console.show("需要登录");
                    deferred.reject();
                }
                return deferred.promise;
            }

            $scope.showMsg = function(msg,$event){
                $event.stopPropagation();
                //$console.show(msg);
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
                    var tempStrs = time.split(" ");
                    var dateStrs = tempStrs[0].split("-");
                    var year = parseInt(dateStrs[0], 10);
                    var month = parseInt(dateStrs[1], 10) - 1;
                    var day = parseInt(dateStrs[2], 10);
                    var timeStrs = tempStrs[1].split(":");
                    var hour = parseInt(timeStrs[0], 10);
                    var minute = parseInt(timeStrs[1], 10);
                    var second = parseInt(timeStrs[2], 10);
                    var date = new Date(year, month, day, hour, minute, second);
                    return DateFormat.format.prettyDate(date);
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

            $keywords.getProvinceCity($scope)
                .then(function(result){
                    $rootScope.provinceCityList.provinceList = result.provinceList;
                    $rootScope.provinceCityList.cityList = result[110000];
                    $rootScope.provinceCityList.districtList = result[110100];
                })

            $scope.showProduct = function(id,type){
                if($locals.get($config.home_type)){
                    type='104';
                }
                var params = {id:id,type:type};
                $state.go($config.controllers.productDetail.name,params)
            }

            $scope.showShop = function(id,type){
                var params = {id:id,type:type};
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
            $scope.contactSeller = function (seller,id,type,homeType) {
                $locals.clearObject($config.seller_type)
                if(homeType==0){
                    $locals.set($config.seller_type,homeType)
                }
                if($scope.userInfo==undefined||!$scope.userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }

                if($scope.userInfo.loginAccount == seller.loginAccount){
                    $alert.show("当前用户是您")
                    return;
                }
               var  data={
                    "uid":seller.loginAccount,
                    "nickname":seller.nickName,
                    "userImage":$scope.userInfo.userImg?$scope.userInfo.userImg+'@414w':'',
                    "avators":seller.userImg?seller.userImg+'@414w':'',
                    "productId":id==null?"":id,
                    "type":type,
                    "currentId":seller.id
                };

                $scope.clickChats(data,type);

                //$state.go($config.controllers.messageChat.name,{
                //    uid:$scope.userInfo.loginAccount,
                //    credential:$scope.userInfo.loginAccount,
                //    touid:seller.loginAccount,
                //    nickName:seller.nickName,
                //    type:2,
                //    userImage:$scope.userInfo.userImg?$scope.userInfo.userImg+'@414w':'',
                //    toUserImage:seller.userImg?seller.userImg+'@414w':''})

            }

            $scope.showProductListByType = function(type){
                $locals.clearObject($config.home_type);
                $locals.set($config.home_type,type);
                var params = {type:type};
                $state.go($config.controllers.productListByType.name,params)
            }

            $scope.myCenterSetup = function(_value){
                if($scope.userInfo==undefined||!$scope.userInfo.loginToken){
                    $alert.show('请先登录萌宝派');
                }else{
                    $state.go(_value)
                }
            }
            $scope.messageSetup = function (_value,_id) {
                if($scope.userInfo==undefined||!$scope.userInfo.loginToken){
                    $alert.show('请先登录萌宝派');
                }else{
                    $scope.commonBean.cmd = $config.cmds.setMessageType;
                    $scope.commonBean.token = $scope.userInfo.loginToken;
                    $scope.commonBean.parameters={
                        "id":_id
                    }
                    
                    //console.log(_id)
                    $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                        .then(function (result) {
                            
                        })
                    $state.go(_value)
                }
            }
            
            $scope.mySetupHelp = function(_value){
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

            $city.setHotCity($scope)
                .then(function(){
                    $scope.hotCityList = $city.hotCity;
                })

            $city.setAllCity($scope)
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
                if($scope.userInfo==undefined||!$scope.userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                if(id){
                    $state.go($config.controllers.publish.name,{type:type,id:id});
                }
                else{
                    $state.go($config.controllers.publish.name,{type:type});
                    $scope.closeModal('publishModal');
                }
            }

            $scope.codeTarget = '获取验证码';
            $scope.codeFlag = true;
            $scope.totalTime = 60;
            var time = $scope.totalTime;
            $scope.getCode = function(telNumber){

                if(!telNumber){
                    //$console.show($config.messages.noTel);
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
                            //$console.show(result)
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
            $scope.showPersonalCenter = function($event,userId,type,productId){
                if($scope.userInfo==undefined||!$scope.userInfo.loginToken){
                    $alert.show('请先登录萌宝派');
                }else{
                    $event.stopPropagation();
                    $state.go($config.controllers.personalCenter.name,{userId:userId,type:type,productId:productId});
                }
            }

            $scope.clickChats = function(data,type){
                $locals.clearObject('mkit');
                var json = JSON.stringify(data)
                var item = JSON.parse(json);

                var data = {
                    "uid":$scope.userInfo.loginAccount,
                    "credential":$scope.userInfo.loginAccount,
                    "touid":item.uid,
                    "nickName":item.nickname,
                    "type":type,
                    "userImage":item.userImage,
                    "toUserImage":item.avators,
                    "appkeys":$config.appkeys,
                    "orderId":data.orderId,
                    "orderType":data.orderType,
                    "productId":data.productId,
                    "currentId":data.currentId,
                    "loginToken":token
                }

                $locals.setObject('mkit',data);

                window.location.href = $config.getChatUrl();
            }
        }
    ])
