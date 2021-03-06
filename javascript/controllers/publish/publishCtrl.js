/**
 * Created by Administrator on 2016/6/27.
 */
angular.module('controllers.publish',[])
    .controller('PublishCtrl',[
        '$scope',
        '$state',
        '$stateParams',
        '$config',
        '$rootScope',
        '$productType',
        '$console',
        '$alert',
        '$httpService',
        '$locals',
        function($scope,$state,$stateParams,$config,$rootScope,$productType,$console,$alert,$httpService,$locals){
            $scope.publishTitle = parseInt($stateParams.id,10)?'编辑':parseInt($stateParams.type,10)==0?'出售':'求购';
            $scope.publishType = parseInt($stateParams.type,10);
            $scope.publishContentPlaceHold = parseInt($stateParams.type,10)==0?
                '描述一下您出售的宝贝,字数不超过1000字(尽可能的描述详尽，如买入时间、用过几次、现在如何等)':
                '描述一下您求购的宝贝,字数不超过1000字(尽可能的描述详尽，如相关功能、价位等)';
            $scope.selectType = {
                selectParent:'MMYP',
                selectChild:'MMYP_FZ'
            }
            $scope.publishObject = {
                publishImageList : [],
                title:'',
                content:'',
                currentPrice:null,
                originalPrice:null,
                freight:null
            }

            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }
            getPublishDetail();
            function getPublishDetail(){
                if($stateParams.id){
                    $scope.commonBean.cmd = $config.cmds.details;
                    $scope.commonBean.parameters={
                        "productId":parseInt($stateParams.id,10)
                    }
                    $scope.commonBean.token = userInfo.loginToken;
                    $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                        .then(function(result){
                            //$console.show(result);
                            $scope.publishObject.title = result.data.title;
                            $scope.publishObject.content = result.data.content;
                            $scope.publishObject.currentPrice = result.data.currentPrice;
                            $scope.publishObject.originalPrice = result.data.originalPrice;
                            $scope.publishObject.freight = result.data.freight;
                            $scope.selectType.selectParent = result.data.parentClassify;
                            $scope.selectType.selectChild = result.data.secondClassify;
                            $scope.userLocation = result.data.userLocation;
                            for(var i in result.data.productImageList){
                                var productImage = result.data.productImageList[i];
                                var publishImage = {
                                    url:productImage.location,
                                    isSuccess : true,
                                    isFailed : false,
                                    isProgress : true,
                                    businessNumber:productImage.businessNumber,
                                    height:productImage.imageHeight,
                                    width:productImage.imageWidth
                                }
                                $scope.publishObject.publishImageList.push(publishImage);
                            }
                            if($scope.userLocation){
                                $scope.publishCity = $scope.userLocation.city;
                            }
                            var element = document.getElementById('publishImageHandle');
                            var $element = angular.element(element);
                            $element.children('.scroll').css({'width': (98 * ($scope.publishObject.publishImageList.length+1)) + 'px'});
                            $productType.setTypeCodes($scope)
                                .then(function(){
                                    $scope.typeCodes = $productType.typeCodes;
                                    //$console.show($scope.typeCodes)
                                    $scope.childCodes = checkParentType();
                                })
                        },function(error){
                            //$console.show(error);
                        })
                }
                else{
                    $productType.setTypeCodes($scope)
                        .then(function(){
                            $scope.typeCodes = $productType.typeCodes;
                            //$console.show($scope.typeCodes)
                            $scope.childCodes = checkParentType();
                        })
                }
            }

            $scope.changeParent = function(){
                $scope.childCodes = checkParentType();
                $scope.selectChild = '';
            }

            $scope.changeChild = function(){
                //$console.show($scope.selectType)
            }

            function checkParentType(){
                for(var i in $scope.typeCodes){
                    if($scope.typeCodes[i].value == $scope.selectType.selectParent){
                        return $scope.typeCodes[i].childCodeInfoList;
                    }
                }
                return [];
            }

            $scope.getChangFile = function($files){
                //$console.show($files);
                if($scope.publishObject.publishImageList.length<5 && $files.length>0){
                    if($files.length>(5-$scope.publishObject.publishImageList.length)){
                        $alert.show('您最多还可以选择'+(5-$scope.publishObject.publishImageList.length)+'张图片');
                        return ;
                    }
                    for(var i in $files){
                        if($files[i].size>10*1024*1024){
                            $alert.show('每张图片不能超过10M');
                            return;
                        }
                    }
                    for(var i in $files){
                        $files[i].isSuccess = false;
                        $files[i].isFailed = false;
                        $files[i].isProgress = false;
                        $files[i].businessNumber = '';
                        $files[i].leftProgress = 0;
                        $files[i].rightProgress = 0;
                        $files[i].url = '';
                        $files[i].height = '';
                        $files[i].width = '';
                        $scope.publishObject.publishImageList.push($files[i]);
                    }
                    var element = document.getElementById('publishImageHandle');
                    var $element = angular.element(element);
                    $element.children('.scroll').css({'width': (98 * ($scope.publishObject.publishImageList.length+1)) + 'px'});
                }
            }

            $scope.deletePublishImage = function(index){
                var formData = new FormData();
                formData.append("type",1);
                formData.append("businessNumber",$scope.publishObject.publishImageList[index].businessNumber);
                formData.append("token",userInfo.loginToken);

                $httpService.getJsonFromPost($config.getRequestPublish()+$config.publish.delete,formData,{headers:{'Content-Type': undefined}})
                    .then(function(result){
                        //$console.show(result);
                        var element = document.getElementById('publishImageHandle');
                        var $element = angular.element(element);
                        $element.children('.scroll').css({'width': (98 * ($scope.publishObject.publishImageList.length+1)) + 'px'});
                        $scope.publishObject.publishImageList.splice(index,1);
                    },function(error){
                        //$console.show(error);
                    })
            }

            $scope.updateFile = function(index){
                if(!$scope.publishObject.publishImageList[index].isSuccess){
                    var data = {
                        "type":1,
                        "imageList":$scope.publishObject.publishImageList[index],
                        "token":$scope.userInfo.loginToken
                    }
                    $httpService.uploadImage($config.getRequestPublish()+$config.publish.upload,data)
                        .then(function(result){
                            var publishImage = result.data[0];
                            $scope.publishObject.publishImageList[index].businessNumber = publishImage.businessNumber;
                            $scope.publishObject.publishImageList[index].isSuccess = publishImage.isSuccess;
                            $scope.publishObject.publishImageList[index].height = publishImage.height;
                            $scope.publishObject.publishImageList[index].width = publishImage.width;
                            $scope.publishObject.publishImageList[index].url = publishImage.url;
                            //$console.show($scope.publishObject.publishImageList[index]);
                            $scope.publishObject.publishImageList[index].isFailed = false;
                        },function(error){
                            //$console.show(error);
                            $scope.publishObject.publishImageList[index].isFailed = true;
                        },function(progressEvent){
                            //$console.show(progressEvent)
                            $scope.publishObject.publishImageList[index].isProgress = true;
                            var total = Math.round(progressEvent.total);
                            var progress = Math.round(progressEvent.loaded);
                            if(progress <= total){
                                var left = progress<=Math.round(Math.round(total/2))?0:progress-Math.round(total/2);
                                var right = progress<=Math.round(Math.round(total/2))?progress:Math.round(total/2);
                                $scope.publishObject.publishImageList[index].rightProgress = right/Math.round(total/2)*180;
                                $scope.publishObject.publishImageList[index].leftProgress = left/Math.round(total/2)*180;
                            }
                        })
                }
            }

            $scope.submitPublish = function(){

                if(!$scope.publishObject.title){
                    $alert.show("标题不能为空")
                    return;
                }

                if(!$scope.publishObject.content){
                    $alert.show("描述内容不能为空")
                    return;
                }

                if(!$scope.publishType){
                    if($scope.publishObject.publishImageList.length==0){
                        $alert.show("缺少描述图片")
                        return;
                    }
                    var priceReg = /^(-?\d+)(\.\d{0,2})?$/;
                    if($scope.publishObject.currentPrice===null){
                        $alert.show('价格不能为空')
                        return;
                    }
                    else if($scope.publishObject.currentPrice===undefined){
                        $alert.show('价格格式错误')
                            .then(function(){
                                $scope.publishObject.currentPrice = null;
                            })
                        return;
                    }
                    else{
                        if(!priceReg.test($scope.publishObject.currentPrice.toString())){
                            $alert.show('请保留小数点后两位')
                            return;
                        }
                        else{
                            if(parseFloat($scope.publishObject.currentPrice)<0){
                                $alert.show('价格不能小于0')
                                return;
                            }
                        }
                    }
                    if($scope.publishObject.originalPrice!==null){
                        if($scope.publishObject.originalPrice===undefined){
                            $alert.show('原价格式错误')
                                .then(function(){
                                    $scope.publishObject.originalPrice = null;
                                })
                            return;
                        }
                        else{
                            if(!priceReg.test($scope.publishObject.originalPrice.toString())){
                                $alert.show('请保留小数点后两位');
                                return;
                            }
                            else{
                                if(parseFloat($scope.publishObject.originalPrice)<0){
                                    $alert.show('原价不能小于0');
                                    return;
                                }
                            }
                        }
                    }
                    if($scope.publishObject.freight!==null){
                        if($scope.publishObject.freight===undefined){
                            $alert.show('运费格式错误')
                                .then(function(){
                                    $scope.publishObject.freight = null;
                                })
                            return;
                        }
                        else{
                            if(!priceReg.test($scope.publishObject.freight.toString())){
                                $alert.show('请保留小数点后两位');
                                return;
                            }
                            else{
                                if(parseFloat($scope.publishObject.freight)<0){
                                    $alert.show('运费不能小于0');
                                    return;
                                }
                            }
                        }
                    }
                }

                if(!$scope.selectType.selectParent || !$scope.selectType.selectChild){
                    $alert.show("请选择分类")
                    return;
                }

                if(!$scope.publishCity || $scope.publishCity=='城市'){
                    $alert.show("请选择所在城市")
                    return;
                }

                if(!checkPublishImage()){
                    $alert.show("描述图片尚未上传完毕")
                    return;
                }

                $rootScope.locationJosnStr = {}
                $rootScope.locationJosnStr.address = $scope.publishCity;
                $rootScope.locationJosnStr.city = $scope.publishCity;
                $rootScope.locationJosnStr.cityCode = '';
                $rootScope.locationJosnStr.country = '';
                $rootScope.locationJosnStr.countryCode = '';
                $rootScope.locationJosnStr.district = '';
                $rootScope.locationJosnStr.province = '';
                $rootScope.locationJosnStr.street = '';
                $rootScope.locationJosnStr.streetNumber = '';
                $rootScope.locationJosnStr.latitude = 0;
                $rootScope.locationJosnStr.longitude = 0;

                var action = $stateParams.id?$config.getRequestPublish()+$config.publish.edit:$config.getRequestPublish()+$config.publish.create;
                var formData = new FormData();
                formData.append("title",$scope.publishObject.title);
                formData.append("content",$scope.publishObject.content);
                formData.append("currentPrice",$scope.publishObject.currentPrice||'');
                formData.append("originalPrice",$scope.publishObject.originalPrice||'');
                formData.append("freight",$scope.publishObject.freight||'');
                formData.append("parentClassify",$scope.selectType.selectParent);
                formData.append("secondClassify",$scope.selectType.selectChild);
                formData.append("locationJosnStr",angular.toJson($rootScope.locationJosnStr));
                formData.append("businessNumber",getBusinessNumbers());
                formData.append("productType",$scope.publishType);
                formData.append("token",userInfo.loginToken);
                if($stateParams.id){
                    formData.append("id",$stateParams.id);
                }
                $httpService.getJsonFromPost(action,formData,{headers:{'Content-Type': undefined}})
                    .then(function(result){
                            //$console.show(result);
                            $alert.show(result.msg)
                                .then(function(){
                                    $scope.goBack();
                                })
                        },
                        function(error){
                            //$console.show(error);
                        })
            }


            function getBusinessNumbers(){
                var businessNumbers = "";
                for(var i in $scope.publishObject.publishImageList){
                    businessNumbers += $scope.publishObject.publishImageList[i].businessNumber + ',';
                }
                return businessNumbers.substring(0,businessNumbers.length-1);
            }

            function checkPublishImage(){
                for(var i in $scope.publishObject.publishImageList){
                    if(!$scope.publishObject.publishImageList[i].isSuccess){
                        return false;
                    }
                }
                return true;
            }

            $rootScope.changeCity = function(city){
                if($scope.publishCity != city.name){
                    $scope.publishCity = city.name;
                }

                $scope.closeModal('cityModal');
            }
        }])
