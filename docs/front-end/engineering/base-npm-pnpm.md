---
autoGroup-0: 基础
title: vue配套生态已经全面使用pnpm了,你再不学就说不过去了!
---
## 简单方案
在前端开发中我们经常遇到这样一种情况：假设我们要渲染一个订单列表，后端返回的数据中包含这样一个字段：
```js
// 订单状态
orderStatus: 0
```
后端可能会告诉我们，它对应后端这样一组值
```js
{
    0: '已完成',
    1: '待支付',
    2: '已取消'
}
```
那么我们在前端如何优雅地把后端所返回的值 0 转换成字符串 已完成 呢？这就是本文要讨论的问题。

为了引出我们的方案，我们先来看一个常用但不那么优雅的方案：

<span style="color: red">一种不够优雅的方案 首先，我们来为这个字段定义一个对象</span>

```js
const orderStatusMapper = {
    '0': '已完成',
    '1': '待支付',
    '2': '已取消'
}
```
接下来，根据返回的字段值从对象中取出对应的值即可
```js
orderStatusMapper(String(orderStatus)); // 已完成
```
## 思考
得益于Javascript语法的灵活性，这种方案实现起来特别简单，对于简单的枚举场景算得上一种很好的解决方案。但它也有缺点，我但它也有缺点，我只列举最明显的两点：

缺乏灵活性 封装性较差，不利于扩展 关于灵活性，我们尝试换一个场景：假设我们现在需要根据中文文本来获取它对应的value，该怎么办呢？我们可能会定义下面这样一个对象：

```js
const orderStatusTextMapper = {
  '已完成': 0,
  '待支付': 1,
  '已取消': 2
}
```
关于封装性差，不利于扩展，我们也举一个场景：假设我们需要将 已完成 的文案渲染为绿色，待支付 的渲染为橙色，已取消 的渲染为灰色；并且各个状态对应不同的操作：已完成 的订单可以查看详情 或 下载，待支付 的订单可以 继续支付 或 取消订单，已取消 的订单只支持 查看详情。

面对这个场景，我们定义的那个‘单薄’的对象已经完全不够用了。简单场景看起来很美好，但现实却总是很复杂！

关于这个方案的其他缺点我们不再一一列举，我们接下来介绍一种更加优雅的方案：

更加优雅的方案 历史常识告诉我们，当一个地区变得混乱，多半是管理出了问题，上述问题也一样。为了解决混乱，我们尝试引入一个“管理者”，来管理这个枚举字段。

在实现这个“管理者”之前，我们先来思考这个管理者应该具备哪些能力。这里我们把后端返回的值0,1,2称为value，把对应的中文文本称为label。

首先，它必须能同时具备根据value获取label，以及根据label获取value的能力，为了提供更大的灵活性，它最好可以以数组的形式暴露出所有的value和label，以便我们枚举，于是它的结构大概是这样的（这里只列举了最基本的属性和方法）：

