#!/bin/sh

cp sample/platforms/android/ant-build/Sample-debug-unaligned.apk ./resouces/app/ 
cp -r sample/platforms/ios/build/emulator/Sample.app ./resouces/app/ 

cp baidu-caifu/platforms/android/ant-build/BaiduCaifu-debug-unaligned.apk ./resouces/app/ 
cp -r baidu-caifu/platforms/ios/build/emulator/BaiduCaifu.app ./resouces/app/ 

cp plugin-set/platforms/android/ant-build/Plugins-debug-unaligned.apk ./resouces/app/ 
cp -r plugin-set/platforms/ios/build/emulator/Plugins.app ./resouces/app/ 

cp usercenter/platforms/android/ant-build/UserCenter-debug-unaligned.apk ./resouces/app/
cp -r usercenter/platforms/ios/build/emulator/UserCenter.app ./resouces/app/ 
