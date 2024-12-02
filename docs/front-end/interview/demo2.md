---
autoGroup-1: 面试问题示例
title: vuex在vuex外修改会warning
---

## Vuex数据改变，组件中页面不渲染

相信很多人遇到: vuex数据更新后，插件中使用数据的地方没有更新

```js
data() {
    return {
        tableData: this.$store.state.AdminInfo
    }
}
```
然后在template中使用tableData
```html
<el-table :data="tableData" class="tablePst">
 <el-table-column label="登录名" prop="loginname"></el-table-column>
 <el-table-column label="真实姓名" prop="realname"></el-table-column>
</el-table>
```
这样的话，就会出现数据改变不渲染的问题

**问题**
要解决问题，就得理解vue声明周期，页面加载前tableData获取store里的值赋给自己，这样tableData只有一初始值，后续vuex中状态发生改变，并不会再次赋值给tableData，除非也没刷新重新加载，组件生命周期重新开始，才会拿到最新的值

**解决**
1. 去掉组建中tableData的状态，在模板中直接使用$store.state.AdminInfo这样就能拿到最新的状态值了
```html
<el-table :data="$store.state.AdminInfo" class="tablePst">
 <el-table-column label="登录名" prop="loginname"></el-table-column>
 <el-table-column label="真实姓名" prop="realname"></el-table-column>
</el-table>
```
2. 使用mapState,把vuex中的状态暴露给组件，再使用，具体见文档 [vuex mapState官方文档](https://vuex.vuejs.org/zh/guide/state.html#mapstate-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0).




## 参考文档
[vuex中遇到的坑,vuex数据改变,组件中页面不渲染操作](https://www.jb51.net/article/199749.htm)