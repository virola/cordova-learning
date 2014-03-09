/**
 * @file 文件API测试模块
 */

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
                console.log('name:' + filesystem.name);
                console.log('root name:' + filesystem.root.name);
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



// app.init();
util.bind('deviceready', function () {
    console.log('file init======');

    file.init();
});