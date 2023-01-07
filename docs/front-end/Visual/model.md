---
title: 模型
---

## 格式
3D模型的格式有很多，每个公司或软件都可以自己定义自己的格式，或公开或不公开。 如max，obj， x（微软），fbx（被Autodesk收购），dae，md2（Quake2），ms3d(MilkShap3D)，mdl（魔兽3）等等

> glb、gltf
```js
// 模拟出租车
let car = new Model({
    name: 'car1',
    modelUrl: './assets/model/出租车.glb',
    castShadow: true,
    modelType: 'car1',
    rotation: [ThreeMath.degToRad(0), ThreeMath.degToRad(0), ThreeMath.degToRad(315)],
    isLoadScene: true,
    isReceiveShadow: true,
    iScastShadow: true
});

// demo
// 加载灯杆
export const addlampLayer = (point, options) => {
    return new Promise((resolve) => {
        const threelayer = window.mapHD.getThreeLayer();
        new window.THREE.GLTFLoader()
            .setPath(`${process.env.VUE_APP_MAP_URL}/baidumap/bmapgl/hdmap/model/roadlight/`)
            .load('denggan1.gltf', (object) => {
                object = object.scene;
                object.position.set(point.lng, point.lat, 0);
                object.rotation.z = options.rotation;
                // 宽度、厚度、高度
                object.scale.set(options.width, options.ply, options.height);
                threelayer.add(object);
                resolve(object);
            });
    });
};
```