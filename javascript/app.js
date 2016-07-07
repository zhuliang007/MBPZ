/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('starter', ['ionic','starter.controllers','starter.directives','starter.providers','starter.filters','starter.services','ngFileUpload'])
    .config([
        '$stateProvider',
        '$configProvider',
        '$consoleProvider',
        '$ionicConfigProvider',
        '$urlRouterProvider',
        function($stateProvider,$configProvider,$consoleProvider,$ionicConfigProvider,$urlRouterProvider){
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
                .state($configProvider.controllers.shopDetail.name,{
                    url:$configProvider.controllers.shopDetail.url,
                    templateUrl:$configProvider.controllers.shopDetail.templateUrl,
                    controller:$configProvider.controllers.shopDetail.controller,
                    cache:$configProvider.controllers.shopDetail.cache,
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
                .state($configProvider.controllers.messageTalking.name,{
                    url:$configProvider.controllers.messageTalking.url,
                    templateUrl:$configProvider.controllers.messageTalking.templateUrl,
                    controller:$configProvider.controllers.messageTalking.controller,
                    cache:$configProvider.controllers.messageTalking.cache,
                })
                .state($configProvider.controllers.report.name,{
                    url:$configProvider.controllers.report.url,
                    templateUrl:$configProvider.controllers.report.templateUrl,
                    controller:$configProvider.controllers.report.controller,
                    cache:$configProvider.controllers.report.cache,
                })
                .state($configProvider.controllers.orderPreview.name,{
                    url:$configProvider.controllers.orderPreview.url,
                    templateUrl:$configProvider.controllers.orderPreview.templateUrl,
                    controller:$configProvider.controllers.orderPreview.controller,
                    cache:$configProvider.controllers.orderPreview.cache,
                })
                .state($configProvider.controllers.orderAddress.name,{
                    url:$configProvider.controllers.orderAddress.url,
                    templateUrl:$configProvider.controllers.orderAddress.templateUrl,
                    controller:$configProvider.controllers.orderAddress.controller,
                    cache:$configProvider.controllers.orderAddress.cache,
                })
                .state($configProvider.controllers.editAddress.name,{
                    url:$configProvider.controllers.editAddress.url,
                    templateUrl:$configProvider.controllers.editAddress.templateUrl,
                    controller:$configProvider.controllers.editAddress.controller,
                    cache:$configProvider.controllers.editAddress.cache,
                })
                .state($configProvider.controllers.messageChat.name,{
                    url:$configProvider.controllers.messageChat.url,
                    templateUrl:$configProvider.controllers.messageChat.templateUrl,
                    controller:$configProvider.controllers.messageChat.controller,
                    cache:$configProvider.controllers.messageChat.cache,
                })
                .state($configProvider.controllers.messageSystem.name,{
                    url:$configProvider.controllers.messageSystem.url,
                    templateUrl:$configProvider.controllers.messageSystem.templateUrl,
                    controller:$configProvider.controllers.messageSystem.controller,
                    cache:$configProvider.controllers.messageSystem.cache,
                    params:$configProvider.controllers.messageSystem.params,
                })
                .state($configProvider.controllers.publish.name,{
                    url:$configProvider.controllers.publish.url,
                    templateUrl:$configProvider.controllers.publish.templateUrl,
                    controller:$configProvider.controllers.publish.controller,
                    cache:$configProvider.controllers.publish.cache,
                })
                .state($configProvider.controllers.messageOrder.name,{
                    url:$configProvider.controllers.messageOrder.url,
                    templateUrl:$configProvider.controllers.messageOrder.templateUrl,
                    controller:$configProvider.controllers.messageOrder.controller,
                    cache:$configProvider.controllers.messageOrder.cache,
                    params:$configProvider.controllers.messageOrder.params,
                })
                .state($configProvider.controllers.messageProduct.name,{
                    url:$configProvider.controllers.messageProduct.url,
                    templateUrl:$configProvider.controllers.messageProduct.templateUrl,
                    controller:$configProvider.controllers.messageProduct.controller,
                    cache:$configProvider.controllers.messageProduct.cache,
                    params:$configProvider.controllers.messageProduct.params,
                })
                .state($configProvider.controllers.postRelease.name,{
                    url:$configProvider.controllers.postRelease.url,
                    abstract:$configProvider.controllers.postRelease.abstract,
                    controller:$configProvider.controllers.postRelease.controller,
                    templateUrl:$configProvider.controllers.postRelease.templateUrl,
                })
                .state($configProvider.controllers.sellContent.name,{
                    url:$configProvider.controllers.sellContent.url,
                    views:{
                        'tabs-sell':{
                            templateUrl: $configProvider.controllers.sellContent.templateUrl,
                            controller:$configProvider.controllers.sellContent.controller,
                        }
                    },
                    cache:$configProvider.controllers.sellContent.cache,
                })
                .state($configProvider.controllers.lookingContent.name,{
                    url:$configProvider.controllers.lookingContent.url,
                    views:{
                        'tabs-looking':{
                            templateUrl: $configProvider.controllers.lookingContent.templateUrl,
                            controller:$configProvider.controllers.lookingContent.controller,
                        }
                    },
                    cache:$configProvider.controllers.lookingContent.cache,
                })
                .state($configProvider.controllers.myCollection.name,{
                    url:$configProvider.controllers.myCollection.url,
                    templateUrl:$configProvider.controllers.myCollection.templateUrl,
                    controller:$configProvider.controllers.myCollection.controller,
                    cache:$configProvider.controllers.myCollection.cache,
                })
                .state($configProvider.controllers.myShelves.name,{
                    url:$configProvider.controllers.myShelves.url,
                    templateUrl:$configProvider.controllers.myShelves.templateUrl,
                    controller:$configProvider.controllers.myShelves.controller,
                    cache:$configProvider.controllers.myShelves.cache,
                })
                .state($configProvider.controllers.mySold.name,{
                    url:$configProvider.controllers.mySold.url,
                    templateUrl:$configProvider.controllers.mySold.templateUrl,
                    controller:$configProvider.controllers.mySold.controller,
                    cache:$configProvider.controllers.mySold.cache,
                    params:$configProvider.controllers.mySold.params,
                })
                .state($configProvider.controllers.myBought.name,{
                    url:$configProvider.controllers.myBought.url,
                    templateUrl:$configProvider.controllers.myBought.templateUrl,
                    controller:$configProvider.controllers.myBought.controller,
                    cache:$configProvider.controllers.myBought.cache,
                    params:$configProvider.controllers.myBought.params,
                })
                .state($configProvider.controllers.refundsRelease.name,{
                    url:$configProvider.controllers.refundsRelease.url,
                    abstract:$configProvider.controllers.refundsRelease.abstract,
                    controller:$configProvider.controllers.refundsRelease.controller,
                    templateUrl:$configProvider.controllers.refundsRelease.templateUrl,
                })
                .state($configProvider.controllers.sellRefundsRelease.name,{
                    url:$configProvider.controllers.sellRefundsRelease.url,
                    views:{
                        'refundsRelease-sell':{
                            templateUrl: $configProvider.controllers.sellRefundsRelease.templateUrl,
                            controller:$configProvider.controllers.sellRefundsRelease.controller,
                        }
                    },
                    cache:$configProvider.controllers.sellRefundsRelease.cache,
                })
                .state($configProvider.controllers.boughtRefundsRelease.name,{
                    url:$configProvider.controllers.boughtRefundsRelease.url,
                    views:{
                        'refundsRelease-bought':{
                            templateUrl: $configProvider.controllers.boughtRefundsRelease.templateUrl,
                            controller:$configProvider.controllers.boughtRefundsRelease.controller,
                        }
                    },
                    cache:$configProvider.controllers.boughtRefundsRelease.cache,
                })
                .state($configProvider.controllers.cancalOrder.name,{
                    url:$configProvider.controllers.cancalOrder.url,
                    templateUrl:$configProvider.controllers.cancalOrder.templateUrl,
                    controller:$configProvider.controllers.cancalOrder.controller,
                    cache:$configProvider.controllers.cancalOrder.cache,
                })
                .state($configProvider.controllers.applyRefund.name,{
                    url:$configProvider.controllers.applyRefund.url,
                    templateUrl:$configProvider.controllers.applyRefund.templateUrl,
                    controller:$configProvider.controllers.applyRefund.controller,
                    cache:$configProvider.controllers.applyRefund.cache,
                    params:$configProvider.controllers.applyRefund.params,
                })
                .state($configProvider.controllers.refusedApply.name,{
                    url:$configProvider.controllers.refusedApply.url,
                    templateUrl:$configProvider.controllers.refusedApply.templateUrl,
                    controller:$configProvider.controllers.refusedApply.controller,
                    cache:$configProvider.controllers.refusedApply.cache,
                    params:$configProvider.controllers.refusedApply.params,
                })
                .state($configProvider.controllers.pay.name,{
                    url:$configProvider.controllers.pay.url,
                    templateUrl:$configProvider.controllers.pay.templateUrl,
                    controller:$configProvider.controllers.pay.controller,
                    params:$configProvider.controllers.pay.params,
                    cache:$configProvider.controllers.pay.cache,
                })
                .state($configProvider.controllers.payRouters.name,{
                    url:$configProvider.controllers.payRouters.url,
                    templateUrl:$configProvider.controllers.payRouters.templateUrl,
                    controller:$configProvider.controllers.payRouters.controller,
                    cache:$configProvider.controllers.payRouters.cache,
                    params:$configProvider.controllers.payRouters.params,
                })
                .state($configProvider.controllers.orderDetail.name, {
                    url: $configProvider.controllers.orderDetail.url,
                    templateUrl: $configProvider.controllers.orderDetail.templateUrl,
                    controller: $configProvider.controllers.orderDetail.controller,
                    cache: $configProvider.controllers.orderDetail.cache,
                })
                .state($configProvider.controllers.recommend.name,{
                    url:$configProvider.controllers.recommend.url,
                    templateUrl:$configProvider.controllers.recommend.templateUrl,
                    controller:$configProvider.controllers.recommend.controller,
                    cache:$configProvider.controllers.recommend.cache,
                })
        }])