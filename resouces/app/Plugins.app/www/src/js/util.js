
var util = {
    alert : function (msg) {
        if (!navigator.notification) {
            navigator.notification = {
                alert: new Function()
            };
        }
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
    },

    request: function (url, data, success, failure) {
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
    },

    bind: function (eventname, eventfn) {
        document.addEventListener(eventname, eventfn, false);
    },

    unbind: function (eventname, eventfn) {
        document.removeEventListener(eventname, eventfn, false);
    }
};

window.onerror = function (msg, url, line) {
    util.alert(msg + '| line:' + line);
};


util.bind('pause', function () {

    // iOS不支持pause事件即时触发
    console.log('device pause...');
});

// resign instead of pause
util.bind('resign', function () {
    console.log('device resign...');
});

util.bind('resume', function () {
    console.log('device resume...');
});

// active instead of resume
util.bind('active', function () {
    console.log('device active...');
});

// not in iOS
util.bind('backbutton', function () {
    console.log('device backbutton fire...');
});
util.bind('menubutton', function () {
    console.log('device menubutton fire...');
});

