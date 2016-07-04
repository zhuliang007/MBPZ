/**
 * Created by zl_sam on 16/6/14.
 */

angular.module('controllers.messageTalking',[])
    .controller('MessageTalking',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        function($scope,$console,$config,$rootScope,$stateParams,$state){
            $scope.items = [];
            $scope.WSDK = null;
           // document.getElementById('J_demo').style.display='hidden';
            var uid = '13818155072';
            var credential='13818155072';

            $state.reload;
            WKIT.init({
               // container: document.getElementById('J_demo'),
                width: 700,
                height: 500,
                uid: uid,
                appkey:$config.appkeys ,
                credential:credential,
                touid: 'test1',
                onBack:function(){
                    wkitDestroy();
                    $state.go('tabs.tabsMessage')
                },
                onLoginSuccess:function(data){
                    $scope.WSDK = WKIT.Conn.sdk;
                    loginIn( $scope.WSDK);
                }
            });

            function loginIn(sdk){
                sdk.Base.getRecentContact({
                    count:30,
                    success: function (data) {
                        var list = data.data.cnts;
                        list.forEach(function(item){
                            var param={
                                nickname:'',
                                avator:'',
                                emot:'',
                                uid:''
                            }
                            param.nickname=item.nickname;
                            param.avators = item.avator;
                            param.emot=sdk.Plugin.Emot.decode(item.msg[0][1]);
                            param.uid = sdk.Base.getNick(item.uid);
                            $scope.items.push(param);
                        })
                    },
                    error:function(error){
                        console.log('error',error);
                    }
                });
            }

            $scope.loginOut = function(){
                wkitDestroy();
                $state.go('tabs.tabsMessage');
            }

            $scope.contactFn = function(nickName,userId,type){
                wkitDestroy();
                $state.go($config.controllers.messageChat.name,{uid:uid,credential:credential,touid:userId,nickName:nickName,type:type});
            }

            var wkitDestroy = function(){
               // var demo = document.getElementById('J_demo');
             //   demo.parentNode.removeChild(demo);
                WKIT.destroy();
            }

        }])