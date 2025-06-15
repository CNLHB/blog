---
title: JS变量的基本类型
date: 2020-12-03
titleTag: 推荐
categories:
 - 前端
 - JS
tags: 
 - JS
 - 变量基本类型
top: true
sticky: 1
description: JS变量的基本类型。
coverImg: https://vp.teek.top/blog/bg1.webp
---
::: tip
八种基本数据类型
:::

| 类型      | 含义   | 说明                                                              |
| --------- | ------ | ----------------------------------------------------------------- |
| undefined | 未定义 | 未声明的或者声明过但为赋值的变量，其值是undefined，也可以显式赋值 |
| number    | 数值   | 数字                                                              |
| string    | 字符串 | 可以用下标直接索引单个字符，但不能修改                            |
| null      | 空     | 不应该有值                                                        |
| boolean   | 布尔值 | true/false                                                        |
| object    | 对象   | 基于原型继承与类继承的面向对象模型                                |
| symbol    | 符号   | 唯一标识                                                          |
| bigint    | 大整数 | 表示大整数 eg: 100n                                               |

## 变量不但有数据类型之别，还有值类型和引用类型之别

> 这要区别主要是约定变量的使用方法

| 类型      | 含义     | 说明 |
| --------- | -------- | ---- |
| undefined | 值类型   | 无值 |
| number    | 值类型   |      |
| string    | 值类型   |      |
| null      | 值类型   |      |
| boolean   | 值类型   |      |
| object    | 引用类型 |      |
| symbol    | 值类型   |      |
| bigint    | 值类型   |      |
