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
        function($scope,$console,$config,$rootScope,$stateParams,$state){

                $scope.submitFeedback = function () {
                        var val = $scope.feedback;
                        var data = {
                                "cmd":$config.cmds.addFeedback,
                                "parameters":{
                                        "contents" : val
                                },
                                "token":$locals.get('token','')
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                console.log(result)
                            })
                }
        }])