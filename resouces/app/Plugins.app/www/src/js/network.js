
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
        checkConnection();
        util.alert('online!');
    }

    function onOffline() {
        checkConnection();
        util.alert('offline!');
    }

    exports.init = function () {
        console.log('network init======');
        checkConnection();

        util.bind('online', onOnline);
        util.bind('offline', onOffline);
    };

    exports.check = checkConnection;

    return exports;
})();


util.bind('deviceready', function () {
    networkStatus.init();
});