```js
const orderStatusEnumManager = {
    values: [0, 1,2],
    labels: ['已完成', '待支付', '已取消'],
    getLabelByValue(label){},
    getValueByLabel(value){}
}
```
我们定义的这两个get方法的搜索逻辑是：根据传入的value找到它在values数组中的索引，然后取出labels中对应位置的值即可，反之亦然。这样我们就解决了上述第一个不够灵活的问题。
当然，作为一个优雅的解决方案，我们肯定不会一个个手写每个枚举字段的管理者对象？所以我们来定义一个工厂函数：
```js
// 用于构造枚举字段的管理者对象
// name是http传输时枚举值的字段名，根据需要可以不要
function getEnumManager (name, enums) {
  const labels = enums.map((item: Enum) => item.label);
  const values = enums.map((item: Enum) => item.value);
  return {
    name,
    labels,
    values,
    enums,
    getValueByLabel (label) {
      return values[labels.indexOf(label)];
    },
    getLabelByValue (value: any) {
      return labels[values.indexOf(value)];
    },
    getItemByValueOrLabel (valueOrLabel: string | number | null) {
      let index = values.indexOf(valueOrLabel);
      if (index < 0) {
        index = labels.indexOf((valueOrLabel as string));
      }
      return enums[index];
    },
    ... // 其他专用取值函数
  }
}
```
现在我们可以这样生成一个管理者对象：
```js
const orderStatusEnum = getEnumStatus('orderStatus', [
    { value: 0, label: '已完成' },
    { value: 1, label: '待支付' },
    { value: 2, label: '已取消' }
])
```
用这个管理者对象，我们可以很容易相互映射value和label：
```js
orderStatusEnum.getLabelByValue(0); // 已完成
orderStatusEnum.getValueByLabel('已完成'); // 0
```
我们可以很容易地枚举所有label，或者所有value：
```html
<div v-for="label in orderStatusEnum.labels" :key="label">
  {{ label }}
</div>

<div v-for="value in orderStatusEnum.values" :key="value">
  {{ value }}
</div>
```
当然它最大的魅力在于非常容易扩展，比如我们上面提到需要给三个值分别显示绿色、橙色和灰色，以及支持不同的操作：
```js
const orderStatusEnum = getEnumManager('orderStatus', [
  { value: 0, label: '已完成', color: green, operation: ['checkDetail', 'download'] },
  { value: 1, label: '待支付', color: orange, operation: ['pay', 'cancel'] },
  { value: 2, label: '已取消', color: gray, operation: ['checkDetail'] }
])
```
你有两种方式可以获取这里的color和operation的值，一是直接从暴露出的enums属性中提取:
```js
// 查询已完成的颜色值
const value = 0;
const target = orderStatusEnum.enums.find(order =>
  order.value === value);
console.log(target ? target.color || '');
```
还有另外一种方法，我们给管理者对象新增一个用于获取颜色的方法：
```js
function getEnumManager (name, enums) {
  const labels = enums.map((item: Enum) => item.label);
  const values = enums.map((item: Enum) => item.value);
  return {
    ...
    getColorByValueOrLabel (valueOrLabel) {
      let index = values.indexOf(valueOrLabel);
      if (index < 0) {
        index = labels.indexOf((valueOrLabel as string));
      }
      return enums[index].color;
    }
  }
}
```
现在你可以这样获取0或者已完成对应的颜色值：
```js
// 根据value取值
const color = orderStatusEnum.getColorByValueOrLabel(0); // green
// 根据label取值
const color = orderStatusEnum.getColorByValueOrLabel('已完成'); // green
```
所以，它需要扩展多少功能，取决于你需要添加多少！
## 封装
我们把上述所有代码封装在一个js文件中，就可以作为全局的工具使用了：
```js
// enums.js
// 用于构造枚举字段的管理者对象
// name是http传输时枚举值的字段名，根据需要可以不要
function getEnumManager (name, enums) {
  const labels = enums.map((item: Enum) => item.label);
  const values = enums.map((item: Enum) => item.value);
  return {
    name,
    labels,
    values,
    enums,
    getValueByLabel (label) {
      return values[labels.indexOf(label)];
    },
    getLabelByValue (value: any) {
      return labels[values.indexOf(value)];
    },
    getItemByValueOrLabel (valueOrLabel: string | number | null) {
      let index = values.indexOf(valueOrLabel);
      if (index < 0) {
        index = labels.indexOf((valueOrLabel as string));
      }
      return enums[index];
    },
    ... // 其他专用取值函数
  }
}
​
export const orderStatusEnum = getEnumManager('orderStatus', [
  { value: 0, label: '已完成', color: green,
    operation: ['checkDetail', 'download'] },
  { value: 1, label: '待支付', color: orange,
    operation: ['pay', 'cancel'] },
  { value: 2, label: '已取消', color: gray,
    operation: ['checkDetail'] }
]);
​
export const payTypeEnum = ...
// ...
```
在组件中使用它非常简单：
```js
import { orderStatusEnum } from '@/utils/enums.js';
...
const tabelData = res.data.map(item => {
  // 将字段值映射为label
  return Object.assign({}, item, {
    label: orderStatusEnum.getLabelByValue(item.orderSataus)
  })
})
```
现在表格的每一项新增了一个字段label，对应的就是订单状态的中文文本，可以直接拿来渲染！

