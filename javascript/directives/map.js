/**
 * Created by Administrator on 2016/6/15.
 */
angular.module('directives.map',[])
    .directive('map',[
        function(){
           /* var bdMap = {}
            var timeFlag = true;

            bdMap.restrict = 'E';
            bdMap.template = '<div id="map"></div>';
            bdMap.controller = ['$scope','$rootScope','$console','$config','$httpService','$locals','$interval','$alert',function($scope,$rootScope,$console,$config,$httpService,$locals,$interval,$alert){

                var latitude ;//纬度
                var longitude ; //经度
                getLocation();
                function getLocation()
                {
                    if (navigator.geolocation)
                    {
                        navigator.geolocation.getCurrentPosition(showPosition,showError);
                    }
                    else{
                        $alert.show('您当前设备不支持定位功能');
                    }
                }

                var map = new BMap.Map("map");

                function showPosition(position)
                {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    var ggPoint = new BMap.Point(longitude,latitude);
                    map.centerAndZoom(ggPoint, 15);
                    var convertor = new BMap.Convertor();
                    var pointArr = [];
                    pointArr.push(ggPoint);
                    convertor.translate(pointArr, 1, 5, translateCallback)
                }

                function showError(error)
                {
                    switch(error.code)
                    {
                        case error.PERMISSION_DENIED:
                            $alert.show('当前定位功能不可用');
                            $rootScope.currentCity = '';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            $rootScope.currentCity = '';
                            break;
                        case error.TIMEOUT:
                            $rootScope.currentCity = '';
                            break;
                        case error.UNKNOWN_ERROR:
                            $rootScope.currentCity = '';
                            break;
                    }
                }

                function translateCallback(result){
                    var geoc = new BMap.Geocoder();
                    geoc.getLocation(result.points[0], function(rs){
                        //$console.show(rs);
                        $rootScope.addComp = rs.addressComponents;
                        $rootScope.currentCity = $rootScope.addComp.city.split("市")[0];
                        //$console.show($rootScope.currentCity);
                        $rootScope.locationJosnStr = {}
                        $rootScope.locationJosnStr.address = $rootScope.addComp.city + $rootScope.addComp.district +$rootScope.addComp.street + $rootScope.addComp.streetNumber;
                        $rootScope.locationJosnStr.city = $rootScope.addComp.city;
                        $rootScope.locationJosnStr.cityCode = '';
                        $rootScope.locationJosnStr.country = '';
                        $rootScope.locationJosnStr.countryCode = '';
                        $rootScope.locationJosnStr.district = $rootScope.addComp.district;
                        $rootScope.locationJosnStr.province = $rootScope.addComp.province;
                        $rootScope.locationJosnStr.street = $rootScope.addComp.street;
                        $rootScope.locationJosnStr.streetNumber = $rootScope.addComp.streetNumber;
                        $rootScope.locationJosnStr.latitude = result.points[0].lat;
                        $rootScope.locationJosnStr.longitude = result.points[0].lng;
                        var timer = $interval(function(){
                            if(timeFlag) {
                                $scope.checkLogin()
                                    .then(function(){
                                        var data = {
                                            "cmd":$config.cmds.saveLocationAddress,
                                            "parameters":{
                                                "locationJosnStr":angular.toJson($rootScope.locationJosnStr)
                                            },
                                            "token":$scope.userInfo.loginToken
                                        };
                                        $httpService.getJsonFromPost($config.getRequestAction(),data)
                                            .then(function(result){
                                                //$console.show(result);
                                                timeFlag = false;
                                            })
                                    })
                            }
                            else{
                                $interval.cancel(timer);
                            }
                        },5000);
                    });
                }
            }]

            return bdMap;*/


            var map = {};
            map.restrict = 'E';
            map.template = '<div id="container" style="width:500px; height:300px"></div>';
            map.controller = ['$scope','$rootScope','$console','$config','$httpService','$locals','$interval','$alert',
                function($scope,$rootScope,$console,$config,$httpService,$locals,$interval,$alert){
                    var qMaps = new qq.maps.Map(document.getElementById("container"), {
                        // 地图的中心地理坐标。
                        center: new qq.maps.LatLng(39.916527,116.397128)
                    });

                    var cs=new qq.maps.CityService({
                        map : qMaps,
                        complete : function(results){
                            alert(JSON.stringify(results));
                            qMaps.setCenter(results.detail.latLng);
                            var marker = new qq.maps.Marker({
                                map:qMaps,
                                position: results.detail.latLng
                            });
                        }
                    });

                    var geocoder = new qq.maps.Geocoder({
                        complete:function(result){
                            alert(JSON.stringify(result));
                        }
                    });


                    var latitude ;//纬度
                    var longitude ; //经度
                    getLocation();
                    function getLocation()
                    {
                        if (navigator.geolocation)
                        {
                            navigator.geolocation.getCurrentPosition(showPosition,showError);
                        }
                        else{
                            $alert.show('您当前设备不支持定位功能');
                        }
                    }

                    function showPosition(position)
                    {
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;
                        console.log(latitude)
                        console.log(longitude)
                        /*new qq.maps.convertor.translate(new qq.maps.LatLng(latitude, longitude), 3, function(res) {
                            alert(JSON.stringify(res));
                        });*/
                        //cs.searchCityByLatLng(new qq.maps.LatLng(latitude,longitude));
                        /*var coord=new qq.maps.LatLng(latitude,longitude);
                        geocoder.getAddress(coord);*/
                    }

                    function showError(error)
                    {
                        switch(error.code)
                        {
                            case error.PERMISSION_DENIED:
                                $alert.show('当前定位功能不可用');
                                $rootScope.currentCity = '';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                $rootScope.currentCity = '';
                                break;
                            case error.TIMEOUT:
                                $rootScope.currentCity = '';
                                break;
                            case error.UNKNOWN_ERROR:
                                $rootScope.currentCity = '';
                                break;
                        }
                    }
            }]

            return map;
        }
    ])