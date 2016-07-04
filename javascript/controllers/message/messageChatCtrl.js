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
            console.log($stateParams)

             WKIT.init({
                container: document.getElementById('J_demos'),
                width: width,
                height: height,
                uid: $stateParams.uid,
                appkey: $config.appkeys,
                credential: $stateParams.credential,
                touid: $stateParams.touid,
                onBack:function(){
                    WKIT.destroy();
                    var demo = document.getElementById('J_demos');
                    demo.parentNode.removeChild(demo);
                    if($stateParams.type==0){
                        $state.go('messageTalking');
                    }else if($stateParams.type==1){
                        $state.go($config.controllers.mySold.name);
                    }
                },
                 onLoginSuccess:function(data){
                     $scope.WSDK = WKIT.Conn.sdk;
                     document.getElementById('J_wkitTitle').innerHTML= $stateParams.nickName;
                 }
            });

        }
    ])