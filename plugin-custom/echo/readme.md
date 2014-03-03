一个官网提供的最简单插件开发的例子——Echo
===============

安装方法：

去`cordova create`生成的项目目录中运行：

```
$ cordova plugin add [path/to/echo]
```

暂时只支持了ios平台。

会提示:

```
Starting installation of "com.virola.echo" for ios
Plugin "com.virola.echo" already installed, 'sall good.
```

说明安装成功了。

这时候，在js代码中使用：

```javascript

// notice after deviceready
window.echo('Hello world', echoCallback);

function echoCallback(str) {
    console.log(str);
}
```

就看到效果了。
