---
title: "react styles"
date: 2019-06-10
categories:
 - react
tags:
 - css
 - react
---
<Boxx/>
## react中styles使用方法

````js
import styles from './homeV2.scss';
````

当在react用名称引入样式的时候我们在文件中使用的方法为：

```js
<div className={styles.mingcheng} />
```

当我们需要引入两个以上的类名时，首先需要引入：

```js
import classnames from 'classnames';
```

然后在文档中使用的方法为：

````js
<div className={classnames("leiming1","leiming2")}/>
````

或者不引入react自带的classnames

使用es6方法：

```js
<div className={`${styles.mingcheng} "mingcheng2"`}/>
```

