---
title: Flutter
---

## Skia是什么
要想了解Flutter，你必须先了解它的底层图像渲染引擎Skia。因为，Flutter只关心如何向GPU提供视图数据，而Skia就是它向GPU提供视图数据的好帮手。

Skia是一款用C++开发的、性能彪悍的2D图像绘制引擎，其前身是一个向量绘图软件。2005年被Google公司收购后，因为其出色的绘制表现被广泛应用在Chrome和Android等核心产品上。Skia在图形转换、文字渲染、位图渲染方面都表现卓越，并提供了开发者友好的API

目前，Skia已然是Android官方的图像渲染引擎了，因此Flutter Android SDK无需内嵌Skia就可以获得天然的Skia支持。而对于IOS平台来说，由于skia是跨平台的，因此它作为Flutter IOS渲染引擎被嵌入到Flutter的IOS SDK中，替代了IOS闭源的Core Graphics/Core Animation/Core Text，这也正是Flutter iOS SDK打包的App包体积比Android要大一些的原因

底层渲染能力统一了，上层开发接口和功能体验也就随即统一了，开发者再也不用操心平台相关的渲染特性了。也就是说，Skia 保证了同一套代码调用在 Android 和 iOS 平台上的渲染效果是完全一致的。


