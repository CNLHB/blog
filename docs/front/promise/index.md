---
title: Promise基本使用
date: 2019-05-10
sidebar: 'auto'
categories:
 - 前端
 - 异步
 - ES6
tags:
 - 异步
 - ES6
publish: true
---


**ES6新增了正式的Promise引用类型，支持优雅地定义和组织异步逻辑。**  
**ES8新增了异步函数， “async/await”后面会讲到。**
+ 异步的存在的意义
    - JavaScript是单线程的语言，而且基于事件循环模型。
    - 在同步行为中，执行代码的时候遇到耗时任务就会阻塞下面代码的执行。为了解决这种问题，就有了异步机制
    

## 以往的异步编程方式

```js
//定时器方式
function double(value, sucess, failure){
    setTimeOut(()=>{
   	try{
        sucess(value*2)
    }catch(err){
        failure()
    }
}, 1000)
}

//事件监听
addEventListener("click",()=>{
    //操作
})

//发布订阅

class Emit{
    constructor(){
        this.listeners = []
        this.size = 0
    }
    on(key,fn){
        fn.id = ++this.size
        if(this.listeners[key]){
            this.listeners[key].push(fn);
        }else{
            this.listeners[key] = []
            this.listeners[key].push(fn)
        }

    }
    off(fn){
        this.listeners.forEach((item, index)=>{
            if(fn.id === item.id){
                this.listeners.splice(index,1)
                this.size--
            }
        })

    }
    tigger(fn,...rest){
        this.listeners.forEach((item, index)=>{
            
            if(fn===item){
                item(...rest)
            }
            if(fn===item&&fn.once){
                this.listeners.splice(index,1)
                this.size--
            }
        })
    }
    once(fn){
        fn.id = ++this.size
        fn.once = true
        this.listeners.push(fn);
    }
}
let emit = new Emit()
let fn = function(){
    console.log("fn");
}
let fn1 = function(){
    console.log("fn1");
}


```

## Promise基础

+ 通过new 操作符进行实例化，创建时需要传入executor函数作为参数。
+ promise的状态机，promise有三种状态:
  + pedding（待定）
  + fulfilled （兑现  或者称为成功，resolved）
  + rejected （拒绝， 或称为失败）
  + 状态只能从pedding变为fulfilled 或 rejected ，改变后不再改变

## Promise使用

```js

let ret = new Promise((resolve, reject)=>{
    Math.random()>0.5?resolve("success"):reject("error")
})
```

