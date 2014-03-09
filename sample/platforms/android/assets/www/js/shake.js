
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
    }
};

// debug
window.onerror = function (msg, url, line) {
    util.alert(msg + '| line:' + line);
};

var item = (function () {

    var domItem = document.getElementById('item');

    var TPL = '' 
        +     '<div class="wrap">'
        +         '<img class="box" src="#{avatar}">'
        +         '<div class="box info">'
        +             '<h3>#{name}<span class="icon-#{gender}"></span></h3>'
        +             '<p>相距#{distance}米</p>'
        +         '</div>'
        +         '<div class="arrow-right"></div>'
        +     '</div>';

    var data = [
        {
            'avatar': 'img/avatar/diysimon.jpg',
            'name': 'diysimon',
            'gender': 'male'
        },
        {
            'avatar': 'img/avatar/errorrik.jpg',
            'name': 'errorrik',
            'gender': 'male'
        },
        {
            'avatar': 'img/avatar/kener.jpg',
            'name': 'Kener',
            'gender': 'male'
        },
        {
            'avatar': 'img/avatar/fankun.jpg',
            'name': 'zfkun',
            'gender': 'male'
        },
        {
            'avatar': 'img/avatar/mengke.jpg',
            'name': 'mkwiser',
            'gender': 'male'
        },
        {
            'avatar': 'img/avatar/nvshen.jpg',
            'name': 'Lang Syne',
            'gender': 'female'
        }
    ];

    return {
        show: function () {
            domItem.style.display = 'none';

            setTimeout(function () {
                var chance = Math.random();
                var index = Math.floor(chance * 6);

                // 你只有0.01%的几率摇到女神 o_O
                if (chance < 0.9999 && index == 5) {
                    index = 4;
                }

                data[index].distance = Math.round(Math.random() * 10) + 1;
                domItem.innerHTML = util.format(TPL, data[index]);
                domItem.style.display = 'block';

                navigator.notification.beep(1);


                setTimeout(function () {
                    
                    // 又开启监控
                    shake.startWatch();
                }, 2000 );
                
            }, 1500);
        }
    };
})();

var shake = (function () {

    // 变化的边界值
    var BOUNDARY = 5;

    // 监听频率
    var FREQUENCY = 500;

    var accelerValues = {};

    var watchId;

    function startWatch() {
        watchId = navigator.accelerometer.watchAcceleration(
            onSuccess, onFail, {
                frequency: FREQUENCY
            }
        );
    }

    function onSuccess(values) {
        var changes = {};

        if (accelerValues.x != null) {
            changes.x = Math.abs(values.x - accelerValues.x);
            changes.y = Math.abs(values.y - accelerValues.y);
            changes.z = Math.abs(values.z - accelerValues.z);
        }

        if (changes.x > BOUNDARY && changes.y > BOUNDARY && changes.z > BOUNDARY) {
            navigator.notification.vibrate(500);
            document.getElementById('item').innerHTML = '<div class="searching">searching the one for u!</div>';
            document.getElementById('item').style.display = 'block';

            stopWatch();

            // its shaking
            item.show();
   
        }

        accelerValues = {
            x: values.x,
            y: values.y,
            z: values.z
        };
    }

    function onFail() {
        util.alert('启动加速计监听失败!');
    }

    function stopWatch() {
        if (watchId) {
            navigator.accelerometer.clearWatch(watchId);
            watchId = null;

            // 清空
            accelerValues = {};
        }
    }

    return {
        init: function () {
            startWatch();
        },

        startWatch: startWatch
    };
})();



document.addEventListener('deviceready', function () {
    shake.init();
}, false);