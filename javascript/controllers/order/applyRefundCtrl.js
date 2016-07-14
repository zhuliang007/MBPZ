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

            var token ='';
            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        token = $scope.userInfo.loginToken;
                        var refundsData={
                            "cmd": $config.cmds.systemDict,
                            "parameters": {
                                "typeCode":"refund_server,refund_reason"
                            },
                            "token":token
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),refundsData)
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
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }

            initToken();


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

                if(token!=''){
                    $alert.confirm('是否确定申请退款?')
                        .then(function() {
                            var data = {
                                "cmd": $config.cmds.applyRefound,
                                "parameters":{
                                    "id":$stateParams.id,
                                    "refundServer":$scope.refunds.value,
                                    "refundReason":$scope.reasonRef.name,
                                    "refundMark":$scope.reasonText.text
                                },
                                "token":token
                            }
                            $httpService.getJsonFromPost($config.getRequestAction(),data)
                                .then(function(result){
                                    $alert.show(result.msg);
                                    if(result.msg=='申请退款成功，等待处理'){
                                        $state.go($config.controllers.boughtRefundsRelease.name,null,{reload:true});
                                    }
                                })
                        });
                }else{
                    initToken();
                }
            }

            //拒绝
            $scope.refusedApply = function(id){
                $state.go($config.controllers.refusedApply.name,{id:id,obj:$stateParams.obj})
            }

            //同意
            $scope.agreeApply = function(id){
                $scope.checkLogin()
                    .then(function(){
                        $alert.confirm("是否同意退款?")
                            .then(function(){
                                var data = {
                                    "cmd": $config.cmds.applyRefused,
                                    "parameters":{
                                        "id":id,
                                        "refundStatus":"AGREE"
                                    },
                                    "token":$scope.userInfo.loginToken
                                }
                                $httpService.getJsonFromPost($config.getRequestAction(),data)
                                    .then(function(result){
                                        $alert.show(result.data.msg)
                                        if(result.data.msg=='操作成功'){
                                            $state.go($config.controllers.sellRefundsRelease.name,null,{reload:true})
                                        }
                                    })
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

        }])
