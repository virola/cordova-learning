

var networkStatus = (function () {

    var exports = {};


    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        $('#net-info').text(states[networkState]);
    }

    function onOnline() {
        // Handle the online event
        util.alert('online!');
        checkConnection();
    }

    function onOffline() {
        util.alert('offline!');
        checkConnection();
    }

    exports.init = function () {
        checkConnection();

        util.bind('online', onOnline);
        util.bind('offline', onOffline);
    };

    exports.check = checkConnection;

    return exports;
})();


// /**
//  * dialog插件模块
//  * 
//  * @type {Object}
//  */
// var dialog = (function () {
//     var exports = {};

//     exports.init = function () {
//         $('#dialog-alert').on('click', function () {
//             navigator.notification.alert(
//                 'You are the winner!',  // message
//                 alertDismissed,         // callback
//                 'Game Over',            // title
//                 'Done'                  // buttonName
//             );
//         });

//         $('#dialog-confirm').on('click', function () {
//             navigator.notification.confirm(
//                 'You are the winner!',  // message
//                 onConfirm,         // callback
//                 'Game Over',            // title
//                 ['Restart','Exit']                 
//             );
//         });

//         $('#dialog-prompt').on('click', function () {
//             navigator.notification.prompt(
//                 'Please enter your name',  // message
//                 onPrompt,                  // callback to invoke
//                 'Registration',            // title
//                 ['Ok','Exit'],             // buttonLabels
//                 'Virola'                 // defaultText
//             );
//         });

//         $('#dialog-beep').on('click', function () {
//             navigator.notification.beep(2);
//             eventFire('beep twice');
//         });
//     };

//     function alertDismissed() {
//         // do something
//         eventFire('alert cancel');
//     }

//     function onConfirm() {
//         eventFire('You selected button ' + buttonIndex);
//     }

//     function onPrompt(result) {
//         eventFire(
//             'You selected button number ' 
//             + results.buttonIndex + ' and entered ' + results.input1
//         );
//     }

//     function eventFire(type) {
//         $('#event-fire-info').text('method:' + type);
//     }

//     return exports;
// })();


var app = (function () {
    var exports = {};

    exports.init = function () {
        console.log('init');
        // util.bind('DOMContentLoaded', appReady);
        util.bind('deviceready', appReady);
        // appReady();
    };

    function appReady() {
        console.log('ready');
        util.alert('ready');
        // util.bind("batterystatus", onBatteryStatus);
        // util.bind("batterycritical", onBatteryCritical);
        // util.bind("batterylow", onBatteryLow);

        console.log('bind network');
        networkStatus.init();

        // dialog.init();

        $('#check-net-info').on('click', function () {
            networkStatus.check();
        });

        // $('#fire-vibration').on('click', function () {
        //     navigator.notification.vibrate();
        //     navigator.notification.vibrate(2500);   // in iOS 2500 is ignored
        // });
    }

    function onBatteryStatus(info) {
        // Handle the online event
        util.alert("Level: " + info.level + " isPlugged: " + info.isPlugged);
    }

    function onBatteryCritical(info) {
        // Handle the battery critical event
        util.alert("Battery Level Critical " + info.level + "%\nRecharge Soon!");
    }

    function onBatteryLow(info) {
        // Handle the battery low event
        util.alert("Battery Level Low " + info.level + "%");
    }

    return exports;
})();

app.init();