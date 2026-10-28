---
autoGroup-1: Tips API
title: Vue3后台分页吗，使用HOOK删掉90%的重复代码
category:
  - 源码学习
tag:
  - vue
  - 源码
---

## 背景与痛点
在后台管理系统开发中，分页列表查询非常常见，我们通常需要处理：
- 当前页、页大小、总数等分页状态
- 加载中、错误处理等请求状态
- 搜索、刷新、翻页等分页操作
- 数据缓存和重复请求处理

这些重复逻辑分散在各个组件中，维护起来很麻烦，

为了解决这个烦恼，我专门封装了分页数据管理Hook。现在值需要几行代码，就能轻松实现分页查询，省时又高效，减少了大量重复劳动

## 使用前提
查询接口返回的数据格式
```json
{
    list: [
        { id: 1, name: 'user1'},
        { id: 2, name: 'user2'},
    ],
    total: 100,
}
```
## 先看效果：分页查询只许几行代码
```js
import usePageFetch from '@/hooks/usePageFetch' // 引入分页查询 Hook，封装了分页逻辑和状态管理
import { getUserList } from '@/api/user'        // 引入请求用户列表的 API 方法

// 使用 usePageFetch Hook 实现分页数据管理
const {
  currentPage,      // 当前页码
  pageSize,         // 每页条数
  total,            // 数据总数
  data,             // 当前页数据列表
  isFetching,       // 加载状态，用于控制 loading 效果
  search,           // 搜索方法
  onSizeChange,     // 页大小改变事件处理方法
  onCurrentChange   // 页码改变事件处理方法
} = usePageFetch(
  getUserList,  // 查询API
  { initFetch: false }  // 是否自动请求一次（组件挂载时自动拉取第一页数据）     
)
```
这样每次分页查询只需要引入hook，然后传入查询接口就好了，减少了大量重复劳动

## 解决方案
我设计了两个相互配合的Hook,

- useFetch: 基础请求封装，处理请求状态和缓存
- usePageFetch: 分页逻辑封装，专门处理分页相关的状态和操作

```shell
usePageFetch(分页业务层)
|-- 管理page / pagesize / total 状态
|-- 处理搜索、刷新、翻页逻辑
|-- 统一错误处理和用户提示
|-- 调用 useFetch(请求基础层)
    |-- 管理 loading / data / error 状态
    |-- 可选缓存机制(避免重复请求)
    |-- 成功回调适配不同接口格式
```

## 核心实现
### useFetch--基础请求封装
```js
// hooks/useFetch.js
import { ref } from 'vue'

const Cache = new Map()

/**
 * 基础请求 Hook
 * @param {Function} fn - 请求函数
 * @param {Object} options - 配置选项
 * @param {*} options.initValue - 初始值
 * @param {string|Function} options.cache - 缓存配置
 * @param {Function} options.onSuccess - 成功回调
 */
function useFetch(fn, options = {}) {
  const isFetching = ref(false)
  const data = ref()
  const error = ref()

  // 设置初始值
  if (options.initValue !== undefined) {
    data.value = options.initValue
  }

  function fetch(...args) {
    isFetching.value = true
    let promise

    if (options.cache) {
      const cacheKey = typeof options.cache === 'function'
        ? options.cache(...args)
        : options.cache || `${fn.name}_${args.join('_')}`

      promise = Cache.get(cacheKey) || fn(...args)
      Cache.set(cacheKey, promise)
    } else {
      promise = fn(...args)
    }

    // 成功回调处理
    if (options.onSuccess) {
      promise = promise.then(options.onSuccess)
    }

    return promise
      .then(res => {
        data.value = res
        isFetching.value = false
        error.value = undefined
        return res
      })
      .catch(err => {
        isFetching.value = false
        error.value = err
        return Promise.reject(err)
      })
  }

  return {
    fetch,
    isFetching,
    data,
    error
  }
}

export default useFetch
```

