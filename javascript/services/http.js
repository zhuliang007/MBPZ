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
                    deferred.resolve(result);
                })
                .error(function(error){
                    deferred.reject(error);
                })
            return deferred.promise;
        }
        return $httpService;

    }])
