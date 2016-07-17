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
        '$alert',
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet,$alert) {
            $scope.type = $stateParams.type;
            if($stateParams.obj!=null&&$stateParams.obj!='undefined'){
                $scope.rejectReason = $stateParams.obj.rejectReason;
            }
            $scope.refused = {
                reason:''
            }

            var userInfo ={};
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            $scope.submitRefused = function(){
                if($scope.refused.reason==null
                    ||$scope.refused.reason=='undefined'
                    ||$scope.refused.reason==''){
                    $alert.show("请填写拒绝原因");
                    return ;
                }
                $alert.confirm("是否拒绝买家的退款申请?")
                    .then(function(){
                        var data = {
                            "cmd": $config.cmds.applyRefused,
                            "parameters":{
                                "id":$stateParams.id,
                                "refundStatus":"REJECT",
                                "rejectReason":$scope.refused.reason
                            },
                            "token":userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                $alert.show(result.msg);
                                if(result.msg=='操作成功'){
                                    $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true});
                                }
                        })

                    })

            }

            //返回退款详情
            $scope.goBackRefund = function(){
                if($stateParams.obj!=null&&($stateParams.routers==null||$stateParams.routers=='')){
                    $state.go($config.controllers.applyRefund.name,{id:$stateParams.obj.id,price:$stateParams.obj.price,obj:$stateParams.obj,type:1})
                }else if($stateParams.routers==1){
                    $state.go($config.controllers.boughtRefundsRelease.name)
                }else if($stateParams.routers==2){
                    $state.go($config.controllers.orderDetail.name,{id:$stateParams.id,type:2});
                }else if($stateParams.routers==4){
                    $state.go($config.controllers.orderDetail.name,{id:$stateParams.id,type:3});
                }else if($stateParams.routers==3){
                    $state.go($config.controllers.sellRefundsRelease.name)
                }
            }

        }])

