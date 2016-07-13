/**
 * Created by Administrator on 2016/6/21.
 */
angular.module('controllers.report',[])
.controller('ReportCtrl',[
    '$scope',
    '$console',
    '$config',
    '$httpService',
    '$locals',
    '$state',
    '$stateParams',
    '$keywords',
    '$rootScope',
    '$alert',
    function($scope,$console,$config,$httpService,$locals,$state,$stateParams,$keywords,$rootScope,$alert){
        var productId = $stateParams.productId;
        //$console.show(productId);

        getKeyWords();
        function getKeyWords(){
            $scope.checkLogin()
                .then(function(){
                    $keywords.setKeyWords('report',$scope.userInfo.loginToken)
                        .then(function(result){
                            $scope.reportTypeList = result;
                            //$console.show(result)
                        },function(error){
                            //$console.show(error);
                            if(!error){
                                $scope.goBack()
                            }
                        })
                },function(){
                    $scope.autoLogin()
                        .then(function(){
                            getKeyWords();
                        })
                })

        }

        $scope.reportReason = {
            choiceType:0,
            reasonText:''
        }

        $scope.submitReport = function(chooseType,reasonText){

            $scope.checkLogin()
                .then(function(){
                    //$console.show(chooseType);
                    if(!chooseType){
                        $alert.show("请选择举报原因");
                        return;
                    }

                    if(chooseType==4){
                        if(!reasonText){
                            $alert.show("请输入其他举报原因");
                            return;
                        }
                    }

                    var data = {
                        "cmd": $config.cmds.report,
                        "parameters":{
                            "reportContentType":chooseType,
                            "relateId":productId,
                            "reportContent":chooseType==4?reasonText:''
                        },
                        "token":$scope.userInfo.loginToken
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            //$console.show(result.msg);
                            $alert.show(result.msg)
                                .then(function(){
                                    $scope.goBack();
                                })
                        },function(error){
                            //$console.show(error);
                            if(!error){
                                $scope.goBack()
                            }
                        })
                },function(){
                    $scope.autoLogin()
                        .then(function(){
                            getKeyWords();
                        })
                })
        }
    }
])