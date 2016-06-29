/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('controllers.tabs',[])
    .controller('TabsCtrl',[
        '$rootScope',
        '$console',
        '$scope',
        '$config',
        '$httpService',
        '$locals',
        function($rootScope,$console,$scope,$config,$httpService,$locals){
        $rootScope.login = function(telNumber,codeNumber){
            if(!telNumber){
                $console.show($config.messages.noTel);
                return;
            }
            if(!codeNumber){
                $console.show($config.messages.noCode);
                return;
            }
            var data = {
                "cmd": $config.cmds.login,
                "parameters":{
                    "loginAccount":telNumber,
                    "securityCode":codeNumber
                }
            }
            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $console.show(result);
                    $locals.set('token',result.data.loginToken);
                    $locals.set('userId',result.data.id);
                    $scope.closeModal('loginModal');
                },function(error){
                    $console.show(error);
                })

        }
    }])