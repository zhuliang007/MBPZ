/**
 * Created by Administrator on 2016/6/8.
 */
angular.module('controllers.productDetail',[])
    .controller('ProductDetailCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$rootScope',
        '$state',
        '$stateParams',
        '$timeout',
        '$ionicSlideBoxDelegate',
        '$locals',
        '$ionicPopover',
        '$q',
        function($scope,$config,$console,$httpService,$rootScope,$state,$stateParams,$timeout,$ionicSlideBoxDelegate,$locals,$ionicPopover,$q){
            document.body.classList.remove('platform-ios');
            document.body.classList.remove('platform-android');
            document.body.classList.add('platform-ios');
            $console.show("productDetail")
            var id = $stateParams.id;
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.replyList = []
            $scope.infiniteFlag = true;
            getProductDetail();
            function getProductDetail(){
                var data = {
                    "cmd": $config.cmds.details,
                    "parameters":{
                        "productId":id
                    },
                    "token": $scope.userInfo?$scope.userInfo.loginToken:''
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $scope.product = result.data;
                    },function(error){
                        $console.show(error);
                        if(error.systemError){
                            var systemError = error.systemError;
                            if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                $scope.autoLogin()
                                    .then(function(){
                                        getProductDetail();
                                    })
                            }
                        }
                    })
            }

            function getReplyList(){
                var data = {
                    "cmd": $config.cmds.replyList,
                    "parameters":{
                        "productId":id,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo,
                        "replyType": $scope.productType
                    }
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
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


            $scope.loadMore = function() {
                getReplyList();
            };

            $scope.judgeProduct = function(){
                $scope.checkLogin()
                    .then(function(){
                        var data = {
                            "cmd":$config.cmds.collect,
                            "parameters":{
                                "productId": $scope.product.id,
                                "isCollect":$scope.product.isCollect?0:1
                            },
                            "token":$scope.userInfo.loginToken
                        };

                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                $console.show(result);
                                $scope.product.isCollect = $scope.product.isCollect?0:1;
                            },function(error){
                                $console.show(error);
                                if(error.systemError){
                                    var systemError = error.systemError;
                                    if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                        $scope.autoLogin()
                                            .then(function(){
                                                getProductDetail();
                                            })
                                    }
                                }
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                getProductDetail()
                            })
                    })
            }

            $scope.buyProduct = function(){
                $scope.checkLogin()
                    .then(function(){
                        $state.go($config.controllers.orderPreview.name,{productId:id});
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                getProductDetail()
                            })
                    })
            }

            $scope.openPopover = function($event,popName){
                if(!$scope[popName]){
                    $ionicPopover.fromTemplateUrl($config.popovers[popName].templateUrl,{
                        scope:$scope
                    }).then(function(popover){
                        $scope[popName] = popover;
                        $scope[popName].show($event);
                        $console.show($event);
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
            });

            $scope.productReply = function($event,toReplyUserId){
                $console.show($event)
                $scope.openPopover($event,'reply');
            }

        }])