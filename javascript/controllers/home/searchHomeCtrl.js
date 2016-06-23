/**
 * Created by Administrator on 2016/6/16.
 */
angular.module('controllers.searchHome',[])
.controller('SearchHomeCtrl',[
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$console',
    '$config',
    '$httpService',
    '$ionicScrollDelegate',
    '$timeout',
    '$locals',
    '$ionicPopover',
    function($scope,$rootScope,$state,$stateParams,$console,$config,$httpService,$ionicScrollDelegate,$timeout,$locals,$ionicPopover){
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-ios');
        var searchHandle = $ionicScrollDelegate.$getByHandle('searchHandle');
        $scope.searchContentFlag = false;
        $scope.searchTypes = [
            {
                "type":"0",
                "name":"商品",
                "placeholder":"请输入商品名称"
            },
            {
                "type":"1",
                "name":"求购",
                "placeholder":"请输入商品名称"
            },
            {
                "type":"2",
                "name":"昵称",
                "placeholder":"请输入发布人昵称"
            }
        ]

        $scope.chooseType = $scope.searchTypes[0];

        $scope.chooseTypeName = $scope.chooseType.name;

        $scope.productList = []
        var numberOfPerPage = 10;
        var pageNo = 0;
        $scope.searchContentList = $locals.getObject($scope.chooseType.name);
        var cacheSearchContent;
        $scope.search = function(searchContent){
            $scope.searchContentFlag = false;
            if(searchContent){
                cacheSearchContent = searchContent;
                $scope.productList = [];
                $scope.infiniteFlag = true;
                searchHandle.resize();
                searchHandle.scrollTop();
                $scope.searchContentList = $locals.getObject($scope.chooseType.name);
                if(!$scope.searchContentList.data){
                    $scope.searchContentList.data = [];
                }
                var j = 0;
                for(var i in $scope.searchContentList.data){
                    if( $scope.searchContentList.data[i].toLowerCase().indexOf(searchContent.toLowerCase())>=0){
                        break;
                    }
                    else{
                        j++;
                    }
                }
                if(j == $scope.searchContentList.data.length){
                    $scope.searchContentList.data.push(searchContent)
                    $locals.setObject($scope.chooseType.name,$scope.searchContentList);
                }
                $console.show($scope.searchContentList)
            }
        }

        $scope.clearHistorySearch = function(){
            $scope.searchContent = '';
            $locals.setObject($scope.chooseType.name,{});
            $scope.searchContentList = $locals.getObject($scope.chooseType.name);
        }

        $scope.clear = function(){
            $scope.searchContent = '';
        }

        function searchContentByType(searchContent){
            if(searchContent){
                var data = {
                    "cmd":$config.cmds.search,
                    "parameters":{
                        "searchContent":searchContent,
                        "type":$scope.chooseType.type,
                        "numberOfPerPage":numberOfPerPage,
                        "pageNo":pageNo
                    }
                }
                $console.show(data);
                $httpService.getJsonFromPost($config.getRequestAction(),data)
                    .then(function(result){
                        $console.show(result);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        if(result.response.data.totalPages == 0){
                            $scope.infiniteFlag = false;
                            $scope.productList = null;
                            return ;
                        }
                        var items = result.response.data.content;
                        if(items==null||items.length==0){
                            $scope.infiniteFlag = false;
                            return ;
                        }
                        addItem(items);
                        if(pageNo == result.response.data.totalPages-1 ){
                            $scope.infiniteFlag = false;
                            return;
                        }
                        pageNo++;
                    })
            }
        }

        $ionicPopover.fromTemplateUrl($config.popovers.chooseSearchType.templateUrl,{
            scope:$scope
        }).then(function(popover){
            $scope.chooseSearchTypePopover = popover;
        })

        $scope.openPopover = function($event,popName){
            $scope[popName].show($event);
        }

        $scope.closePopover = function(popName){
            $scope[popName].hide();
        }

        $scope.changeSearchType = function(searchType){

            if($scope.chooseType != searchType){
                $console.show("hello");
                $scope.chooseType = searchType;
                $scope.searchContent = '';
                $scope.productList = [];
                $scope.searchContentFlag = false;
                $scope.infiniteFlag = false;
                $scope.searchContentList = $locals.getObject($scope.chooseType.name);
            }
            $scope.closePopover('chooseSearchTypePopover');
        }

        $scope.loadMore = function() {
            searchContentByType(cacheSearchContent);
        };

        function addItem(items){
            for(var item in items){
                $scope.productList.push(items[item]);
            }
        }
    }
])