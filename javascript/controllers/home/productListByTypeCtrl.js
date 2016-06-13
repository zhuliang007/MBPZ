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
    function($scope,$config,$console,$state,$stateParams,$productType,$httpService,$ionicPopover){
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-ios');

        var numberOfPerPage = 5;
        var pageNo = 0;
        $scope.getChildTypeCode = {};
        $scope.productList = [];
        $scope.filterFlag = true;
        $scope.infiniteFlag = true;
        $scope.productList = null;
        $scope.filterObject = {
            parentClassify :'',
            secondClassify : '',
            city : '',
            beginPrice : null,
            endPrice : null,
        }
        checkType();
        function checkType(){
            $productType.setTypeCodes()
                .then(function(){
                    switch (parseInt($stateParams.type,10)){
                        case 2:
                            $scope.filterObject.parentClassify = 'BBYP';
                            $scope.filterObject.secondClassify = 'BBYP';
                            $scope.childCode= 'BBYP';

                            break;
                        case 3:
                            $scope.filterObject.parentClassify = 'MMYP';
                            $scope.filterObject.secondClassify = 'MMYP';
                            $scope.childCode = 'MMYP';
                            break;
                        case 4:
                            $scope.filterObject.parentClassify = 'JJYP';
                            $scope.filterObject.secondClassify = 'JJYP';
                            $scope.childCode = 'JJYP';
                            break;
                    }
                    if(parseInt($stateParams.type,10)==1){
                        $scope.pageTitle = '官方推荐';
                        $scope.filterFlag = false
                    }
                    else{
                        $scope.getChildTypeCode = $productType.getChildTypeCode($scope.filterObject.parentClassify);
                        $console.show($scope.getChildTypeCode);
                        $scope.pageTitle = $scope.getChildTypeCode.name;
                    }
                });
        }

        function getRecommendationProducts(){
            var data = {
                "cmd":$config.cmds.recommendationProduct,
                "parameters":{
                    "isProductRecommoned":"1",
                    "type":"0",
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo
                }
            }

            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $console.show(result);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    if(result.response.data.totalPages == 0){
                        $scope.infiniteFlag = false;
                        $scope.productList = null;
                        return ;
                    }

                    var items = result.response.data.content;
                    if(items==null||items.length==0){
                        $scope.infiniteFlag = false;
                        return ;
                    }
                    addItem(items);
                    if(pageNo == result.response.data.totalPages-1 ){
                        $scope.infiniteFlag = false;
                        return;
                    }
                    pageNo++;
                })
        }

        function getOtherProducts(){
            $console.show($scope.filterObject);
            var data = {
                "cmd": $config.cmds.getPage,
                "parameters":{
                    "parentClassify":$scope.filterObject.parentClassify,
                    "secondClassify": $scope.filterObject.secondClassify==$scope.childCode?'':$scope.filterObject.secondClassify,
                    "city":$scope.filterObject.city,
                    "beginPrice":$scope.filterObject.beginPrice || null,
                    "endPrice": $scope.filterObject.endPrice || null,
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo,
                    "type":0
                }
            }

            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $console.show(result);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    if(result.response.data.totalPages == 0){
                        $scope.infiniteFlag = false;
                        $scope.productList = null;
                        return ;
                    }

                    var items = result.response.data.content;
                    if(items==null||items.length==0){
                        $scope.infiniteFlag = false;
                        return ;
                    }
                    addItem(items);
                    if(pageNo == result.response.data.totalPages-1 ){
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

        $ionicPopover.fromTemplateUrl($config.popovers.filterType.templateUrl,{
            scope:$scope
        }).then(function(popover){
            $scope.filterTypePopover = popover;
        })

        $scope.openPopover = function($event,popName){
            $scope[popName].show($event);
        }

        $scope.closePopover = function(popName){
            $scope[popName].hide();
        }

        $scope.showFilter = function(){
            $scope.productList = [];
            pageNo = 0;
            $scope.infiniteFlag = true;
            $scope.closePopover('filterTypePopover');
            //getOtherProducts();
        }

        $scope.$on('$stateChangeSuccess', function() {
            //$scope.loadMore();
        });

    }
])