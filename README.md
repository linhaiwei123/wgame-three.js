## wgame-three.js

### 源码目录介绍
```
./images                //游戏资源
./js                    //代码
|—— app                 //业务代码
     |—— MainScene.js   //场景控制器
     |—— CubeCtrl.js    //方块控制器
     |—— CameraCtrl.js  //相机控制器
|—— engine              //引擎代码
     |—— anime.js       //动画库
     |—— config.js      //配置文件,主要用来配置启动场景
     |—— engine.js      //引擎启动文件,组件实体系统的驱动器
     |—— physi.js       //three.js 的物理插件
     |—— three.min.js   //3d渲染引擎
./typings               //代码提示
./workers               //后台worker线程,主要用来跑物理迭代模拟
|—— ammo.min.js         //物理引擎
|—— physijs_workers.js  //three.js 的物理插件 worker

```

### 参考链接
* [小游戏开发文档](https://mp.weixin.qq.com/debug/wxagame/dev/index.html)
* [three.js](https://threejs.org/)
* [three.js 物理插件](https://github.com/chandlerprall/Physijs)
* [ammo.js 3d物理引擎](https://github.com/kripken/ammo.js/)
* [cannon.js 3d物理引擎](http://www.cannonjs.org/)
* [小游戏集成three.js相关博客](http://blog.csdn.net/register_man/article/details/78950187)
* [小游戏集成three.js和physijs相关博客](http://blog.csdn.net/Register_man/article/details/79022074)
* [animejs 动画库](http://animejs.com/)
* [greensock 动画库](https://greensock.com/)

### cocos 测试用小游戏appid
wx6ac3f5090a6b99c5
