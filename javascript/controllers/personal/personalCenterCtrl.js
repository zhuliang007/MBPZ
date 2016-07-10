/**
 * Created by Administrator on 2016/7/8.
 */
angular.module('controllers.personalCenter',[])
    .controller('PersonalCenterCtrl',[
        '$scope',
        '$console',
        '$config',
        '$alert',
        '$state',
        '$stateParams',
        '$httpService',
        '$ionicScrollDelegate',
        function($scope,$console,$config,$alert,$state,$stateParams,$httpService,$ionicScrollDelegate){
            $console.show($stateParams);
            var productHandle = $ionicScrollDelegate.$getByHandle('productHandle');
            getPersonalInfo();
            function getPersonalInfo(){
                var data = {
                    "cmd": $config.cmds.personCenterInfo,
                    "parameters":{
                        "userId":$stateParams.userId
                    }

                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $scope.personalCenterInfo = result.data;
                    })
            }
            $scope.productList = []
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.infiniteFlag = true;

            $scope.selectFlag = true;
            $scope.productType = 0;
            $scope.changeSelect = function(flag,type) {
                $scope.selectFlag = flag;
                $scope.productType = type;
                pageNo = 0;
                $scope.infiniteFlag = true;
                $scope.productList = [];
                productHandle.resize();
                productHandle.scrollTop();
            }


            $scope.loadMore = function(){
                getProductList();
            }


            function getProductList(){
                var data = {
                    "cmd": $config.cmds.selectProduct,
                    "parameters":{
                        "type":$scope.productType,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo,
                        "userId":$stateParams.userId
                    }
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result)
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
                for(var item in items){
                    $scope.productList.push(items[item]);
                }
            }




        }])