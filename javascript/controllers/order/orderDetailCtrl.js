/**
 * Created by sam on 16/7/6.
 */

angular.module('controllers.orderDetailCtrl',[])
    .controller('OrderDetailCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$state',
        '$stateParams',
        '$locals',
        '$rootScope',
        '$ionicActionSheet',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet) {

            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        var data = {
                            "cmd":$config.cmds.orderDetail,
                            "parameters":{
                                "id":$stateParams.id
                            },
                            "token":$scope.userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                console.log(result)
                                $scope.userHeaderImg=result.data.product.publicUser.userImg;
                                $scope.nickName = result.data.product.publicUser.nickName;
                                $scope.items=result.data;
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }
            initToken();



            $scope.backParent = function(){
                switch (parseInt($stateParams.type)){
                    case 0:
                        $state.go($config.controllers.myBought.name);
                        break;
                }
            }


        }])