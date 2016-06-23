/**
 * Created by zl_sam on 16/6/14.
 */

angular.module('controllers.addressCtrl',[])
    .controller('AddressCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        function($scope,$console,$config,$rootScope,$stateParams,$state){

            $scope.clientSideList = [
                { text: "Backbone", value: "bb" },
                { text: "Angular", value: "ng" },
                { text: "Ember", value: "em" },
                { text: "Knockout", value: "ko" }
            ];
            $scope.data = {
                clientSide: 'ng'
            };


        }])