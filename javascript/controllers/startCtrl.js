/**
 * Created by Administrator on 2016/6/7.
 */
angular.module('controllers.start',[])
    .controller('StartCtrl',[
        '$scope',
        '$console',
        '$config',
        '$state',
        '$rootScope',
        '$state',
        '$stateParams',
        '$city',
        '$ionicModal',
        '$q',
        function($scope,$console,$config,$state,$rootScope,$state,$stateParams,$city,$ionicModal,$q){
            if($stateParams.token!=undefined){
                $rootScope.token = $stateParams.token;
                $state.go($config.controllers.tabsHome.name,{token:$rootScope.token});
            }

            $scope.showMsg = function(msg){
                $console.show(msg);
            }

            $scope.resizeImage = function(id,imgUrl,scale){
                if(imgUrl){
                    var element = document.getElementById(id);
                    var $element = angular.element(element);
                    scale = scale || "1:1";
                    var scaleOption = parseFloat(scale.split(":")[0])/parseFloat(scale.split(":")[1]);
                    var imgWidth = element.offsetWidth || document.body.offsetWidth;
                    //var imgWidth = element.offsetWidth;
                    $element.css({"width":imgWidth + "px","height":(imgWidth/scaleOption)+"px"});
                    return {"background-image":"url("+imgUrl+")","-webkit-background-image":"url("+imgUrl+")"};
                }
            }

            $scope.parseTime = function(time){
                if(time){
                    return DateFormat.format.prettyDate(time);
                }
            }

            $scope.defaultHead = $config.getImageUrlDebug() + $config.assets.defaultHead;


            $scope.showProduct = function(id,type){
                var params = {token:$rootScope.token,type:type,id:id};
                $state.go($config.controllers.productDetail.name,params)
            }

            //联系卖家
            $scope.contactSeller = function (seller) {

            }

            $scope.showProductListByType = function(type){
                var params = {token:$rootScope.token,type:type};
                $state.go($config.controllers.productListByType.name,params)
            }

            $scope.myCenterSetup = function(_value){
                $state.go(_value)
            }

            $scope.backupDown = function(_value){
                $state.go(_value)
            }



            $city.setHotCity()
                .then(function(){
                    $scope.hotCityList = $city.hotCity;
                })

            $city.setAllCity()
                .then(function(){
                    $scope.allCityList = $city.allCity;
                })


            createModal('cityModal')

            function createModal(modalName){
                $ionicModal.fromTemplateUrl($config.modals[modalName].templateUrl, {
                    scope: $scope,
                    animation: $config.modals[modalName].animation
                }).then(function(modal) {
                    $scope[modalName] = modal;
                });
            }

            $scope.citySearch = '';

            $scope.openModal = function(modalName) {
                $scope[modalName].show();
            };
            $scope.closeModal = function(modalName) {
                $scope[modalName].hide()
                $scope.$$childHead.$$childHead.citySearch = '';
            };
        }
    ])