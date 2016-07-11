/**
 * Created by sam on 16/7/11.
 */
angular.module('service.interceptor',[])
.factory('httpInterceptor',['$q','$locals','$config','$injector', function ($q,$locals,$config,$injector) {

    var httpInterceptor = {
        'responseError' : function(response) {
            console.log('response',response);
            return $q.reject(response);
        },
        'response' : function(response) {
            console.log('response1',response)
            var rootScope=$injector.get('$rootScope');
            var http=$injector.get('$http');
            //if($config.userPhone==null&&$config.userPhone==''){
            //
            //}
           if(response.data.statusCode==403){
                var data={
                    "cmd": $config.cmds.login,
                    "parameters":{
                        "loginAccount":$config.userPhone,
                        "thirdType":$config.thirdType
                    }
                }
                http.post($config.getRequestAction(),data)
                    .success(function (result) {

                        //rootScope.$state.go();
                    })
                    .error(function (error) {
                        console.log('error',error)
                    })
            }
            return response;
        },
        'request' : function(config) {
            var obj = $locals.getObject($config.USER_INFO_NAME);
            if(!obj.hasOwnProperty(obj.loginToken)){
            }
            return config;
        },
        'requestError' : function(config){
            return $q.reject(config);
        }
    };

    return httpInterceptor;
}])