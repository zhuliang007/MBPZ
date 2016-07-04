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
    function($scope,$console,$config,$httpService,$locals,$state,$stateParams,$keywords,$rootScope){
        var productId = $stateParams.productId;
        $console.show(productId);

        getKeyWords();
        function getKeyWords(){
            $keywords.setKeyWords('report')
                .then(function(result){
                    $scope.reportTypeList = result;
                    $console.show(result)
                },function(error){
                    if(error.systemError){
                        var systemError = error.systemError;
                        if(systemError.errorCode == 14 || systemError.errorCode == 15){
                            $scope.openModal('loginModal');
                        }
                    }
                })
        }

        $scope.reportReason = {
            choiceType:0,
            reasonText:''
        }


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
                    $locals.set('loginAccount',result.data.loginAccount);
                    $scope.closeModal('loginModal');
                    getKeyWords();
                })
        }

        $scope.submitReport = function(chooseType,reasonText){
            if(!$locals.get('token','')){
                $scope.openModal('loginModal');
                return ;
            }
            $console.show(chooseType);
            if(!chooseType){
                $console.show("请选择举报原因");
                return;
            }

            if(chooseType==4){
                if(!reasonText){
                    $console.show("请输入其他举报原因");
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
                "token":$locals.get('token','')
            }

            $httpService.getJsonFromPost($config.getRequestAction(),data)
                .then(function(result){
                    $console.show(result.msg);
                },function(error){
                    $console.show(error);
                    if(error.systemError){
                        var systemError = error.systemError;
                        if(systemError.errorCode == 14 || systemError.errorCode == 15){
                            $scope.openModal('loginModal');
                        }
                        else if(systemError.errorCode == 11){
                            $console.show(systemError.errorInfo);
                        }
                    }
                })



        }

    }
])