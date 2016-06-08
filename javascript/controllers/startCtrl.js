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
        function($scope,$console,$config,$state,$rootScope,$state,$stateParams){
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
            
            $scope.contactSeller = function (seller) {

            }
        }
    ])