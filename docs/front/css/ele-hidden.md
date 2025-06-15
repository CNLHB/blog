---
title: 再也不用担心面试官问怎么让元素隐藏了
date: 2021-01-13
categories:
 - 前端
 - CSS
tags: 
 - CSS
 - 元素隐藏
---

::: tip
让元素隐藏的各种姿势,优雅的让元素隐藏
::: 

## 1、话不多削直接上总结：



| 序号 | 方法                                            | 说明                                                  |
| ---- | ----------------------------------------------- | ----------------------------------------------------- |
| 1    | display: none                                   | 不占据空间，无法点击                                  |
| 2    | visibility: hidden                              | 占据空间，无法点击                                    |
| 3    | position: absolute; clip:rect(1px 1px 1px 1px); | 通过裁剪定位元素实现。不占据空间，无法点击            |
| 4    | position: absolute; top: -999em;                | 通过偏移元素实现。不占据空间，无法点击                |
| 5    | position: relative; top: -999em;                | 通过偏移元素实现。占据空间，无法点击                  |
| 6    | position: absolute; visibility: hidden;         | 通过设置定位元素，使元素宽高为0。不占据空间，无法点击 |
| 7    | height: 0; overflow: hidden                     | 不占据空间，无法点击                                  |
| 8    | opacity: 0;                                     | 占据空间，可以点击                                    |
| 9    | position: absolute; opacity: 0;                 | 不占据空间，可以点击                                  |

## 2、display:none和visibility:hidden区别:

1. 空间占据
   1. display:none不占据空间，visibility占据空间
2. 回流与渲染
   1. display:none频繁切换回导致回流（reflow）和重绘（repaint），而visibility则不会产生这个问题
3. 株连性
   1. 一旦父节点元素应用了`display:none`，父节点及其子孙节点元素全部不可见,子元素不能通过设置属性来显示
   2. 给一个父元素应用`visibility:hidden`，则其子孙后代也都会全部不可见。子孙元素可以通过设置`visibility:visible`显现出来。



## 3、height:0和overflow:hidden的组合：

1. 正常使用`height:0`，只要是一般的非inline水平元素，则元素内部所有子孙都应该是不可见的

2. 可能出现失效的情况

   1. `height:0`和`overflow:hidden`组合隐藏“失效”的条件如下：祖先元素没有`position:relative/absolute/fixed`声明，同时内部子元素应用了`position:absolute/fixed`声明。

   