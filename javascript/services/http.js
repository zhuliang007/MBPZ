/**请求配置*/
angular.module("services.http",[])
    .factory("$httpService",[
        "$http",
        "$q",function($http,$q){
        var $httpService = {}
            $httpService.getJsonFromPost = function(action,data){
            var deferred = $q.defer();
            $http.post(action,data)
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
        return $httpService;

    }])
