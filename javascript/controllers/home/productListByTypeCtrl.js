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
        var parentClassify = '';
        /*var secondClassify = '';
        var city = '';
        var beginPrice = 0;
        var endPrice = 0;*/
        var numberOfPerPage = 10;
        var pageNo = 0;
        $scope.getChildTypeCode = {};
        $scope.productList = [];
        $scope.infiniteFlag = true;
        $scope.filterObjcet = {
            parentClassify :'',
            secondClassify : '',
            city : '',
            beginPrice : 0,
            endPrice : 0,
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
                        getRecommendationProducts()
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

        }

        function addItem(items){
            for(var item in items){
                $scope.productList.push(items[item]);
            }
        }
    }
])