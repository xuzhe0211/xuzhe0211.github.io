---
title: css的link和@import区别
---
- CSSS link: 是一个HTML标签，用于在HTML文档中引入外部的CSS文件。
    
    这个标签通常放在head标签中，通过href属性指定CSS文件的路径。<span style="color:red">它可以在页面加载时同时下载和渲染CSS文件，因此对于大型项目或许要多次使用同一CSS文件的情况非常合适</span>

- @import: 是CSS的一种规则，用于从其他文件中导入CSS规则。

    @import规则必须放在CSS文件的开头，并且只能导入其他CSS文件，不能导入其他类型的文件。与CSS link不同，<span style="color:red">@import会在页面加载后在下载和渲染所需的css文件，因此可能会导致性能问题</span>

总体来说，CSS link 更加灵活和高效，而 @import 则更适合小型项目或需要在某些条件下才加载的样式表。