通过创建这个管理者对象，我们不仅实现了对枚举值的封装和隔离，还很大程度地增加了它的扩展性和灵活性，建议大家可以在日常开发中尝试使用它。
## 应用优化
前端代码中应该避免直接使用接口返回的枚举值：0、1、2、3…

使用语义化的方式来处理枚举值

定义一个枚举对象创建函数

```js
// 创建枚举对象，用于界面显示转换
function createEnumObject(enums) {
  let labels = null
  let values = null
​
  return {
    getLabels() {
      if (!labels) {
        labels = enums.map((item) => item.label)
      }
      return labels
    },
​
    getValues() {
      if (!values) {
        values = enums.map((item) => item.value)
      }
      return values
    },
    
    getLabel(value) {
      let index = this.getValues().indexOf(value)
    
      if (index > -1) {
        return this.getLabels()[index]
      }
    },
    
    getValue(label) {
      let index = this.getLabels().indexOf(label)
    
      if (index > -1) {
        return this.getValues()[index]
      }
    },
    
    getItem(valueOrLabel) {
      let index = this.getValues().indexOf(valueOrLabel)
    
      if (index < 0) {
        index = this.getLabels().indexOf(valueOrLabel)
      }
    
      if (index > -1) {
        return enums[index]
      }
    },
​
  }
}
```
创建枚举对象
```js
// 枚举值，用于逻辑判断
const statusEnum = {
  // 待支付
  WaitPay: 0,
  // 已完成
  Success: 1,
  // 已取消
  Cancel: 2,
}
​
// 枚举值配置，用于属性扩展
const statusEnumConfig = [
  {
    value: statusEnum.WaitPay,
    label: '待支付',
    color: 'yellow',
    // 支付 取消支付
    actions: ['pay', 'cancel'],
  },
  {
    value: statusEnum.Success,
    label: '已完成',
    color: 'green',
    // 查看详情 退款
    actions: ['detail', 'return'],
  },
  {
    value: statusEnum.Cancel,
    label: '已取消',
    color: 'red',
    // 查看详情
    actions: ['detail'],
  },
]
​
// 枚举值对象，用于数值转换
const statusEnumObj = createEnumObject(statusEnumConfig)
```
使用示例
```js
console.log(statusEnumObj.getItem(1))
// {
//   value: 1,
//   label: '已完成',
//   color: 'green',
//   actions: [ 'detail', 'return' ]
// }
​
console.log(statusEnumObj.getValue('已完成'))
// 1
​
// 没有对应的值返回undefined
console.log(statusEnumObj.getValue(1))
// undefined
​
// 接口返回的真实数值，转换为显示值
console.log(statusEnumObj.getLabel(1))
// 已完成
​
// 接口返回的数值，做逻辑判断
console.log(statusEnum.Success == 1);
// true
```
优化后实现的代码，预留config配置，支持key，传参明确
```js
// enum-util.js
// 增强枚举对象
export function createEnumObject(enums, config = null) {
  let valueKey = (config ? config.valueKey : null) || 'value'
  let labelKey = (config ? config.labelKey : null) || 'label'
​
  return {
    getItem(value, key = null) {
      for (let item of enums) {
        if (item[key || valueKey] == value) {
          return item
        }
      }
    },
​
    getColums(key) {
      return enums.map((item) => item[key])
    },
    
    getColum(column, key, value) {
      let item = this.getItem(value, key)
      if (item) {
        return item[column]
      }
    },
    
    getLabels() {
      return this.getColums(labelKey)
    },
    
    getValues() {
      return this.getColums(valueKey)
    },
    
    getLabel(value, key = null) {
      return this.getColum(labelKey, key || valueKey, value)
    },
    
    getValue(value, key = null) {
      return this.getColum(valueKey, key || labelKey, value)
    },
​
  }
}
```

## 资料
[vue配套生态已经全面使用pnpm了,你再不学就说不过去了!](https://juejin.cn/post/7200679596122538045?)