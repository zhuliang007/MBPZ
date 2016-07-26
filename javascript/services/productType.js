/**
 * Created by Administrator on 2016/6/12.
 */
angular.module('services.productType',[])
    .factory('$productType',[
        '$httpService',
        '$config',
        '$console',
        '$q',
        function($httpService,$config,$console,$q){
            var $productType = {}

            $productType.setTypeCodes = function($scope){
                var deferred = $q.defer();
                if($productType.typeCodes == null || $productType.typeCodes == undefined){
                    $productType.typeCodes = [];
                }

                if($productType.typeCodes.length == 0){
                    $scope.commonBean.cmd = $config.cmds.codeInfo;
                    $scope.commonBean.parameters={
                        "typeCode":"market_product_type",
                        "levelCount":2
                    };

                    $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                        .then(function(result){
                            $productType.typeCodes = result.data;
                            deferred.resolve();
                        },function(error){
                            deferred.reject(error);
                        })
                }
                else{
                    deferred.resolve();
                }

                return deferred.promise;
            }


            $productType.getTypeCodes = function(){
                if($productType.typeCodes == null || $productType.typeCodes == undefined){
                    $productType.typeCodes = [];
                }
                return $productType.typeCodes;
            }

            $productType.getChildTypeCode = function(code){
                var childTypeCode;
                if($productType.typeCodes == null || $productType.typeCodes == undefined || $productType.typeCodes.length == 0){
                    childTypeCode = {};
                }
                else{
                    for(var typeCode in $productType.typeCodes){
                        if($productType.typeCodes[typeCode].code.toUpperCase() === code.toUpperCase()){
                            childTypeCode = $productType.typeCodes[typeCode]
                            break;
                        }
                        else{
                            continue;
                        }
                    }
                }
                return childTypeCode;
            }

            $productType.setFilterOrderTypes = function(){
                var deferred = $q.defer();

                if($productType.Classify == null || $productType.Classify == undefined){
                    $productType.Classify= {}
                    var data = {
                        "cmd": $config.cmds.getScreen,
                        "parameters":{
                            "typeCode":"market_product_type",
                        }
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $productType.Classify.intelligentClassifyList = result.data.intelligentClassify;
                            $productType.Classify.priceClassifyList = result.data.priceClassify;
                            deferred.resolve();
                        },function(error){
                            deferred.reject(error);
                        })
                }
                else{
                    deferred.resolve();
                }
                return deferred.promise;

            }


            return $productType;
        }])
