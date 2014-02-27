/**
 * @file 主程序入口
 */

var util = {
    alert : function (msg) {
        navigator.notification.alert(msg);
    },

    confirm: function (msg, okfn) {
        navigator.notification.confirm(msg, okfn);
    },

    /**
     * tangram的字符串格式化函数
     * 
     * @param {string} source 要格式化片段
     * @param {[type]} opts [opts description]
     * @return {[type]} [return description]
     */
    format: function (source, opts) {
        source = String(source);
        var data = Array.prototype.slice.call(arguments,1);
        var toString = Object.prototype.toString;

        if(data.length){
            data = data.length == 1 ? 
                /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
                (
                    opts !== null 
                    && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data
                ) 
                : data;
            return source.replace(/#\{(.+?)\}/g, function (match, key){
                var replacer = data[key];
                // chrome 下 typeof /a/ == 'function'
                if('[object Function]' == toString.call(replacer)){
                    replacer = replacer(key);
                }
                return ('undefined' == typeof replacer ? '' : replacer);
            });
        }
        return source;
    }
};

/**
 * 列表数据模块
 * 
 * @type {Object}
 */
var list = (function () {

    var exports = {};

    var URL_LOAN = 'http://caifu.baidu.com/loan/aList?resourceid=1800182&pssid=0&tn=NONE&qid=0&wd=&zt=self&byfilter=%7B%7D&module=Finance&query=&rqid=1393483053139906'

    var _params = {
        amount: 0,
        cycle: 0,
        pageNum: 1,
        pageSize: 10
    };

    URL_LOAN = 'http://dev005.baidu.com:8888/service/caifu_list.php';

    var TPL_ITEM = ''
        + '<li>'
        +     '<a>'
        +         '<div class="info">'
        +             '<h4>#{title}</h4>'
        +             '<p>风险偏好: #{risk}</p>'
        +             '<p>投资领域: #{investField}</p>'
        +             '<p>起投金额: #{lowestAmount}</p>'
        +             '<p>投资周期: #{investCycle}</p>'
        +         '</div>'
        +         '<div class="rate">'
        +             '<i>保本浮动收益</i>'
        +             '<h5>#{expectedProfitName}</h5>'
        +             '<p>#{expectedProfitRate}</p>'
        +         '</div>'
        +     '</a>'
        + '</li>';

    function request(url, data, success, failure) {
        $.ajax({
            dataType: 'json',
            url: url,
            data: data,
            success: function (data, status, xhr) {
                if (data.status == 0) {
                    success(data.data);
                }
                else {
                    failure(data.statusInfo, data.status);
                }
                
            },
            error: function (xhr) {
                failure('还木有联网哦!', 500);
            }
        });
    }

    function getList(page, type, category) {
        $('#list-info').text('正在加载中...').show();
        
        request(
            URL_LOAN, 
            _params, 
            function (data) {
                renderList(data.list);
                $('#list-info').hide();
            }, function (statusInfo, status) {
                util.alert('fail');
                $('#list-info').text(statusInfo || '加载出错嘞~').show();
            }
        );
    }

    function renderList(data) {
        var html = [];

        for ( var i = 0, len = data.length; i < len; i++ ) {
            html[i] = util.format(TPL_ITEM, data[i]);
        }

        $('#list').html(html.join(''));
    }

    exports.render = renderList;

    exports.getList = getList;

    return exports;
})();

/**
 * 设备模块
 * 
 * @type {Object}
 */
var app = (function () {

    var isDebug = (function () {
        return $.isWindow(window);
    })();

    // Application Constructor
    var exports = {

        
        init: function() {

            // if (isDebug) {
            //     navigator.notification.alert('break');
            //     this.onDeviceReady();
            //     return;
            // }
            
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function() {

            list.getList();
        }
    };

    return exports;
})();

app.init();
