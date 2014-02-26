/**
 * @file 提示浮层组件
 */


var tipLayer = (function () {
    var exports = {};

    /**
     * 提示浮层的DOM
     * @type {Object} 
     */
    var domTip;

    var isShow;

    exports.init = function () {
        domTip = $('<div>').attr({
            id: 'global-tiplayer',
            'class': 'tiplayer'
        }).appendTo($('body'));
    };

    exports.show = function (msg, duration) {
        if (isShow) {
            return;
        }
        domTip.text(msg);

        var w = domTip.width();
        domTip.css({
            top: '80px',
            left: ($('body').width() - w)/2 + 'px'
        });

        domTip.animate({
            opacity: 1
        });
        isShow = 1;

        setTimeout(function () {
            domTip.animate({
                opacity: 0
            }).text('').css({
                left: '-9999px'
            });

            isShow = 0;
        }, 3000);
    };

    return exports;

})();