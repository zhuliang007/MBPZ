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
        function($scope,$config,$console,$httpService,$state,$stateParams,$locals,$rootScope,$ionicActionSheet) {

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
                $scope.orderCode='';
                $scope.submitDelivery=function(){
                        console.log($scope.delivery.value)
                        console.log($scope.orderCode)
                        //$scope.checkLogin()
                        //    .then(function(){
                        //            var data={
                        //                    "cmd": $config.cmds.orderSend,
                        //                    "parameters": {
                        //                            "id":$stateParams.id,
                        //                            "express":"ems",
                        //                            "expressNum":"1030486038880"
                        //                    },
                        //                    "token":$scope.userInfo.loginToken
                        //            }
                        //            $httpService.getJsonFromPost($config.getRequestAction(),data)
                        //                .then(function(result){
                        //                        alert(result.msg)
                        //                })
                        //    },function(){
                        //            $scope.autoLogin()
                        //                .then(function(){
                        //                })
                        //    })

                }
        }])