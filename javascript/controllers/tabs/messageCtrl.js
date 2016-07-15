/**
 * Created by Administrator on 2016/6/6.
 */
angular.module('controllers.message',[])
    .controller('MessageCtrl',[
        '$scope',
        '$console',
        '$config',
        '$rootScope',
        '$stateParams',
        '$state',
        '$httpService',
        '$locals',
        function($scope,$console,$config,$rootScope,$stateParams,$state,$httpService,$locals){
            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }

            console.log(userInfo)

            init = function(){
                var data = {
                    "cmd":$config.cmds.messageNum,
                    "parameters":{
                        "modual" :"system"
                    },
                    "token":userInfo.loginToken
                }
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        var arry = result.data;
                        arry.forEach(function (item) {
                            if(item.noticeCount>0){
                                document.getElementById(item.modual).innerHTML="您有"+item.noticeCount+"条新消息";
                                document.getElementById(item.modual).style.color="red";
                            }
                        })
                    })
            }
            init();

            //if(typeof(WKIT)=='undefined'){
            //    var head= document.getElementsByTagName('head')[0];
            //    var script= document.createElement('script');
            //    script.type= 'text/javascript';
            //    script.onload = script.onreadystatechange = function() {
            //        if (!this.readyState || this.readyState === "loaded" ||    this.readyState === "complete" ) {
            //            script.onload = script.onreadystatechange = null;
            //        } };
            //    script.src= 'https://g.alicdn.com/aliww/??h5.imsdk/2.1.5/scripts/yw/wsdk.js,h5.openim.kit/0.4.0/scripts/kit.js';
            //    script.charset = 'utf-8';
            //    head.appendChild(script);
            //}

        }])
