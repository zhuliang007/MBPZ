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

            $city.setHotCity = function($scope){
                var deferred = $q.defer();

                if($city.hotCity.length==0){

                    $scope.commonBean.cmd = $config.cmds.getHotCityList;
                    $scope.commonBean.parameters=null;

                    $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
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

            $city.setAllCity = function($scope){
                var deferred = $q.defer();

                if($city.allCity.length==0){
                    $scope.commonBean.cmd = $config.cmds.getAllCityList;
                    $scope.commonBean.parameters=null;

                    $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
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
