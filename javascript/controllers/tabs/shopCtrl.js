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
    function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService){
        $rootScope.token = $stateParams.token;

        $scope.productList = []
        var numberOfPerPage = 10;
        var pageNo = 0;
        $scope.infiniteFlag = true;
        function getProductShop(){
            var data = {
                "cmd": $config.cmds.getPage,
                "parameters":{
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo,
                    "type":1
                }
            }

            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $console.show(result)
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    if(result.response.data.totalPages == 0){
                        $scope.infiniteFlag = false;
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

    }])