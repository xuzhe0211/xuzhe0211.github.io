---
autoGroup-16: Tips/方法实现
title: 什么是Javascript记忆化(Memoization)？
---
## 什么是Memoization?
Memoization(记忆化)是一种优化技术，主要用于加速计算机程序。它通过存储耗时函数的计算结果，在相同输入再次传递时，直接返回缓存的结果，从而避免重复计算

## 为什么需要Memoization?
让我们通过一个简单的例子来了解Memoization的必要性
```js
function square(num) {
    return num * num;
}

console.log(square(2)); // 返回4
console.log(square(999999999)); // 这是一项耗时的计算
console.log(square(999999999)); // 我们是否应该为相同的输入重新计算？
```
上面的函数对于较小的数字输入计算非常快，但如果是一个非常大的数字，如果999999999,调用 square(999999999) 两次将会是一项耗时的计算，我们可以通过 Memoization 避免这种重复计算

## 如何将上述函数转换为 Memoized函数？
```js
function square(n) {
    return n * n;
}

function memoizedSquare() {
    let cache = {};
    return function optimizedSquare(num) {
        if(num in cache) {
            console.log('从缓存中返回结果');
            return cache[num];
        } else {
            console.log('计算平方');
            const result = square(num);
            cache[num] = result;
            return result;
        }
    }
}

const memoSquare = memoizedSquare();
console.log(memoSquare(9999999999999));
console.log(memoSquare(9999999999999));

// 输出:
// "计算平方"
// 1e+32

// "从缓存中返回结果"
// 1e+32
```
在这个例子中，我们创建了一个 memoizedSquare() 函数，该函数利用 JavaScript 的闭包和对象来实现缓存机制。我们检查输入数字是否已在缓存中，如果在则返回缓存结果，否则进行计算并将结果存储在缓存中。这种方法可以帮助我们避免不必要的耗时计算

## 改进的课重用 Memoize 函数
```js
function memoize(callback) {
    let cache = {};
    return function(...args) {
        const key = args.toString();
        if(key in cache) {
            console.log('从缓存中返回结果');
            return cache[key];
        } else {
            console.log('计算结果');
            const result = callback(...args);
            cache[key] = result;
            return result;
        }
    }
}

function multiply(a, b) {
    return a * b;
}

const memoMultiplication = memoize(multiply);
console.log(memoMultiplication(10, 10));
console.log(memoMultiplication(10, 10));

// 输出:
// "计算结果"
// 100
// "从缓存中返回结果"
// 100
```
这个通过的 memoize 函数可以应用于任何需要缓存的函数。我们通过传递回调实现缓存机制，并在函数调用时检查缓存以决定是返回缓存结果还是重新计算

## Memoization技术的潜在缺点
1. 增加内存使用: 由于 Memoization 需要缓存函数调用的结果，这可能会增加程序的内存使用，特别是当缓存变大时。使用 Memoization 时需要小心管理内存。
2. 缓存失效：如果 Memoized 函数的输入随时间变化(例如缓存的网络请求结果每次返回不同的数据),需要谨慎管理缓存以确保其始终是最新的，有时管理缓存可能比值的计算要麻烦
- 增加代码复杂度:Memozation 会增加代码的复杂度，特别是在需要处理边缘情况或者优化缓存大小以提高性能时。需要权衡 Memoization带来的性能提升与其增加复杂度及潜在的bug；

## 结束
总之，Memoization 是一种强大的技术，可以提高 JavaScript 代码的性能，但并非适用于所有场景。在使用 Memoization 之前，请仔细考虑其潜在的好处和缺点，确定它是否适合你的应用程序。
