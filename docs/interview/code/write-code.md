---
title: 手写一些方法
date: 2020-12-02
sidebar: 'auto'
categories:
 - 前端
 - 面试
tags:
 - 面试
 - 手写代码
publish: true
---

## bind实现

```js
Function.prototype.myBind = function (context, ...args) {
  return (...execArgs) => {
    this.call(context, ...args, ...execArgs);
  };
};
// test
const a = {
  name: "name of a",
};
function test(...msg) {
  console.log(this.name);
  console.log(...msg);
}
const test = test.myBind(a, "hello");
test("aiwa");
```
## call

```js

```



## curry

```js
const curry = (fn) => {
    const curryFn = (...args) => {
        if (args.length >= fn.length) {
            return fn(...args)
        } else {
            return (...ret) => curryFn(...args, ...ret)
        }
    }
    return curryFn
}
function test(a, b, c) {
    console.log(a, b, c);
}

const f1 = curry(test)(1);
const f2 = f1(2);
f2(3);
```



## 组合函数

> 利用reduce快速实现

```js
function compose(...fns) {
  return (...args) => fns.reduceRight((acc, cur) => cur(acc), ...args);
}

function a(msg) {
  return msg + "a";
}
function b(msg) {
  return msg + "b";
}
function c(msg) {
  return msg + "c";
}

const f = compose(
  a,
  b,
  c
);
console.log(f("hello"));

```

## 事件代理

```js
window.addEventListner("click", (event) => {
    const target = event.target || event.srcElement
    if(target.tagName.toUpperCase() === "xxx"){
        //处理逻辑
    }
})
```



## 扁平化

```js
//自己实现
const flat = (arr) => {
    let tmpArr = []
    arr.forEach(item=>{
        if(Array.isArray(item)){
            tmpArr = tmpArr.concat(flat(item))
        }else{
            tmpArr.push(item)
        }
    })
    return tmpArr
}
let arr = [1,2,[1,2,3,[1,2,3]]]
console.log(flat(arr))
//API实现
arr.flat(Infinity)


```

## 去重

```js
//去重 - unique()
const unique = (arr) => {
    let tmpArr = []
    arr.forEach(item => {
        if(!tmpArr.includes(item)){
            tmpArr.push(item)
        }
    })
    return tmpArr
}
let arr = [1,2,1,2,3,4]
console.log(unique(arr))

consolo.log([...new Set(arr)])

```

## 拷贝

### 浅拷贝

```js
const clone = (target) => {
    if (target === null || typeof target !== 'object') return target
    let obj = {}
    for (const key in target) {
        obj[key] = target[key]
    }
    return obj
}
console.log(clone({
    name: 1, child: {
        name: 2
    }
}));
console.log(clone(undefined));
console.log(clone(null));
```



### 深拷贝

```js
const deepClone = (target) => {
    if(target === null || typeof target !== 'object') return target
    if(target instanceof Date)return new Date(target.toString())
    if(target instanceof RegExp)return new RegExp()
    let obj = Array.isArray(target)?[]:{}
    for (const key in target) {
        obj[key] = deepClone(target[key])
    }
    return obj
}
let obj = {
    name: 1, child: {
        name: 2
    }
}
let cloneObj = deepClone(obj)
cloneObj.child.name = 1

console.log(obj);
console.log(cloneObj);

```



## 去除空格

```js
//去除左右两边空格
const trim = (str) =>str.trim()
//去除左边或右边空格
const trimLeft = (str) =>str.trimLeft()   
const trimRight = (str) =>str.trimRight()
```

## 字符串全排列

