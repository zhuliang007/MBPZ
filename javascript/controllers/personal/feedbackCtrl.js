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

                $scope.submitFeedback = function () {
                        var val = $scope.feedback;
                        var data = {
                                "cmd":$config.cmds.addFeedback,
                                "parameters":{
                                        "contents" : val
                                },
                                "token":$locals.get('token','NGZmOGFmNDctMThjZS00MzM4LTgzYmMtZWE5YTAxNTRmMWZm')
                        }
                        $http.post($config.getRequestAction(),data).success(function(data){
                                console.log(data)
                                if(data.statusCode=='200'){
                                        alert('提交成功')
                                        $state.go('myCenterSetup');
                                }
                        })
                }
        }])