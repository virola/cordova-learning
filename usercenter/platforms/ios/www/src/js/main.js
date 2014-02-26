/**
 * @file 主程序入口
 */

/**
 * 应用程序模块
 * 
 * @type {Object}
 */
var app = (function () {

    var exports = {};

    var isDebug = (function () {
        return $.isWindow(window);
    })();

    exports.init = function () {
        if (isDebug) {
            onDeviceReady();
            return;
        }
        exports.bind('deviceready', onDeviceReady);
    };

    exports.bind = function (eventid, binder) {
        document.addEventListener(eventid, binder, false);
    };

    exports.unbind = function (eventid, binder) {
        document.removeEventListener(eventid, binder, false);
    };

    /**
     * 设备ready后，绑定DOM事件
     */
    function onDeviceReady() {
        tipLayer.init();
        $('#login-button').on('click', loginBtnClick);
    }

    function loginBtnClick() {
        var email = $('#email').val();
        var pwd = $('#password').val();

        if (!email) {
            tipLayer.show('密码木有填啊！');
            return;
        }

        if (!pwd) {
            showAlert('密码木有填啊！');
            return;
        }

        var btn = $(this);
        btn.text('正在登录ing...');
        switchBtnState('disabled');
    }

    function switchBtnState(state) {
        var btn = $('#login-button');
        switch (state) {
            case 'enable':
                btn.removeClass('disabled');
                break;
            case 'disabled': 
                btn.addClass('disabled');
                break;
        }

    }

    function showAlert(msg) {
        navigator.notification.alert(msg);
    }

    return exports;
})();


app.init();