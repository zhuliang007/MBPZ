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
                appkey: $config.appkeys,
                credential: $stateParams.credential,
                touid: $stateParams.touid,
                avatar:$stateParams.userImage,
                toAvatar:$stateParams.toUserImage,
                onBack:function(){
                    WKIT.destroy();
                    var demo = document.getElementById('J_demos');
                    demo.parentNode.removeChild(demo);
                    switch (parseInt($stateParams.type)){
                        case 0:
                            $state.go('messageTalking');
                            break;
                        case 1:
                            $state.go($config.controllers.mySold.name);
                            break;
                        case 2:
                            $scope.goBack();
                            break;
                        case 3:
                            $state.go($config.controllers.myBought.name);
                            break;
                        case 4:
                            $state.go($config.controllers.sellRefundsRelease.name);
                            break;
                        case 5:
                            $state.go($config.controllers.boughtRefundsRelease.name);
                            break;
                    }
                },
                onLoginSuccess:function(data){
                    $scope.WSDK = WKIT.Conn.sdk;
                    document.getElementById('J_wkitTitle').innerHTML= $stateParams.nickName;
                },
                onMsgReceived: function (msg) {
                    console.log(msg)
                }
            });

        }
    ])