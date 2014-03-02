
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


var file = (function () {
    
    var fs = null;

    function errorHandler(e) {
        var msg = '';
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
        };
        $('#list').text('Error: ' + msg);
    }

    function initFS() {
        window.requestFileSystem(
            window.TEMPORARY, 
            1024 * 1024, 
            function(filesystem) {
                fs = filesystem;
            }, 
            errorHandler
        );
    }

    function bindButtons() {
        var buttons = document.querySelectorAll('#list-buttons button');
        var filelist = $('#list');

        if (buttons.length >= 3) {
            buttons[0].addEventListener('click', function(e) {
                if (!fs) {
                    return;
                }
                console.log('button0|path:' + fs.root.fullPath);

                fs.root.getFile('log.txt', {create: true}, null, errorHandler);
                fs.root.getFile('song.mp3', {create: true}, null, errorHandler);
                fs.root.getDirectory('mypictures', {create: true}, null, errorHandler);
                filelist.text('Files created.');
            }, false);

            buttons[1].addEventListener('click', function(e) {
                if (!fs) {
                    return;
                }
                console.log('====get list...=====');
                console.log('button1|path:' + fs.root.fullPath);

                var dirReader = fs.root.createReader();
                dirReader.readEntries(function(entries) {
                    if (!entries.length) {
                        filelist.text('Filesystem is empty.');
                    } 
                    else {
                        filelist.text('');
                    }

                    var fragment = document.createDocumentFragment();

                    for (var i = 0, entry; entry = entries[i]; ++i) {
                        var li = document.createElement('li');
                        li.innerHTML = ['<span>', entry.name, '</span>'].join('');
                        fragment.appendChild(li);
                    }
                    filelist.append(fragment);
                }, errorHandler);
            }, false);

            buttons[2].addEventListener('click', function(e) {
                if (!fs) {
                    return;
                }
                console.log('button2|path:' + fs.root.fullPath);

                var dirReader = fs.root.createReader();
                dirReader.readEntries(function(entries) {
                    for (var i = 0, entry; entry = entries[i]; ++i) {
                        if (entry.isDirectory) {
                            entry.removeRecursively(function() {}, errorHandler);
                        } 
                        else {
                            entry.remove(function() {}, errorHandler);
                        }
                    }
                    filelist.text('Directory emptied.');
                }, errorHandler);
            }, false);
        }
    }
    

    function check() {
        if (window.File 
            && window.FileReader 
            && window.FileList 
            && window.Blob
        ) {
            return true;
        } 
        else {
            return false;
        }
    }

    function handleFileSelect(evt) {
        console.log('.....choosing files....');
        
        var files = evt.target.files; 

        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            output.push(
                '<li>',
                    '<strong>', escape(f.name), '</strong> ', 
                    '(', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate 
                        ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>'
            );
        }
        $('#list').html('<ul>' + output.join('') + '</ul>');
    }

    return {
        init: function () {
            if (!check()) {
                util.alert('The File APIs are not fully supported!');
            }
            else {
                console.log('======file api supported====');
                $('#files').on('change', handleFileSelect);
            }


            window.requestFileSystem = window.requestFileSystem 
                || window.webkitRequestFileSystem;

            // Initiate filesystem on page load.
            if (window.requestFileSystem) {
                console.log('=====requestFileSystem INIT=====');
                initFS();
                bindButtons();
            }
        }
    };
})();


var app = (function () {

    function init() {
        camera.init();
        file.init();
    }

    return {
        init : init
    };
})();

// app.init();
util.bind('deviceready', function () {
    console.log('appppppp init222222======');

    app.init();
});
// console.log('appppppp init======');
