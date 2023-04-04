---
autoGroup-1: Tips API
title: Vue watch 监听复杂对象变化，oldvalue 和 newValue 一致的解决办法。
---
watch的常规用法：
```js
watch: {
    tempData: function(value, oldValue) {
        console.log(value, oldValue);
    }
}
```
但是如果需要监听的数据是对象、内嵌多层的对象后，需要用到watch中的deep属性.类似于下面这种对象内嵌的对象
```js
data() {
    return {
        dataList: [
            {
                name: "里斯",
                age: 18,
                sex: "男"
            },
            {
                name: "阿里路亚",
                age: 16,
                sex: "女"
            }
        ]
    }
}
```
<span style="color: red">如果tableData内部属性发生了变化，通过watch就会打印出newValue、oldValue, **但是他们打印出来的结果都是一样的**。因为数据同源，虽然可以监听到数据发生了变化，但是要比较数据差异就不行了。如果想要得到差异内容，可以结合计算属性、序列化、反序列化生产新的对象，来避免此问题。</span>

```js
computed: {
    dataListNew() {
        return JSON.parse(JSON.stringify(this.dataList));
    }
},
watch: {
    dataListNew: {
        handler: function(newValue, oldValue) {
            console.log(newValue, oldValue);
        },
        deep: true
    }
}
```