---
autoGroup-16: Tips/方法实现
title: 5 种JavaScript 中的高级异常处理方法
---
异常处理是任何变成语言的重要组成部分，Javascript也不例外。在本文中，我们将讨论在Javascript中处理异常的5种高级技术

## 1.自定义异常

Javascript允许开发人员通过从内置错误对象创建新对象来定义他们的自定义异常。这允许开发人员向最终用户提供更具体和信息更丰富的错误信息。

这是一个例子
```js
function CustomException(message) {
    this.message = message;
    this.name = 'CustomException';
}
CustomException.prototype = new Error();
CustomException.prototype.constructor = CustomException;

throw new CustomException('This is a custom exception message.')
```
在此示例中，我们创建了一个新对象CustomException,它扩展了内置的Error对象。当我们抛出CustomException时，它将包含我们定义的自定义消息

## 2.try-catch-finally
try-catch-finally块是处理异常的强大工具。try快包含可能抛出异常的代码，catch块包含处理异常的代码。finally快始终执行，无论是否抛出异常

这是一个例子
```js
try {
    // Code that may throw an exception
} catch(exception) {
    // Code that handles the exception
} finally {
    // Code that always executes
}
```
在此示例中，try块包含可能引发异常的代码。如果抛出异常，catch块将处理它。finally块始终执行，无论是否抛出异常

## 3.Promise
Promise是Javascript的一项强大能力，它允许开发人员以同步方式处理异常代码。Promise具有内置的异常处理功能，这使他们成为处理异常代码中的异常的绝佳选择

这是一个例子
```js
new Promise((resolve, reject) => {
   // Asynchronous code that may throw an exception
}).catch((exception) => {
   // Code that handles the exception
});
```
在这个例子中，我们创建了一个新的Promise，其中包含可能会抛出异常的异常代码。如果抛出异常，catch块将处理它。
## 4.Async/await
Async/await是Javascript的一个新特性，它提供了一种更简洁的方式来编写异常代码。与Promises一样，async/await具有内置的异常处理功能。

这是一个例子
```js
async function example() {
    try {
      // Asynchronous code that may throw an exception
   }
   catch (exception) {
      // Code that handles the exception
   }
}
```
在此示例中，我们使用async关键字定义了一个异常函数。该函数包含可能引发异常的异常代码。try-catch块处理可能抛出的任何一场

## 5.window.onerror
window.onerror 时间处理程序是Javascript的内置功能，允许开发人员处理未捕获的异常。只要窗口中发生未捕获的异常，就会调用此处理程序。

这是一个例子
```js
window.onerror = function(message, url, line, column, error) {
    // Code that handles the uncaught exception
}
```
在此示例中，我们定义了一个新的window.onerror 事件处理程序，它将处理窗口中发生的任何未捕获的异常。处理程序将接收有关异常的信息，包括消息、url、行号和列号

## 结论
异常处理是编写健壮可靠的 JavaScript 代码的重要部分。通过使用这些高级技术，您可以向最终用户提供更好的错误消息并更多地处理异常。


## 资料
[5 种JavaScript 中的高级异常处理方法](https://mp.weixin.qq.com/s/qrgSvnALdegRgtG3HBU36g)

[使用Promise.race实现超时机制取消XHR请求](/front-end/JavaScript/es6-promise02-race.html)