```js
//回溯解法
//步骤
//1、路径  
//2、待选择列表
//2.1：进行选择
//2.2: 取消选择
//3、终止条件
//以abc为例
//             a        路径  a    待选择列表 abc
//     b                路径  ab   待选择列表从abc 变成bc ，因为a已经选中，跳过选择

const strPermutation = (str) => {
    if (str.length == 1) return str
    let tmpArr = []
    const deep = (path, set) => {
        if (path.length == str.length) {
            return tmpArr.push(path.join(""))
        }
        for (let index = 0; index < str.length; index++) {
            if (!set.has(str[index])) {
                path.push(str[index])
                set.add(str[index])
                deep(path, set)
                path.pop()
                set.delete(str[index])
            }
        }

    }
    deep([], new Set())
    return [...new Set(tmpArr)]
}
   
        
        

function combine(str) {//抽出一个字符s,对其余的进行排列,将s放在每种排列开头
    if (str.length===1) return [str]
    let results=[]
    for (let i in str) {
        for (let s of combine(str.slice(0,i)+str.slice(1+(+i)))) {
            results.push(str[i]+s)
        }
    }
    //可能会出现类似"aa"=>[aa,aa,aa,aa]的情况,需要去重
    return [...new Set(results)]
}


function combine(str) {//记录已经使用过的字符,深度优先访问所有方案
    let result=[]
    ;(function _combine(str,path=''){
        if (str.length===0) return result.push(path)
        for (let i in str) {
            _combine(str.slice(0,i)+str.slice((+i)+1,str.length),path+str[i])
        }
    })(str)
    //可能会出现类似"aa"=>[aa,aa,aa,aa]的情况,需要去重
    return [...new Set(result)]
}
```



## 排序和查找



## JSONP

```js
function jsonp(url, params_obj, callback) {
 //创建一个供后端返回数据调用的函数名
 let funcName = 'jsonp_' + Data.now() + Math.random().toString().substr(2, 5)

 //将参数拼接成字符串
 if (typeof params==='object') {
  let temp=[]
  for (let key in params) {
   temp.push(`${key}=${params[key]}`)
  }
  params=temp.join('&')
 }

 //在html中插入<script>资源请求标签
 let script=document.createElement('script')
 script.src=`${url}?${params}&callback=${funcName}`
 document.body.appendChild(script)

 //在本地设置供后端返回数据时调用的函数
 window[funcName]=data=>{
  callback(data)

  delete window[funcName]
  document.body.removeChild(script)
 }
}

//使用方法
jsonp('http://xxxxxxxx',{id:123},data=>{
 //获取数据后的操作
})
```

## Promise.all

```js
const  all  = function(proms){
    return new Promise((resolve, reject)=>{
        if (proms.length === 0) return resolve([])
        let count = 0
        let arr = []
        proms.forEach((item,index)=>{
            item.then((res)=>{
                arr[index] = res
                count++
                if(count == proms.length){
                    resolve(arr)
                }
            },err=>{
                reject(err)
            })
        })

    })
}

let pro1 = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(1)
    },1000)
})
let pro2 = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(1)
    },2000)
})
let pro3 = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(1)
    },3000)
})
let pro4 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(1)
    },1500)
})
// let arr = Promise.all([pro1,pro2,pro4,pro3])
let arr = all([pro1,pro2,pro4,pro3])
console.log(arr);
```

## 给出集合 `[1,2,3,...,n]`，其所有元素共有 `n!` 种排列。

```js
function getPermutation(n, k) {
    const ret = []
    let str = Array.from(new Array(n), (item, index) => {
        return index + 1
    })
    function dfs(path, set){
        if(path.length == n){
            if(ret.length-1===k){
                return
            }
             ret.push(path.join(""))
             return
        }
        for(let i = 0; i< str.length; i++){
            if(!set.has(str[i])){
                path.push(str[i])
                set.add(str[i])
                dfs(path, set)
                path.pop()
                set.delete(str[i])
            }
        }
    }
    dfs([],new Set())
    console.log(ret);

    return ret[k-1]
}
console.log(getPermutation(3,3));

```

## 电话号码组合

```js
const numStrMap = {
    "1": '',
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
}



var letterCombinations = function (digits) {
    let str = digits.split("").reduce((prev, item) => {
        return prev + numStrMap[item]
    }, '')
    let ret = []
    let strArr = str.split("")
    function deep(path, list) {
        if (path.length == strArr.length) {
            return ret.push(path.join())
        }
        for (let i = 0; i < strArr.length; i++) {
            if (!list.has(strArr[i])) {
                path.push(strArr[i])
                list.add(strArr[i])
                deep(path, list)
                list.delete(strArr[i])
                path.pop()
            }

        }
    }
    deep([], new Set())
    return ret
};
```
不中断代码执行

## 系列化url的携带的参数
```js
const serializeUrl = ()=>{
    let urlArr = window.location.search.slice(1).split("&")
    const ret = {}
    urlArr.forEach((item)=>{
        const tmpArr = item.split("=")
        ret[tmpArr[0]] = tmpArr[1]
    })
    return ret
}
```
