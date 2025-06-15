---
title: 深入理解CSS flex属性
date: 2021-01-30
categories:
 - 前端
 - CSS
tags: 
 - CSS
---

::: tip
设置display:flex;如何正确使用flex属性
::: 

## flex的属性值
> flex属性是flex-grow，flex-shrink和flex-basis的缩写
- 宽度的分配逻辑
  - flex-basis就是分配固定的宽度。
  - flex-grow就是宽度仍有剩余的时候该如何分配。
  - flex-shrink就是剩余宽度不足的时候该如何分配。

#### 语法解构

CSS语法中的特殊符号的含义绝大多数就是正则表达式中的含义，例如单管道符`|`，方括号`[]`，问号`？`，个数范围花括号`{}`等。具体说明：

```css
flex: auto;
flex: none;

flex: [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```



```css
flex: auto;
flex: none;

flex: [ <'flex-grow'> <'flex-shrink'> <'flex-basis'> ]
```



```css
flex: auto;
flex: none;
/* 3个值 */
flex: 1 1 100px;
```



```css
flex: auto;
flex: none;
/* 2个值 */
flex: 1 100px;
/* 3个值 */
flex: 1 1 100px;
```



```css
flex: auto;
flex: none;

flex: [ <'flex-grow'> <'flex-shrink'> <'flex-basis'> ]
```

#### 文字表述

- **1个值**

  如果flex的属性值只有一个值，则：如果是数值，例如`flex: 1`，则这个`1`表示`flex-grow`，~~此时`flex-shrink`和`flex-basis`都使用默认值，分别是`1`和`auto`~~。**更正为：**此时`flex-shrink`和`flex-basis`的值分别是`1`和`0%`，注意，这里的`flex-basis`的值是`0%`，而不是默认值`auto`。如果是长度值，例如`flex: 100px`，则这个`100px`显然指`flex-basis`，因为3个缩写CSS属性中只有`flex-basis`的属性值是长度值。~~此时`flex-grow`和`flex-shrink`都使用默认值，分别是`0`和`1`。~~**更正为：**此时`flex-grow`和`flex-shrink`都是`1`，注意，这里的`flex-grow`的值是`1`，而不是默认值`0`。

- **2个值**

  如果flex的属性值有两个值，则第1个值一定指`flex-grow`，第2个值根据值的类型不同表示不同的CSS属性，具体规则如下：如果第2个值是数值，例如`flex: 1 2`，则这个`2`表示`flex-shrink`，~~此时`flex-basis`使用默认值`auto`。~~**更正为：**此时`flex-basis`计算值是`0%`，并非默认值`auto`。如果第2个值是长度值，例如`flex: 1 100px`，则这个`100px`指`flex-basis`，此时`flex-shrink`使用默认值`0`。

- **3个值**

  如果`flex`的属性值有3个值，则这长度值表示`flex-basis`，其余2个数值分别表示`flex-grow`和`flex-shrink`。下面两行CSS语句的语法都是合法的，且含义也是一样的：



