---
title: 解决label中button无法触发input[type=file]打开文件选择窗口
date: 2021-01-23
categories:
 - 前端
 - CSS
tags: 
 - CSS
 - 上传
---

::: tip
通过控制input的click事件
::: 

## 1、由来
+ 在用React编写组件时，在隐藏input之后，无法通过button来触发input的选择文件窗口事件,大致代码如下:
```css
    .upload-input-label {
      display: inline-block;
      position: relative;
    }
    .base-upload-input {
      display: none;
    }
```

```tsx
            <label  className="upload-input-label" htmlFor="xFile">
                {children}
                <input
                    ref={inputRef}
                    type="file"
                    name="xFile"
                    id="xFile"
                    className="base-upload-input"
                    onChange={handleHooksFileChange}
                />
            </label>


            //使用
                <Upload 
                    onChange={(file:any)=>{
                        postMultiple("api/xxx",file)
                        console.log(file)
                    }}>
                    <Button 
                    btnType="action"
                    icon={<Icon type="" style={{fontSize:12}} 
                    iconType="upload"></Icon>}
                    >add</Button>
                </Upload>
```
+ 放置button后，点击btn不会触发label与input的关联事件，点击文字等却是可以打开文件选择窗口

## 解决方法
+ 在label上添加点击事件,给input一个引用，在点击label时同时执行input的click方法。问题解决~
```tsx
            <label onClick={() => {
                inputRef && inputRef.current?.click()
            }} className="upload-input-label" htmlFor="xFile">
                {children}
                <input
                    ref={inputRef}
                    type="file"
                    name="xFile"
                    id="xFile"
                    className="base-upload-input"
                    onChange={handleHooksFileChange}
                />
            </label>
```


