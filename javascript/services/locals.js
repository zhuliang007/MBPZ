/**
 * Created by Administrator on 2016/6/16.
 */
angular.module('services.locals',[])
    .factory('$locals',[
        '$window',
        function($window){
            var $locals = {};
            //存储单个属性
            $locals.set = function(key,value){
                $window.localStorage[key]=value;
            }
            //读取单个属性
            $locals.get = function(key,defaultValue){
                return  $window.localStorage[key] || defaultValue;
            }
            //存储对象，以JSON格式存储
            $locals.setObject = function(key,value){
                $window.localStorage[key]=JSON.stringify(value);
            }
            //读取对象
            $locals.getObject = function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
            //清除对象
<<<<<<< Updated upstream
            $locals.clearObject = function (key) {
=======
            $locals.clearObject = function(key){
>>>>>>> Stashed changes
                $window.localStorage.removeItem(key);
            }
            return $locals;
        }
    ])
