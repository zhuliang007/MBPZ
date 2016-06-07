/**
 * Created by Administrator on 2016/6/7.
 */
angular.module('controllers.start',[])
    .controller('startCtrl',[
        '$scope',
        '$console',
        function($scope,$console){
            $scope.showMsg = function(msg){
                $console.show(msg);
            }

            $scope.resizeImage = function(id,imgUrl,scale){
                if(imgUrl){
                    var element = document.getElementById(id);
                    var $element = angular.element(element);
                    scale = scale || "1:1";
                    var scaleOption = parseInt(scale.split(":")[0],10)/parseInt(scale.split(":")[1],10);
                    //var imgWidth = element.offsetWidth || document.body.offsetWidth;
                    var imgWidth = element.offsetWidth;
                    $element.css({"width":imgWidth + "px","height":(imgWidth/scaleOption)+"px"});
                    return {"background-image":"url("+imgUrl+")","-webkit-background-image":"url("+imgUrl+")"};
                }
            }
        }
    ])