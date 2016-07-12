/**请求配置*/
angular.module("services.http",[])
    .factory("$httpService",[
        "$http",
        "$q",
        "Upload",
        '$alert',
        function($http,$q,Upload,$alert){
            var $httpService = {}
            $httpService.getJsonFromPost = function(action,data,config){
                var deferred = $q.defer();
                $http.post(action,data,config)
                    .success(function(result){
                        console.log(result)
                        if(result.error){
                            var systemError;
                            if(result.error.errorCode == 14 || result.error.errorCode == 15){
                                $alert.show('请重新登录萌宝派');
                            }
                            else{
                                systemError = {
                                    systemError: result.error
                                }
                            }
                            deferred.reject(systemError);
                        }
                        else{
                            deferred.resolve(result.response);
                        }
                    })
                    .error(function(error){
                        var httpError = {
                            httpError : error
                        }
                        deferred.reject(httpError);
                    })
                return deferred.promise;
            }

            $httpService.uploadImage = function(action,data){
                var deferred = $q.defer();
                Upload.upload({
                    url:action,
                    data:data
                }).then(function(result){
                    if(result.data.error){
                        var systemError = {
                            systemError: result.error
                        }
                        deferred.reject(systemError);
                    }
                    else{
                        deferred.resolve(result.data.response);
                    }
                },function(error){
                    var httpError = {
                        httpError : error
                    }
                    deferred.reject(httpError);
                },function(progress){
                    deferred.notify(progress)
                })
                return deferred.promise;
            }

            return $httpService;

        }])
