/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('starter', ['ionic','starter.controllers','starter.directives','starter.providers','starter.filters','starter.services'])
    .config([
        '$stateProvider',
        '$configProvider',
        '$consoleProvider',
        '$ionicConfigProvider',
        function($stateProvider,$configProvider,$consoleProvider,$ionicConfigProvider){
            $ionicConfigProvider.platform.ios.tabs.style('standard');
            $ionicConfigProvider.platform.ios.tabs.position('bottom');
            $ionicConfigProvider.platform.android.tabs.style('standard');
            $ionicConfigProvider.platform.android.tabs.position('standard');


            $stateProvider
                .state($configProvider.controllers.tabs.name,{
                    url:$configProvider.controllers.tabs.url,
                    templateUrl:$configProvider.controllers.tabs.templateUrl,
                    abstract:$configProvider.controllers.tabs.abstract,
                    controller:$configProvider.controllers.tabs.controller,
                })
                .state($configProvider.controllers.tabsHome.name,{
                    url:$configProvider.controllers.tabsHome.url,
                    views:{
                        'tabs-home':{
                            templateUrl:$configProvider.controllers.tabsHome.templateUrl,
                            controller:$configProvider.controllers.tabsHome.controller,
                        }
                    },
                    cache:$configProvider.controllers.tabsHome.cache
                })
                .state($configProvider.controllers.tabsShop.name,{
                    url:$configProvider.controllers.tabsShop.url,
                    views:{
                        'tabs-shop':{
                            templateUrl:$configProvider.controllers.tabsShop.templateUrl,
                            controller:$configProvider.controllers.tabsShop.controller
                        }
                    },
                    cache:$configProvider.controllers.tabsShop.cache
                })
                .state($configProvider.controllers.tabsMessage.name,{
                    url:$configProvider.controllers.tabsMessage.url,
                    views:{
                        'tabs-message':{
                            templateUrl:$configProvider.controllers.tabsMessage.templateUrl,
                            controller:$configProvider.controllers.tabsMessage.controller
                        }
                    },
                    cache:$configProvider.controllers.tabsMessage.cache
                })
                .state($configProvider.controllers.tabsPersonal.name,{
                    url:$configProvider.controllers.tabsPersonal.url,
                    views:{
                        'tabs-personal':{
                            templateUrl:$configProvider.controllers.tabsPersonal.templateUrl,
                            controller:$configProvider.controllers.tabsPersonal.controller
                        }
                    },
                    cache:$configProvider.controllers.tabsPersonal.cache
                })
                .state($configProvider.controllers.productDetail.name,{
                    url:$configProvider.controllers.productDetail.url,
                    templateUrl:$configProvider.controllers.productDetail.templateUrl,
                    controller:$configProvider.controllers.productDetail.controller,
                    cache:$configProvider.controllers.productDetail.cache,
                })
                .state($configProvider.controllers.productListByType.name,{
                    url:$configProvider.controllers.productListByType.url,
                    templateUrl:$configProvider.controllers.productListByType.templateUrl,
                    controller:$configProvider.controllers.productListByType.controller,
                    cache:$configProvider.controllers.productListByType.cache,
                })
                .state($configProvider.controllers.myCenterSetup.name,{
                    url:$configProvider.controllers.myCenterSetup.url,
                    templateUrl:$configProvider.controllers.myCenterSetup.templateUrl,
                    controller:$configProvider.controllers.myCenterSetup.controller,
                    cache:$configProvider.controllers.myCenterSetup.cache,
                })
                .state($configProvider.controllers.personalFeedback.name,{
                    url:$configProvider.controllers.personalFeedback.url,
                    templateUrl:$configProvider.controllers.personalFeedback.templateUrl,
                    controller:$configProvider.controllers.personalFeedback.controller,
                    cache:$configProvider.controllers.personalFeedback.cache,
                })
                .state($configProvider.controllers.personalHelps.name,{
                    url:$configProvider.controllers.personalHelps.url,
                    templateUrl:$configProvider.controllers.personalHelps.templateUrl,
                    cache:$configProvider.controllers.personalHelps.cache,
                })
                .state($configProvider.controllers.personalAgreement.name,{
                    url:$configProvider.controllers.personalAgreement.url,
                    templateUrl:$configProvider.controllers.personalAgreement.templateUrl,
                    cache:$configProvider.controllers.personalAgreement.cache,
                })
                .state($configProvider.controllers.personalTerms.name,{
                    url:$configProvider.controllers.personalTerms.url,
                    templateUrl:$configProvider.controllers.personalTerms.templateUrl,
                    cache:$configProvider.controllers.personalTerms.cache,
                })
                .state($configProvider.controllers.personalSpecification.name,{
                    url:$configProvider.controllers.personalSpecification.url,
                    templateUrl:$configProvider.controllers.personalSpecification.templateUrl,
                    cache:$configProvider.controllers.personalSpecification.cache,
                })
                .state($configProvider.controllers.myCenterWallet.name,{
                    url:$configProvider.controllers.myCenterWallet.url,
                    templateUrl:$configProvider.controllers.myCenterWallet.templateUrl,
                    controller:$configProvider.controllers.myCenterWallet.controller,
                    cache:$configProvider.controllers.myCenterWallet.cache,
                })
                .state($configProvider.controllers.searchHome.name,{
                    url:$configProvider.controllers.searchHome.url,
                    templateUrl:$configProvider.controllers.searchHome.templateUrl,
                    controller:$configProvider.controllers.searchHome.controller,
                    cache:$configProvider.controllers.searchHome.cache,
                })
                .state($configProvider.controllers.myCenterAddress.name,{
                    url:$configProvider.controllers.myCenterAddress.url,
                    templateUrl:$configProvider.controllers.myCenterAddress.templateUrl,
                    controller:$configProvider.controllers.myCenterAddress.controller,
                    cache:$configProvider.controllers.myCenterAddress.cache,
                })
                .state($configProvider.controllers.myCenterAddAdrs.name,{
                    url:$configProvider.controllers.myCenterAddAdrs.url,
                    templateUrl:$configProvider.controllers.myCenterAddAdrs.templateUrl,
                    controller:$configProvider.controllers.myCenterAddAdrs.controller,
                    cache:$configProvider.controllers.myCenterAddAdrs.cache,
                })
                .state($configProvider.controllers.myCenterRefund.name,{
                    url:$configProvider.controllers.myCenterRefund.url,
                    templateUrl:$configProvider.controllers.myCenterRefund.templateUrl,
                    controller:$configProvider.controllers.myCenterRefund.controller,
                    cache:$configProvider.controllers.myCenterRefund.cache,
                 })
                .state($configProvider.controllers.messageTalking.name,{
                    url:$configProvider.controllers.messageTalking.url,
                    templateUrl:$configProvider.controllers.messageTalking.templateUrl,
                    controller:$configProvider.controllers.messageTalking.controller,
                    cache:$configProvider.controllers.messageTalking.cache,
                })

        }])