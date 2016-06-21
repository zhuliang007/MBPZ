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
            replyList:"product/reply/list",
            codeInfo:"system/codeInfo/getAll",
            recommendationProduct:"market/home/recommendation",
            getScreen:"market/home/getScreen",
            getHotCityList:"market/home/getHotCityList",
            getAllCityList:"market/home/getAllCityList",
            saveLocationAddress:"market/home/saveLocationAddress",
            search:"market/home/search"
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
            tabs : {
                templateUrl:"templates/tabs/tabs.html",
                url:"/tabs",
                name:"tabs",
                abstract:true,
                controller:"TabsCtrl"
            },
            tabsHome : {
                templateUrl:"templates/tabs/tabs-home.html",
                url:"/tabsHome",
                name:"tabs.tabsHome",
                controller:"HomeCtrl",
                cache:false
            },
            tabsShop : {
                templateUrl:"templates/tabs/tabs-shop.html",
                url:"/tabsShop" +
                "",
                name:"tabs.tabsShop",
                controller:"ShopCtrl",
                cache:false
            },
            tabsMessage : {
                templateUrl:"templates/tabs/tabs-message.html",
                url:"/tabsMessage",
                name:"tabs.tabsMessage",
                controller:"MessageCtrl",
                cache:false
            },
            tabsPersonal : {
                templateUrl:"templates/tabs/tabs-personal.html",
                url:"/tabsPersonal",
                name:"tabs.tabsPersonal",
                controller:"PersonalCtrl",
                cache:false
            },
            productDetail:{
                templateUrl:"templates/detail/productDetail.html",
                url:"/productDetail/:type&:id",
                name:"productDetail",
                controller:"ProductDetailCtrl",
                cache:false
            },
            productListByType:{
                templateUrl:"templates/home/productListByType.html",
                url:"/productListByType/:type",
                name:"productListByType",
                controller:"ProductListByTypeCtrl",
                cache:false
            },
            myCenterSetup:{
                templateUrl:"templates/personal/setup/personal-setup.html",
                url:"/personalSetup",
                name:"myCenterSetup",
                controller:"MyCenterSetupCtrl",
                cache:false
            },
            personalFeedback:{
                templateUrl:"templates/personal/setup/personal-feedback.html",
                url:"/feedback",
                name:"personalFeedback",
                controller:"FeedbackCtrl",
                cache:false
            },
            personalHelps:{
                templateUrl:"templates/personal/setup/personal-help.html",
                url:"/help",
                name:"personalHelp",
                cache:false
            },
            personalAgreement:{
                templateUrl:"templates/personal/setup/personal-agreement.html",
                url:"/agreement",
                name:"personalAgreement",
                cache:false
            },
            personalTerms:{
                templateUrl:"templates/personal/setup/personal-terms.html",
                url:"/terms",
                name:"personalTerms",
                cache:false
            },
            personalSpecification:{
                templateUrl:"templates/personal/setup/personal-specification.html",
                url:"/specification",
                name:"personalSpecification",
                cache:false
            },
            myCenterWallet:{
                templateUrl:"templates/personal/wallet/personal-wallet.html",
                url:"/wallet",
                name:"myCenterWallet",
                controller:"WalletCtrl",
                cache:false
            },
            searchHome:{
                templateUrl:"templates/home/search.html",
                url:"/searchHome",
                name:"searchHome",
                controller:"SearchHomeCtrl",
                cache:false
            }

        }

        /*popover配置*/
        $config.popovers = {
            filterType: {
                templateUrl:"templates/popover/filterType.html"
            },
            filterOrder:{
                templateUrl:"templates/popover/filterOrder.html"
            },
            filterPrice:{
                templateUrl:"templates/popover/filterPrice.html"
            },
            chooseSearchType:{
                templateUrl:"templates/popover/chooseSearchType.html"
            }
        }

        /*model配置*/
        $config.modals = {
            cityModal:{
                templateUrl:"templates/modal/city.html",
                animation:"slide-in-up"
            }
        }

        $config.$get = function(){
            return this;
        }

        return $config;
    }])