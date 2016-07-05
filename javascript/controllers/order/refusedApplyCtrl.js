/**
 * Created by sam on 16/7/5.
 */

angular.module('controllers.refusedApplyCtrl',[])
    .controller('RefusedApplyCtrl',[
        '$scope',
        '$config',
        '$console',
        '$httpService',
        '$state',
        '$stateParams',
        '$locals',
        '$rootScope',
        '$ionicActionSheet',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet) {
            $scope.type = $stateParams.type;
            if($stateParams.obj!=null&&$stateParams.obj!='undefined'){
                $scope.rejectReason = $stateParams.obj.rejectReason;
            }
            $scope.refused = {
                reason:''
            }

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

            $scope.submitRefused = function(){
                if(token!=''){
                    if($scope.refused.reason==null
                        ||$scope.refused.reason=='undefined'
                        ||$scope.refused.reason==''){
                        alert("请填写拒绝原因");
                        return ;
                    }
                    var data = {
                        "cmd": $config.cmds.applyRefused,
                        "parameters":{
                            "id":$stateParams.id,
                            "refundStatus":"REJECT",
                            "rejectReason":$scope.refused.reason
                        },
                        "token":token
                    }
                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            console.log(result.msg)
                        })
                }else{
                    initToken();
                }

            }

            //返回退款详情
            $scope.goBackRefund = function(){
                console.log($stateParams.routers)
                if($stateParams.obj!=null&&($stateParams.routers==null||$stateParams.routers=='')){
                    $state.go($config.controllers.applyRefund.name,{id:$stateParams.obj.id,price:$stateParams.obj.price,obj:$stateParams.obj,type:1})
                }else if($stateParams.routers==1){
                    $state.go($config.controllers.boughtRefundsRelease.name)
                }else{
                    $state.go($config.controllers.sellRefundsRelease.name)
                }
            }

        }])
