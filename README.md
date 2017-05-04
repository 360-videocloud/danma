


# 调用方式

```
let data = {
  
}

let danma = new Danma(id); // 建议放在 video初始化后调用， 这个danma 层的 z-index 是 500

// 弹幕服务开始
danma.start();

// 弹幕暂停
danma.pause();

// 清空弹幕
danma.clear();

// 弹幕发射
danma.emit('我是默认的字'); // 暂定不超过 100 字
danma.emit('我是自定义的字', {
  // mode: 'top', // 弹幕模式， 固定在顶部
  // mode: 'bottom', // 弹幕模式， 固定在底部
  mode: 'flow', // 弹幕模式，向左滚动， 默认值
  color: '#ffffff', // 默认值
  // fontSize: 'small', // 字体大小，小号字体模式 16px
  fontSize: 'big', // 字体大小，大号字体模式，默认值 24px
});


```

## 开发
1. css 弹幕也已经开发完成，下版准备合在一起。