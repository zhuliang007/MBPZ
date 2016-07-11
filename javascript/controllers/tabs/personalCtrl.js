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

        var obj = $locals.getObject($config.USER_INFO_NAME);
        console.log('token',obj.loginToken);
        initToken = function(){
                    $scope.userHeaderImg =obj.userImg;
                    $scope.userName = obj.nickName;
                    $scope.cityText = obj.cityText==null?'未设置':obj.cityText;
                    switch (parseInt(obj.sex)){
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
                        "token":''
                    }
                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $scope.productPublicCount=result.data.productPublicCount;
                            $scope.productSoldCount=result.data.productSoldCount;
                            $scope.productBoughtCount=result.data.productBoughtCount;
                            $scope.productCollectCount=result.data.productCollectCount;
                        })
                //},function(){
                //    $scope.autoLogin()
                //        .then(function(){
                //            initToken()
                //        })
                //})
        }

        initToken();


    }])