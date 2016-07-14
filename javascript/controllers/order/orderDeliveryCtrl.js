/**
 * Created by sam on 16/7/7.
 */
angular.module('controllers.deliveryCtrl',[])
    .controller('DeliveryCtrl',[
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

            $scope.delivery={
                name : '',
                value: ''
            }
            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        var data={
                            "cmd": $config.cmds.dictList,
                            "parameters": {
                                "typeCode":"expressCompany"
                            },
                            "token":$scope.userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                $scope.delivery_servers=result.data;
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }

            initToken();

            //选择快递公司
            $scope.courierComShow = function(){
                if($scope.delivery_servers!=null){
                    $scope.delivery_servers.forEach(function(item){
                        var text = "text";
                        item[text] = item.name;
                    })
                }

                $ionicActionSheet.show({
                    buttons:$scope.delivery_servers,
                    buttonClicked: function(index,obj) {
                        $scope.delivery.name=obj.text;
                        $scope.delivery.value = obj.value;
                        return true;
                    }
                });
            }

            //提交快递
            $scope.submitDelivery=function(orderCodes){
                if($scope.delivery.name==''){
                    $alert.show('请选择快递公司');
                    return;
                }
                //console.log(orderCodes)
                if(orderCodes=='undefined'||orderCodes==undefined){
                    $alert.show('请输入快递单号');
                    return;
                }
                $scope.checkLogin()
                    .then(function(){
                        $alert.confirm('是否提交物流信息')
                            .then(function () {
                                var data={
                                    "cmd": $config.cmds.orderSend,
                                    "parameters": {
                                        "id":$stateParams.id,
                                        "express":$scope.delivery.value,
                                        "expressNum":orderCodes
                                    },
                                    "token":$scope.userInfo.loginToken
                                }
                                $httpService.getJsonFromPost($config.getRequestAction(),data)
                                    .then(function(result){
                                        $alert.show(result.msg)
                                        if(result.msg=='操作成功'){
                                            if($stateParams.type==1){
                                                $state.go($config.controllers.boughtRefundsRelease.name,null,{reload:true});
                                            }else{
                                                $state.go($config.controllers.mySold.name);
                                            }
                                        }
                                    })
                            })
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                            })
                    })

            }

            //跳转上一页
            $scope.goBackPage = function(){
                switch (parseInt($stateParams.type)){
                    case 0:
                        $state.go($config.controllers.mySold.name);
                        break;
                    case 1:
                        $state.go($config.controllers.boughtRefundsRelease.name);
                        break;
                    case 2:
                        $state.go($config.controllers.orderDetail.name,{id:$stateParams.id,type:$stateParams.type});
                        break;
                }
            }
        }])