### usePageFetch--分页逻辑封装
```js
// hooks/usePageFetch.js
import { ref, onMounted, toRaw, watch } from 'vue'
import useFetch from './useFetch' // 即上面的hook ---> useFetch 
import { ElMessage } from 'element-plus'

/**
 * 分页数据管理 Hook
 * @param {Function} fn - 请求函数
 * @param {Object} options - 配置选项
 * @param {Object} options.params - 默认参数
 * @param {boolean} options.initFetch - 是否自动初始化请求
 * @param {Ref} options.formRef - 表单引用
 */
function usePageFetch(fn, options = {}) {
  // 分页状态
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const data = ref([])
  const params = ref()
  const pendingCount = ref(0)

  // 初始化参数
  params.value = options.params

  //  使用基础请求 Hook
  const { isFetching, fetch: fetchFn, error, data: originalData } = useFetch(fn)

  //  核心请求方法
  const fetch = async (searchParams, pageNo, size) => {
    try {
      // 更新分页状态
      page.value = pageNo
      pageSize.value = size
      params.value = searchParams

      // 发起请求
      await fetchFn({
        page: pageNo,
        pageSize: size,
        // 使用 toRaw 避免响应式对象问题
        ...(searchParams ? toRaw(searchParams) : {})
      })

      // 处理响应数据
      data.value = originalData.value?.list || []
      total.value = originalData.value?.total || 0
      pendingCount.value = originalData.value?.pendingCounts || 0
    } catch (e) {
      console.error('usePageFetch error:', e)
      ElMessage.error(e?.msg || e?.message || '请求出错')
      // 清空数据，提供更好的用户体验
      data.value = []
      total.value = 0
    }
  }

  //  搜索 - 重置到第一页
  const search = async (searchParams) => {
    await fetch(searchParams, 1, pageSize.value)
  }

  // 刷新当前页
  const refresh = async () => {
    await fetch(params.value, page.value, pageSize.value)
  }

  // 改变页大小
  const onSizeChange = async (size) => {
    await fetch(params.value, 1, size) // 重置到第一页
  }

  // 切换页码
  const onCurrentChange = async (pageNo) => {
    await fetch(params.value, pageNo, pageSize.value)
  }

  // 组件挂载时自动请求
  onMounted(() => {
    if (options.initFetch !== false) {
      search(params.value)
    }
  })

  // 监听表单引用变化（可选功能）
  watch(
    () => options.formRef,
    (formRef) => {
      if (formRef) {
        console.log('Form ref updated:', formRef)
      }
    }
  )

  return {
    // 分页状态
    currentPage: page,
    pageSize,
    total,
    pendingCount,
    
    // 数据状态
    data,
    originalData,
    isFetching,
    error,
    
    // 操作方法
    search,
    refresh,
    onSizeChange,
    onCurrentChange
  }
}

export default usePageFetch
```
## 完整使用示例
### 使用 element ui 举例
```html
<template>
    <el-form :model="searchForm" >
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  <!-- 表格数据展示，绑定 data 和 loading 状态 -->
  <el-table :data="data" v-loading="isFetching">
    <!-- ...表格列定义... -->
  </el-table>

  <!-- 分页组件，绑定当前页、页大小、总数，并响应切换事件 -->
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    @size-change="onSizeChange"
    @current-change="onCurrentChange"
  />
</template>
<script setup>
import { ref } from 'vue'
import usePageFetch from '@/hooks/usePageFetch' // 引入分页查询 Hook，封装了分页逻辑和状态管理
import { getUserList } from '@/api/user'        // 引入请求用户列表的 API 方法

// 搜索表单数据，响应式声明
const searchForm = ref({
  username: ''
})

// 使用 usePageFetch Hook 实现分页数据管理
const {
  currentPage,      // 当前页码
  pageSize,         // 每页条数
  total,            // 数据总数
  data,             // 当前页数据列表
  isFetching,       // 加载状态，用于控制 loading 效果
  search,           // 搜索方法
  onSizeChange,     // 页大小改变事件处理方法
  onCurrentChange   // 页码改变事件处理方法
} = usePageFetch(
  getUserList, 
  { initFetch: false }  // 是否自动请求一次（组件挂载时自动拉取第一页数据）     
)

/**
* 处理搜索操作
*/
const handleSearch = () => {
  search({ username: searchForm.value.username })
}

</script>
```
## 高级用法
### 带缓存
```js
const {
    data, 
    isFetching,
    search
} = usePageFetch(getUserList, {
    cache: (params) => `user-list-${JSON.stringify(params)}` // 自定义缓存key
})
```
## 设计思路解析
- 职责分离：useFetch 专注请求状态管理，usePageFetch 专注分页逻辑
- 统一错误处理：在 usePageFetch 层统一处理错误
- 智能缓存机制：支持多重缓存策略
- 生命周期集成：自动在组件挂载时请求数据

## 总结
这套分页管理 Hook 的优势：

开发效率高，减少90%的重复代码，新增列表页从 30 分钟缩短到 5 分钟

状态管理完善，自动处理加载、错误、数据状态

缓存机制，避免重复请求

错误处理统一，用户体验一致

易于扩展，支持自定义配置和回调


[原文](https://juejin.cn/post/7549096640340426802)