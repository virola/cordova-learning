cordova-learning
================

学习cordova开发的一些例子。

Ps. 

为了给整个项目`瘦身`，tag 0.0.1和最新master分支里把几个cordova项目里的`platform`目录都**删掉**了。
clone到本地之后如果需要进行调试（以IOS平台为例），需要执行以下几个步骤：

	# 1.
	cd <appdir>

	# 2.
	rm plugins/ios.json

	# 3.
    cordova platform add ios

	# 4.
    cordova emulate ios

### usercenter
用户登录表单。

使用的API插件：

- splashscreen 启动画面
- dialog 

### baidu-caifu
百度财富产品列表。

主要学习点：

- 使用ajax进行数据交互
- inAppBrowser的使用

### plugin-set

覆盖了大部分cordova的API插件的示例

- device
- dialog
- battery-status
- network-infomation
- camera
- file
- file-transfer
- geolocation


### sample

测试两个外来插件：

1. 官网提供了部分代码，加上自己整的一个简单[Echo插件](https://github.com/virola/cordova-learning/tree/master/plugin-custom/echo)
2. SocialShare插件，来自<https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin>

顺便copy了微信的`摇一摇`功能，方案不算完美；在`shake.html`中能看到。

### plugin-custom
用于存放自定义插件的目录。现在只有`Echo`一个插件，由于Object-C对我来说太难了没有心情再写其他插件了……

### resources
开发过程中使用到的一些资源文件。
像启动画面的图片啊、php server的文件啊、reveal.js做的ppt网页啊，之类的。

- presentation : 这次调研分享的ppt
- app : 所有开发产出的应用程序集合
- qr : 二维码做的下载链接(百度内网)
