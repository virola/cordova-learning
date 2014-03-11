/**
 * @file 文件传输接口测试模块
 */

var SERVER = 'http://virola.baidu.com/sites/sys/cordova-learning/resouces/service/';

var file = (function () {

    // 储存选中的文件列表
    var files = {};

    var ftOptions = {};

    function upload(file) {
        ftOptions.fileName = file.substr(file.lastIndexOf('/') + 1);

        var ft = new FileTransfer();
        ft.upload(file, encodeURI(SERVER + 'upload.php'), success, fail, ftOptions);
    }

    var success = function (r) {
        console.log(r);
        console.log('Code = ' + r.responseCode);
        console.log('Response = ' + r.response);
        console.log('Sent = ' + r.bytesSent);
    }

    var fail = function (error) {
        util.alert('An error has occurred: Code = ' + error.code);
        console.log('upload error source ' + error.source);
        console.log('upload error target ' + error.target);
    }


    function init() {
        $('#upload-btn').on('click', function () {
            console.log('click upload btn!');

            var file;

            for (var i in files) {
                file = files[i];
                break;
            }

            // TODO
            // 如何把文件属性变成文件路径以上传？
            upload(file.name);
        });

        $('#files').on('change', selectFiles);


        console.log('init file options');

        // ftOptions
        ftOptions = new FileUploadOptions();
        ftOptions.fileKey = 'file';
        ftOptions.mimeType = 'text/plain';

        var params = {};
        params.value1 = 'test';
        params.value2 = 'param';

        ftOptions.params = params;
    }

    function selectFiles(evt) {
        var files = evt.target.files; 

        for (var i = 0, f; f = files[i]; i++) {
            files[f.name] = {};
            for ( var j in f) {
                console.log('file attr:' + j + ' |value: ' + f[j]);
                files[f.name][j] = f[j];
            }
        }
    }

    return {
        init: init,
        upload: upload
    };

})();

// file.init();

util.bind('deviceready', function () {
    console.log('deviceready');
    file.init();
});