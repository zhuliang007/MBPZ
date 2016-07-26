/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('controllers.shop',[])
    .controller('ShopCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$httpService',
        '$keywords',
        '$ionicPopover',
        '$ionicScrollDelegate',
        '$locals',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$keywords,$ionicPopover,$ionicScrollDelegate,$locals){
            document.body.classList.remove('platform-ios');
            document.body.classList.remove('platform-android');
            document.body.classList.add('platform-ios');
            var tabsShopHandle = $ionicScrollDelegate.$getByHandle('tabsShopHandle');
            $scope.productList = []
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.infiniteFlag = true;
            $scope.sortText = '全部';
            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
                $scope.commonBean.token = userInfo.loginToken;
            }
            $keywords.setKeyWords($scope,'dictList')
                .then(function(result){
                    $scope.sortObject = result;
                })

            var sortSelect = null;


            function getProductShop(){
                $scope.commonBean.cmd = $config.cmds.getPage;

                if(!sortSelect)
                {
                    $scope.commonBean.parameters={
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo,
                        "type":1,
                        "sortType":'new_publish'
                    }
                }
                else{
                    switch (sortSelect.remark){
                        case 'sortType':
                            $scope.commonBean.parameters={
                                "numberOfPerPage":numberOfPerPage,
                                "pageNo":pageNo,
                                "type":1,
                                "sortType":sortSelect.value
                            }
                            break;
                        case 'isResolve':
                            $scope.commonBean.parameters={
                                "numberOfPerPage":numberOfPerPage,
                                "pageNo":pageNo,
                                "type":1,
                                "isResolve":sortSelect.value
                            }
                            break;
                    }
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //$console.show(result)
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
                    $scope.productList.push(items[item]);
                }
            }

            $scope.checkProductImages = function(productImageList){
                if(productImageList == null || productImageList.length==0){
                    return []
                }
                return productImageList.slice(0,3);
            }

            $scope.loadMore = function() {
                getProductShop();
            };

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
                if($scope['shopSort']){
                    $scope['shopSort'].remove();
                    $scope['shopSort']=null;
                }

            });

            $scope.$on('popover.hidden', function() {
                if($scope['shopSort']){
                    $scope['shopSort'].remove();
                    $scope['shopSort']=null;
                }
            });

            $scope.changeSort = function(sortItem){
                //$console.show(sortItem);
                $scope.closePopover('shopSort');
                if($scope.sortText != sortItem.name){
                    $scope.sortText = sortItem.name;
                    sortSelect = sortItem;
                    $scope.productList = [];
                    pageNo = 0;
                    $scope.infiniteFlag = true;
                    tabsShopHandle.resize();
                    tabsShopHandle.scrollTop();
                }
            }
        }])
