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

        $keywords.getProvinceCity = function(){
            var deferred = $q.defer();
            if(!$keywords.provinceCityList){
                $keywords.provinceCityList = {
                    provinceList:[]
                }
                var data = {
                    "cmd": $config.cmds.provinceCity,
                    "parameters":{
                        "parentCode":0,
                        "levelCount":3
                    }
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
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

        $keywords.setKeyWords = function(keyName) {
            var deferred = $q.defer();
            if (!$keywords[keyName]){
                var data;
                switch (keyName){
                    case 'report':
                        data = {
                            "cmd": $config.cmds.tipoffs,
                            "token":$locals.get('token','')
                        }
                        break;
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
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