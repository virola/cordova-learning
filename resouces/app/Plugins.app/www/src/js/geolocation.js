

var geo = (function () {

    var onSuccess = function(position) {
        $('#output').html('Latitude: '          + position.coords.latitude          + '<br>' +
            'Longitude: '         + position.coords.longitude         + '<br>' +
            'Altitude: '          + position.coords.altitude          + '<br>' +
            'Accuracy: '          + position.coords.accuracy          + '<br>' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
            'Heading: '           + position.coords.heading           + '<br>' +
            'Speed: '             + position.coords.speed             + '<br>' +
            'Timestamp: '         + position.timestamp                + '<br>');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    function getLocation() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }


    return {
        init: function () {
            // todo
            console.log('location init.....');
            $('#location-btn').on('click', function () {
                getLocation();
            });
        },

        get: getLocation
    };
})();


util.bind('deviceready', function () {
    console.log('geolocation deviceready');
    geo.init();
});