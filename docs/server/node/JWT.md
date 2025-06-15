---
title: JWT工作原理和基本使用
date: 2020-12-22
categories:
 - 后台
 - Node
tags: 
 - JWT
---
::: tip
redux工作原理
:::

## 1.为什么需要会话管理

我们用nodejs为前端或者其他服务提供resful接口时，http协议他是一个无状态的协议，有时候我们需要根据这个请求的上下获取具体的用户是否有权限，针对用户的上下文进行操作。所以出现了cookies session还有jwt这几种技术的出现， 都是对HTTP协议的一个补充。使得我们可以用HTTP协议+状态管理构建一个的面向用户的WEB应用。

## 2.session和cookies

session和cookies是有联系的，session就是服务端在客户端cookies种下的session_id, 服务端保存session_id所对应的当前用户所有的状态信息。每次客户端请求服务端都带上cookies中的session_id, 服务端判断是否有具体的用户信息，如果没有就去调整登录。

- cookies安全性不好，攻击者可以通过获取本地cookies进行欺骗或者利用cookies进行CSRF攻击。
- cookies在多个域名下，会存在跨域问题
- session的信息是保存在服务端上面的，当我们node.js在stke部署多台机器的时候，需要解决共享session，所以引出来session持久化问题，所以session不支持分布式架构，无法支持横向扩展，只能通过数据库来保存会话数据实现共享。如果持久层失败会出现认证失败。

## 3.jwt的定义

jwt是json web token的全称，他解决了session以上的问题，优点是服务器不保存任何会话数据，即服务器变为无状态，使其更容易扩展，什么情况下使用jwt比较合适，我觉得就是授权这个场景，因为jwt使用起来轻便，开销小，后端无状态，所以使用比较广泛。

## 4.jwt的原理

JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户，就像下面这样。

```js
{
  "姓名": "张三",
  "角色": "管理员",
  "到期时间": "2018年7月1日0点0分"
}
```

以后，用户与服务端通信的时候，都要发回这个 JSON 对象。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名。

## 5.jwt的认证流程

### 流程说明：

1. 浏览器发起请求登陆，携带用户名和密码；
2. 服务端根据用户名和明码到数据库验证身份，根据算法，将用户标识符打包生成 token,
3. 服务器返回JWT信息给浏览器，JWT不应该包含敏感信息，这是很重要的一点
4. 浏览器发起请求获取用户资料，把刚刚拿到的 token一起发送给服务器，一般放在header里面，字段为authorization
5. 服务器发现数据中有 token，decode token的信息，然后再次签名，验明正身；
6. 服务器返回该用户的用户资料；
7. 服务器可以在payload设置过期时间， 如果过期了，可以让客户端重新发起验证。

## 6.jwt的数据结构

jwt包含了使用 `.`风格的三个部分

### Header头部

```js
{ "alg": "HS256", "typ": "JWT"}   js
// algorithm => HMAC SHA256
// type => JWT
```

这是固定的写法，alg表面要用的是HS256算法

### Payload 负载、载荷，JWT 规定了7个官方字段

```js
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
```

除了这七个，可以自定义，比如过期时间

### Signature 签名

对前两部分header和payload进行签名，防止数据篡改

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

secret是一段字符串，后端保存，需要注意的是JWT 作为一个令牌（token），有些场合可能会放到 URL（比如 api.example.com/?token=xxx）。Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。

## 7.jwt使用方式

HTTP 请求的头信息 `Authorization`字段里面, Bearer也是规定好的

```js
Authorization: Bearer <token>
```

通过url传输（不推荐）

```js
http://www.xxx.com/pwa?token=xxxxx
```

如果是post请求也可以放在请求体中

## 8.在koa项目中使用

可以使用现成库，`jwt-simple` 或者 `jsonwebtoken`

