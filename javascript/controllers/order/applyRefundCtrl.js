/**
 * Created by sam on 16/7/5.
 * 查看退款详情
 */
angular.module('controllers.applyRefundCtrl',[])
    .controller('ApplyRefundCtrl',[
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

            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            if($stateParams.obj!=null){
                $scope.refundServerValue = $stateParams.obj.refundServer;
                $scope.refundReasonValue = $stateParams.obj.refundReason;
                $scope.priceValue = $stateParams.obj.price;
                $scope.refundMarkValue = $stateParams.obj.refundMark;
            }


            $scope.type = $stateParams.type;
            $scope.refund_servers=[];
            $scope.currentPrice = $stateParams.price;
            $scope.refundsFreight = $stateParams.freight;

            $scope.refunds={
                name : '',
                value: ''
            }
            $scope.reasonRef = {
                name:'请选择退款原因',
                value:''
            }

            init = function(){
                //var refundsData={
                //    "cmd": $config.cmds.systemDict,
                //    "parameters": {
                //        "typeCode":"refund_server,refund_reason"
                //    },
                //    "token":userInfo.loginToken
                //}
                $scope.commonBean.cmd = $config.cmds.systemDict;
                $scope.commonBean.token = userInfo.loginToken;
                $scope.commonBean.parameters={
                    "typeCode":"refund_server,refund_reason"
                }
                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        if(result.data.refund_server!=null&&result.data.refund_server.length>0){
                            $scope.refunds.name = result.data.refund_server[0].name;
                            $scope.refunds.value = result.data.refund_server[0].value;
                            $scope.refund_servers =result.data.refund_server;
                        }
                        if(result.data.refund_reason!=null&&result.data.refund_reason.length>0){
                            $scope.refund_reason = result.data.refund_reason;
                        }

                    })
            }

            init();


            //申请服务
            $scope.serviceShow = function(){
                if($scope.refund_servers!=null){
                    $scope.refund_servers.forEach(function(item){
                        var text = "text";
                        item[text] = item.name;
                    })
                }

                $ionicActionSheet.show({
                    buttons:$scope.refund_servers,
                    buttonClicked: function(index,obj) {
                        $scope.refunds.name=obj.text;
                        $scope.refunds.value = obj.value;
                        return true;
                    }
                });
            }
            //退款原因
            $scope.reasonShow = function(){
                if($scope.refund_reason!=null){
                    $scope.refund_reason.forEach(function(item){
                        var text = "text";
                        item[text] = item.name;
                    })
                }
                $ionicActionSheet.show({
                    buttons:$scope.refund_reason,
                    buttonClicked: function(index,obj) {
                        $scope.reasonRef.name=obj.text;
                        $scope.reasonRef.value = obj.value;
                        return true;
                    }
                });
            }

            $scope.reasonText={
                text:''
            }

            //提交
            $scope.submitRefounds = function () {
                if($scope.reasonRef.name=='请选择退款原因'){
                    $alert.show('请选择退款原因');
                    return ;
                }

                if($scope.reasonText.text==''){
                    $alert.show('请输入退款原因');
                    return;
                }

                $alert.confirm('是否确定申请退款?')
                    .then(function() {
                        //var data = {
                        //    "cmd": $config.cmds.applyRefound,
                        //    "parameters":{
                        //        "id":$stateParams.id,
                        //        "refundServer":$scope.refunds.value,
                        //        "refundReason":$scope.reasonRef.name,
                        //        "refundMark":$scope.reasonText.text
                        //    },
                        //    "token":userInfo.loginToken
                        //}

                        $scope.commonBean.cmd = $config.cmds.applyRefound;
                        $scope.commonBean.token = userInfo.loginToken;
                        $scope.commonBean.parameters={
                            "id":$stateParams.id,
                            "refundServer":$scope.refunds.value,
                            "refundReason":$scope.reasonRef.name,
                            "refundMark":$scope.reasonText.text
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                            .then(function(result){
                                $alert.show(result.msg);
                                if(result.msg=='申请退款成功，等待处理'){
                                    $state.go($config.controllers.boughtRefundsRelease.name,null,{reload:true});
                                }
                            })
                    });
            }

            //拒绝
            $scope.refusedApply = function(){
                $state.go($config.controllers.refusedApply.name,{id:$stateParams.obj.id,obj:$stateParams.obj})
            }

            //同意
            $scope.agreeApply = function(){
                $alert.confirm("是否同意退款?")
                    .then(function(){
                        //var data = {
                        //    "cmd": $config.cmds.applyRefused,
                        //    "parameters":{
                        //        "id":$stateParams.obj.id,
                        //        "refundStatus":"AGREE"
                        //    },
                        //    "token":userInfo.loginToken
                        //}

                        $scope.commonBean.cmd = $config.cmds.applyRefused;
                        $scope.commonBean.token = userInfo.loginToken;
                        $scope.commonBean.parameters={
                            "id":$stateParams.obj.id,
                            "refundStatus":"AGREE"
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                            .then(function(result){
                                $alert.show(result.msg)
                                if(result.msg=='操作成功'){
                                    $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true})
                                }
                            })
                    })

            }

        }])
