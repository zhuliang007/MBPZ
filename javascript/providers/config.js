/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('providers.config',[])
.provider('$config',[function(){
    var $config = {}
    /**debug模式*/
    $config.debug = true;

    /**请求地址配置*/
    $config.requestAction = 'http://erpuat.mengbp.com:8094/wine-market-rest/cgi/';
    $config.requestActionDebug = 'http://erpuat.mengbp.com:8094/wine-market-rest/cgi/';
    $config.getRequestAction = function(){
        if(this.debug){
            return this.requestActionDebug;
        }
        return this.requestAction;
    }

    $config.imageUrl = '';
    $config.imageUrlDebug = 'assets/';
    $config.getImageUrlDebug = function(){
        if(this.debug){
            return this.imageUrlDebug;
        }
        return this.imageUrl;
    }

    /**图片资源配置*/
    $config.assets = {
        qgxx:"qgxx.png"
    }


    /**接口cmd配置*/
    $config.cmds = {
        home:{
            adInfo:"market/home/advert/info"
        }
    }

    $config.types = {
        ad:{
            Index:"INDEX"
        }
    }

    /**提示信息配置*/
    $config.messages = {

    }

    /**controller配置*/
    $config.controllers = {
        index:{
            templateUrl:"templates/index.html",
            url:"/:token?",
            name:"index",
            controller:"IndexCtrl"
        },
        tabs : {
            templateUrl:"templates/tabs/tabs.html",
            url:"/tabs",
            name:"tabs",
            abstract:true,
            controller:"TabsCtrl"
        },
        tabsHome : {
            templateUrl:"templates/tabs/tabs-home.html",
            url:"/tabsHome/:token?",
            name:"tabs.tabsHome",
            controller:"HomeCtrl"
        },
        tabsShop : {
            templateUrl:"templates/tabs/tabs-shop.html",
            url:"/tabsShop/:token?",
            name:"tabs.tabsShop",
            controller:"ShopCtrl"
        },
        tabsMessage : {
            templateUrl:"templates/tabs/tabs-message.html",
            url:"/tabsMessage/:token?",
            name:"tabs.tabsMessage",
            controller:"MessageCtrl"
        },
        tabsPersonal : {
            templateUrl:"templates/tabs/tabs-personal.html",
            url:"/tabsPersonal/:token?",
            name:"tabs.tabsPersonal",
            controller:"PersonalCtrl"
        }

    }

    $config.$get = function(){
        return this;
    }

    return $config;
}])