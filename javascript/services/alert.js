/**
 * Created by Administrator on 2016/5/13.
 */
angular.module("services.alert",[])
    .service("$alert",["$ionicPopup","$q",function($ionicPopup,$q){
        var $alert = {}

        $alert.show = function(msg,okText){
            var deferred = $q.defer();
            $ionicPopup.alert({
                cssClass:"mbpz-popup-container",
                template:msg,
                okText:okText||"确定",
                okType:"mbpz-popup-button"
            }).then(function(){
                deferred.resolve();
            })
            return deferred.promise
        }

        $alert.confirm = function(msg,okText,cancelText){
            var deferred = $q.defer();
            $ionicPopup.confirm({
                cssClass:"mbpz-popup-container",
                template:msg,
                cancelText: cancelText||'取消',
                cancelType: 'mbpz-popup-button',
                okText:okText||"确定",
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