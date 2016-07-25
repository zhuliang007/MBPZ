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
        '$locals',
        function($scope,$console,$config,$alert,$state,$stateParams,$httpService,$ionicScrollDelegate,$locals){

            var userInfo = {};
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }


            //$console.show($stateParams);
            var productHandle = $ionicScrollDelegate.$getByHandle('productHandle');
            getPersonalInfo();
            function getPersonalInfo(){
                //var data = {
                //    "cmd": $config.cmds.personCenterInfo,
                //    "parameters":{
                //        "userId":$stateParams.userId
                //    }
                //
                //}
                $scope.commonBean.cmd = $config.cmds.personCenterInfo;
                $scope.commonBean.parameters={
                    "userId":$stateParams.userId
                }
                $scope.commonBean.token=null;

                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //$console.show(result);
                        result.data['type']=$stateParams.type;
                        result.data['productId']=$stateParams.productId;
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
                //var data = {
                //    "cmd": $config.cmds.selectProduct,
                //    "parameters":{
                //        "type":$scope.productType,
                //        "numberOfPerPage":numberOfPerPage,
                //        "pageNo":pageNo,
                //        "userId":$stateParams.userId
                //    }
                //}

                $scope.commonBean.cmd = $config.cmds.selectProduct;
                $scope.commonBean.parameters={
                    "type":$scope.productType,
                    "numberOfPerPage":numberOfPerPage,
                    "pageNo":pageNo,
                    "userId":$stateParams.userId
                }
                $scope.commonBean.token=null;

                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //$console.show(result)
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

            $scope.showEvaluateList = function(){
                //$console.show("showEvaluateList")
                if(!userInfo.loginAccount){
                    $alert.show('请先登录萌宝派')
                    return ;
                }
                if(userInfo.loginAccount == $scope.personalCenterInfo.userInfo.loginAccount){
                    $state.go($config.controllers.evaluateList.name)
                }
                else{
                    $state.go($config.controllers.evaluateList.name,{userId:$stateParams.userId});
                }

            }

            $scope.goBackBefore= function () {
                if (parseInt($stateParams.type)==20||parseInt($stateParams.type)==21) {
                    $state.go($config.controllers.tabsHome.name);
                }else if(parseInt($stateParams.type)==22) {
                    $state.go($config.controllers.tabsShop.name);
                }else if(parseInt($stateParams.type)==104){
                    $state.go($config.controllers.productDetail.name,{id:$stateParams.productId,type:$stateParams.type});
                }else if (parseInt($stateParams.type)==23){
                    $state.go($config.controllers.shopDetail.name,{id:$stateParams.productId,type:$stateParams.type});
                }else{
                    $scope.goBack();
                }
            }



        }])
