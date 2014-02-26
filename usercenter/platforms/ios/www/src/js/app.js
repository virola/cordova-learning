/**
 * @file 应用程序模块
 * 
 * @namespace
 */
var app = {

    // Application Constructor
    initialize: function(callback) {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        document.addEventListener('online', this.bindOnline, false);
        document.addEventListener('offline', this.bindOffline, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        // 显示启动画面
        navigator.splashscreen.show();

        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);

        console.log('ready');

        // app.receivedEvent('deviceready');
    },

    bindOnline: function () {
        console.log('online');
    },

    bindOffline: function () {
        console.log('offline');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
