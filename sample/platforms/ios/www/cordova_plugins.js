cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.console/www/console-via-logger.js",
        "id": "org.apache.cordova.console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.console/www/logger.js",
        "id": "org.apache.cordova.console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.socialsharing/www/SocialSharing.js",
        "id": "nl.x-services.plugins.socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/com.virola.echo/www/echo.js",
        "id": "com.virola.echo.echo",
        "clobbers": [
            "window.plugins.echo"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.console": "0.2.7",
    "nl.x-services.plugins.socialsharing": "4.0.2",
    "org.apache.cordova.dialogs": "0.2.6",
    "com.virola.echo": "1.0.0"
}
// BOTTOM OF METADATA
});