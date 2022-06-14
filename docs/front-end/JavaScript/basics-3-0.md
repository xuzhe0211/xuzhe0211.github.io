---
autoGroup-5: JS名词理解
title: 什么是内存泄漏？内存溢出？
---

<span style="color: blue">**内存溢出(out of memory)**: 是指程序在申请内存时，没有足够的内存空间供其使用，出现out of memory；比如申请了一个integer,但给它存了long才能存下的数，那就是内存溢出</span>

内存溢出就是你要求分配的内存超出了系统能给你的，系统不能满足需求，于是产生溢出。

<span style="color: blue">**内存泄露(memory leak):** 是指程序在申请内存后，无法释放已申请的内存空间，一次内存泄露危害可以忽略，但是内存泄露堆积后果很严重，无论多少内存，迟早会被占光</span>

## 资料
[什么是内存泄漏？内存溢出？](https://zhuanlan.zhihu.com/p/69151763)