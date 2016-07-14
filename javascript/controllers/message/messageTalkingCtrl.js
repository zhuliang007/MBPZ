/**
 * Created by zl_sam on 16/6/14.
 */
angular.module('controllers.messageTalking',[])
    .controller('MessageTalkingCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        function($scope,$console,$config,$rootScope,$stateParams,$state){
            $scope.items = [];
            $scope.WSDK = null;

            initToken = function(){
                $scope.checkLogin()
                    .then(function(){
                        $state.reload;

                        WKIT.init({
                            container: document.getElementById('user_list'),
                            width: 700,
                            height: 500,
                            uid: $scope.userPhone,
                            appkey:$config.appkeys ,
                            credential:$scope.userPhone,
                            touid: '15901718791',
                            onBack:function(){
                                wkitDestroy();
                                $state.go('tabs.tabsMessage')
                            },
                            onLoginSuccess:function(data){
                                $scope.WSDK = WKIT.Conn.sdk;
                                loginIn( $scope.WSDK,$scope.userInfo);
                            }
                        });
                    },function(){
                        $scope.autoLogin()
                            .then(function(){
                                initToken()
                            })
                    })
            }
            initToken();


            function loginIn(sdk,userInfo){
                sdk.Base.getRecentContact({
                    count:30,
                    success: function (data) {
                        var list = data.data.cnts;
                        list.forEach(function(item){
                            var param={
                                nickname:'',
                                avator:'',
                                emot:'',
                                uid:'',
                                userImage:''
                            }
                            param.nickname=item.nickname;
                            param.avators = item.avator;
                            param.emot=sdk.Plugin.Emot.decode(item.msg[0][1]);
                            param.uid = sdk.Base.getNick(item.uid);
                            param.userImage = userInfo.userImg?userInfo.userImg+'@414w':'';
                            $scope.items.push(param);
                        })
                    },
                    error:function(error){
                    }
                });
            }

            $scope.loginOut = function(){
                wkitDestroy();
                $state.go('tabs.tabsMessage');
            }

            $scope.contactFn = function(item,type){
                wkitDestroy();
                $state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                    touid:item.uid,nickName:item.nickname,type:type,
                    userImage:item.userImage?item.userImage+'@414w':'',toUserImage:item.avators?item.avators+'@414w':''});
            }

            var wkitDestroy = function(){
                WKIT.destroy();
                var demo = document.getElementById('user_list');
                demo.parentNode.removeChild(demo);
            }

        }])
