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
                .state($configProvider.controllers.index.name,{
                    url:$configProvider.controllers.index.url,
                    templateUrl:$configProvider.controllers.index.templateUrl,
                    controller:$configProvider.controllers.index.controller
                })
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

        }])