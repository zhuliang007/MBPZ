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
                    $scope.userHeaderImg =$scope.userInfo.userImg;
                    $scope.userName = $scope.userInfo.nickName;
                    $scope.cityText = $scope.userInfo.cityText==null?'未设置':$scope.userInfo.cityText;
                    switch (parseInt($scope.userInfo.sex)){
                        case 0:
                            $scope.userSex='女';
                            break;
                        case 1:
                            $scope.userSex='男';
                            break;
                        default:
                            $scope.userSex='未设置';
                            break;
                    }
                    var data = {
                        "cmd":$config.cmds.personalCount,
                        "parameters":{
                        },
                        "token":$scope.userInfo.loginToken
                    }
                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            console.log(result)
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