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
        '$ionicScrollDelegate',
        '$alert',
        '$ionicPopover',
        '$q',
        '$locals',
        function($scope,$config,$console,$httpService,$rootScope,$state,$stateParams,$timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate,$alert,$ionicPopover,$q,$locals){

            document.body.classList.remove('platform-ios');
            document.body.classList.remove('platform-android');
            document.body.classList.add('platform-ios');
            //$console.show("productDetail");
            var productHandle = $ionicScrollDelegate.$getByHandle('productHandle');
            var id = $stateParams.id;
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.replyList = []
            $scope.infiniteFlag = true;

            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
                $scope.commonBean.token = userInfo.loginToken;
            }

            if($stateParams.type==500){
                document.getElementById('productDetail').style.display='none';
                document.getElementById('productDetailContent').style.marginBottom = '0px';
            }else{
                document.getElementById('productDetailContent').style.marginBottom = '48px';
            }


            getProductDetail();
            function getProductDetail(){
                $scope.commonBean.cmd = $config.cmds.details;
                $scope.commonBean.parameters={
                    "productId":id
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //console.log(result);
                        //console.log('productDetail',result)
                        result.data["type"]=$stateParams.type;
                        $scope.product = result.data;
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack();
                        }
                    })
            }

            function getReplyList(){
                $scope.commonBean.cmd = $config.cmds.replyList;
                $scope.commonBean.parameters={
                    "productId":id,
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo,
                    "replyType": $scope.productType
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
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


            $scope.loadMore = function() {
                getReplyList();
            };

            $scope.judgeProduct = function(){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }

                $scope.commonBean.cmd = $config.cmds.collect;
                $scope.commonBean.parameters={
                    "productId": $scope.product.id,
                    "isCollect":$scope.product.isCollect?0:1
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //$console.show(result);
                        $scope.product.isCollect = $scope.product.isCollect?0:1;
                        $alert.show(result.msg)
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack();
                        }
                    })
            }

            $scope.buyProduct = function(){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                $state.go($config.controllers.orderPreview.name,{productId:id});
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

            $scope.report = function(productId){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                $state.go($config.controllers.report.name,{productId:productId});

            }

            $scope.$on('popover.hidden', function() {
                if($scope['productReport']){
                    $scope['productReport'].remove();
                    $scope['productReport']=null;
                }
            });

            $scope.replyObject = {
                "productId":id,
                "repUserId":0,
                "replyContents":null
            }

            $scope.productReply = function($event,userObject){
                if(!userInfo.loginToken){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                //$console.show(userObject);
                $scope.openPopover($event,'reply');
                $scope.replyPlaceholder = '回复@'+userObject.nickName;
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

                $scope.commonBean.cmd = $config.cmds.sendReply;
                $scope.commonBean.parameters={
                    "replyType":0,
                    "productId":$scope.replyObject.productId,
                    "repUserId":$scope.replyObject.repUserId,
                    "replyContents":$scope.replyObject.replyContents,
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
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
                        getProductDetail();
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }

            $scope.goBackBefore = function () {
                switch (parseInt($stateParams.type)){
                    case 101:
                        $state.go($config.controllers.myCollection.name);
                        break;
                    case 102:
                        $state.go($config.controllers.personalCenter.name,{userId:$scope.product.publicUser.id,type:20})
                        break;
                    case 103:
                        $state.go($config.controllers.tabsHome.name);
                        break;
                    case 104:
                        var type=1;
                        if($locals.get($config.home_type)==2){
                           type=2;
                        }else if($locals.get($config.home_type)==3){
                            type=3;
                        }else if($locals.get($config.home_type)==4){
                            type=4;
                        }
                        $state.go($config.controllers.productListByType.name,{type:type});
                        break;
                    default:
                        $scope.goBack();
                        break;
                }
            }

        }])
