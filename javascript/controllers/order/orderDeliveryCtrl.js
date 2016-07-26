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

            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            init = function(){
                //var data={
                //    "cmd": $config.cmds.dictList,
                //    "parameters": {
                //        "typeCode":"expressCompany"
                //    },
                //    "token":userInfo.loginToken
                //}
                $scope.commonBean.cmd = $config.cmds.dictList;
                $scope.commonBean.token = userInfo.loginToken;
                $scope.commonBean.parameters={
                    "typeCode":"expressCompany"
                }

                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        $scope.delivery_servers=result.data;
                    })
            }

            init();

            //选择快递公司
            $scope.courierComShow = function(){
                if($scope.delivery_servers!=null){
                    $scope.delivery_servers.forEach(function(item){
                        var text = "text";
                        item[text] = item.name;
                    })
                }

                //$ionicActionSheet.show({
                //    buttons:$scope.delivery_servers,
                //    buttonClicked: function(index,obj) {
                //        $scope.delivery.name=obj.text;
                //        $scope.delivery.value = obj.value;
                //        return true;
                //    },
                //    cssClass:'scroll:true'
                //});
            }

            //提交快递
            $scope.submitDelivery=function(orderCodes){
                if($scope.delivery.name.name==''){
                    $alert.show('请选择快递公司');
                    return;
                }
                //console.log(orderCodes)
                if(orderCodes=='undefined'||orderCodes==undefined){
                    $alert.show('请输入快递单号');
                    return;
                }
                //console.log($scope.delivery.name)
                //console.log($scope.delivery.name.name)
                //return;
                $alert.confirm('是否提交物流信息')
                    .then(function () {
                        var cmds ;
                        if(parseInt($stateParams.type)==0){
                            cmds = $config.cmds.sellerSend;
                        }else if(parseInt($stateParams.type)==1||parseInt($stateParams.type)==2){
                            cmds = $config.cmds.orderSend;
                        }

                        var data={
                            "cmd": cmds,
                            "parameters": {
                                "id":$stateParams.id,
                                "express":$scope.delivery.name.value,
                                "expressNum":orderCodes
                            },
                            "token":userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                console.log(result.msg)
                                $alert.show(result.msg)
                                if(result.msg=='操作成功'||result.msg=='发货成功'){
                                    if($stateParams.type==1||$stateParams.type==2){
                                        $state.go($config.controllers.boughtRefundsRelease.name,null,{reload:true});
                                    }else{
                                        $state.go($config.controllers.mySold.name,null,{reload:true});
                                    }
                                }
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
