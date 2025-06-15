##### 1. css 一行文本超出...

```css
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

##### 2.多行文本超出显示...

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

##### 3.IOS 手机容器滚动条滑动不流畅

```css
overflow: auto;
-webkit-overflow-scrolling: touch;
```

##### 4.修改滚动条样式

隐藏 `div` 元素的滚动条

```
div::-webkit-scrollbar {
    display: none;
}
```

- `div::-webkit-scrollbar` 滚动条整体部分
- `div::-webkit-scrollbar-thumb` 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条
- `div::-webkit-scrollbar-track` 滚动条的轨道（里面装有 `Thumb`
- `div::-webkit-scrollbar-button` 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置
- `div::-webkit-scrollbar-track-piece` 内层轨道，滚动条中间部分（除去
- `div::-webkit-scrollbar-corner` 边角，即两个滚动条的交汇处
- `div::-webkit-resizer` 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件注意此方案有兼容性问题，一般需要隐藏滚动条时我都是用一个色块通过定位盖上去，或者将子级元素调大，父级元素使用 `overflow-hidden` 截掉滚动条部分。暴力且直接。

##### 5.使用 css 写出一个三角形角标

元素宽高设置为 0，通过 `border` 属性来设置，让其它三个方向的 `border` 颜色为透明或者和背景色保持一致，剩余一条 `border` 的颜色设置为需要的颜色。

```
div {
    width: 0;
    height: 0;
    border: 5px solid #transparent;
    border-top-color: red;
}
```

##### 6.解决 ios audio 无法自动播放、循环播放的问题

`ios` 手机在使用 `audio` 或者 `video` 播放的时候，个别机型无法实现自动播放，可使用下面的代码 `hack`。

```
// 解决ios audio无法自动播放、循环播放的问题
var music = document.getElementById('video');
var state = 0;

document.addEventListener('touchstart', function(){
    if(state==0){
        music.play();
        state=1;
    }
}, false);

document.addEventListener("WeixinJSBridgeReady", function () {
    music.play();
}, false);

