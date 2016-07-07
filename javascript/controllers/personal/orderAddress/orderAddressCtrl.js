/**
 * Created by Administrator on 2016/6/22.
 */
angular.module('controllers.orderAddress',[])
    .controller('OrderAddressCtrl',[
        '$scope',
        '$config',
        '$state',
        '$stateParams',
        '$alert',
        '$httpService',
        '$console',
        '$rootScope',
        function($scope,$config,$state,$stateParams,$alert,$httpService,$console,$rootScope){
            var type = $stateParams.type;
            $console.show(type)
            //1订单预览设置收货地址 0或不带通过我的地址管理进入
            $scope.addressList = []
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.infiniteFlag = true;
            $scope.loadMore = function() {
                getAddressList();
            };
            function getAddressList(){
                $scope.checkLogin()
                    .then(function(){
                        var data = {
                            "cmd":$config.cmds.addressList,
                            "parameters":{
                                "numberOfPerPage" : numberOfPerPage,
                                "pageNo" : pageNo
                            },
                            "token":$scope.userInfo.loginToken
                        }
                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                            .then(function(result){
                                    $console.show(result)
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                    if(result.data.total == 0){
                                        $scope.infiniteFlag = false;
                                        return ;
                                    }
                                    var items = result.data.rows;
                                    if(items==null||items.length==0){
                                        $scope.infiniteFlag = false;
                                        return ;
                                    }
                                    addItem(items);
                                    if(pageNo == result.data.total-1 ){
                                        $scope.infiniteFlag = false;
                                        return;
                                    }
                                    pageNo++;
                                },
                                function(error){
                                    $scope.infiniteFlag = false;
                                    if(error.systemError){
                                        var systemError = error.systemError;
                                        $alert.confirm(systemError.errorInfo)
                                            .then(function(){
                                                if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                                    $scope.autoLogin()
                                                        .then(function(){
                                                            $scope.infiniteFlag = true;
                                                            $scope.addressList = [];
                                                            pageNo = 0;
                                                            getAddressList();
                                                        })
                                                }
                                            },function(){
                                                $scope.goBack();
                                            })
                                    }
                                })
                    },function(){
                        $alert.confirm('请登录')
                            .then(function(){
                                $scope.autoLogin()
                                    .then(function(){
                                    getAddressList();
                                })
                            },function(){
                                $scope.goBack();
                            })

                    })
            }

            function addItem(items){
                for(var item in items){
                    $scope.addressList.push(items[item]);
                }
            }

            $scope.goOwnBack = function(){
                $scope.goBack().then(function(){
                    $rootScope.orderAddressObject = {
                        receiveName : '',
                        receivePhone : '',
                        address : '',
                    }
                })
            }

            $scope.editAddress = function(address,slideType){
                $scope.checkLogin()
                    .then(function(){
                        if(slideType){
                            $state.go($config.controllers.editAddress.name,{id:address.id})
                        }
                        else{
                            if(address){
                                if(type==1){
                                    //选择订单地址
                                    $rootScope.orderAddressObject = {
                                        receiveName : address.receiveName,
                                        receivePhone : address.receivePhone,
                                        address : address.provinceText + address.cityText + address.districtText +address.address,
                                    }
                                    $scope.goBack();
                                }
                                else{
                                    //订单修改编辑
                                    $state.go($config.controllers.editAddress.name,{id:address.id})
                                }
                            }
                            else{
                                //开启新地址编辑
                                $state.go($config.controllers.editAddress.name)
                            }
                        }
                    },function(){
                        $alert.confirm('请登录')
                            .then(function(){
                                $scope.autoLogin();
                            })
                    })
            }

        }
    ])