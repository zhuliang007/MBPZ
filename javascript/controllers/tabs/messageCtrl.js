/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('controllers.message',[])
.controller('MessageCtrl',[
    '$scope',
    '$console',
    '$config',
    '$rootScope',
    '$stateParams',
    '$state',
    '$httpService',
    '$locals',
    function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals){
        var token ='';

        initToken = function(){
            $scope.checkLogin()
                .then(function(){
                    token=$scope.userInfo.loginToken;
                    messages();
                },function(){
                    $scope.autoLogin()
                        .then(function(){
                            initToken()
                        })
                })
        }
        initToken();
        var messages = function(){
            if(token==''){
                initToken();
            }else{
                var data = {
                    "cmd":$config.cmds.messageNum,
                    "parameters":{
                        "modual" :"system"
                    },
                    "token":token
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        var arry = result.data;
                        arry.forEach(function (item) {
                            if(item.noticeCount>0){
                                document.getElementById(item.modual).innerHTML="您有"+item.noticeCount+"条新消息";
                                document.getElementById(item.modual).style.color="red";
                            }
                        })
                    })
            }

        }

        setTimeout(messages(),1000*60*5);

    }])