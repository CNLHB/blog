---
title: HTML字符转义
date: 2021-02-01
sidebar: 'auto'
categories:
 - 前端
tags:
 - 转义
publish: true
---

## 一、HTML字符的转义
不转弯，HTML字符转义有更简单更容易记忆的方法，如下：

```js
let textNode = document.createTextNode('<span>by xxxx</span>');
let div = document.createElement('div');
div.append(textNode);
console.log(div.innerHTML);
```

也就是把HTML内容作为文本节点的textContent内容，然后使用普通元素的innerHTML属性返回下就可以了。

上面代码输出的结果是：

&lt;span&gt;by xxxx&lt;/span&gt;
大家可以复制上面代码在控制台跑一下，例如下图就是我在Chrome浏览器中运行的结果：

DOM API实现HTML转义示意截图

## 二、HTML字符的反转义
这个需要用到的DOM API就相对稀罕了一点，使用DOMParser API。

代码示意：

```js
let str = '&lt;span&gt;by xxxx&lt;/span&gt;';
let doc = new DOMParser().parseFromString(str, 'text/html');
console.log(doc.documentElement.textContent);
```

结果就是：

```js
<span>by xxxx</span>
眼见为实，运行截图参见下方：

HTML反转义方法示意

然后还有一种方法是借助<textarea>元素，这是IE浏览器时代常用的一种方法，代码示意如下：
```

```js
let textarea = document.createElement('textarea');
textarea.innerHTML = '&lt;span&gt;by xxxx&lt;/span&gt;';
console.log(textarea.childNodes[0].nodeValue);
```

结果也是一样的，转义的HTML标签都反转义回来了：

textarea元素反转义HTML

三、DOM API方法的缺点
DOM API方法利用了浏览器的能力，更容易上手，转义结果也更安全，但是有个不足，那就是只能在浏览器上下文环境中使用。例如，如果是Service Workers环境，或者是Node.js环境中，这个方法就不行了，只能使用传统的字符串处理方法了。

传统的字符串处理代码示意：

```js
/**

 * 转义HTML标签的方法

 * @param  {String} str 需要转义的HTML字符串

 * @return {String}     转义后的字符串
   */
   var funEncodeHTML = function (str) {
   if (typeof str == 'string') {
       return str.replace(/<|&|>/g, function (matches) {
           return ({
               '<': '&lt;',
               '>': '&gt;',
               '&': '&amp;'
           })[matches];
       });
   }

   return '';
   };
```

```js
 * 
   /**

 * 反转义HTML标签的方法

 * @param  {String} str 需要反转义的字符串

 * @return {String}     反转义后的字符串
   */
   var funDecodeHTML = function (str) {
   if (typeof str == 'string') {
       return str.replace(/&lt;|&gt;|&amp;/g, function (matches) {
           return ({
               '&lt;': '<',
               '&gt;': '>',
               '&amp;': '&'
           })[matches];
       });
   }

   return '';
   };
```

