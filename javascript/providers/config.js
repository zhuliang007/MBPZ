/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('providers.config',[])
    .provider('$config',[function(){

        var $config = {}
        $config.user_local_info= 'U_USER';

        /**debug模式*/
        $config.debug = false;
        $config.appkeys = '23369408';

        $config.userObj = 'U_USER';
        $config.u_p = "U_PHONE";
        $config.error_login = '请重新登录萌宝派';

        /**请求地址配置*/
        $config.requestAction = 'http://erpuat.mengbp.com:8094/wine-market-rest/cgi/';
        $config.requestActionDebug = 'http://erpuat.mengbp.com:8094/wine-market-rest/cgi/';
        //$config.requestActionDebug = 'http://192.168.100.64:8085/wine-market-rest/cgi/';
        $config.getRequestAction = function(){
            if(this.debug){
                return this.requestActionDebug;
            }
            return this.requestAction;
        }

        $config.requestPublish = 'http://erpuat.mengbp.com:8094/wine-market-rest/';
        $config.requestPublishDebug = 'http://erpuat.mengbp.com:8094/wine-market-rest/';
        //$config.requestPublishDebug = 'http://192.168.100.64:8085/wine-market-rest/';
        $config.getRequestPublish = function(){
            if(this.debug){
                return this.requestPublishDebug;
            }
            return this.requestPublish;
        }

        $config.publish = {
            upload:"media/image/upload",
            delete:"media/image/delete",
            create:"product/v1.1/public",
            edit:"product/v1.1/edit"
        }

        //$config.imageUrl = 'http://mbpz.image.alimmdn.com/smartMBPZ/resources/image/';
        $config.imageUrl = 'assets/';
        $config.imageUrlDebug = 'assets/';
        $config.getImageUrlDebug = function(){
            if(this.debug){
                return this.imageUrlDebug;
            }
            return this.imageUrl;
        }

        $config.getChatUrl = function(){
            if(this.debug){
                return "http://"+window.location.host+"/MBPZ/mkit.html";
            }
            return "http://"+window.location.host+"/smartMBPZ/mkit.html";
        }

        /**图片资源配置*/
        $config.assets = {
            qgxx:"qgxx.png",
            defaultHead:"default-head.png",
            halfCircle:"half-circle.png",
            loginBg:"login_back.jpg",
            launcher:"ic_launcher.png",
            icSale:"ic_sale.png",
            icWant:"ic_want.png",
            icCancel:"ic_cancel.png",
            icAddPhoto:"ic_add_photo.png",
            mineAdd:"mine/icon_mine_add.png",
            mineBuy:"mine/icon_mine_buy.png",
            mineCollect:"mine/icon_mine_collect.png",
            mineRefunds:"mine/icon_mine_refunds.png",
            mineRelease:"mine/icon_mine_release.png",
            mineSold:"mine/icon_mine_sold.png",
            mineUndercarriage:"mine/icon_mine_undercarriage.png",
            mineWallet:"mine/icon_mine_wallet.png",
            alipay:"alipay.png",
            progresBar:"progress-bar.png",
        }


        /**接口cmd配置*/
        $config.cmds = {
            adInfo:"market/home/advert/info",
            getPage:"product/getPage",
            details:"product/details",
            sendReply:"product/reply",
            replyList:"product/reply/list",
            codeInfo:"system/codeInfo/getAll",
            recommendationProduct:"market/home/recommendation",
            getScreen:"market/home/getScreen",
            getHotCityList:"market/home/getHotCityList",
            getAllCityList:"market/home/getAllCityList",
            saveLocationAddress:"market/home/saveLocationAddress",
            search:"market/home/search",
            getSecurityCode:"market/getSecurityCode",
            login:"market/login",
            collect:"product/collect",
            spot:"product/askToBuy/spot",
            resolve:"product/askToBuy/resolve",
            tipoffs:"system/tipoffs/getPage",
            report:"system/tipoffs/report",
            reserve:"market/order/reserve",
            addressList:"userAddress/getPage",
            provinceCity:"provinceCity/getAll",
            userAddressSave:"userAddress/save",
            userAddressDelete:"userAddress/delete",
            userAddressDetail:"userAddress/detail",
            orderCommit:"market/order/commit",
            addFeedback:"myself/feedback/opinion",
            systemMessage:"market/message/getPage",
            messageNum:"market/message/getType",
            walletNum:"wallet/account/index",
            productPublic:"myself/productPublic/list",
            productDel:"product/delete",
            personalCount:"myself/getCount",
            myProductList:"myself/productCollect/list",
            myOrderList:"market/order/list",
            systemDict:"system/getMultipleDict",
            cancelOrder:"market/order/cancel",
            noticOrder:"market/order/notice",
            applyRefound:"market/order/applyRefund",
            applyRefused:"market/order/refund",
            dictList:"system/dictList",
            orderDetail:"market/order/detail",
            orderSend:"market/order/buyerSend",
            sellerSend:"market/order/sellerSend",
            orderReceive:"market/order/buyerReceive",
            evaluateSave:"market/evaluate/save",
            evaluateDetail:"market/evaluate/detail",
            sellerReceive:"market/order/sellerReceive",
            personCenterInfo:"market/center/personCenterInfo",
            selectProduct:"market/center/selectProductList",
            evaluateList:"market/evaluate/list",
        }



        /**提示信息配置*/
        $config.messages = {
            noTel:"请输入手机号",
            noCode:"请输入验证码",
            errorCode:"验证码错误"
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
                url:"/tabsShop",
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
                url:"/productDetail/:id&:type?",
                name:"productDetail",
                controller:"ProductDetailCtrl",
                cache:false
            },
            shopDetail:{
                templateUrl:"templates/detail/shopDetail.html",
                url:"/shopDetail/:id",
                name:"shopDetail",
                controller:"ShopDetailCtrl",
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
            },
            messageTalking: {
                templateUrl: "templates/message/message-list.html",
                url: "/talking",
                name: "messageTalking",
                controller: "MessageTalkingCtrl",
                cache:false
            },
            messageChat:{
                templateUrl: "templates/message/message-chat.html",
                url: "/chat/:uid&:credential&:touid&:nickName&:type&:userImage&:toUserImage?",
                name: "messageChat",
                controller: "MessageChat",
                cache:false,
            },
            report:{
                templateUrl:"templates/detail/report.html",
                url:"/report/:productId",
                name:"report",
                controller:"ReportCtrl",
                cache:false
            },
            orderPreview:{
                templateUrl:"templates/order/orderPreview.html",
                url:"/orderPreview/:productId",
                name:"orderPreview",
                controller:"OrderPreviewCtrl",
                cache:false
            },
            orderAddress:{
                templateUrl:"templates/personal/orderAddress/orderAddress.html",
                url:"/orderAddress/:type?",
                name:"orderAddress",
                controller:"OrderAddressCtrl",
                cache:false
            },
            editAddress:{
                templateUrl:"templates/personal/orderAddress/editAddress.html",
                url:"/editAddress/:id?",
                name:"editAddress",
                controller:"EditAddressCtrl",
                cache:false
            },
            messageSystem:{
                templateUrl:"templates/message/message-system.html",
                url:"/messageSystem",
                name:"messageSystem",
                controller:"MessagesCtrl",
                cache:false,
                params:{
                    modual:"system"
                },
            },
            messageOrder:{
                templateUrl:"templates/message/message-order.html",
                url:"/messageOrder",
                name:"messageOrder",
                controller:"MessagesCtrl",
                cache:false,
                params:{
                    modual:"order"
                },
            },
            messageProduct:{
                templateUrl:"templates/message/message-product.html",
                url:"/messageProduct",
                name:"messageProduct",
                controller:"MessagesCtrl",
                cache:false,
                params:{
                    modual:"product"
                },
            },
            publish:{
                templateUrl:"templates/publish/publish.html",
                url:"/publish/:type&:id?",
                name:"publish",
                controller:"PublishCtrl",
                cache:false
            },
            postRelease:{
                templateUrl:"templates/personal/post-release.html",
                url:"/postRelease",
                abstract:true,
                name:"postRelease",
                controller:"PostReleaseCtrl",
            },
            sellContent:{
                templateUrl:"templates/personal/postRelease-sell.html",
                url:"/postReleaseSell",
                name:"postRelease.sell",
                controller:"SellCtrl",
                cache:false
            },
            lookingContent:{
                templateUrl:"templates/personal/postRelease-looking.html",
                url:"/looking",
                name:"postRelease.looking",
                controller:"LookingCtrl",
                cache:false
            },
            refundsRelease:{
                templateUrl:"templates/personal/refunds-release.html",
                url:"/refundsRelease",
                abstract:true,
                controller:"RefundsReleaseCtrl",
                name:"refundsRelease",
            },
            sellRefundsRelease:{
                templateUrl:"templates/personal/refundsRelease-sell.html",
                url:"/refundsReleaseSell",
                name:"refundsRelease.sell",
                controller:"RefundsSellCtrl",
                cache:false
            },
            boughtRefundsRelease:{
                templateUrl:"templates/personal/refundsRelease-bought.html",
                url:"/bought",
                name:"refundsRelease.bought",
                controller:"RefundsBoughtCtrl",
                cache:false
            },
            myCollection:{
                templateUrl:"templates/personal/personal-collection.html",
                url:"/myCollection",
                name:"myCollection",
                controller:"CollectionCtrl",
                cache:false
            },
            myShelves:{
                templateUrl:"templates/personal/personal-shelves.html",
                url:"/myShelves",
                name:"myShelves",
                controller:"MyShelvesCtrl",
                cache:false
            },
            mySold:{
                templateUrl:"templates/personal/personal-sold.html",
                url:"/mySold",
                name:"mySold",
                controller:"MySoldCtrl",
                params:{
                    orderType:"order",
                    saleType:"sell"
                },
                cache:false
            },
            myBought:{
                templateUrl:"templates/personal/personal-bought.html",
                url:"/myBought/:type?",
                name:"myBought",
                controller:"MyBoughtCtrl",
                params:{
                    orderType:"order",
                    saleType:"buy"
                },
                cache:false
            },
            cancalOrder:{
                templateUrl:"templates/order/cancal-order.html",
                url:"/cancalOrder/:id&:orderType&:type?",
                name:"cancalOrder",
                controller:"CancalOrderCtrl",
                cache:false
            },
            applyRefund:{
                templateUrl:"templates/order/apply-refund.html",
                url:"/applyRefund/:id&:price&:freight:&:type?",
                name:"applyRefund",
                params:{
                    obj:null
                },
                controller:"ApplyRefundCtrl",
                cache:false
            },
            refusedApply:{
                templateUrl:"templates/order/refused-apply.html",
                url:"/refusedApply/:id&:type&:routers?",
                name:"refusedApply",
                params:{
                    obj:null
                },
                controller:"RefusedApplyCtrl",
                cache:false
            },
            pay:{
                templateUrl:"templates/pay/pay.html",
                url:"/pay/:id?",
                name:"pay",
                controller:"PayCtrl",
                params:{
                    obj:null,
                    routers:null
                },
                cache:false
            },
            payRouters:{
                templateUrl:"templates/pay/pay-alipay.html",
                url:"/payRouters/:id?",
                params:{
                    obj:null,
                    routers:null
                },
                controller:"AliPayCtrl",
                name:"payRouters",
                cache:false
            },
            orderDetail: {
                templateUrl: "templates/order/order-detail.html",
                url: "/orderDetail/:id&:type?",
                controller: "OrderDetailCtrl",
                name: "orderDetail",
                cache:false
            },
            recommend:{
                templateUrl:"templates/detail/recommend.html",
                url:"/recommend/:productId&:repUserId",
                name:"recommend",
                controller:"RecommendCtrl",
                cache:false
            },
            submitDelivery:{
                templateUrl:"templates/order/order-delivery.html",
                url:"/delivery/:id&:type?",
                name:"submitDelivery",
                controller:"DeliveryCtrl",
                cache:false
            },
            orderEvaluate:{
                templateUrl:"templates/order/orderEvaluate.html",
                url:"/orderEvaluate/:orderId",
                name:"orderEvaluate",
                controller:"OrderEvaluateCtrl",
                cache:false
            },
            evaluateDetail:{
                templateUrl:"templates/order/evaluateDetail.html",
                url:"/evaluateDetail/:orderId&:showType?&:type&:orderDetail?",
                name:"evaluateDetail",
                controller:"EvaluateDetailCtrl",
                cache:false
            },
            personalCenter:{
                templateUrl:"templates/personal/personal-center.html",
                url:"/personalCenter/:userId&:type?",
                name:"personalCenter",
                controller:"PersonalCenterCtrl",
                cache:false
            },
            evaluateList:{
                templateUrl:"templates/personal/evaluateList.html",
                url:"/evaluateList/:userId?",
                name:"evaluateList",
                controller:"EvaluateListCtrl",
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
            },
            productReport:{
                templateUrl:"templates/popover/productReport.html"
            },
            reply:{
                templateUrl:"templates/popover/reply.html"
            },
            shopSort:{
                templateUrl:"templates/popover/shopSort.html"
            }
        }

        /*model配置*/
        $config.modals = {
            cityModal:{
                templateUrl:"templates/modal/city.html",
                animation:"slide-in-up"
            },
            loginModal:{
                templateUrl:"templates/modal/login.html",
                animation:"slide-in-up"
            },
            provinceCityModal:{
                templateUrl:"templates/modal/provinceCity.html",
                animation:"slide-in-up"
            },
            publishModal: {
                templateUrl:"templates/modal/publish.html",
                animation:null
            }
        }

        $config.$get = function(){
            return this;
        }

        return $config;
    }])
