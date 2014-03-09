/**
 * @file 主程序入口
 */

/**
 * 设备模块
 * 
 * @type {Object}
 */
var app = (function () {

    // Application Constructor
    var exports = {

        init: function() {
            
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {
            console.log('~~~~~index page ready~~~~');
        }
    };

    return exports;
})();

app.init();
