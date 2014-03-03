
var camera = (function () {
    
    function onPhotoSuccess(imageURI) {
        var image = $('#my-image');
        image.attr('src', imageURI);
    }

    function onPhotoFail(message) {
        alert('Failed because: ' + message);
    }

    function onPhotoLibSuccess(dataURI) {
        var image = $('#my-image');
        image.attr('src', 'data:image/jpeg;base64,' + dataURI);
    }


    // Camera Options
    // { 
    //     quality : 75,
    //     destinationType : Camera.DestinationType.DATA_URL,
    //     sourceType : Camera.PictureSourceType.CAMERA,
    //     allowEdit : true,
    //     encodingType: Camera.EncodingType.JPEG,
    //     targetWidth: 100,
    //     targetHeight: 100,
    //     popoverOptions: CameraPopoverOptions,
    //     saveToPhotoAlbum: false 
    // };
    

    function getPictureFromCamera() {
        navigator.camera.getPicture(
            onPhotoSuccess, 
            onPhotoFail, 
            { 
                // 将质量度设为50以下，否则某些iOS设备上可能引起内存问题
                quality: 50,  

                // 使用 destinationType.FILE_URI 的时候，
                // 照片会存在应用的临时目录中。
                // 出于存储空间的考虑，可以使用 navigator.fileMgr API删除这个目录。
                destinationType: Camera.DestinationType.FILE_URI
                ,

                // 仅iOS中支持的增加
                popoverOptions: new CameraPopoverOptions(
                    300, 300, 100, 100, 
                    Camera.PopoverArrowDirection.ARROW_ANY
                )
            }
        );
    }

    function getPictureFromLib() {
        navigator.camera.getPicture(
            onPhotoLibSuccess, 
            onPhotoFail, 
            { 
                // 将质量度设为50以下，否则某些iOS设备上可能引起内存问题
                quality: 50,  
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                ,

                // 仅iOS中支持的增加
                popoverOptions: new CameraPopoverOptions(
                    300, 300, 100, 100, 
                    Camera.PopoverArrowDirection.ARROW_ANY
                )
            }
        );
        
    }


    function onCleanSuccess() {
        console.log("Camera cleanup success.")
    }

    function onCleanFail(message) {
        alert('Failed because: ' + message);
    }

    return {

        init: function () {
            console.log('camera init start...');

            $('#start-camera').on('click', function () {
                console.log('camera start...');
                getPictureFromCamera();
            });

            $('#choose-picture').on('click', function () {
                console.log('chooseing picture...');
                getPictureFromLib();
            });

            // Reposition the popover if the orientation changes.
            window.onorientationchange = function() {
                var cameraPopoverOptions = new CameraPopoverOptions(
                    0, 0, 100, 100, 
                    Camera.PopoverArrowDirection.ARROW_ANY
                );
                cameraPopoverHandle.setPosition(cameraPopoverOptions);
            }
        },

        photo: getPictureFromCamera,

        clean: function () {
            navigator.camera.cleanup(onCleanSuccess, onCleanFail);
        }
    };
})();


// app.init();
util.bind('deviceready', function () {
    console.log('camera init222222======');

    camera.init();
});