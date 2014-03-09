
/**
 * dialog插件模块
 * 
 * @type {Object}
 */
var dialog = (function () {
    var exports = {};

    exports.init = function () {
        $('#dialog-alert').on('click', function () {
            navigator.notification.alert(
                'You are the winner!',  // message
                alertDismissed,         // callback
                'Game Over',            // title
                'Done'                  // buttonName
            );
        });

        $('#dialog-confirm').on('click', function () {
            navigator.notification.confirm(
                'You are the winner!',  // message
                onConfirm,         // callback
                'Game Over',            // title
                ['Restart','Exit']                 
            );
        });

        $('#dialog-prompt').on('click', function () {
            navigator.notification.prompt(
                'Please enter your name',  // message
                onPrompt,                  // callback to invoke
                'Registration',            // title
                ['Ok','Exit'],             // buttonLabels
                'Virola'                 // defaultText
            );
        });

        $('#dialog-beep').on('click', function () {
            navigator.notification.beep(2);
            eventFire('beep twice');
        });
    };

    function alertDismissed() {
        // do something
        eventFire('alert cancel');
    }

    function onConfirm(buttonIndex) {
        eventFire('You selected button ' + buttonIndex);
    }

    function onPrompt(result) {
        eventFire(
            'You selected button number ' 
            + result.buttonIndex + ' and entered ' + result.input1
        );
    }

    function eventFire(type) {
        $('#event-fire-info').text('method:' + type);
    }

    return exports;
})();


dialog.init();