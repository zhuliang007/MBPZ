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