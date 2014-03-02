
var battery = (function () {
    var exports = {};

    exports.init = function () {
        util.bind("batterystatus", onBatteryStatus);
        util.bind("batterycritical", onBatteryCritical);
        util.bind("batterylow", onBatteryLow);

        $('#fire-vibration').on('click', function () {
            console.log('button click~~~');
            navigator.notification.vibrate(2000);
        });
    };

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

battery.init();