/**
 * Created by Administrator on 2016/6/12.
 */
angular.module('controllers.productListByTypeCtrl',[])
    .controller('ProductListByTypeCtrl',[
        '$scope',
        '$config',
        '$console',
        '$state',
        '$stateParams',
        '$productType',
        '$httpService',
        '$ionicPopover',
        '$ionicScrollDelegate',
        '$timeout',
        '$ionicModal',
        '$rootScope',
        function($scope,$config,$console,$state,$stateParams,$productType,$httpService,$ionicPopover,$ionicScrollDelegate,$timeout,$ionicModal,$rootScope){
            document.body.classList.remove('platform-ios');
            document.body.classList.remove('platform-android');
            document.body.classList.add('platform-ios');
            var numberOfPerPage = 5;
            var pageNo = 0;
            $scope.getChildTypeCode = {};
            $scope.productList = [];
            $scope.filterFlag = true;
            $scope.infiniteFlag = true;
            var productListByTypeHandle = $ionicScrollDelegate.$getByHandle('productListByTypeHandle');
            $scope.filterObject = {
                parentClassify :'',
                secondClassify : '',
                city : '',
                beginPrice : null,
                endPrice : null,
                sortType:''
            }
            $scope.priceObject = {
                beginPrice:null,
                endPrice:null
            }
            checkType();
            function checkType(){
                $productType.setTypeCodes($scope)
                    .then(function(){
                        switch (parseInt($stateParams.type,10)){
                            case 2:
                                $scope.filterObject.parentClassify = 'BBYP';
                                $scope.childCode= 'BBYP';
                                break;
                            case 3:
                                $scope.filterObject.parentClassify = 'MMYP';
                                $scope.childCode = 'MMYP';
                                break;
                            case 4:
                                $scope.filterObject.parentClassify = 'JJYP';
                                $scope.childCode = 'JJYP';
                                break;
                        }
                        if(parseInt($stateParams.type,10)==1){
                            $scope.pageTitle = '官方推荐';
                            $scope.filterFlag = false
                        }
                        else{
                            $scope.getChildTypeCode = $productType.getChildTypeCode($scope.filterObject.parentClassify);
                            $scope.pageTitle = $scope.getChildTypeCode.name;
                        }
                    });

                $productType.setFilterOrderTypes()
                    .then(function(){
                        $scope.intelligentClassifyList = $productType.Classify.intelligentClassifyList;
                        $scope.priceClassifyList = $productType.Classify.priceClassifyList;
                    })
            }

            function getRecommendationProducts(){
                $scope.commonBean.cmd = $config.cmds.getPage;
                $scope.commonBean.parameters={
                    "isProductRecommoned":"1",
                    "type":"0",
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo
                }
                $scope.commonBean.token = null;

                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        if(result.data.totalPages == 0){
                            $scope.infiniteFlag = false;
                            $scope.productList = null;
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

            function getOtherProducts(){
                $scope.commonBean.cmd = $config.cmds.getPage;
                $scope.commonBean.parameters={
                    "parentClassify":$scope.filterObject.parentClassify,
                    "secondClassify": $scope.filterObject.secondClassify==$scope.childCode?'':$scope.filterObject.secondClassify,
                    "city":$scope.filterObject.city&&$scope.filterObject.city!='城市'?$scope.filterObject.city:'',
                    "beginPrice":$scope.checkPrice()?null:$scope.priceObject.beginPrice,
                    "endPrice": $scope.checkPrice()?null:$scope.priceObject.endPrice,
                    "sortType": $scope.filterObject.sortType,
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo,
                    "type":0
                }
                $scope.commonBean.token = null;

                //$console.show(data);
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //$console.show(result);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        if(result.data.totalPages == 0){
                            $scope.infiniteFlag = false;
                            $scope.productList = null;
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
                if($scope.productList==null){
                    $scope.productList = [];
                }
                for(var item in items){
                    $scope.productList.push(items[item]);
                }
            }

            $scope.loadMore = function() {
                switch (parseInt($stateParams.type,10)){
                    case 1:
                        getRecommendationProducts();
                        break;
                    case 2:
                        $scope.filterObject.parentClassify = 'BBYP';
                        $scope.childCode = 'BBYP';
                        getOtherProducts();
                        break;
                    case 3:
                        $scope.filterObject.parentClassify = 'MMYP';
                        $scope.childCode = 'MMYP';
                        getOtherProducts();
                        break;
                    case 4:
                        $scope.filterObject.parentClassify = 'JJYP';
                        $scope.childCode = 'JJYP';
                        getOtherProducts();
                        break;
                }
            };

            $scope.openPopover = function($event,popName){
                //$console.show($scope[popName])
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
                if($scope['filterType']){
                    $scope['filterType'].remove();
                    $scope['filterType']=null;
                }

                if($scope['filterOrder']){
                    $scope['filterOrder'].remove();
                    $scope['filterOrder']=null;
                }

                if($scope['filterPrice']){
                    $scope['filterPrice'].remove();
                    $scope['filterPrice']=null;
                }
            });

            $scope.showFilter = function(childType){
                if(!childType){
                    $scope.childTypeName = '全部';
                }
                else{
                    $scope.childTypeName = childType.name;
                }
                $scope.productList = [];
                productListByTypeHandle.resize();
                productListByTypeHandle.scrollTop();
                pageNo = 0;
                $scope.infiniteFlag = true;
                $scope.closePopover('filterType');
            }

            $scope.showFilterOrder = function(intelligentClassify){
                $scope.intelligentClassifyName = intelligentClassify.name;
                $scope.productList = [];
                productListByTypeHandle.resize();
                productListByTypeHandle.scrollTop();
                pageNo = 0;
                $scope.infiniteFlag = true;
                $scope.closePopover('filterOrder');
            }

            $scope.checkPrice = function(){
                if($scope.priceObject.beginPrice!=null && $scope.priceObject.endPrice!=null){
                    if($scope.priceObject.beginPrice<$scope.priceObject.endPrice){
                        return false;
                    }
                    return true;
                }
                return true;
            }

            $scope.resetPrice = function(){
                $scope.priceObject.beginPrice = null;
                $scope.priceObject.endPrice = null;
                $scope.productList = [];
                productListByTypeHandle.resize();
                productListByTypeHandle.scrollTop();
                pageNo = 0;
                $scope.infiniteFlag = true;
                $scope.closePopover('filterPrice');
            }


            $scope.filterByPrice = function(){
                $scope.productList = [];
                productListByTypeHandle.resize();
                productListByTypeHandle.scrollTop();
                pageNo = 0;
                $scope.infiniteFlag = true;
                $scope.closePopover('filterPrice');
            }

            $rootScope.changeCity = function(city){
                if($scope.filterObject.city != city.name){
                    $scope.filterObject.city = city.name;
                    pageNo = 0;
                    $scope.infiniteFlag = true;
                    $scope.productList = [];
                    productListByTypeHandle.resize();
                    productListByTypeHandle.scrollTop();
                }
                $scope.closeModal('cityModal');
            }

            $scope.goBackBefore = function(){
                $state.go($config.controllers.tabsHome.name);
            }
        }
    ])
