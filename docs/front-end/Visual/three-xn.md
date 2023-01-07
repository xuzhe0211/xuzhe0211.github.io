---
title: Three.js渲染性能优化
---
在CPU、显卡等硬件设备性能一定情况下，为了更好地用户体验，一般项目开发中需要对Threejs项目代码进行性能优化，避免卡顿现象，所以下面就对ThreeJS性能优化集中方式进行简单介绍

<span style="color: red">模型面数比较少的情况下，不仅threejs渲染模型的时候运行性能高，通过网络加载面数少的模型，因为文件体积小，加载速度自然也快</span>

## 合理执行渲染方法.render()
<span style="color: blue">Three.js渲染器的.render()方法每次执行都需要调用大量的CPU、GPU等硬件资源,所以为了提高渲染性能，可以尽量减少.render()的执行次数,不是简单的说越少越好，而是在考虑渲染效果的基础上减少.render()的执行次数。</span>如果场景有动画效果，就必须周期性执行.render()更新canvas画布效果；如果场景默认是静态的，没有动画，比如展示一个产品、建筑或机械零件的三维模型，只需要在鼠标旋转缩放三维模型，触发.render()执行既可以，在没有发生鼠标事件的时候，可以不执行render()；

不控制Three.js渲染器渲染帧率,通过浏览器提供的requestAnimationFrame()函数实现周期性渲染，理想的情况下requestAnimationFrame()可以实现渲染帧率60FPS,如果threejs需要渲染的场景比较复杂或浏览器所在设备硬件不好，可能默认执行效果打不到60fps
```js
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
```
对一些有动画的场景，可以适当控制requestAnimationFrame()函数周期性执行渲染的次数，比如把默认60FPS设置为30FPS；具体设置方式可以参考本站发布文章[《Three.js控制渲染帧率FPS》](http://www.yanhuangxueyuan.com/doc/Three.js/FrameNumber.html)

对于大多数一般处于静态的三维场景，可以不一直周期性执行threejs渲染器方法.render()，根据需要执行.render()，比如通过鼠标旋转模型，就通过鼠标事件触发.render()执行，或者在某个时间段出现动画，就在这个时间段周期性执行.render()，过了这个时间段，就恢复原来状态。

比如鼠标控件OrbitControls，当通过OrbitControls控件旋转缩放三维模型的时候，触发渲染器进行渲染。

```js
// 渲染函数
function render() {
    renderer.render(scene, camera);
}
render();

var controls = new THREE.OrbitControls(camera);
// 监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
controls.addEventListener('change', render)
```
## 周期性渲染函数中代码
three.js会通过requestAnimationFrame()周期性执行一个渲染函数render，在渲染函数中除了渲染器.render()方法，其他尽量放在渲染函数外面，如果必须放在里面，可以加上if判断尽量加上，不要每次执行render函数的时候，每次都执行没必要的执行代码。

## 减面
Three.js渲染场景中网络模型Mesh的时候，如果网络模型Mesh几何体的三角形面数数量或者说顶点数量越多，你们需要的CPU和GPU的运算量就越大，几何顶点数据占用的内存就越多，这时候对于Three.js每次渲染执行.render()，话费的时间就越多，如果三角形面数过多，可能渲染帧就会下降，鼠标操作三维模型的时候可能就会比较卡顿

对于项目中使用的三维模型，3D美术往往会进行减面优化，具体减面过程对于程序员而言一般不用关心。

对于曲面而言，减面过多，可能会影响显示效果，所以减面程度要控制好。

## 法线贴图
对于曲面模型，使用法线贴图可以在不影响显示质量的情况下有效减少模型面数，法线贴图会通过图片像素值记录模型表面的几何细节，只需要3D美术对模型表面很多几何细节进行减面后，然后导出法线贴图，提供给程序员加载即可。简单地说就是通过法线贴图可以表达三维模型表面的丰富几何细节。

## BufferGeometry
如果通过Threejs提供的几何体类，比如球体、圆柱等几何体类创建几何体，最好使用基类是BufferGeometry而不是Geometry几何体类。

## 共享几何体和材质
不同的网格模型如果可以共享几何体或材质，最好采用共享的方式，如果两个网格模型无法共享几何体或材质，自然不需要共享，比如两个网格模型的材质颜色不同，这种情况下，一般要分别为网格模型创建一个材质对象。

## 多细节层次
根据场景不同，可以把同一个模型进行分级，比如远距离观看该模型使用1万面数的模型，如果距离更近，需要使用更精细的模型，比如2万面数




## 资料
[Three.js渲染性能优化](http://www.yanhuangxueyuan.com/doc/three.js/renderoptimization.html)

[three.js 性能优化的几种方法](https://www.cnblogs.com/chenjy1225/p/9640562.html)
