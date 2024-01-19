---
autoGroup-16: Tips/方法实现
title: 你能停止 JavaScript 中的 forEach 循环吗？
---
小伙伴们，下面的代码会输出什么数字呢？
```js
const array = [-3, -2, -2, 0, 1,2,3];

array.forEach(it => {
    if(it >= 0) {
        console.log(it);
        return; // or break;
    }
})
```
是的，它会输出‘0’、‘1’、‘2’、‘3’。

这是正确的！我想面试官展示了这段代码，但他仍然相信我们可以停止Javascript中的forEach 循环

为什么呢?

为了说服他，我不得不再次实现forEach模拟

```js
Array.prototype.forEach2 = function(callback, thisCtx) {
    if(typeof callback !== 'function') {
        throw `${callback} is not a function`;
    }

    const length = this.length;
    let i = 0;
    
    while(i < length) {
        if(this.hasOwnProperty(i)) {
            // Note here: Each callback function will be executed once
            callback.call(thisCtx, this[i], i, this);
        }
        i++;
    }
}
```
是的，当我们使用"forEach" 迭代数组时，回调将为数组的每个元素执行一次,并且我们无法过早的摆脱它。

例如,在下面的代码中，即使"func1"遇到break语句，"2"仍然会输出到控制台

```js
const func1 = () => {
    console.log(1);
    return;
}

const func2 = () => {
    func1();
    console.log(2);
}

func2();
```

## <span style="color: red">面试官说停止forEach 的3中方法</span>

面试官：你说的没问题，但我想告诉你，我们至少有 3 种方法可以在 JavaScript 中停止 forEach。

### 1. 抛出错误
当我们找到第一个大于或等于0的数字后，这段代码将无法继续。所以控制台只会打印0

```js
const array = [-3, -2,-3, 0, 1,2,3];

try {
    array.forEach(it => {
        if(it > 0) {
            console.log(it);
            throw Error('We have found the target element.')
        }
    })
} catch(err) {

}
```
这让我无话可说

### 2.设置数组长度为0
请不要那么惊讶，面试官对我说。

我们还可以通过将数组的长度设置为0来中断forEach。如您所知，如果数组的长度为0，forEach将不会执行任何回调。

```js

const array = [ -3, -2, -1, 0, 1, 2, 3 ]

array.forEach((it) => {
  if (it >= 0) {
    console.log(it)
    array.length = 0
  }
}) // 0
```
我的心已经乱了

### 使用splice 删除数组的元素
思路和方法2一样，如果能删除目标元素后面的所有值，那么forEach就会自动停止。
```js
const array = [ -3, -2, -1, 0, 1, 2, 3 ]

array.forEach((it, i) => {
  if (it >= 0) {
    console.log(it)
    // Notice the sinful line of code
    array.splice(i + 1, array.length - i)
  }
})
```
我睁大了眼睛，我不想读这段代码。这不好吧，为了停止而停止。

## 请使用for 或 some
我对面试官说：“哦，也许你是对的，你设法在 JavaScript 中停止了 forEach，但我认为公司会因此辞退你吧，因为这是一个非常糟糕的代码片段。

我不喜欢做那样的事；这会让我的同事讨厌我。”

也许我们应该使用“for”或“some”方法来解决这个问题

```js

const array = [ -3, -2, -1, 0, 1, 2, 3 ]

for (let i = 0, len = array.length; i < len; i++) {
  if (array[ i ] >= 0) {
    console.log(array[ i ])
    break
  }
}
```

```js
const array = [ -3, -2, -1, 0, 1, 2, 3 ]

array.some((it, i) => {
  if (it >= 0) {
    console.log(it)
    return true
  }
})
```

虽然面试官以这个问题结束了面试，但我很庆幸自己没有加入公司，不想为了某种目的而写出一段臭代码。 这样的面试官也不是我所喜欢的，为了面试而面试的面试官和面试题，让面试者觉得有点无辜与无奈。

不管怎么样，还是努力提升自己的技能吧。

[原文](https://mp.weixin.qq.com/s/YxgiR1X8wOtH6osCWB3FGA)