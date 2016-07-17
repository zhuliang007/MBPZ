/**
 * Created by Administrator on 2016/6/7.
 */
angular.module("services.cache",[])
    .factory('$cache',[
        '$httpService',
        '$config',
        '$console',
        '$q',
        function($httpService,$config,$console,$q){

            var $cache = {}

            $cache.objCache = {}

            $cache.setValue = function(action,data,key){
                var deferred = $q.defer();
                $httpService.getJsonFromPost(action,data)
                    .then(function(result){
                        addItems(key,result.data.content);
                        deferred.resolve(result);
                    },function(error){
                        deferred.reject(error);
                    })

                return deferred.promise;
            }

            function addItems(key,items){
                $cache.objCache[key] = [];
                for(var item in items){
                    $cache.objCache[key].push(items[item]);
                }
            }

            $cache.getValue = function(key){
                if(!$cache.objCache[key]){
                    return []
                }
                return $cache.objCache[key]
            }

            $cache.resetValue = function(key){
                $cache.objCache[key] = [];
            }


            return $cache;
        }
    ])
