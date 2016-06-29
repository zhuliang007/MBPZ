/**
 * Created by zl_sam on 16/6/13.
 */

angular.module('controllers.postReleaseCtrl',[])
    .controller('PostReleaseCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$locals',
        '$http',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$locals,$http){
                var tabsHeight = document.getElementsByClassName('tabs')[0].clientHeight;
                var contentHeight = document.getElementsByTagName('ion-content')[0].clientHeight-(tabsHeight*2);
                var ionContent = document.getElementsByTagName('ion-content');
                console.log(ionContent)
                //document.getElementsByName('ionContent').childNodes.clientHeight=contentHeight+'px';

        }])