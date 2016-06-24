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
            document.getElementById('J_demo').style.height = height+'px';

             WKIT.init({
                container: document.getElementById('J_demo'),
                width: 700,
                height: 500,
                uid: '13818155071',
                appkey: 23369408,
                credential: '13818155071',
                touid: 'test1',
                logo: 'http://interface.im.taobao.com/mobileimweb/fileupload/downloadPriFile.do?type=1&fileId=876114ca44f4362f629f7d592014e057.jpg&suffix=jpg&width=1920&height=1200&wangxintype=1&client=ww',
                pluginUrl: 'http://www.taobao.com/market/seller/openim/plugindemo.php',
                onBack:function(){
                    WKIT.destroy();
                    var demo = document.getElementById('J_demo');
                    demo.parentNode.removeChild(demo);
                    $state.go('messageTalking');
                }
            });
        }
    ])