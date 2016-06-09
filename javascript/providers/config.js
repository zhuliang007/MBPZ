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
            qgxx:"qgxx.png",
            defaultHead:"default-head.png"
        }


        /**接口cmd配置*/
        $config.cmds = {
            adInfo:"market/home/advert/info",
            getPage:"product/getPage",
            details:"product/details",
            replyList:"product/reply/list"

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
                url:"/:token?",
                name:"index",
                controller:"StartCtrl"
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
                controller:"HomeCtrl",
                cache:false
            },
            tabsShop : {
                templateUrl:"templates/tabs/tabs-shop.html",
                url:"/tabsShop/:token?",
                name:"tabs.tabsShop",
                controller:"ShopCtrl",
                cache:false
            },
            tabsMessage : {
                templateUrl:"templates/tabs/tabs-message.html",
                url:"/tabsMessage/:token?",
                name:"tabs.tabsMessage",
                controller:"MessageCtrl",
                cache:false
            },
            tabsPersonal : {
                templateUrl:"templates/tabs/tabs-personal.html",
                url:"/tabsPersonal/:token?",
                name:"tabs.tabsPersonal",
                controller:"PersonalCtrl",
                cache:false
            },
            productDetail:{
                templateUrl:"templates/detail/productDetail.html",
                url:"/productDetail/:token?:type:id",
                name:"productDetail",
                controller:"ProductDetailCtrl",
                cache:false
            }

        }

        $config.$get = function(){
            return this;
        }

        return $config;
    }])