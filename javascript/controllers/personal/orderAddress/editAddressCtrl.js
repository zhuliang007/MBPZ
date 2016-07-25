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
        '$alert',
        '$httpService',
        '$locals',
        function($scope,$state,$stateParams,$config,$console,$rootScope,$keywords,$ionicScrollDelegate,$alert,$httpService,$locals){
            //$console.show($stateParams.id);
            var cityHandle = $ionicScrollDelegate.$getByHandle('cityHandle');
            var districtHandle = $ionicScrollDelegate.$getByHandle('districtHandle');
            $scope.addressId = $stateParams.id;
            $scope.title = $stateParams.id?'修改地址':'添加新地址';
            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }
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
            getAddressObject();
            function getAddressObject(){
                if($stateParams.id){
                    //var data = {
                    //    "cmd":$config.cmds.userAddressDetail,
                    //    "parameters":{
                    //        "id":$stateParams.id
                    //    },
                    //    "token":userInfo.loginToken
                    //}

                    $scope.commonBean.cmd = $config.cmds.userAddressDetail;
                    $scope.commonBean.parameters={
                        "id":$stateParams.id
                    }
                    $scope.commonBean.token = userInfo.loginToken;

                    $keywords.getProvinceCity($scope)
                        .then(function(result){
                            var provinceCityList = result;
                            $rootScope.provinceCityList.provinceList = provinceCityList.provinceList;
                            $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                                .then(function(result){
                                    //$console.show(result);
                                    $rootScope.provinceCityList.cityList = provinceCityList[result.data.province];
                                    $rootScope.provinceCityList.districtList = provinceCityList[result.data.city];
                                    $scope.addressObject = {
                                        receiveName:result.data.receiveName,
                                        receivePhone:result.data.receivePhone,
                                        postCode:result.data.postCode,
                                        address:result.data.address,
                                        isDefault:result.data.isDefault?true:false,
                                        provinceText:result.data.provinceText,
                                        cityText:result.data.cityText,
                                        districtText:result.data.districtText,
                                        provinceCode : result.data.province,
                                        cityCode : result.data.city,
                                        districtCode : result.data.district,
                                    }
                                    $rootScope.provinceCityModalObject = {
                                        provinceCode : result.data.province,
                                        cityCode : result.data.city,
                                        districtCode : result.data.district,
                                    }
                                },function(error){
                                    //$console.show(error);
                                    if(!error){
                                        $scope.goBack()
                                    }
                                })
                        })
                }
                else{
                    $keywords.getProvinceCity($scope)
                        .then(function(result){
                            $rootScope.provinceCityList.provinceList = result.provinceList;
                            $rootScope.provinceCityList.cityList = result[110000];
                            $rootScope.provinceCityList.districtList = result[110100];
                        })
                }
            }

            $scope.deleteAddress = function(){
                $alert.confirm('是否删除当前地址?')
                    .then(function(){
                        //var data = {
                        //    "cmd":$config.cmds.userAddressDelete,
                        //    "parameters":{
                        //        "id":$scope.addressId
                        //    },
                        //    "token":userInfo.loginToken
                        //}
                        $scope.commonBean.cmd = $config.cmds.userAddressDelete;
                        $scope.commonBean.parameters={
                            "id":$scope.addressId
                        }
                        $scope.commonBean.token = userInfo.loginToken;
                        $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                            .then(function(result){
                                $alert.show(result.msg)
                                    .then(function(){
                                        $scope.goBack();
                                    })
                            },function(error){
                                //$console.show(error);
                                if(!error){
                                    $scope.goBack()
                                }
                            })
                    })
            }


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

            $scope.editAddress = function(){
                //$console.show($scope.addressObject);
                if(!$scope.addressObject.receiveName){
                    $alert.show("姓名不能为空")
                    return ;
                }

                if(!$scope.addressObject.receivePhone){
                    $alert.show("手机号不能为空")
                    return ;
                }

                if (!/^(13\d{9})|(147\d{8})|(15[02356789]\d{8})|(17[08]\d{8})|(18[012356789]\d{8})$/.test($scope.addressObject.receivePhone)){
                    $alert.show("手机号格式错误")
                    return;
                }

                if(!$scope.addressObject.provinceCode||!$scope.addressObject.cityCode||!$scope.addressObject.districtCode){
                    $alert.show("请选择城市")
                    return;
                }

                if(!$scope.addressObject.address){
                    $alert.show("详细地址不能为空")
                    return ;
                }

                if($scope.addressObject.postCode){
                    if (!/^[1-9][0-9]{5}$/.test($scope.addressObject.postCode)){
                        $alert.show("邮政编码格式错误")
                        return;
                    }
                }
                //$console.show("保存中");
                //var data = {
                //    "cmd":$config.cmds.userAddressSave,
                //    "parameters":{
                //        "id": $stateParams.id,
                //        "receiveName":$scope.addressObject.receiveName,
                //        "receivePhone":$scope.addressObject.receivePhone,
                //        "postCode":$scope.addressObject.postCode,
                //        "province":$scope.addressObject.provinceCode,
                //        "city":$scope.addressObject.cityCode,
                //        "district":$scope.addressObject.districtCode,
                //        "address":$scope.addressObject.address,
                //        "isDefault":$scope.addressObject.isDefault?1:0
                //    },
                //    "token":userInfo.loginToken
                //}

                $scope.commonBean.cmd = $config.cmds.userAddressSave;
                $scope.commonBean.parameters={
                    "id": $stateParams.id,
                    "receiveName":$scope.addressObject.receiveName,
                    "receivePhone":$scope.addressObject.receivePhone,
                    "postCode":$scope.addressObject.postCode,
                    "province":$scope.addressObject.provinceCode,
                    "city":$scope.addressObject.cityCode,
                    "district":$scope.addressObject.districtCode,
                    "address":$scope.addressObject.address,
                    "isDefault":$scope.addressObject.isDefault?1:0
                }
                $scope.commonBean.token = userInfo.loginToken;

                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //$console.show(result);
                        $alert.show(result.msg)
                            .then(function(){
                                $scope.goBack();
                            })
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }
        }
    ])
