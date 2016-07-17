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
        '$alert',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals,$alert){

            if($locals.getObject($config.user_local_info)!=null){
                var userInfo = $locals.getObject($config.user_local_info);

                $scope.userHeaderImg =userInfo.userImg;
                $scope.userName = userInfo.nickName;
                $scope.cityText = userInfo.cityText==null?'未设置':userInfo.cityText;
                switch (parseInt(userInfo.sex)){
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
                    "token":userInfo.loginToken
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $scope.productPublicCount=result.data.productPublicCount;
                        $scope.productSoldCount=result.data.productSoldCount;
                        $scope.productBoughtCount=result.data.productBoughtCount;
                        $scope.productCollectCount=result.data.productCollectCount;
                    })
            }else{
                $scope.userName='未登录';
                $alert.show($config.error_login);
            }

        }])
