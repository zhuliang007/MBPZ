/**请求配置*/
angular.module("services.http",[])
    .factory("$httpService",[
        "$http",
        "$q",
        "Upload",
        function($http,$q,Upload){
            var $httpService = {}
            $httpService.getJsonFromPost = function(action,data,config){
                var deferred = $q.defer();
                $http.post(action,data,config)
                    .success(function(result){
                        if(result.error){
                            var systemError = {
                                systemError: result.error
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
