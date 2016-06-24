/**
 * Created by Administrator on 2016/6/22.
 */
angular.module('controllers.orderAddress',[])
    .controller('OrderAddressCtrl',[
        '$scope',
        '$config',
        '$state',
        '$stateParams',
        '$locals',
        '$httpService',
        '$console',
        '$rootScope',
        function($scope,$config,$state,$stateParams,$locals,$httpService,$console,$rootScope){
            var type = $stateParams.type;
            $console.show(type)
            $scope.addressList = []
            var numberOfPerPage = 10;
            var pageNo = 0;
            $scope.infiniteFlag = true;
            $scope.loadMore = function() {
                getAddressList();
            };
            function getAddressList(){
                var data = {
                    "cmd":$config.cmds.addressList,
                    "parameters":{
                        "numberOfPerPage" : numberOfPerPage,
                        "pageNo" : pageNo
                    },
                    "token":$locals.get('token','')
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
                        $scope.addressList = [];
                        pageNo = 0;
                        if(error.systemError){
                            var systemError = error.systemError;
                            if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                $scope.openModal('loginModal');
                            }
                        }
                    })
            }

            function addItem(items){
                for(var item in items){
                    $scope.addressList.push(items[item]);
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
                        $scope.infiniteFlag = true;
                        $scope.addressList = [];
                        pageNo = 0;
                    })

            }

            $scope.edictAddress = function(address){
                if(address){
                    if(type==0){
                        //选择订单地址
                    }
                    else if(type==1){
                        //订单修改编辑
                    }
                }
                else{
                    //开启新地址编辑
                    $state.go($config.controllers.editAddress.name,{type:0})
                }
            }
        }
    ])