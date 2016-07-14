/**
 * Created by Administrator on 2016/6/14.
 */
angular.module('services.city',[])
    .factory('$city',[
        '$httpService',
        '$config',
        '$console',
        '$q',
        function($httpService,$config,$console,$q){
            var $city = {};

            $city.hotCity=[];

            $city.allCity = [];

            $city.setHotCity = function(){
                var deferred = $q.defer();

                if($city.hotCity.length==0){
                    var data = {
                        "cmd":$config.cmds.getHotCityList
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $city.hotCity = result.data.hotCity;
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

            $city.setAllCity = function(){
                var deferred = $q.defer();

                if($city.allCity.length==0){
                    var data = {
                        "cmd":$config.cmds.getAllCityList
                    }

                    $httpService.getJsonFromPost($config.getRequestAction(),data)
                        .then(function(result){
                            $city.allCity = result.data.allCity;
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

            return $city;
        }
    ])
