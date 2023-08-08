---
autoGroup-0: Vue3
title: Vue3写了hook
---

## 怎么用hook改造我的组件
### 普通实现
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

### 封装下拉框hook
```ts
import { onMounted, reactive, ref} from 'vue';

// 定义下拉框接收的数据格式
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    key?: string;
}

// 定义入参格式
interface FetchSelectProps {
    apiFun: () => Promise<any[]>
}

export fufnction useFetchSelect(props: FetchSelectProps) {
    const { apiFun } = props;

    const options = ref<SelectOption[]>([]);

    const loading = ref(false);

    // 调用接口请求数据
    const loadData = () => {
        loading.value = true;
        options.value = [];
        return apiFun().then(data => {
            loading.value = false;
            options.value = data;
            return data;
        }, err => {
            // 为止错误，可能是代码抛出的错误，或是网络错误
            loading.value = false;
            options.value = [{
                value: '-1',
                label: err.message,
                disabled: true
            }]
            return Promise.reject(err);
        })
    }

    // onMounted 中调用接口
    onMounted(() => {
        loadData();
    })

    return reactive({
        options,
        loading
    })
}
```
然后在组件中调用
```html
<script setup name="DDemo" lang="ts">
  import { useFetchSelect } from './hook';

  //   模拟调用接口
  function getRemoteData() {
    return new Promise<any[]>((resolve, reject) => {
      setTimeout(() => {
        // 模拟接口调用有概率出错
        if (Math.random() > 0.5) {
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
          ]);
        } else {
          reject(new Error('不小心出错了！'));
        }
      }, 3000);
    });
  }
   
   // 将之前用的 options,loading，和调用接口的逻辑都抽离到hook中
  const selectBind = useFetchSelect({
    apiFun: getRemoteData,
  });
</script>

<template>
  <div>
    <!-- 将hook返回的接口，通过 v-bind 绑定给组件 -->
    <a-select v-bind="selectBind" />
  </div>
</template>
```
这样一来，代码行数直接又从20行降到3行，甚至比刚开始最简单的那个还要少两行，但是功能却一点不少，用户体验也是比较完善的。

如果你觉着上面这个例子不能打动你的话，可以看看下面这个

### Loading状态hook
点击按钮，调用接口是另一个我们经常遇到的场景，为了更好的用户体验，提示用户操作已经相应，同时防止用户多次店家，我们要在调用接口的同时将按钮置为loading状态，虽说只有一个loading状态，但是血多了也觉得麻烦

为此我们可以封装一个简单的hook

```js
import { Ref, ref } from 'ref';

type TApiFun<TData, TParams extends Array<any>> = (...params: TParams) => Promise<TData>;

interface AutoRequestOptions {
    // 定义一下初始状态
    loading?: boolean;
    // 接口调用成功时的回调
    onSuccess?: (data: any) => void;
}

type AutoRequestResult<TData, TParams extends Array<any>> = [Ref<boolean>, TApiFun<TData, TParams>];

// 控制loading状态的自动切换hook
export function useAutoRequest<TData, TParams extends any[] = any[]>(fun: TApiFun<TData, TParams>, options?: AutoRequestOptions): AutoRequestResult<TData, TParams> {
  const { loading = false, onSuccess } = options || { loading: false };

  const requestLoading = ref(loading);

  const run: TApiFun<TData, TParams> = (...params) => {
    requestLoading.value = true;
    return fun(...params)
      .then((res) => {
        onSuccess && onSuccess(res);
        return res;
      })
      .finally(() => {
        requestLoading.value = false;
      });
  };

  return [requestLoading, run];
}
```
这次把模拟接口的方法单独抽出一个文件

api/index.ts
```js
export function submitApi(text: string) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 模拟接口出错概率
            if(Math.random() > 0.5) {
                resolve({
                    status: 'ok',
                    text: text
                })
            } else {
                reject(new Error('不小心出错了!'))
            }
        }, 3000)
    })
}
```
使用 index.vue
```html
<script setup name="Index" lang="ts">
import { useAutoRequest } from "./hook";
import { Button } from "ant-design-vue";
import { submitApi } from "@/api";

const [loading, submit] = useAutoRequest(submitApi);

function onSubmit() {
   submit("aaa").then((res) => {
    console.log("res", res);
  });
}
</script>

<template>
  <div class="col">
    <Button :loading="loading" @click="onSubmit">提交</Button>
  </div>
</template>
```
这样封装一下，我们使用时就不再需要手动切换loading的状态了。

这个hook还有另一种玩法：

hook2.ts
```js
import type { Ref } from 'vue';
import { ref } from 'vue';

type AutoLoadingResult = [
    Ref<boolean>,
    <T>(requestPromise: Promise<T>) => Promsie<T>
]

// 在run方法传入一个promise，会在promise执行前或执行后将loading状态设置为true，在执行完成后设为false
export function useAutoLoading(defaultLoading = false): AutoLoadingResult {
    const ld = ref(defaultLoading);

    function run<T>(requestPromise: Promise<T>): Promise<T> {
        ld.value = false;
        return requestPromise.finally(() => {
            ld.value = false;
        })
    }
    return [ld, run]
}
```
使用：index.vue
```html
<script setup name="Index" lang="ts">
// import { useAutoRequest } from './hook';
import { useAutoLoading } from './hook2';
import { Button } from './hook2';
import { submitApi, cancelApi } from '@/api';

// const [loading, submit] = useAutoRequest(submitApi);

const [commonLoading, fetch] = useAutoLoading();

function onSubmit() {
    fetch(submitApi('submit')).then(res => {
        console.log('res', res);
    })
}

function onCancel() {
    fetch(cancelApi('cancel')).then(res => {
        console.log('res', res);
    })
}
</script>
<template>
    <div class="col">
    <Button type="primary" :loading="commonLoading" @click="onSubmit">
      提交
    </Button>
    <Button :loading="commonLoading" @click="onCancel">取消</Button>
  </div>
</template>
```
这里也是用到了promise 链式调用的特性，在接口调用之后马上将loading设置为true,在接口调用完成后置为false。而 useAutoRequest则是在接口调用之前就讲loading置为true.

useAutoRequest调用时代码更简洁，useAutoLoading的使用则更灵活，可以同时服务给多个接口使用，比较适合提交、取消这种互斥的场景。

## 解放组件
res 是接口返回给前端的数据，如
```js
{
    "code": 0,
     "msg":'查询成功',
    "data":{
        "username":"小王",
        "age":20,
    }
}
```
我们假定当code为0时代表成功，不为0表示失败，为-100时表示正在加载，当然接口并不会也不需要返回-100，-100是我们本地捏造出来的，只是为了让骨架屏组件显示对应的加载状态。在页面中使用时，我们需要先声明一个code为-100的res对象绑定给骨架屏组件，然后在onMounted中调用查询接口，调用成功后更新res对象。

如果像上面这样使用res对象来给骨架屏组件设置状态的话，几句感觉非常的麻烦，有时候我们只是要设置一个初始时的加载状态，但是要搞好几行没用的代码，但是如果我们把res拆解成一个个参数单独传递的话，父组件需要维护的变量就会非常多了，这时我们就可以封装hook来解决这个问题，把拆解出来的参数都扔到hook里保存

### 骨架屏组件
SkeletonView/index.vue
```html

```


## 使用优化



[Vue3写了hook三天，治好了我的组件封装强迫症](https://mp.weixin.qq.com/s/HjuAXlZrWckPdVBLKKmQjA)