//循环播放
music.onended = function () {
    music.load();
    music.play();
}
```

##### 7.水平垂直居中

我一般只使用两种方式 定位 或者 `flex`，我觉得够用了。

```
div {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```

父级控制子集居中

```
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

##### 8.隐藏页面元素

- `display-none`: 元素不存在，从 `dom` 中删除
- `opacity-0`: 元素透明度将为 0，但元素仍然存在，绑定的事件仍旧有效仍可触发执行。
- `visibility-hidden`：元素隐藏，但元素仍旧存在，页面中无法触发该元素的事件。

##### 9.前端工程化

一提到前端工程化很多人想到的都是 `webpack`，这是不对的，`webpack` 仅仅是前端工程化中的一环。在整个工程化过程中他帮我们解决了绝大多数的问题，但并没有解决所有问题。

前端工程化是通过工具提升效率，降低成本的一种手段。

近些年被广泛的关注和探讨，究其原因主要是因为现代化前端应用功能要求不断提高，业务逻辑日益复杂，作为当下互联网时代唯一不可或缺的技术，前端可以说是占据了整个开发行业的半壁江山。从传统的网站，到现在的 H5,移动 App,桌面应用，以及小程序。前端技术几乎是无所不能的全面覆盖。

在这些表象的背后呢，实际上是行业对开发人员的要求发生了天翻地覆的变化，以往前端写 demo，套模板，调页面这种刀耕火种的方式已经完全不符合当下对开发效率的要求，前端工程化就是在这样一个背景下被提上台面，成为前端工程师必备的手段之一。

一般来说前端工程包含，项目初始化，项目开发，集成，构建，打包，测试，部署等流程。工程化就是以工程的角度来解决这些问题。比如项目初始化我们一般使用`npm init`, 创建页面模板使用 plop，我们喜欢使用 ES6+开发，但是需要通过 babel 编码成 ES5，持续集成的时候我们使用 git，但是为了保持开发规范我们引入了 ESLint，部署一般使用 ci/cd 或者 jenkins 等等。

前端工程化是一个比较大的话题，后面我们会单开话题来讲。

##### 10.contenteditable

`html` 中大部分标签都是不可以编辑的，但是添加了 `contenteditable` 属性之后，标签会变成可编辑状态。

```
<div contenteditable="true"></div>
```

不过通过这个属性把标签变为可编辑状态后只有 `input` 事件，没有 `change` 事件。也不能像表单一样通过 `maxlength` 控制最大长度。我也忘记我在什么情况下用到过了，后面想起来再补吧。

##### 11.calc

这是一个 `css` 属性，我一般称之为 `css` 表达式。可以计算 `css` 的值。最有趣的是他可以计算不同单位的差值。很好用的一个功能，缺点是不容易阅读。接盘侠没办法一眼看出 `20px` 是啥。

```
div {
    width: calc(25% - 20px);
}
```

##### 12.Proxy 和 Object.defineProperty 区别

`Proxy` 的意思是代理，我一般教他拦截器，可以拦截对象上的一个操作。用法如下，通过 `new` 的方式创建对象，第一个参数是被拦截的对象，第二个参数是对象操作的描述。实例化后返回一个新的对象，当我们对这个新的对象进行操作时就会调用我们描述中对应的方法。

```
new Proxy(target, {
    get(target, property) {

    },
    set(target, property) {

    },
    deleteProperty(target, property) {

    }
})
```

`Proxy` 区别于 `Object.definedProperty`。

`Object.defineProperty` 只能监听到属性的读写，而 `Proxy` 除读写外还可以监听属性的删除，方法的调用等。

通常情况下我们想要监视数组的变化，基本要依靠重写数组方法的方式实现，这也是 Vue 的实现方式，而 `Proxy` 可以直接监视数组的变化。

```
const list = [1, 2, 3];
const listproxy = new Proxy(list, {
    set(target, property, value) {
        target[property] = value;
        return true; // 标识设置成功
    }
});

list.push(4);
```

`Proxy` 是以非入侵的方式监管了对象的读写，而 `defineProperty` 需要按特定的方式定义对象的属性。

#### 13.Reflect

他是 `ES2015` 新增的对象，纯静态对象也就是不能被实例画，只能通过静态方法的方式调用，和 `Math` 对象类似，只能类似 `Math.random` 的方式调用。

`Reflect` 内部封装了一系列对对象的底层操作，一共 14 个，其中 1 个被废弃，还剩下 13 个。

`Reflect` 的静态方法和 `Proxy` 描述中的方法完全一致。也就是说 `Reflect` 成员方法就是 `Proxy` 处理对象的默认实现。

`Proxy` 对象默认的方法就是调用了 `Reflect` 内部的处理逻辑，也就是如果我们调用 `get` 方法，那么在内部，`proxy` 就是将 `get` 原封不动的交给了 `Reflect`，如下。

```
const proxy = new Proxy(obj, {
    get(target, property) {
        return Reflect.get(target, property);
    }
})
```

`Reflect` 和 `Proxy` 没有绝对的关系，我们一般将他们两个放在一起讲是为了方便对二者的理解。

那为什么会有 `Reflect` 对象呢，其实他最大的用处就是提供了一套统一操作 `Object` 的 `API`。判断对象是否存在某一个属性，可以使用 `in` 操作符，但是不够优雅，还可以使用`Reflect.has(obj, name)`; 删除一个属性可以使用 `delete`，也可以使用 `Reflect.deleteProperty(obj, name)`; 获取所有属性名可以使用 `Object.keys`, 也可以使用 `Reflect.ownKeys(obj)`; 我们更推荐使用 `Reflect` 的 `API` 来操作对象，因为他才是未来。

#### 14.解析 get 参数

通过 `replace` 方法获取 `url` 中的参数键值对，可以快速解析 `get` 参数。

```
const q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
console.log(q);
```

#### 15.解析连接 url

可以通过创建 `a` 标签，给 `a` 标签赋值 `href` 属性的方式，获取到协议，`pathname`，`origin` 等 `location` 对象上的属性。

```
// 创建a标签
const aEle = document.createElement('a');
// 给a标签赋值href路径
aEle.href = '/test.html';
// 访问aEle中的属性
aEle.protocol; // 获取协议
aEle.pathname; // 获取path
aEle.origin;
aEle.host;
aEle.search;

```