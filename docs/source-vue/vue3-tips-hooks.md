---
autoGroup-0: Vue3
title: Vue3写了hook
---

## 普通实现
就拿字典选择下拉框来说，如果不做封装，我们是这样写的(这里拿ant-design-vue组件库来做示例)
```html
<script setup name="DDemo" lang="ts">
    import { onMounted, ref } from 'vue';

    // 模拟调用接口
    function getRemoteData() {
        return new Promise<any[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        key: 1,
                        name: '苹果',
                        value: 1,
                    },
                    {
                        key: 2,
                        name: '香蕉',
                        value: 2,
                    },
                    {
                        key: 3,
                        name: '橘子',
                        value: 3,
                    },
                ])
            }, 3000)
        })
    }

    const optionsArr = ref<any[]>([])；

    onMounted(() => {
        getRemoteData().then(data => {
            optionArr.value = data;
        })
    })
</script>
<template>
  <div>
    <a-select :options="optionsArr" />
  </div>
</template>

<style lang="less" scoped></style>
```
看起来很简单是吧，忽略我们模拟调用接口的代码，我们用在ts/js部分的代码才只有6行而已，看起来根本不需要什么封装。

但是这只是一个最简单的逻辑，不考虑接口请求超时和错误的情况，甚至都没考虑下拉框的loading表现。如果我们把所有的意外情况都考虑到的话，代码就会变得很臃肿了。

```html
<script setup name="DDemo" lang="ts">
    import { onMounted, ref } from 'vue';

    // 模拟调用接口
    function getRemoteData() {
        return new Promise<any[]>((resolve, reject) => {
            setTimeout(() => {
                // 模拟接口调用有概率出错
                if(Math.random() > 0.5) {
                    resolve([
                        {
                        key: 1,
                        name: '苹果',
                        value: 1,
                        },
                        {
                        key: 2,
                        name: '香蕉',
                        value: 2,
                        },
                        {
                        key: 3,
                        name: '橘子',
                        value: 3,
                        },
                    ])
                } else {
                    reject(new Error('不小心出错了'))
                }
            }, 3000)
        })
    }

    const optLoading = ref(false);
    const optionsArr = ref<any[]>([]);

    function initSelect() {
        optLoading.value = true;
        getRemoteData().then(data => {
            optionsArr.value = data;
        }).catch(e => {
            // 请求出错误时将错误信息显示到select中，给用户一个友好的提示
            optionsArr.value = [
                {
                    key: -1,
                    value: -1,
                    label: e.message,
                    disabled: true
                }
            ]
        }).finally(() => {
            optLoading.value = false;
        })
    }

    onMounted(() => {
        initSelect();
    })
</script>
<template>
  <div>
    <a-select :loading="optLoading" :options="optionsArr" />
  </div>
</template>
```
这一次，代码直接来到了22行，虽说用户体验确实好了不少，但是这也忒费事了，而且这还只是一个下拉框，页面里有好几个下拉框也是很常见的，如此这般，可能什么逻辑都没写，页面代码就要上百行了。

这个时，就需要来封装一下，我们有两种选择
1. 把字典下拉框封装成一个组件；
2. 把请求、加载中、错误这些处理逻辑封装到HOOk里

第一种大家都知道，就不多说了，直接说第二种

## 封装下拉框hook
```ts
import { onMounted, reactive, ref} from 'vue';

// 定义下拉框接收的数据格式
export interface 
```




[Vue3写了hook三天，治好了我的组件封装强迫症](https://mp.weixin.qq.com/s/HjuAXlZrWckPdVBLKKmQjA)