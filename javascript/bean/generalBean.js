/**
 * Created by sam on 16/7/25.
 */

/**
 *公共请求参数
 */
var commonBean = function(){
    this.cmd;
    this.parameters;
    this.token=null;
    this.resolution = getWH();
    this.locationXy;
    this.deviceInfo = getDeviceData();
    this.appVersion = 'H5_1.0.0';
    this.messageId;
    this.requestId;
    this.requestTime;
    this.ip=returnCitySN["cip"];
    this.sign;
}

var deviceInfo = function () {
    this.device;
    this.deviceMode;
    this.deviceVersion;
    this.deviceImei;
}

var getDeviceData = function(){
    var ua = window.navigator.userAgent;
    var deviceInfos = new deviceInfo();
    if(ua.indexOf('iPhone')>-1){
        var index = ua.indexOf('iPhone');
        var sli = ua.slice(index+12,index+25);
        deviceInfos.device = "IOS";
        deviceInfos.deviceMode = sli;
        deviceInfos.deviceVersion = "iPhone";
    }else if(ua.indexOf("Android")>-1){
        var index = ua.indexOf('Android');
        var sli = ua.slice(index,index+11);
        var version = '';
        if(ua.indexOf("Windows Phone")>-1){
            version = ua.indexOf("Microsoft");
            var app = ua.indexOf("AppleWebKit");
            deviceInfos.device = "Windows Phone";
            deviceInfos.deviceMode =ua.slice(index,version-2);
            deviceInfos.deviceVersion = ua.slice(version+11,app-2);
        }else{
            var index2 = ua.indexOf('Build');
            if(ua.indexOf('en-us')>-1){
                version =ua.slice(index+20,index2);
            }else{
                version = ua.slice(index+13,index2);
            }
            deviceInfos.device = "Android";
            deviceInfos.deviceMode = sli;
            deviceInfos.deviceVersion = version;
        }
    }
    return deviceInfos;
}

var getWH = function () {
    var height = window.screen.availHeight;
    var width = window.screen.availWidth;
    return width+'x' +height;
}
