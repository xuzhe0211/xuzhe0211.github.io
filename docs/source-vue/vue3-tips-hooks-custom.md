---
autoGroup-0: Vue3
title: Vue3】如何封装一个超级好用的 Hook ！
---
## 什么是Hook
Vue3官方文档是这样定义组合式函数的。A "composeable" is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic. **一个利用Vue组合式API来封装和复用具有状态逻辑的函数**。

这个概念借鉴自React的Hook。在16.8d的版本中，React引入了React Hook。这是一项特别强大的技能，通过封装有状态的函数，极大提高了组件的编写效率和维护性。在下文中也是使用Hook来替代"组合式函数"进行叙述

在开发中，我们经常会发现一些可以重复利用的代码段，于是我们将其封装成函数以供调用。这类函数包括工具函数，但是又不止工具函数，因为我们可能也会封装一些重复的业务逻辑。以往，在前端原生开发中，我们封装的这些函数都是“无状态”的。为了建立数据与视图之间的联系，基于 MVC 架构的 React 框架和基于 MVVM 的 Vue 框架都引入了“状态”这一概念，状态是特殊的 JavaScript 变量，它的变化会引起视图的变化。在这类框架中，如果一个变量的变化不会引起视图的变化，那么它就是普通变量，如果一个变量已经被框架注册为状态，那么这个变量的变化就会引发视图的变化，我们称之为响应式变量。<span style="color:red">如果一个函数包含了状态（响应式变量），那么它就是一个 Hook 函数</span>。

在具备"状态"的框架的基础上，才有Hook这一说。hook函数 与普通的函数本质区别在于是否具备"状态"

比如，在一个 Vue 项目中，我们可能同时引入了 lodash 库和 VueUse 库，这两个库都是提供一些方便的工具函数。工具函数库只引入一个不行吗，不会重复吗？或许不行，因为 lodash 的函数是无状态的，用来处理普通变量或者响应式变量中的数据部分，而 VueUse 提供的 api 都是 Hook。如果你的项目中既有普通变量又有响应式变量，你或许就会在同一个项目中同时接触到这两个库。

React 官方为我们提供了一些非常方便的 Hook 函数，比如 useState、useEffect（我们通常使用 use 作为前缀来标识 Hook 函数），但是这远远不够，或者说，它们足够通用但是不够具体。为了在具体业务下复用某些逻辑，我们往往会封装自己的 Hook，即自定义 Hook。为什么这里会反复提到 React 中呢？因为提到 Hook，就不可能避开 React。Hook 是 React 发扬光大的，使用 Hook 已经是 React 社区的主流。然而，只要框架具备“状态”这一概念，都可以使用 Hook 技术！下面文章将会介绍如何将 Hook 应用到 Vue 当中。

## 在Vue中使用Hook
下面我们来看一个简单的自定义Hook(官方)

需求：在页面实时显示鼠标的坐标。实现：没有使用Hook
```html
<script setup>
import {ref, onMounted, onUnmounted} from 'vue';

const x = ref(0);
const y = ref(0);

function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
}

onMounted(() => window.addEventListener('mousemove', update));
onUnmounted(() => window.removeEventListener('mousemove', update));
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```
在没有封装的情况下，，如果我们在另一个页面也需要这个功能，我们需要将代码复制过去。另外，可以看出，它声明了两个变量，并且在生命周期钩子 onMounted 和 onUnmounted 中书写了一些代码，如果这个页面需要更多的功能，那么会出现代码中存在很多变量、生命周期中存在很多逻辑写在一起的现象，使得这些逻辑混杂在一起，而使用 Hook 可以将其分隔开来（这也是为什么会有很多人使用 Hook 的原因，分离代码，提高可维护性！）

使用hook
```html
<script setup>
    import { useMouse } from './mouse.js';
    const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```
可以发现，比原来的代码更加简洁，这时如果加入其它功能的变量，也不会觉得眼花缭乱了。

当然，我们需要在外部定义这个 Hook：

```js
// mouse.js
import { ref, onMounted, onUnmounted} from 'vue';

// 按照惯例，组合式函数以use开头
export function useMouse() {
    // 被组合式函数封装和管理的状态
    const x = ref(0);
    const y = ref(0);

    // 组合式函数可以随时更改其状态
    function update(event) {
        x.value = event.pageX;
        y.value = event.pageY;
    }

    // 一个组合式函数也可以挂靠在所属组件的生命周期上
    // 以启动和卸载副作用
    onMounted(() => window.addEventListener('mousemove', update));
    onUnmounted(() => window.removeEventListener('mousemove', update));

    // 通过返回值暴露所管理的状态
    return {x, y}
}
```
活着，你可以试着去 VueVuse 库找到别人封装好的useMouse 

