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
    function($scope,$config,$console,$state,$stateParams,$productType,$httpService){
        var numberOfPerPage = 10;
        var pageNo = 0;
        $scope.getChildTypeCode = {};
        $scope.productList = [];
        $scope.infiniteFlag = false;
        $scope.productList = null;
        $scope.filterObjcet = {
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
                            $scope.filterObjcet.parentClassify = 'BBYP';
                            break;
                        case 3:
                            $scope.filterObjcet.parentClassify = 'MMYP';
                            break;
                        case 4:
                            $scope.filterObjcet.parentClassify = 'JJYP';
                            break;
                    }
                    if(parseInt($stateParams.type,10)==1){
                        $scope.pageTitle = '官方推荐';
                    }
                    else{
                        $scope.getChildTypeCode = $productType.getChildTypeCode($scope.filterObjcet.parentClassify);
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
            var data = {
                "cmd": $config.cmds.getPage,
                "parameters":{
                    "parentClassify":$scope.filterObjcet.parentClassify,
                    "secondClassify": $scope.filterObjcet.secondClassify,
                    "city":$scope.filterObjcet.city,
                    "beginPrice":$scope.filterObjcet.beginPrice,
                    "endPrice": $scope.filterObjcet.endPrice,
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
                    $scope.filterObjcet.parentClassify = 'BBYP';
                    getOtherProducts();
                    break;
                case 3:
                    $scope.filterObjcet.parentClassify = 'MMYP';
                    getOtherProducts();
                    break;
                case 4:
                    $scope.filterObjcet.parentClassify = 'JJYP';
                    getOtherProducts();
                    break;
            }
        };
    }
])