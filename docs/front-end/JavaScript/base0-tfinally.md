---
autoGroup-0: 基础知识
title: try、catch、finally详解，你不知道的异常处理 
---
## try-catch-finally和return的执行顺序
- try{}catch(){}finally{} return

    程序按顺序执行

- try{return;}catch(){}finally{} return;

    程序执行try块中return之前(包括return语句中的表达式运算)代码

    在执行finally块，最后执行try中return

    finally块之后的语句return，因为程序在try中已经return所以不在执行
- try{}catch(){return} finally{} return

    程序先执行try，如果遇到异常执行catch块

    有异常:则执行catch中return之前(包括return语句中的表达式运算)代码，在执行finally语句中全部代码，最后执行catch块中return,finally之后也就是4处的代码不在执行

    无异常:执行完try在finally在return
- try{return} catch(){} finally{return}

    程序执行try块中return之前(包括return语句中表达式运算)代码

    在执行finally块，因为finally块中有return所以提前退出
- try{}catch(){return;}finally{return}

    程序执行catch块中return之前(包括return语句中的表达式运算)代码;

    在执行finally块，因为finally块中有return所以提前退出

- try{return;}catch() {return;}finally{return;}

    程序执行try块中return之前(包括return语句中不表达式运算);

    有异常:执行catch块中return之前(包括return语句中的表达式运算)代码；则在执行finally块，因为finally快中有return所以提前退出

    无异常:则在执行finally块，因为finally块中有return所以提前退出

<span style="color: red">最终结论：**任何执行try或者catch的return语句之前，都会先执行finally语句，如果finally存在的话。如果finally中有return语句，那么程序就return，所以finally中的return是一定会被return的**</span>


## 资料
[try、catch、finally详解，你不知道的异常处理 ](https://www.cnblogs.com/yanbigfeg/p/9295541.html)

[try-catch-finally和return的执行顺序](https://www.cnblogs.com/qianmengzbx/p/14531502.html)