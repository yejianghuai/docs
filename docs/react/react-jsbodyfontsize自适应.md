---
title: "react 移动端像素大小配置"
date: 2019-06-14
categories:
 - react
tags:
 - mobile
 - react
---
<Boxx/>
## react移动端自适应px大小
css
```scss
@function px2rem($n) {
    @return #{$n/(750 * 16 / 320)}rem;
}
```
js
```js
const setHtmlFont = function() {
    const docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            const { clientWidth } = docEl;

            if (!clientWidth) return;
            docEl.style.fontSize = `${16 * (clientWidth / 320)}px`;
        };

    if (!document.addEventListener) return;
    docEl.style.fontSize = `${16 * (docEl.clientWidth / 320)}px`;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
};

export default class demo extends React.Component {
    state={
        ...
    }

     componentDidMount() {
        setHtmlFont();
    }
    
    componentWillUnmount() {
        document.querySelectorAll('html')[0].style.fontSize = '';
    }

    render(){
        ...
    }
}
```