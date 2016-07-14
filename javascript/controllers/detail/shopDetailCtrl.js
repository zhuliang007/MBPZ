/**
 * Created by Administrator on 2016/6/8.
 */
angular.module('controllers.shopDetail',[])
    .controller('ShopDetailCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$rootScope',
        '$state',
        '$stateParams',
        '$timeout',
        '$ionicSlideBoxDelegate',
        '$ionicScrollDelegate',
        '$alert',
        '$ionicPopover',
        '$q',
        '$locals',
        function($scope,$config,$console,$httpService,$rootScope,$state,$stateParams,$timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate,$alert,$ionicPopover,$q,$locals){

            if(typeof(WKIT)=='undefined'){
                var head= document.getElementsByTagName('head')[0];
                var script= document.createElement('script');
                script.type= 'text/javascript';
                script.onload = script.onreadystatechange = function() {
                    if (!this.readyState || this.readyState === "loaded" ||    this.readyState === "complete" ) {
                        script.onload = script.onreadystatechange = null;
                    } };
                script.src= 'https://g.alicdn.com/aliww/??h5.imsdk/2.1.5/scripts/yw/wsdk.js,h5.openim.kit/0.4.0/scripts/kit.js';
                script.charset = 'utf-8';
                head.appendChild(script);
            }

            document.body.classList.remove('platform-ios');
            document.body.classList.remove('platform-android');
            document.body.classList.add('platform-ios');
            //$console.show("shopDetail")
            var productHandle = $ionicScrollDelegate.$getByHandle('productHandle');
            var id = $stateParams.id;
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.replyList = []
            $scope.infiniteFlag = true;
            var userInfo ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            var productSlideBox = $ionicSlideBoxDelegate.$getByHandle("productSlideBox");
            getProductDetail();
            function getProductDetail(){
                var data = {
                    "cmd": $config.cmds.details,
                    "parameters":{
                        "productId":id
                    },
                    "token": userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result);
                        $scope.product = result.data;
                        $timeout(function(){
                            if(productSlideBox){
                                productSlideBox.update();
                                $timeout(function(){
                                    if(productSlideBox.slidesCount()>1){
                                        $scope.showPager = true;
                                        productSlideBox.loop(true);
                                    }
                                    else{
                                        $scope.showPager = false;
                                    }
                                })
                            }
                        })
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }

            $scope.loadMore = function() {
                getReplyList();
            };

            function getReplyList(){
                var data = {
                    "cmd": $config.cmds.replyList,
                    "parameters":{
                        "productId":id,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo,
                        "replyType": 1
                    }
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        if(result.data.totalPages == 0){
                            $scope.infiniteFlag = false;
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
                    $scope.replyList.push(items[item]);
                }
            }


            $scope.openPopover = function($event,popName){
                if(!$scope[popName]){
                    $ionicPopover.fromTemplateUrl($config.popovers[popName].templateUrl,{
                        scope:$scope
                    }).then(function(popover){
                        $scope[popName] = popover;
                        $scope[popName].show($event);
                    })
                }
                else{
                    $scope[popName].show($event);
                }

            }

            $scope.closePopover = function(popName){
                $scope[popName].hide();
            }

            $scope.$on('$destroy', function() {
                if($scope['productReport']){
                    $scope['productReport'].remove();
                    $scope['productReport']=null;
                }

                if($scope['reply']){
                    $scope['reply'].remove();
                    $scope['reply']=null;
                }
            });

            $scope.$on('popover.hidden', function() {
                if($scope['productReport']){
                    $scope['productReport'].remove();
                    $scope['productReport']=null;
                }
            });

            $scope.judgeProduct = function(){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                var data = {
                    "cmd":$config.cmds.spot,
                    "parameters":{
                        "productId": $scope.product.id,
                        "isSpot":$scope.product.isSpot?0:1
                    },
                    "token":userInfo.loginToken
                };

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result);
                        $scope.product.isSpot = $scope.product.isSpot?0:1;
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }

            $scope.submitShop = function(){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                if($scope.userInfo.loginAccount == $scope.product.publicUser.loginAccount){
                    //$console.show("确认解决")
                    var data = {
                        "cmd": $config.cmds.resolve,
                        "parameters":{
                            "productId":id
                        },
                        "token":userInfo.loginToken
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $alert.show(result.msg)
                            getProductDetail();
                        },function(error){
                            //$console.show(error);
                            if(!error){
                                $scope.goBack()
                            }
                        })
                }
                else{
                    //$console.show("推荐给他");
                    $state.go($config.controllers.recommend.name,{productId:id,repUserId:$scope.product.publicUser.id});
                }
            }

            $scope.replyObject = {
                "productId":id,
                "repUserId":0,
                "replyContents":null
            }

            $scope.productReply = function($event,userObject,type){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                if(type==0){
                    //$console.show("楼主回复楼主，其他人回复楼主")
                    $scope.openPopover($event,'reply');
                    if($scope.userInfo.id==userObject.id){
                        $scope.replyPlaceholder = '回复';
                    }
                    else{
                        $scope.replyPlaceholder = '回复@'+userObject.nickName;
                    }
                    if(!$scope.replyObject.repUserId){
                        $scope.replyObject.repUserId = userObject.id;
                        $scope.replyObject.replyContents = null;
                    }
                    else{
                        if($scope.replyObject.repUserId != userObject.id){
                            $scope.replyObject.repUserId = userObject.id;
                            $scope.replyObject.replyContents = null;
                        }
                    }
                    //$console.show($scope.replyObject);
                }
                else{
                    if($scope.userInfo.id==$scope.product.publicUser.id){
                        $scope.openPopover($event,'reply');
                        //$console.show("楼主回复其他人")
                        if($scope.userInfo.id==userObject.id){
                            $scope.replyPlaceholder = '回复';
                        }
                        else{
                            $scope.replyPlaceholder = '回复@'+userObject.nickName;
                        }
                        if(!$scope.replyObject.repUserId){
                            $scope.replyObject.repUserId = userObject.id;
                            $scope.replyObject.replyContents = null;
                        }
                        else{
                            if($scope.replyObject.repUserId != userObject.id){
                                $scope.replyObject.repUserId = userObject.id;
                                $scope.replyObject.replyContents = null;
                            }
                        }
                        //$console.show($scope.replyObject);
                    }
                }
            }

            $scope.report = function(productId){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                $state.go($config.controllers.report.name,{productId:productId});
            }

            $scope.showResolveProduct = function($event,productId){
                $event.stopPropagation();
                $scope.showProduct(productId)
            }

            $scope.stopPropagation = function($event){
                $event.stopPropagation();
            }

            $scope.closeOwner = function(){
                $scope.closePopover('reply');
            }

            $scope.sendReply = function(){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                if(!$scope.replyObject.replyContents){
                    $alert.show("回复内容不能为空")
                    return;
                }

                var data ={
                    "cmd": $config.cmds.sendReply,
                    "parameters":{
                        "replyType":1,
                        "productId":$scope.replyObject.productId,
                        "repUserId":$scope.replyObject.repUserId,
                        "replyContents":$scope.replyObject.replyContents,
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        //$console.show(result);
                        $alert.show(result.msg);
                        $scope.replyObject.repUserId = 0;
                        $scope.replyObject.replyContents = null;
                        $scope.closeOwner();
                        pageNo = 0;
                        $scope.replyList = []
                        productHandle.resize();
                        var element = document.getElementById('replyBody');
                        productHandle.scrollTo(0,element.offsetTop);
                        $scope.infiniteFlag = true;
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }
        }])
