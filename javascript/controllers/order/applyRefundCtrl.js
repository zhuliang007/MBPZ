/**
 * Created by sam on 16/7/5.
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
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet) {

            console.log($stateParams.obj)
            $scope.refundServerValue = $stateParams.obj.refundServer;
            $scope.refundReasonValue = $stateParams.obj.refundReason;
            $scope.priceValue = $stateParams.obj.price;
            $scope.refundMarkValue = $stateParams.obj.refundMark;

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
            var refundsData={
                "cmd": $config.cmds.systemDict,
                "parameters": {
                    "typeCode":"refund_server,refund_reason"
                },
                "token":"YjMyZTA5YzktMWJlMC00OThkLWIyNzUtMjM5Y2ZiY2VmOThm"
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
            
            $scope.submitRefounds = function () {
                console.log($scope.refunds.value);
                var data = {
                    "cmd": $config.cmds.applyRefound,
                    "parameters":{
                        "id":$stateParams.id,
                        "refundServer":$scope.refunds.value,
                        "refundReason":$scope.reasonRef.name,
                        "refundMark":$scope.reasonText
                },
                    "token":"YjMyZTA5YzktMWJlMC00OThkLWIyNzUtMjM5Y2ZiY2VmOThm"
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        alert(result.msg);
                    })
                
            }

        }])