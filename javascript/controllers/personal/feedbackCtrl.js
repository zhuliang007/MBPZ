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
        '$alert',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$locals,$http,$alert){

            var userInfo ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            $scope.feedbacks={
                text:''
            }
            $scope.submitFeedback = function () {
                var val = $scope.feedbacks.text;
                if(val.length<10){
                    $alert.show('不得少于10个字');
                    return;
                }

                var data = {
                    "cmd":$config.cmds.addFeedback,
                    "parameters":{
                        "contents" : val
                    },
                    "token":userInfo.loginToken
                }
                $http.post($config.getRequestAction(),data).success(function(data){
                    if(data.statusCode=='200'){
                        $alert.show('提交成功')
                        $state.go('myCenterSetup');
                    }
                })

            }
        }])
