---
title: JS错误类型
date: 2020-05-10
sidebar: 'auto'
categories:
 - 前端
tags:
 - 错误类型
publish: true
top: true
sticky: 1
description: JS错误类型。
coverImg: https://vp.teek.top/blog/bg1.webp
---
### 1.SyntaxError（语法错误）

解析代码时发生的语法错误

eg:

```js
 var 1a; 
```

`<font color="#dd0000">`Uncaught SyntaxError: Unexpected number`</font>`

### 2.ReferenceError（引用错误）

eg:
a.引用了一个不存在的变量

```js
 console.log(a);
```

`<font color="#dd0000">`Uncaught ReferenceError: a is not defined`</font>`

b.将变量赋值给一个无法被赋值的对象
　　
eg:

```js
 console.log()= 1;
```

`<font color="#dd0000">`Uncaught ReferenceError: Invalid left-hand side in assignment`</font>`

### 3.RangeError（范围错误）

超出有效范围

eg:

```js
 var a= new Array(-1);
```

`<font color="#dd0000">`　Uncaught RangeError: Invalid array length`</font>`
　

### 4.TypeError（类型错误）

a.变量或参数不是预期类型，比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。

eg:

```js
  var a= new 123;
```

`<font color="#dd0000">`Uncaught TypeError: 123 is not a function`</font>`
　

b.调用对象不存在的方法

eg:

```js
  var a;a.aa();
```

`<font color="#dd0000">`Uncaught TypeError: Cannot read property 'aa' of undefined`</font>`
　　

　　

### 5.URLError（URL错误）

与url相关函数参数不正确，主要是encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。

eg:

```js
  decodeURI('%2')
```

`<font color="#dd0000">`Uncaught URIError: URI malformed`</font>`
　　

### 6.EvalError（eval错误）

```js

```

`<font color="#dd0000">`eval函数没有被正确执行`</font>`
　　
