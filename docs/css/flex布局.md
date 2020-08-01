# Flex的使用

### 首先要给指定的容器加给display属性为flex

```javascript
div{
	display:flex;
}
```

此时的容器成为flex容器

### flex属性

- flex-direction          
- flex-wrap               
- flex-flow               
- jusify-content     
- align-items            
- align-content        



#### flex-direction

```javascript
//flex-direction决定的容器的排序方向，纵向和横向
.div{
	display:flex;
	.box:{
		flex-direction:row (水平方向，起点在左端) | row-reverse (主轴为水平方向，起点在右端) |column (主轴为垂直方向起点在上方) | column-reverse (主轴为垂直方向，起点在下方)
	}
}
```

![img](https://user-gold-cdn.xitu.io/2020/3/20/170f5b0263668657?imageslim)

### flex-wrap

````javascript
//flex-wrap属性用来定义，当一排没办法容纳所有数据时，可以选择换行
.div{
    display:flex
    .box{
        flex-wrap:nowrap(不换行) | wrap(换行，第一行在上方) | wrap-reverse(换行，第一行在下方)
    }
}
````

![image-20200418092407331](C:\Users\前端\AppData\Roaming\Typora\typora-user-images\image-20200418092407331.png)

### flex-flow属性

```JavaScript
//flex-flow属性是flex-direction属性和flex-wrap属性的简写，默认就是row nowrap
.div{
	display:flex;
	.box{
		flex-flow:flex-direction的属性 | flex-wrap的属性
	}
}
```

justify-content属性

```JavaScript
//justify-content属性定义了项目在主轴的对齐方式
.div{
	display:flex;
	.box{
		justify-content:flex-start(左对齐)|flex-end（右对齐）|center（）居中|space-between（两端对齐，项目之间的间隔相等）|space-around（每个项目两侧的间隔相等，所以项目之间的间隔比项目与边框的间隔大一倍
	}
}
```

![img](https://user-gold-cdn.xitu.io/2020/3/20/170f5d38266ef11a?imageslim)

### align-items

```JavaScript
//align-items属性定义项目在交叉轴上如何对齐
.div{
	display:flex;
	.box:{
		align-items:flex-start（交叉轴的起点对齐） | flex-end（交叉轴的终点对齐） | center （交叉轴的中点对齐）| baseline （项目第一行文字的基线赌气） | stretch （如果项目未设置高度或者是auto，将沾满整个容器的高度（默认））
	}
}
```

![img](https://user-gold-cdn.xitu.io/2020/3/20/170f5d66912445e2?imageslim)

### align-content属性

```JavaScript
//align-content属性定义了多跟轴线的对齐方式，如果项目只有一根轴线，该属性不起作用
.div{
	display:flex;
	.box{
		align-content:flex-start(和交叉轴的起点对齐)|flex-end(和交叉轴的终点对齐)|center(和交叉轴的中点对齐)|space-between(交叉轴两点对齐，轴线之间的间距平均分布)|space-around(每根轴线两侧的间距相等，所以轴线之间的间隔比轴线与边框的间隔大一倍)|strech(轴线沾满整个交叉轴)
	}
}
```

## 项目属性

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

### order

```javascript
//order属性定义了项目的排列顺序，数值越小排序越靠前，默认0
div{
	display:flex;
	.item{
		order:number
	}
}
```

### flex-grow

```javascript
//flex-grow属性定义项目的放大比例，默认是0，即如果存在剩余空间，也不放大
//如果所有项目的flex-grow属性都为1，则它们将等分剩下的空间（如果还有的话），如果项目中的flex-grow属性为2，则其他的项目为1，前者占据的剩余空间将比其他项多一倍
div{
	display:flex;
	.item{
		flex-grow:number
	}
}
```

### flex-shrink属性

```javascript
//flex-shrink属性定义了项目的缩小比例，默认1，如果空间不足，该项目将缩小
//如果所有的项目定义了flex-shrink的属性都为1，当空间不足时，都将等比例缩小，如果一个项目的flex-shrink属性为0，其他的项目为1，则空间不足时，前者不缩小（负数无效）
div{
	display:flex;
	.item{
		flex-shrink:numberl/*default:1*/
	}
}
```

### flex-basis属性

```JavaScript
//flex-basis属性定义了再分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否还有多余的空间，默认值为auto，即项目本来的大小
//它可以设为跟width或height的属性一样的值（如：350px），则项目占据固定空间
```

### flex

```javascript
//flex属性是flex-grow，flex-shrink，flex-basis属性的简写，默认值为0 1 auto，后两个可选
div{
	items{
		//该属性有两个快捷值：auto(1 1 auto)和none(0 0 auto)
		//建议优先使用这个属性，而不是单独写三个分离的属性
		flex:auto|none|1|2|...
	}
}
```

### align-self属性

```JavaScript
//align-self属性允许单个项目和其他项目不一样的对齐方式，可覆盖align-items属性，默认值是auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch
div{
	display:flex;
	.items{
		align-self:auto | flex-start | flex-end | center | baseline | stretch
		//这个其实就是项目里面用的align-items 默认值为auto
	}
}
```

![img](https://user-gold-cdn.xitu.io/2020/3/20/170f5fa3fea0bd08?imageslim)