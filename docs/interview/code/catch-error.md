## 优雅的捕获错误

```js
function wrapperDev(func) {
  function handleWindowError(error) {
    // 收集错误交给Error Boundary处理
  }
  
  function callCallback() {
    fakeNode.removeEventListener(evtType, callCallback, false); 
    func();
  }
  
  const event = document.createEvent('Event');
  const fakeNode = document.createElement('fake');
  const evtType = 'fake-event';

  window.addEventListener('error', handleWindowError);
  fakeNode.addEventListener(evtType, callCallback, false);

  event.initEvent(evtType, false, false);
  

  fakeNode.dispatchEvent(event);
  
  window.removeEventListener('error', handleWindowError);
}
```

