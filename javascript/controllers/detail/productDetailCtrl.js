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
        function($scope,$config,$console,$httpService,$rootScope,$state,$stateParams,$timeout,$ionicSlideBoxDelegate,$locals){
            $scope.productType = $stateParams.type;
            var id = $stateParams.id;
            var productSlideBox = $ionicSlideBoxDelegate.$getByHandle("productSlideBox");

            getProductDetail();
            function getProductDetail(){
                var data = {
                    "cmd": $config.cmds.details,
                    "parameters":{
                        "productId":id
                    },
                    "token": $locals.get('token','')
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
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
                        $console.show(error);
                    })
            }
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.replyList = []
            $scope.infiniteFlag = true;
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


            $scope.buyProduct = function(){
                if(!$locals.get('token','')){
                    $console.show("需要登录")
                    return ;
                }

                if($locals.get('userId',0)==$scope.product.publicUser.id){
                    $console.show("是帖子本人")
                    return;
                }
            }

            $scope.judgeProduct = function(){
                if(!$locals.get('token','')){
                    $scope.openModal('loginModal');
                    return ;
                }
                var data = {
                    "parameters":{
                        "productId": $scope.product.id,
                    },
                    "token":$locals.get('token','')
                };
                if($scope.productType==0){
                    data.cmd = $config.cmds.collect;
                    data.parameters.isCollect = $scope.product.isCollect?0:1;
                }
                else if($scope.productType == 1){
                    data.cmd = $config.cmds.spot;
                    data.parameters.isCollect = $scope.product.isSpot?0:1;
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        if(result){
                            $console.show(result);
                            $scope.product.isCollect=$scope.product.isCollect?0:1;
                        }
                        else{
                            if(result.error.errorCode==15 || result.error.errorCode==14){
                                $scope.openModal('loginModal');
                            }
                        }
                    })
            }


            $rootScope.login = function(telNumber,codeNumber){
                if(!telNumber){
                    $console.show($config.messages.noTel);
                    return;
                }
                if(!codeNumber){
                    $console.show($config.messages.noCode);
                    return;
                }
                var data = {
                    "cmd": $config.cmds.login,
                    "parameters":{
                        "loginAccount":telNumber,
                        "securityCode":codeNumber
                    }
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $locals.set('token',result.data.loginToken);
                        $locals.set('userId',result.data.id);
                        $scope.closeModal('loginModal');
                        getProductDetail();
                    })

            }



        }])