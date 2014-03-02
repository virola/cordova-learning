/**
 * @file  设备接口API测试模块
 */

var app = (function () {

    return {
        init: function () {

            var result = ''
                + 'cordova: ' + device.cordova + '<br>'
                + 'model: ' + device.model + '<br>'
                + 'name: ' + device.name + '<br>'
                + 'platform: ' + device.platform + '<br>'
                + 'uuid: ' + device.uuid + '<br>'
                + 'version: ' + device.version;

            $('#output').html(result);
        }
    };
})();

util.bind('deviceready', app.init);