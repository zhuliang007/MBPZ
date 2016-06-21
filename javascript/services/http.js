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
                            systemError: angular.toJson(result.error)
                        }
                        deferred.reject(angular.toJson(systemError));
                    }
                    else{
                        deferred.resolve(result.response);
                    }
                })
                .error(function(error){
                    var httpError = {
                        httpError : angular.toJson(error)
                    }
                    deferred.reject(angular.toJson(httpError));
                })
            return deferred.promise;
        }
        return $httpService;

    }])
