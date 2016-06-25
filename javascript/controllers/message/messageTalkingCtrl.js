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
            var sdk = new WSDK();
            $scope.items = [];
            sdk.Base.login({
                uid:'13818155071',
                credential:'13818155071',
                appkey: '23369408',
                timeout: 4000,
                success: function(data){
                    console.log(data);
                    if( data.resultText=="SUCCESS"){
                        loginIn();
                    }
                },
                error: function(error){
                    console.log('login fail', error);
                }
            });

            function loginIn(){
                sdk.Base.getRecentContact({
                    count:30,
                    success: function (data) {
                        var list = data.data.cnts;

                        list.forEach(function(item){
                            var param={
                                nickname:'',
                                avator:'',
                                emot:''
                            }
                            param.nickname=item.nickname;
                            param.avator = item.avator;
                            param.emot=sdk.Plugin.Emot.decode(item.msg[0][1]);
                            $scope.items.push(param);
                            console.log($scope.items);
                        })
                    },
                    error:function(error){
                        console.log('error',error);
                    }
                });
            }

            $scope.loginOut = function(){
                sdk.Base.destroy();
                sdk=null;
                $state.go('tabs.tabsMessage');
            }

        }])