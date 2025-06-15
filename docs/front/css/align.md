---
title: 让CSS flex布局最后一行列表左对齐的N种方法
date: 2021-01-30
categories:
 - 前端
 - CSS
tags: 
 - CSS
 - flex
---

::: tip
justify-content对齐问题描述
::: 



### 如果每一子项宽度不固定

有时候，每一个flex子项的宽度都是不固定的，这个时候希望最后一行左对齐该如何实现呢？

由于此时间隙的大小不固定，对齐不严格，因此，我们可以直接让最后一行左对齐即可。具体方法有两个：

#### 方法一：最后一项margin-right:auto

CSS代码如下：

```
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.list {
    background-color: skyblue;
    margin: 10px;
}
/* 最后一项margin-right:auto */
.list:last-child {
    margin-right: auto;
}
```

### 如果每一行列数不固定

如果每一行的列数不固定，则上面的这些方法均不适用，需要使用其他技巧来实现最后一行左对齐。

这个方法其实很简单，也很好理解，就是使用足够的空白标签进行填充占位，具体的占位数量是由最多列数的个数决定的，例如这个布局最多7列，那我们可以使用7个空白标签进行填充占位，最多10列，那我们需要使用10个空白标签。

如下HTML示意：

```html
<div class="container">
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <div class="list"></div>
    <i></i><i></i><i></i><i></i><i></i>
</div>
```

相关CSS如下，实现的关键就是占位的`<i>`元素宽度和`margin`大小设置得和`.list`列表元素一样即可，其他样式都不需要写。

```css
.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-right: -10px;
}
.list {
    width: 100px; height:100px;
    background-color: skyblue;
    margin: 15px 10px 0 0;
}
/* 和列表一样的宽度和margin值 */
.container > i {
    width: 100px;
    margin-right: 10px;
}
```

由于`<i>`元素高度为0，因此，并不会影响垂直方向上的布局呈现。

