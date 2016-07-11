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
            var http=$injector.get('$http');
            var $ionicPopup = $injector.get('$ionicPopup');
            var $state = $injector.get('$state');

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
                        var userInfo = {
                            loginToken:result.response.data.loginToken,
                            loginAccount:result.response.data.loginAccount,
                            id:result.response.data.id,
                            city:result.response.data.city,
                            cityText:result.response.data.cityText,
                            introduce:result.response.data.introduce,
                            nickName:result.response.data.nickName,
                            province:result.response.data.province,
                            provinceText:result.response.data.provinceText,
                            sex:result.response.data.sex,
                            userImg:result.response.data.userImg,
                            userLevel:result.response.data.userLevel
                        }
                        $locals.setObject($config.USER_INFO_NAME,userInfo);
                        return $q.reject(response);
                    })
                    .error(function (error) {
                        console.log('error',error)
                    })

            }
            if(response.data.hasOwnProperty('error')){
                var error = response.data.error;
                if(error!=null&&error.hasOwnProperty('errorCode')
                    &&error.errorCode==15||$config.userPhone==''){
                    $ionicPopup.alert({
                        cssClass:"mbpz-popup-container",
                        template:'请登录萌宝派',
                        okText:"确定",
                        okType:"mbpz-popup-button"
                    })
                }
            }

            return response;
        },
        'request' : function(config) {
            return config;
        },
        'requestError' : function(config){
            return $q.reject(config);
        }
    };

    return httpInterceptor;
}])