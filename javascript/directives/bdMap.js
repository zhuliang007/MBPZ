/**
 * Created by Administrator on 2016/6/15.
 */
angular.module('directives.bdMap',[])
    .directive('bdMap',[
        function(){
            var bdMap = {}

            bdMap.restrict = 'E';
            bdMap.template = '<div id="map"></div>';
            bdMap.controller = function($scope,$rootScope,$console,$config,$httpService){

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
                            //提示当前gps未开启或不可用
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
                    $console.show("Hello")
                    geoc.getLocation(result.points[0], function(rs){
                        var addComp = rs.addressComponents;
                        $rootScope.currentCity = addComp.city.split("市")[0];
                        var locationJsonStr = {}
                        locationJsonStr.address = addComp.city + addComp.district +addComp.street + addComp.streetNumber;
                        locationJsonStr.city = addComp.city;
                        locationJsonStr.cityCode = '';
                        locationJsonStr.country = '';
                        locationJsonStr.countryCode = '';
                        locationJsonStr.district = addComp.district;
                        locationJsonStr.province = addComp.province;
                        locationJsonStr.street = addComp.street;
                        locationJsonStr.streetNumber = addComp.streetNumber;
                        locationJsonStr.latitude = result.points[0].lat;
                        locationJsonStr.longitude = result.points[0].lng;
                        $console.show('token'+$rootScope.token)
                        if($rootScope.token){
                            var data = {
                                "cmd":$config.cmds.saveLocationAddress,
                                "parameters":{
                                    "locationJsonStr":angular.toJson(locationJsonStr)
                                },
                                "token":$rootScope.token
                            };
                            $httpService.getJsonFromPost($config.getRequestAction(),data)
                                .then(function(result){
                                    $console.show(result);
                                },function(error){
                                    $console.show(error);
                                })
                        }
                    });
                }

            }


            return bdMap;
        }
    ])