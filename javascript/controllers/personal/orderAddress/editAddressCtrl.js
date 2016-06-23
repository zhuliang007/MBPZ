/**
 * Created by Administrator on 2016/6/22.
 */
angular.module('controllers.editAddress',[])
    .controller('EditAddressCtrl',[
        '$scope',
        '$state',
        '$stateParams',
        '$config',
        '$console',
        '$rootScope',
        '$keywords',
        '$ionicScrollDelegate',
        '$locals',
        '$httpService',
        function($scope,$state,$stateParams,$config,$console,$rootScope,$keywords,$ionicScrollDelegate,$locals,$httpService){
            $console.show($stateParams.type);
            $console.show($stateParams.id);
            var cityHandle = $ionicScrollDelegate.$getByHandle('cityHandle');
            var districtHandle = $ionicScrollDelegate.$getByHandle('districtHandle');
            $scope.type = $stateParams.type;

            $scope.title = $stateParams.type?'添加新地址':'修改地址';

            $scope.addressObject = {
                receiveName:'',
                receivePhone:'',
                postCode:'',
                address:'',
                isDefault:false,
                provinceText:'',
                cityText:'',
                districtText:'',
                provinceCode : 0,
                cityCode : 0,
                districtCode : 0
            }

            $rootScope.provinceCityModalObject = {
                provinceCode : 0,
                cityCode : 0,
                districtCode : 0
            }

            $keywords.getProvinceCity()
                .then(function(result){
                    $rootScope.provinceCityList.provinceList = result.provinceList;
                    $rootScope.provinceCityList.cityList = result[110000];
                    $rootScope.provinceCityList.districtList = result[110100];
                })


            $scope.showProvinceCityModal = function(){
                $scope.openModal('provinceCityModal')
                    .then(function(){
                        //$rootScope.provinceCityModalObject = angular.copy($scope.provinceCityObject);
                    })
            }

            $rootScope.change = function(code,tagName){
                switch (tagName){
                    case 'provinceCode':
                        $keywords.getAddressByCode(code)
                            .then(function(result){
                                $rootScope.provinceCityList.cityList = result;
                                $rootScope.provinceCityModalObject.cityCode = 0;
                                cityHandle.resize();
                                cityHandle.scrollTop();
                                $keywords.getAddressByCode(result[0].code)
                                    .then(function(result){
                                        $rootScope.provinceCityList.districtList = result;
                                        $rootScope.provinceCityModalObject.districtCode = 0;
                                        districtHandle.resize();
                                        districtHandle.scrollTop();
                                    })
                            })
                        break;
                    case 'cityCode':
                        $keywords.getAddressByCode(code)
                            .then(function(result){
                                $rootScope.provinceCityList.districtList = result;
                                $rootScope.provinceCityModalObject.districtCode = 0;
                                districtHandle.resize();
                                districtHandle.scrollTop();
                            })
                        break;
                }
            }

            $rootScope.submitProvinceCity = function(){
                $scope.closeModal('provinceCityModal');
                if(!$rootScope.provinceCityModalObject.provinceCode||!$rootScope.provinceCityModalObject.cityCode||!$rootScope.provinceCityModalObject.districtCode){
                    return;
                }
                for(var i in $rootScope.provinceCityList.provinceList){
                    if(parseInt($rootScope.provinceCityList.provinceList[i].code,10)==parseInt($rootScope.provinceCityModalObject.provinceCode,10)){
                        $scope.addressObject.provinceText = $rootScope.provinceCityList.provinceList[i].name
                    }
                }

                for(var i in $rootScope.provinceCityList.cityList){
                    if(parseInt($rootScope.provinceCityList.cityList[i].code,10)==parseInt($rootScope.provinceCityModalObject.cityCode,10)){
                        $scope.addressObject.cityText = $rootScope.provinceCityList.cityList[i].name
                    }
                }

                for(var i in $rootScope.provinceCityList.districtList){
                    if(parseInt($rootScope.provinceCityList.districtList[i].code,10)==parseInt($rootScope.provinceCityModalObject.districtCode,10)){
                        $scope.addressObject.districtText = $rootScope.provinceCityList.districtList[i].name
                    }
                }
                $scope.addressObject.provinceCode = $rootScope.provinceCityModalObject.provinceCode;
                $scope.addressObject.cityCode = $rootScope.provinceCityModalObject.cityCode;
                $scope.addressObject.districtCode = $rootScope.provinceCityModalObject.districtCode;
            }

            $scope.edictAddress = function(){
                $console.show($scope.addressObject);
                if(!$scope.addressObject.receiveName){
                    //姓名不能为空
                    return ;
                }

                if(!$scope.addressObject.receivePhone){
                    //手机号不能为空
                    return ;
                }

                if (!/^(13\d{9})|(147\d{8})|(15[02356789]\d{8})|(17[08]\d{8})|(18[012356789]\d{8})$/.test($scope.addressObject.receivePhone)){
                    //手机号格式错误
                    return;
                }

                if(!$scope.addressObject.provinceCode||!$scope.addressObject.cityCode||!$scope.addressObject.districtCode){
                    //请选择城市
                    return;
                }

                if(!$scope.addressObject.address){
                    //详细地址不能为空
                    return ;
                }

                if($scope.addressObject.postCode){
                    if (!/^[1-9][0-9]{5}$/.test($scope.addressObject.postCode)){
                        //邮政编码格式错误
                        return;
                    }
                }
                $console.show("保存中");
                var data = {
                    "cmd":$config.cmds.userAddressSave,
                    "parameters":{
                        "id": $stateParams.id,
                        "receiveName":$scope.addressObject.receiveName,
                        "receivePhone":$scope.addressObject.receivePhone,
                        "postCode":$scope.addressObject.postCode,
                        "province":$scope.addressObject.provinceCode,
                        "city":$scope.addressObject.cityCode,
                        "district":$scope.addressObject.districtCode,
                        "address":$scope.addressObject.address,
                        "isDefault":$scope.addressObject.isDefault?1:0
                    },
                    "token":$locals.get('token','')
                }

                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $scope.goBack();
                    },function(error){
                        if(error.systemError){
                            var systemError = error.systemError;
                            if(systemError.errorCode == 14 || systemError.errorCode == 15){
                                $scope.openModal('loginModal');
                            }
                        }
                    })
            }
        }
    ])