/**
 * Created by Administrator on 2016/6/21.
 */
angular.module('controllers.report',[])
    .controller('ReportCtrl',[
        '$scope',
        '$console',
        '$config',
        '$httpService',
        '$locals',
        '$state',
        '$stateParams',
        '$keywords',
        '$rootScope',
        '$alert',
        function($scope,$console,$config,$httpService,$locals,$state,$stateParams,$keywords,$rootScope,$alert){
            var productId = $stateParams.productId;
            //$console.show(productId);
            var userInfo = {} ;
            if($locals.getObject($config.user_local_info)!=null) {
                userInfo =  $locals.getObject($config.user_local_info);
            }
            getKeyWords();
            function getKeyWords(){
                $keywords.setKeyWords($scope,'report',userInfo.loginToken)
                    .then(function(result){
                        $scope.reportTypeList = result;
                        //$console.show(result)
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }

            $scope.reportReason = {
                choiceType:0,
                reasonText:''
            }

            $scope.submitReport = function(chooseType,reasonText){

                if(!chooseType){
                    $alert.show("请选择举报原因");
                    return;
                }

                if(chooseType==4){
                    if(!reasonText){
                        $alert.show("请输入其他举报原因");
                        return;
                    }
                }

                $scope.commonBean.cmd = $config.cmds.report;
                $scope.commonBean.parameters={
                    "reportContentType":chooseType,
                    "relateId":productId,
                    "reportContent":chooseType==4?reasonText:''
                }
                $scope.commonBean.token =userInfo.loginToken;
                //console.log('report',data)

                $httpService.getJsonFromPost($config.getRequestAction(),JSON.stringify($scope.commonBean))
                    .then(function(result){
                        //$console.show(result.msg);
                        $alert.show(result.msg)
                            .then(function(){
                                $scope.goBack();
                            })
                    },function(error){
                        //$console.show(error);
                        if(!error){
                            $scope.goBack()
                        }
                    })
            }
        }
    ])
