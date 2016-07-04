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
        var data = {
            "cmd":$config.cmds.personalCount,
            "parameters":{
            },
            "token":$locals.get('token','ZGY4OGViNDItYTQ1Yy00ZjQyLTkyMGItOGI1OWMwZjlmNzJk')
        }
        $httpService.getJsonFromPost($config.getRequestAction(),data)
            .then(function(result){
                $scope.productPublicCount=result.data.productPublicCount;
                $scope.productSoldCount=result.data.productSoldCount;
                $scope.productBoughtCount=result.data.productBoughtCount;
                $scope.productCollectCount=result.data.productCollectCount;
            })

    }])