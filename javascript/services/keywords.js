/**
 * Created by Administrator on 2016/6/21.
 */
angular.module('services.keywords',[])
    .factory('$keywords',[
        '$config',
        '$console',
        '$httpService',
        '$q',
        '$locals',
        function($config,$console,$httpService,$q,$locals){
            var $keywords = {};
            $keywords.getProvinceCity = function($scope){
                var deferred = $q.defer();
                if(!$keywords.provinceCityList){
                    $keywords.provinceCityList = {
                        provinceList:[]
                    }
                    $scope.commonBean.cmd = $config.cmds.provinceCity;
                    $scope.commonBean.parameters={
                        "parentCode":0,
                        "levelCount":3
                    }
                    $scope.commonBean.token = null;
                    $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                        .then(function(result){
                            var parentList = result.data;
                            for(var i in parentList){
                                var parent = parentList[i];
                                var province = {
                                    name:parent.name,
                                    code:parent.code,
                                }
                                $keywords.provinceCityList.provinceList.push(province);
                                var secondParentList = parent.childCodeInfoList;
                                var cityList = []
                                for(var j in secondParentList){
                                    var secondParent = secondParentList[j];
                                    var city = {
                                        name:secondParent.name,
                                        code:secondParent.code,
                                    }
                                    cityList.push(city);
                                    $keywords.provinceCityList[secondParent.code] = secondParent.childCodeInfoList;
                                }
                                $keywords.provinceCityList[parent.code] = cityList;
                            }
                            deferred.resolve($keywords.provinceCityList)

                        },function(error){
                            deferred.reject(error);
                        })
                }
                else{
                    deferred.resolve($keywords.provinceCityList)
                }
                return deferred.promise;
            }

            $keywords.getAddressByCode = function(code){
                var deferred = $q.defer();
                deferred.resolve($keywords.provinceCityList[code]);
                return deferred.promise;
            }

            $keywords.setKeyWords = function($scope,keyName,token) {
                var deferred = $q.defer();
                if (!$keywords[keyName]){
                    switch (keyName){
                        case 'report':
                            $scope.commonBean.cmd = $config.cmds.tipoffs;
                            $scope.commonBean.parameters=null;
                            $scope.commonBean.token = token;
                            break;
                        case 'dictList':
                            $scope.commonBean.cmd = $config.cmds.dictList;
                            $scope.commonBean.parameters={
                                "typeCode":"product_filtrate_ask_to_buy"
                            };
                            $scope.commonBean.token = null;
                            break;
                    }
                    $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                        .then(function(result){
                            $keywords[keyName] = result.data;
                            deferred.resolve($keywords[keyName]);
                        },function(error){
                            deferred.reject(error);
                        })
                }
                else{
                    deferred.resolve($keywords[keyName]);
                }

                return deferred.promise;
            }


            return $keywords;

        }
    ])
