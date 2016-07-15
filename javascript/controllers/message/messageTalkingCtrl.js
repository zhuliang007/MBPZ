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
        '$locals',
        '$q',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$locals,$q){
            $scope.items = [];
            $scope.WSDK = null;

            var userInfo ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            initToken = function(){
                $state.reload;

                WKIT.init({
                    container: document.getElementById('user_list'),
                    width: 700,
                    height: 500,
                    uid: userInfo.loginAccount,
                    appkey:$config.appkeys ,
                    credential:userInfo.loginAccount,
                    touid: '15901718791',
                    onBack:function(){
                        wkitDestroy();
                        $state.go('tabs.tabsMessage')
                    },
                    onLoginSuccess:function(data){
                        $scope.WSDK = WKIT.Conn.sdk;
                        loginIn( $scope.WSDK)
                            .then(function(items){
                                getRecentList(items,$scope.WSDK)
                            })
                    }
                });
            }
            initToken();

            function loginIn(sdk){
                var deferred = $q.defer();
                sdk.Base.getRecentContact({
                    count:30,
                    success: function (data) {
                        var list = data.data.cnts;
                        deferred.resolve(list)
                    },
                    error:function(error){
                        deferred.reject(error)
                    }
                });
                return deferred.promise;
            }

            getRecentList = function (list,sdk){
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
            }

            $scope.loginOut = function(){
                wkitDestroy();
                $state.go('tabs.tabsMessage');
            }

            $scope.contactFn = function(item,type){
                wkitDestroy();
                //$state.go($config.controllers.messageChat.name,{uid:$scope.userPhone,credential:$scope.userPhone,
                //    touid:item.uid,nickName:item.nickname,type:type,
                //    userImage:item.userImage,toUserImage:item.avators});
                $scope.clickChats(item,type);
            }

            var wkitDestroy = function(){
                WKIT.destroy();
                var demo = document.getElementById('user_list');
                demo.parentNode.removeChild(demo);
            }

        }])
