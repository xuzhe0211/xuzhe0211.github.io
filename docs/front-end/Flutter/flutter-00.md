---
title: flutter 基本使用
---
## 基本概念
- 一切皆为Widgets
- 多组件容器(Row、Column、Stack、Wrap)
- 单组件容器(Container、Padding、Center、Align)
- Flutter组件的规律
### Widgets
**状态** 

stateful和stateless：实现Flutter app时,我们用widgets来构建app的UI。这些widgets有两种类型-statefule(有状态)和stateless(无状态)

- stateless: 当创建的widget不需要管理任何形式的内部state时，则使用StatelessWidget.

    ```js
    void main() => runApp(MyStatelessWidget(text: "StatelessWidget Example"));

    class MyStatelessWidget extends StatelessWidget {
        final String text;
        MyStatelessWidget({Key key, this.text}): super(key: key);

        @Override
        Widget build(BuildContext context) {
            return Center(
                child: Text(
                    text, 
                    textDirection: TextDirection.ltr
                )
            )
        }
    }
    ```
- stateful:当创建一个能随时间动态改变的widget，并且不依赖其初始化状态

    注意
    1. 创建Stateful Widget需要两个累，分别继承自StateFulWidge 和 State
    2. state对象包含了widget的state和widget的build()方法
    3. 当widget的state改变了的时候，当调用setState()方法时，框架就会去调用build方法重绘widget

## flutter 布局组件
- Container：用于创建一个矩形的可定制容器，可以设置背景色、边框等样式。
- Row：用于在水平方向上排列子组件，子组件在水平方向上依次排列。
- Column：用于在垂直方向上排列子组件，子组件在垂直方向上依次排列。
- Stack：用于在重叠的方式排列子组件，可以通过定位子组件来控制它们的位置。
- Expanded：用于占据可用空间的子组件，可以在Row、Column等布局组件中使用，让子组件填充剩余空间。
- GridView：用于创建一个网格布局，可以在水平和垂直方向上排列子组件。
- ListView：用于创建一个滚动的列表布局，可以在垂直方向上排列子组件，并支持滚动。
- Wrap：用于在水平方向上自动换行的方式排列子组件。
- Flex：用于根据比例分配可用空间的子组件，可以在Row、Column等布局组件中使用。
- SizedBox：用于创建一个具有固定尺寸的盒子，可以用来设置宽度、高度或两者。

这些是常见的布局组件，通过它们的组合和嵌套，可以实现各种复杂的布局效果。同时，Flutter还提供了许多其他布局组件和布局相关的属性，可以根据实际需求选择适合的布局方式。

## 打开模拟器
```shell
open -a Simulator
```

## 插件
- flutter
- dart 
- Flutter Widget Snippets
- Awesome Flutter Snippets是vscode中一个可以快速生成FLutter代码的插件。

    使用示例
    
    键入“stlss”，回车，自动生成Stateless页面框架。


## 在flutter里使用packages

[在 Flutter 里使用 Packages](https://flutter.cn/docs/development/packages-and-plugins/using-packages)


