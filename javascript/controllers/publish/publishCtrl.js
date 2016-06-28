/**
 * Created by Administrator on 2016/6/27.
 */
angular.module('controllers.publish',[])
    .controller('PublishCtrl',[
        '$scope',
        '$state',
        '$stateParams',
        '$config',
        '$rootScope',
        '$productType',
        '$console',
        function($scope,$state,$stateParams,$config,$rootScope,$productType,$console){
            $scope.publishTitle = parseInt($stateParams.id,10)?'编辑':parseInt($stateParams.type,10)==0?'出售':'求购';
            $scope.publishType = parseInt($stateParams.id,10);
            $scope.publishContentPlaceHold = parseInt($stateParams.type,10)==0?
                '描述一下您出售的宝贝,字数不超过1000字(尽可能的描述详尽，如买入时间、用过几次、现在如何等)':
                '描述一下您求购的宝贝,字数不超过1000字(尽可能的描述详尽，如相关功能、价位等)';
            /*function getPublishDetail(){
                if(parseInt($stateParams.id,10)){
                    var data = {
                        "cmd": $config.cmds.details,
                        "parameters":{
                            "productId":parseInt($stateParams.id,10)
                        },
                        "token": $locals.get('token','')
                    }
                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $console.show(result);
                        },function(error){
                            if(error.systemError){
                                var systemError = error.systemError;
                                if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                    $scope.openModal('loginModal');
                                }
                            }
                        })
                }
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
                        $scope.closeModal('loginModal');
                        getPublishDetail();
                    })
            }*/
            $productType.setTypeCodes()
                .then(function(){
                    $scope.typeCodes = $productType.typeCodes;
                    $console.show($scope.typeCodes)
                    $scope.childCodes = checkParentType($scope.selectParent);
                })

            $scope.changeParent = function(selectParent){
                $scope.childCodes = checkParentType(selectParent);
                $scope.selectChild = '';
            }

            $scope.changeChild = function(selectParent,selectChild){
                $console.show(selectChild)
                $console.show(selectParent)
            }

            $scope.selectParent='MMYP'
            $scope.selectChild='MMYP_HZP'
            function checkParentType(selectParent){
                for(var i in $scope.typeCodes){
                    if($scope.typeCodes[i].value == selectParent){
                        return $scope.typeCodes[i].childCodeInfoList;
                    }
                }
                return [];
            }

    }])