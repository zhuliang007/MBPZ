/**
 * Created by zl_sam on 16/6/13.
 */

angular.module('controllers.feedbackCtrl',[])
    .controller('FeedbackCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$locals',
        '$http',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$locals,$http){

                var token ='';

                initToken = function(){
                        $scope.checkLogin()
                            .then(function(){
                                    token = $scope.userInfo.loginToken;
                            },function(){
                                    $scope.autoLogin()
                                        .then(function(){
                                                initToken()
                                        })
                            })
                }

                initToken();

                $scope.submitFeedback = function () {
                        if(token!=''){
                                var val = $scope.feedback;
                                var data = {
                                        "cmd":$config.cmds.addFeedback,
                                        "parameters":{
                                                "contents" : val
                                        },
                                        "token":token
                                }
                                $http.post($config.getRequestAction(),data).success(function(data){
                                        console.log(data)
                                        if(data.statusCode=='200'){
                                                alert('提交成功')
                                                $state.go('myCenterSetup');
                                        }
                                })
                        }else{
                                initToken();
                        }

                }
        }])