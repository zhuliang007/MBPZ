angular.module('controllers.messageChat',[])
    .controller('MessageChat',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        function($scope,$console,$config,$rootScope,$stateParams,$state){
            var height = window.screen.height ;
            var width = window.screen.width;
            document.getElementById('J_demos').style.height = height+'px';

             WKIT.init({
                container: document.getElementById('J_demos'),
                width: width,
                height: height,
                uid: $stateParams.uid,
                appkey: $stateParams.appkey,
                credential: $stateParams.credential,
                touid: $stateParams.touid,
                onBack:function(){
                    WKIT.destroy();
                    var demo = document.getElementById('J_demos');
                    demo.parentNode.removeChild(demo);
                    $state.go('messageTalking');
                },
                 onLoginSuccess:function(data){
                     $scope.WSDK = WKIT.Conn.sdk;
                     document.getElementById('J_wkitTitle').innerHTML= $stateParams.nickName;
                 }
            });

        }
    ])