/**
 * Created by Administrator on 2016/5/13.
 */
angular.module("services.alert",[])
    .service("$alert",["$ionicPopup","$q",function($ionicPopup,$q){
        var $alert = {}

        $alert.show = function(msg){
            var deferred = $q.defer();
            $ionicPopup.alert({
                cssClass:"mbpz-popup-container",
                template:msg,
                okText:"确定",
                okType:"mbpz-popup-button"
            }).then(function(){
                deferred.resolve();
            })
            return deferred.promise
        }

        $alert.confirm = function(msg){
            var deferred = $q.defer();
            $ionicPopup.confirm({
                cssClass:"mbpz-popup-container",
                template:msg,
                cancelText: '取消',
                cancelType: 'mbpz-popup-button',
                okText:"确定",
                okType:"mbpz-popup-button"
            }).then(function(res){
                if(res){
                    deferred.resolve();
                }
                else{
                    deferred.reject()
                }
            })
            return deferred.promise
        }


        return $alert;

    }])