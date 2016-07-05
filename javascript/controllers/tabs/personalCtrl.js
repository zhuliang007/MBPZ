/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('controllers.personal',[])
.controller('PersonalCtrl',[
    '$scope',
    '$console',
    '$config',
    '$rootScope',
    '$stateParams',
    '$state',
    '$httpService',
    '$locals',
    function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals){

        initToken = function(){
            $scope.checkLogin()
                .then(function(){
                    console.log($scope.userInfo)
                    $scope.userHeaderImg =$scope.userInfo.userImg;
                    $scope.userName = $scope.userInfo.nickName;
                    $scope.userSex = $scope.userInfo.sex==null?'未设置':$scope.userInfo.sex;
                    $scope.cityText = $scope.userInfo.cityText==null?'未设置':$scope.userInfo.cityText;
                    var data = {
                        "cmd":$config.cmds.personalCount,
                        "parameters":{
                        },
                        "token":$scope.userInfo.loginToken
                    }
                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $scope.productPublicCount=result.data.productPublicCount;
                            $scope.productSoldCount=result.data.productSoldCount;
                            $scope.productBoughtCount=result.data.productBoughtCount;
                            $scope.productCollectCount=result.data.productCollectCount;
                        })
                },function(){
                    $scope.autoLogin()
                        .then(function(){
                            initToken()
                        })
                })
        }

        initToken();


    }])