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
            tipLayer.show('邮箱木有填啊！');
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

    function handlerLoginEvents() {
        var url = '';
        dataHanlder.request({
            url: url,
            type: 'post',
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function (data) {
                showAlert('log in success!');
                console.log(data);
            },
            failure: function (statusInfo) {
                showAlert(statusInfo || '登录出错，请稍后重试');
            }
        })
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



var dataHanlder = (function () {
    var exports = {};

    /**
     * 一个ajax请求
     * 
     * @param {Object} params 一堆参数
     * @param {string} url 请求地址
     * @param {Object} data 请求数据
     * @param {string} type 请求类型
     */
    exports.request = function (params) {
        $.ajax({
            url: params.url,
            data: params.data
            type: params.type || 'get',
            dataType: 'jsonp'
        })
        .done(function(data, status, xhr) {
            // todo
            console.log(data);
        });
    };

    return exports; 
});

app.init();