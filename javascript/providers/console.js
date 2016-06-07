/**
 * Created by Administrator on 2016/6/6.
 */
/**console配置，配合debug模式*/
angular.module('providers.console',[])
.provider('$console',[
    '$configProvider',
    function($configProvider){
        var $console = {};

        $console.show = function(msg){
            if($configProvider.debug){
                console.log(msg);
            }
        }

        $console.$get = function(){
            return this;
        }

        return $console;
    }
])