```js
import { useMouse } from 'VueUse';
```

恭喜你，掌握了 VueUse 库的使用方法。如果需要其它 Hook，你可以先试着去[官方文档（VueUse | VueUse）](https://vueuse.org/)查找，使用现成的函数，而不是自己去封装。


## 封装一(入门级的表格Hook)
### 场景分析
首先定义一个表格
```html
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <button @click="refresh">refresh</button>
</template>
```
表格的数据通过api获取(一般写法)
```html
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getTableDataApi } from "./api.ts";

const tableData = ref([]);
const refresh=async () => {
  const data = await getTableDataApi();
  tableData.value = data;
}

onMounted(refresh);
</script>
```
模拟api
```js
// api.ts
export const getTableDataApi = () => {
  const data = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 100);
  })
}
```
如果存在多个表格，我们的js代码会比较复杂
```html
<script lang="ts" setup>
    import {onMounted, ref} from 'vue';
    import { getTableDataApi1, getTableDataApi2, getTableDataApi3} from './api.ts'

    const tableData1 = ref([]);
    const refresh1=async () => {
    const data = await getTableDataApi1();
    tableData1.value = data;
    }

    const tableData2 = ref([]);
    const refresh2=async () => {
    const data = await getTableDataApi2();
    tableData2.value = data;
    }

    const tableData3 = ref([]);
    const refresh3=async () => {
    const data = await getTableDataApi3();
    tableData3.value = data;
    }

    onMounted(refresh1);
</script>
```
### 封装实例
封装我们的useTable
```js
// useTable.ts
import { ref } from 'vue';
export function useTable(api) {
    const data = ref([]);
    const refresh = () => { api().then(res => data.value = res)};
    refresh();
    return [data, refresh];
}
```
改造代码
```html
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { getTableDataApi1, getTableDataApi2,getTableDataApi3 } from './api.ts'
    import { useTable } from './useTable.ts';

    const [tableData1, refresh1] = useTable(getTableDataApi1);
    const [tableData2, refresh2] = useTable(getTableDataApi2);
    const [tableData3, refresh3] = useTable(getTableDataApi3);

    onMounted(refresh1);
</script>
```
### 封装技巧-Hook返回值
1. 一般自定义Hook有返回数组的，也有返回对象的，上面useTable使用了返回数组的写法，useMouse使用了返回对象的写法。数组是对应位置命名的，可以方便重命名，对象对于类型和语法提示更加友好。两种写法都可以替换的。
2. <span style="color: red">因为Hook返回对象或者数组，那么它一定是一个非async函数(async函数一定返回promise)，所以在Hook中，一般使用then而不是await来处理异步请求。</span>
3. 返回值如果是对象，一般在函数中通过reactive创建一个对象，最后通过toRefs导出，这样做的原因是可以产生批量的可以结构的Ref对象，以免在结构返回值时丢失响应式

```js
// 使用 reactive 和 toRefs 可以快速创建多个ref对象，并在解构后使用时不丢失其响应和原先数据的关联性
function usePaginaion() {
    const pagination = reactive({
        current: 1,
        total: 0,
        sizeOption,
        size:sizeOption[0]
    })
    ....
    return {...toRefs(pagination)}
}

const {current, total} = usePaginaion()
```

## 封装二(支持分页查询)

### 需求分析
上面我们封装了一个简单的 hook，但是实际应用中并不会如此简单，下面我列出一个比较完整的 useTable 在实践中应该具备的功能，并在后续的文章部分完成它。

封装表格组件逻辑：
1. 维护api的调用和刷新(已完成)
2. 支持分页查询（页数、总条数、每页大小等）
3. 支持 api 参数。
4. 增加辅助功能（loading、立即执行等）

下面我们将对 useTable 进行改造，使其支持分页器。

先改造一些我们的 api，使其支持分页查询：

```js
export const getTableDataApi = (page, limit) => {
  const data = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2017-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2017-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2017-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2017-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: data.length,
        data: data.slice((page - 1) * limit, (page - 1) * limit + limit)
      })
    }, 100);
  })
}
```
如果没有使用Hook,我们的vue文件应该是这样
```html
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <button @click="refresh">refresh</button>
  <!-- 分页器 -->
  <el-pagination
    v-model:current-page="current"
    :page-size="size"
    layout="total, prev, pager, next"
    :page-sizes="sizeOption"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getTableDataApi } from "./api.ts";

const tableData = ref([]); // 表格数据
const current = ref(1); // 当前页数
const sizeOption = [10, 20, 50, 100, 200]; // 每页大小选项
const size = ref(sizeOption[0]); //每页大小
const total = ref(0); // 总条数

// 每页大小变化
const handleSizeChange = (size: number) => {
  size.value = size;
  current.value = 1;
  // total.value = 0;
  refresh();
};

// 页数变化
const handleCurrentChange = (page: number) => {
  current.value = page;
  // total.value = 0;
  refresh();
};

const refresh = async () => {
  const result = await getTableDataApi({
    page: current.value,
    limit: size.value,
  });
  tableData.value = result.data || [];
  total.value = result.total || 0;
};

onMounted(refresh);
</script>
```
可以看出，如果存在多个表格，会创建很多套变量和重复的代码。

### 封装实例
先写个 usePagination：该钩子接受一个回调函数，当页数改变时就会调用该函数。

```js
import { reactive } from 'vue';

export function usePagination(
    cb: any,
    sizeOption: Array<number> = [10, 20, 50, 100, 200]
):any {
    const pagination = reactive({
        current: 1,
        total: 0,
        sizeOption,
        size: sizeOption[0],
        // 维护page和size(一般主动触发)
        onPageChange:(page: number) => {
            pagination.current = page;
            return cb();
        },
        onSizeChange: (size: number) => {
            pagination.current = 1;
            pagination.size = size;
            return cb();
        },
        // 一般调用cb后会还会修改total（一般是被动触发）
        setTotal: (total: number) => {
            pagination.total = total;
        },
        reset() {
            pagination.current = 1;
            pagination.total = 0;
            pagination.size = pagination.sizeOption[0];
        },
    })
      return [
        pagination,
        pagination.onPageChange,
        pagination.onSizeChange,
        pagination.setTotal,
    ];
}
```
**与 useTable 结合:代码非常简单，在调用api时传入参数，并在接受返回值时更新 data和total。这里我们的refresh 函数是返回Promise的函数，能够支持在调用refresh处在链接then进行下一步处理**

```js
export function useTable(api:(params: any) => Promise<T>) {
    const [pagination, ,,setTotal] = usePagination(() => refresh());
    const data = ref([]);

    const refresh = () => {
        return api({ page: pagination.current, limit: pagination.size}).then(
            res => {
                data.value = res.data;
                setTotal(res.total);
            }
        )
    }
    return [data, refresh, pagination]
}
```
> 注：我们新建一个文件 customHooks.js 并将 usePagination 和 useTable 放在里面。

使用 useTable：
```html
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <button @click="refresh">refresh</button>
  <!-- 分页器 -->
  <el-pagination
    v-model:current-page="pagination.current"
    :page-size="pagination.size"
    layout="total, prev, pager, next"
    :page-sizes="pagination.sizeOption"
    :total="pagination.total"
    @size-change="pagination.onSizeChange"
    @current-change="pagination.onCurrentChange"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getTableDataApi } from "./api.ts";
import { useTable } from './customHooks.ts'

const [tableData, refresh, pagination] = useTable(getTableDataApi);

onMounted(refresh);
</script>
```

## 封装三(支持不同接口字段)
### 封装分析
上面我们封装了一个"看起来"比较实用的 useTable 函数，你会发现很多问题

1. 每次都要写 onMounted 来初始化数据。
2. 接口接受的格式可能不一样。比如，也输得字段为"currentPage",而不是『page』
3. 接口的返回格式可能不一样，比如，返回的 data 并不在 refresh 方法定义的“data”上

### 封装实例
接下来，我们通过增加 useTable 函数的参数，来解决上面所有问题！
```js
import { get, has, defaults } from 'lodash-es';
type keyPath = Array<string> | string;

export default useTable<T> (
    api:(params: any) => Promise<T>;
    options: {
        path?:{ data?: keyPath, total?: keyPath, page?: string; size?:string}
        immediate?: boolean;
    }
){
    // 参数处理
    defaults(options, {
        path: {data: 'data', total: 'total', page: 'page', size: 'size'},
        immediate: false
    })
    const [pagination, , , setTotal] = () => refresh();
    const data = ref([]);
    const loading = ref(false)

    const refresh = () => {
        loading.value = true
        return api({ [options?.path?.page]: pagination.current, [options?.path?.size]: pagination.size }).then(
            (res) => {
                data.value = get(res, options!.path?.data, []);
                setTotal(get(res, options!.path?.total, 0));
                // 友好提示
                if (!has(res, options!.path?.data) || !has(res, options!.path?.total)) {
                console.warn("useTable：响应数据缺少所需字段");
                }
            }.finally(() => {
                loading.value = false
            })
        );
    };
    // 立即执行
    options!.immediate && refresh();
    return [data, refresh, loading, pagination];
}
```
这里引入了 lodash 库中的三个工具函数来辅助处理对象
- defaults，将后面参数的属性，复制到第一个对象的值为 undefined的属性上，用于初始化函数参数
- get，获取对象属性，如果为 undefined，使用第三个参数的值。
- has，判断对象属性。
具体用法可以查看官方文档（Lodash 简介 | Lodash中文文档 | Lodash中文网） 此外，还新增了 loading，可以挂载到 el-table 的 v-loading 上，展示数据加载中的效果。

```html
<el-table v-loding="loading" ...>...</el-table>
```
改造后：不管接口接受的格式还是响应的格式字段是什么样的，都可以正常接收。设置 immediate 为 true，调用 useTable 时立即执行一遍 api，onMounted 都不用写了。
```html
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getTableDataApi } from "./api.ts";
import { useTable } from './customHooks.ts'

const [tableData, refresh, loading, pagination] = useTable(getTableDataApi, {
  path: {
    data: 'data',
    total: 'total',
    page: 'page',
    size: 'limit'
  },
  immediate: true
});

// onMounted(refresh);
</script>
```
### javascript 函数传参技巧
1. 一般函数定义参数越少越好，最好不要超过两个，所以这里我只定义了两个参数 api 和 options
2. 在函数头上可以给参数定义默认值，但是如果参数是一个对象，只要传入一个属性，就不会使用默认值。比如

```js
export function useTable<T>(
  api: (params: any) => Promise<T>,
  options: {
    path?: { data?: keyPath; total?: keyPath; page?: string; size?: string };
    immediate?: boolean;
  } = {
    path: { data: "data", total: "total", page: "page", size: "size" },
    immediate: false,
  }
){...函数体} 

useTable(xxxApi,{immediate:false})
```
只要该位置的值非 undefined，那么 options 将不会使用默认值，这意味着，此时 options 的值为 {immediate:false}，其它地方的默认值不会生效，{path:undefined,}。

所以对于函数参数为对象的，我们往往通过在函数体内赋默认值，比如：

```js
//保证options只传入一个值，其它位置也会有默认值
{
  options.path = options.path || {}
  options.path.data = options.path.data || 'data'
  options.path.total = options.path.total || 'total'
  options.path.page = options.path.page || 'page'
  options.path.size = options.path.size || 'size'
  options.immediate = options.immediate ?? false
}
```
需要注意元素的层次，在不存在 path 时，给 path. data 赋值会出现错误，需要先保证 path 有值，才能给 path 的下一层赋值。

使用 defaults 可以快速给整个对象赋默认值：
```js
defaults(options, {
    path: { data: "data", total: "total", page: "page", size: "size" },
    immediate: false,
});
```
## 封装四
### 封装分析
现在，我们的 useTable 趋近完整了：

1. 维护 api 的调用和刷新（已完成）
2. 支持分页查询（已完成）
3. 支持 api 参数。
4. 增加辅助功能 loading、立即执行等。（已完成）

我们还可以让我们的 api 接受参数。但是如何实现？还需要考虑一下。

首先我们想一想那里可以接受 api 的参数？

```js
const params = {
	id:2
}

// api本身
getTableDataApi({limit:3,page:2,...params})

// useTable也可以接受参数
const [data,refresh]=useTable(getTableDataApi,params,api)

// refresh也可以接受参数
refresh(params)
```
从使用上看，我们在 refresh 上接受参数，和我们在 getTableDataApi 的使用上感觉是最相似的，因为 refresh 本来就是在 api 的基础上增加 then 维护了页数而已。但是我们还是先从 useTable 传参开始讲起，最后我们两种方式都可以接受！

方案一：在调用 useTable 的时候就接受参数，在 useTable 内部将这个参数传给 refresh。

存在问题：如果我们传入的是值类型，那么这个值会被拷贝过去，并传给 refresh，后续调用 refresh，都是不变的参数。只适合需要传参但参数之后都不会变的接口，比如接受当前用户的 id。如果参数会变，这种方法是不行的。

```js
function useTable(api,id,options){
	...
	const refresh=()=>api(id).then(res=>data=res)
	return [data,refresh]
}

const [data,refresh]=useTable(api,id)
refresh()
refresh() // 都是id=2
```
如果我们传入的是引用类型，那么在后续调用中，我们可以通过改变对象的属性值来改变 refresh 的参数（但是需要一些技巧，因为我们需要和分页参数进行结合）。

```js
const params = { id:12 }
function useTable(api,params,options){
	...
	// 错误，使用解构会丢失与原来对象的联系，导致原来的对象params更改，但这里仍使用旧值。
	const refresh=()=>api({[options.path.size]:pagination.size,[options.path.page]:pagination.page,...params}).then(res=>data=res)
	// 正确，可以保持与外部params的联系。
	const refresh=()=>api(Object.assign(params,{[options.path.size]:pagination.size,[options.path.page]:pagination.page})).then(res=>data=res)
	return [data,refresh]
}

const [data,refresh]=useTable(api,params)
refresh() // id=12
params.id = 10
refresh() // id=10
```
这样，我们就实现了 api 参数的传递，而且如果 params 的属性 id 是响应式的，还可以与页面结合，实现搜索功能！然而，使用同一个引用 params，可以解决传参问题，但是还是存在一些问题：在 refresh 中，Object. assign 会给原来的对象 params 增加两个属性，要注意避免在 params 中与这两个属性发生冲突。另外，我们可以看到这里的参数间存在了一种优先级，就是如果我们在 param 中也传入了分页参数，会在 refresh 中被 pagination 的分页参数覆盖调，pagination 的分页参数比 params 中的分页参数优先级更高，这样好吗？

第一个问题，在 refresh 中每次都会被 pagination 的属性覆盖，所以并不会出现什么问题，除非你在 params 上保存相同属性名的数据，这将被覆盖掉。第二个问题和第一个问题本质是一样的，就是覆盖问题。根本原因就是都是引用同一个对象。如果我们能够额外创建一个对象，就不会改变原来的对象，但是如何保持新创建对象能够动态变化呢？

方案二：试试 useTable 接受传入函数 params 如何？

```js
const params={id:12}
const paramsFn =()=>{ id: params.id }
function useTable(api,paramsFn(),options){
	...
	const refresh=()=>api(Object.assign(paramsFn(),{[options.path.size]:pagination.size,[options.path.page]:pagination.page})).then(res=>data=res)
	return [data,refresh]
}

const [data,refresh]=useTable(api,paramsFn)
refresh() // id=12
params.id = 10
refresh() // id=10
```
完美解决。

最后，兼容一下两种参数，让传入 useTable 的 api 参数既可以是函数，又可以是对象：
```js
export funciton useTable<T>(
    api: (params: any) => Promise<T>,
    params?: object || (() => object),
    options?: {
        path?: { data?: keyPath; total?: keyPath; page?: string; size?: string }
        immediate?: boolean
    }
){
    // 参数处理
    defaults(options, {
        path: {data: 'data', total: 'total', page: 'page', size: 'size'},
        immediate: false
    })

    const [pagination, ,, setTotal] = usePagination(() => refresh());
    const loading = ref(false);
    const data = ref([]);

    const refresh = () => {
        const requestData = {
            [options?.path?.page as string]: pagination.current,
            [options?.path?.size as string]: pagination.size,
        }
        if (params) {
        if (typeof params === 'function') {
            Object.assign(requestData, params())
        } else {
            Object.assign(requestData, params)
        }
        }
        loading.value = true
        return api(requestData)
        .then((res) => {
            data.value = get(res, options!.path?.data, [])
            setTotal(get(res, options!.path?.total, 0))
            if (!has(res, options!.path?.data) || !has(res, options!.path?.total)) {
                console.warn('useTable：响应数据缺少所需字段')
            }
        })
        .finally(() => {
            loading.value = false
        })
    }
    options!.immediate && refresh();
    return [data as T, refresh, loading, pagination]
}
```
这里代码主要新增了三处改变：

1. 如果 params 是对象，直接使用，如果是函数，则读取其返回值。
2. 优先级调整：paginaiton 的参数可以被 params 的同名属性覆盖，适用于开发者自己维护分页参数。
定义了返回值的类型。

### 使用示例
试想一个常见，点击列表的某一项，就展示列表对应 id 的表格，如何实现？
```html
<template>
	<ul>
		// 自定义组件，点击时emit发送onClick事件并传入item的id
		<Item v-for="item in list" :key="item.key" :label="item.label" @on-click="handleClick">
		...
	</ul>
</template>

<script>
...
// 这里接受item的id
const handleClick=(id:number)=>{
	params.id=number;
	refresh()
}
...
</script>
```
## 封装五(接口传参-调用时)
最后，来让 refresh 函数也能接受我们的传参。 先看效果：
```html
<script>
...
// 这里接受item的id
const handleClick=(id:number)=>{
	refresh({id})
}
...
</script>
```
可以省去 params 和 paramsFn 的定义了！

实现代码：在定义 refresh 时允许加入参数。

```js
export function useTable<T>(
  api: (params: any) => Promise<T>,
  params?: object | (() => object),
  options?: {
    path?: { data?: keyPath; total?: keyPath; page?: string; size?: string }
    immediate?: boolean
  },
) {
  defaults(options, {
    path: { data: 'data', total: 'total', page: 'page', size: 'size' },
    immediate: false,
  })

  // 使用()=>fn()而不是fn()区别在于后者只是一个值且立即执行
  const [pagination, , , setTotal] = usePagination((extraData?: object) =>
    extraData ? refresh(extraData) : refresh(),
  )
  const loading = ref(false)
  const data = ref([])

  const refresh = (extraData?: object | (() => object)) => {
    const requestData = {
      [options?.path?.page as string]: pagination.current,
      [options?.path?.size as string]: pagination.size,
    }
    if (extraData) {
      if (typeof extraData === 'function') {
        Object.assign(requestData, extraData())
      } else {
        Object.assign(requestData, extraData)
      }
    }
    if (params) {
      if (typeof params === 'function') {
        Object.assign(requestData, params())
      } else {
        Object.assign(requestData, params)
      }
    }
    loading.value = true
    return api(requestData)
      .then((res) => {
        // TODO 检查响应状态码
        data.value = get(res, options!.path?.data, [])
        setTotal(get(res, options!.path?.total, 0))
        // 友好提示
        if (!has(res, options!.path?.data) || !has(res, options!.path?.total)) {
          console.warn('useTable：响应数据缺少所需字段')
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

	return[data,refresh,paginaiton,loading]
}
```
需要注意的是，usePagination 处接受的回调函数也要适当修改。当然，pagination 也是要修改的了（增加回调函数有参数的情况，之前回调是没有参数的）。这里还额外新增了一个 reset 方法，用于重置分页器状态，这或许会有用！

```js
export function usePagination(
  cb: any,
  sizeOption: Array<number> = [10, 20, 50, 100, 200],
): any {
  const pagination = reactive({
    current: 1,
    total: 0,
    size: sizeOption[0],
    sizeOption,
    onPageChange: (page: number, extraData?: object) => {
      pagination.current = page
      return extraData ? cb(extraData) : cb()
    },
    onSizeChange: (size: number, extraData?: object) => {
      pagination.current = 1
      pagination.size = size
      return extraData ? cb(extraData) : cb()
    },
    setTotal: (total: number) => {
      pagination.total = total
    },
    reset() {
      pagination.current = 1
      pagination.total = 0
      pagination.size = pagination.sizeOption[0]
    },
  })

  return [
    pagination,
    pagination.onPageChange,
    pagination.onSizeChange,
    pagination.setTotal,
  ]
}
```
使用
```html
  <!-- 分页器 -->
  <el-pagination
    v-model:current-page="current"
    :page-size="size"
    layout="total, prev, pager, next"
    :page-sizes="sizeOption"
    :total="total"
    @size-change="(size)=>handleSizeChange(size,params.id)"
    @current-change="(page)=>handleCurrentChange(page,params.id)"
  />
```
在此之前，需要保存 item. id 作为全局变量以供读取。
```js
const handleClick=(id:number)=>{
	params.id=id;
}
```
这样，我们就完成了一个功能相对完善的 Hook 函数。
