/**
 * Created by Administrator on 2016/7/6.
 */
angular.module("controllers.recommend",[])
    .controller("RecommendCtrl",[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$state',
        '$stateParams',
        '$ionicScrollDelegate',
        '$alert',
        '$locals',
        function($scope,$config,$console,$httpService,$state,$stateParams,$ionicScrollDelegate,$alert,$locals){

            //$console.show($stateParams);
            $scope.productList = [];
            var numberOfPerPage = 3;
            var pageNo = 0;
            $scope.infiniteFlag = true;
            var userInfo = {};
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }
            var productHandle = $ionicScrollDelegate.$getByHandle('productHandle');

            $scope.replyObject = {
                replyContents:'',
                resolveProductId:0,
                productId:$stateParams.productId,
                repUserId:$stateParams.repUserId,
                replyType:1
            }

            $scope.loadMore = function() {
                getMyProductList();
            };

            function getMyProductList(){
                var data = {
                    "cmd": $config.cmds.productPublic,
                    "parameters":{
                        "type":0,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(
                        function(result){
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
                        },
                        function(error){
                            //$console.show(error);
                            if(!error){
                                $scope.goBack()
                            }
                        })
            }

            function addItem(items){
                for(var item in items){
                    $scope.productList.push(items[item]);
                }
            }


            $scope.submit = function(){
                //$console.show($scope.replyObject);
                if(!$scope.replyObject.replyContents){
                    $alert.show("回复内容不能为空");
                    return;
                }

                if(!$scope.replyObject.resolveProductId){
                    $alert.show("请选择推荐商品");
                    return;
                }

                var data = {
                    "cmd": $config.cmds.sendReply,
                    "parameters":{
                        "productId":$scope.replyObject.productId,
                        "repUserId":$scope.replyObject.repUserId,
                        "resolveProductId":$scope.replyObject.resolveProductId,
                        "replyType":$scope.replyObject.replyType,
                        "replyContents":$scope.replyObject.replyContents
                    },
                    "token":userInfo.loginToken
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $alert.show(result.msg)
                            .then(function(){
                                $scope.goBack();
                            })
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }

        }
    ])