```js
let Koa = require('koa');
let Router = require('koa-router');
let bodyparser = require('koa-bodyparser');
let jwt = require('jwt-simple');
let router = new Router()
let app = new Koa();
app.use(bodyparser());
// 可以自己自定义
let secret = 'zhenglei';
// 验证是否登陆
router.post('/login',async(ctx)=>{ 
    let {username,password} = ctx.request.body;
    if(username === 'admin' && password === 'admin'){
       // 通常会查数据库，这里简单的演示
       let token =  jwt.encode(username, secret);
       ctx.body = {
            code:200,
            username,
            token,
       }
    }
});
// 验证是否有权限
router.get('/validate',async(ctx)=>{ 
    let Authorization = ctx.get('authorization')
    let [,token] = Authorization.split(' ');
    if(token){
        try{
            let r = jwt.decode(token,secret);
            ctx.body = {
                code:200,
                username:r,
                token
            }
        }catch(e){
            ctx.body = {
                code:401,
                data:'没有登陆'
            }
        }
    }else{
        ctx.body = {
            code:401,
            data:'没有登陆'
        }
    }
  
});
app.use(router.routes());
app.listen(4000);
```

1. 实现两个接口 一个是 `/login` 验证是否登录，一个是 `validate`,验证是否有权限
2. 请求login接口的时候，客户端带username和password, 后端一般会查数据库，验证是否存在当前用户，如果存在则为username进行签名，千万不要给password这些敏感信息也带进来签名
3. 客户端接收后端给的token令牌，再请求其他接口，比如这个例子的 `/validate`的时候，ajax请求的时候，可以在header指定 `authorization`字段，后端拿到token进行decode，然后将header和payload进行再一次的签名，如果前后的签名一致，说明没有被篡改过，则权限验证通过。因为是同步的过程，所以可以用try catch来捕捉错误

## 9.原理的实现

1. sha256哈希算法，可以用nodejs的内置加密模块crypto, 生成base64字符串，要注意的是生成base64需要为+ - = 做一下替换，=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法。
2. token令牌的组成是header, payload和sigin的通过 `.`来组成
3. base64urlUnescape的解码是固定写法，decode出base64的内容

```js
let myJwt = {
    sign(content,secret){
        let r = crypto.createHmac('sha256',secret).update(content).digest('base64');
        return this.base64urlEscape(r)
    },
    base64urlEscape(str){
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    },
    toBase64(content){
        return this.base64urlEscape(Buffer.from(JSON.stringify(content)).toString('base64'))
    },
    encode(username,secret){
        let header = this.toBase64({ typ: 'JWT', alg: 'HS256' });
        let content = this.toBase64(username);
        let sign = this.sign([header,content].join('.'),secret);
        return  [header,content,sign].join('.')
    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    decode(token,secret){
        let [header,content,sign] = token.split('.');
        let newSign = this.sign([header,content].join('.'),secret);
        if(sign === newSign){
            return Buffer.from(this.base64urlUnescape(content),'base64').toString();
        }else{
            throw new Error('被篡改')
        }
    }
}
```

## 10.jwt的优缺点

1. JWT默认不加密，但可以加密。生成原始令牌后，可以使用改令牌再次对其进行加密。
2. 当JWT未加密方法是，一些私密数据无法通过JWT传输。
3. JWT不仅可用于认证，还可用于信息交换。善用JWT有助于减少服务器请求数据库的次数。
4. JWT的最大缺点是服务器不保存会话状态，所以在使用期间不可能取消令牌或更改令牌的权限。也就是说，一旦JWT签发，在有效期内将会一直有效。
5. JWT本身包含认证信息，因此一旦信息泄露，任何人都可以获得令牌的所有权限。为了减少盗用，JWT的有效期不宜设置太长。对于某些重要操作，用户在使用时应该每次都进行进行身份验证。
6. 为了减少盗用和窃取，JWT不建议使用HTTP协议来传输代码，而是使用加密的HTTPS协议进行传输。
