---
autoGroup-7: 浏览器
title: WebWorker 正在悄悄改变整个前端的格局
---
当你的页面出现卡顿时候，当你的动画掉帧时，当用户抱怨你的应用响应迟缓时--还在用setTiemout假装异步？是时候纸面浏览器渲染的真相了；本文通过3个真实场景，带你彻底掌握web性能优化的核武器：WebWorker

## 一、浏览器之殇：单线程的致命瓶颈
### 1.1浏览器的心跳检测
现代浏览器的主线程承载着：执行JS代码->渲染页面->处理事件-> 执行微任务...

这个每秒运行60次循环(16.6ms/帧)一旦被阻塞，用户将看到：
- 点击事件延迟响应
- 动画卡顿掉帧
- 滚动出现白屏

### 1.2 性能优化的误区
开发者常用的"优化"手段
```js
// 伪异步方案
setTimeout(() => {
    // 耗时操作
}, 0);

// 伪并行计算
Promise.all([task1, task2]).then(/** */);

// 动画性能的幻觉
requestAnimationFrame(heavyTask)
```
这些方案本质上扔在主线程排队执行，如同在单车道高速公路上让火车假装自己是跑车

## 二、WebWorker：突破次元壁的线程方案
### 2.1 线程模型的降维打击
浏览器线程架构：
1. 主线程：JS执行 + 渲染 + 事件处理
2. WebWorker现成：纯JS运算(多个可并行)

### 2.2 创建Worker的正确姿势
主线程代码
```js
// 创建专用Worker
const worker = new Worker('worker.js');

// 消息监听
worker.onmessage = (e) => {
    document.getElementById('result').textContent = e.data;
}

// 错误处理
worker.onerror = err => {
    console.error(`Worker error: ${err.message}`)
}

// 发送计算任务
worker.postMessage({ type: 'fibonacci', num: 40})
```

Worker代码

```js
// worker现成接收消息
self.onmessage = function(e) {
    const { type, num } = e.data;

    if(tpye === 'fibonacci') {
        const result = calculateFib(num);
        selt.postMessage(result);
    }
}

// 计算斐波那契数列
function calculateFib(n) {
    if(n < 1) return n;
    return calculateFib(n - 1) + calucateFib(n - 2)
}
```
### 性能对比实验
方案|耗时|主线程冻结时间
---|---|---
主线程直接计算| 6.2s| 62000ms
WebWorker计算| 6.3s| 12ms

**结论：虽然总耗时相近，但WebWorker将主线程阻塞时间降低了99.8%**

## 实战：三个必须掌握的优化场景
### 3.1 场景一：大数据可视化

需求：渲染10万条数据的热力图
```js
// 传统方案(卡顿3.8秒)
function renderHeatmap(data) {
    const canvas = document.getElementById('heatmap');
    // 复杂计算....
}

// WebWorker优化
const worker = new Worker('heatmap-worker.js');
worker.postMessage(rawData);

worker.onmessage =  e=> {
    const imagesBitmap = e.data;
    ctx.drawImage(imagesBitmap, 0, 0);
}
``` 
- heatmap-worker.js核心

    ```js
    // 使用OffscreenCanvas 
    const offscreenCanvas = new OffscreenCanvas(1000, 1000);

    self.onmessage = async (e) => {
        const points = e.data;
        // 在worker中完成所有计算
        renderComplexHeatmap(points, offscreen);

        // 转换为 ImageBitmap传输
        const bitmap = await offscreenCanvas.transferToImageBitmap();
        self.postMessage(bitmap, [bitmap]);
    }
    ```
### 场景二：实时音频处理
WebRTC 数据流处理
```js
// 创建状态管理Worker
const storeWorker = new Worker('store-worker.js');

// 主线程发送action
storeWorker.postMessage({
    type: 'BATCH_UPDATE',
    payload: largeDataSet
})

// worker中处理i
self.onmesage = e => {
    const newState = reducer(currentState, e.date);
    self.postMessage(newState);
}

// 接受状态更新
storeWorker.onmessage = e => {
    applyStateToUI(e.data)
}
```
### 3.3 场景三：复杂状态管理
Redux性能优化方案
```js
// 创建状态管理Worker
const storeWorker = new Worker('redux-worker.js');

//主线程发送action
storeWorker.postMessage({
    type: 'BATCH_UPDATE',
    payload: largeDataSet
})

// worker中处理i
self.onmesage = e => {
    const newState = reducer(currentState, e.date);
    self.postMessage(newState);
}

// 接受状态更新
storeWorker.onmessage = e => {
    applyStateToUI(e.data)
}
```
## 高级技巧：Worker使用军规
### 4.1 Worker线程'三不原则'
- 不能操作DOM：Worker没有document对象
- 不能使用同步API：localStorage、alert等
- 不能传递不可克隆对象：需使用Transferable对象

### 性能优化黄金法则
```js
// 坏实践：频繁小消息
for(let i = 0; i < 1000; i++) {
    worker.postMessage({index: i})
}

// 好实践：批量处理
worker.postMessage({
    batch: Array(1000).fill().map((_, i) => i)
})

// 使用Transferable提升性能
const buffer = new ArrayBuffer(1024 * 1024 * 32);
worker.postMessage(buffer, [buffer]); // 零拷贝传输
```
### Worker池技术
```js
class WorkerPool {
    constructor(poolSize = navigator.hardwareConcurrency) {
        this.pool = Array(poolSize).fill().map(() => new Worker());
        this.taskQueue = [];
    }
    despatch(task) {
        return new Promise(resolve => {
            this.taskQueue.push({task, resolve});
            THIS.#assignTasks()
        })
    }
    #assignTasks() {
        while(this.pool.some(w => !w.busy) && this.taskQueue.length) {
            const worker = this.pool.find(w => !w.busy);
            const {task, resolve} = this.taskQueue.shift();

            worker.busy = true;
            worker.postMesssage(task);

            worker.onmessage = e=> {
                    resolve(e.aeta);
                    worker.busy = false;
                    this.#assignTasks();
            }
        }
    }
}
```

## 未来已来，新一代并发方案
### 5.1 SharedArrayBuffer的威力
```js
// 主线程
const sharedBuffer = new ShareArrayBuffer(1024);
const arr = new Int32Array(sharedBuffer);

// worker现成
self.onmessage = function(e) {
    const sharedBuffer = e.data;
    const arr = new Int32Array(sharedBuffer); 
    // 多线程可同事操作
}
```

### WebAssembly + worker
```js
const worker = new Worker('wasm-worker.js');
worker.postMessage({ wasmFile: 'compute-heavy.wasm'});

worker.onmessage = e => {
    console.log('WASM计算结果：', e.data)
}
