---
title: React hooks
date: 2020-08-05
categories:
  - react
tags:
  - react
  - hooks
---
<Boxx/>
# Reack Hooks 学习笔记

---
<img class='custom' style='width:280px' src='../assets/react/theworld.gif' />
<img class='custom' style='width:280px' src='../assets/react/dio.gif' />
<img class='custom' style='width:280px' src='../assets/react/spiderwagen.gif' />

## Hooks 中文翻译为：行为

### 在 react hooks 中的三个基础的行为：

- 状态行为 useState

```js
import React, { useState } from "react";
const Example = () => {
  const [count, setCount] = useState;
  return (
    <div>
      Your count:{count}
      <button onClick={setCount(count + 1)}>Add</button>
    </div>
  );
};
export default Example;
```

 - 自定义 useState

```js
const useCount = (initValue) => {
  const [count, setCount] = useState(initValue);
  return [
    count,
    () => {
      setCount(count + 1);
    },
  ];
};
const Example = () => {
  const [count, addCount] = useCount(0);
  return (
    <div>
      Your count:{count}
      <button onClick={addCount(count + 1)}>Add</button>
    </div>
  );
};
export default Example;
```

- 作用行为 useEffect

```js
useEffect(() => {}, deps);
// 如果deps（依赖）不传，则uesEffect将随着组件的变化而在此渲染，如果传入[]，则只在初始时渲染，如果传入某个值：[值] ，则根据这个值的变化次数而执行多少次
```

```js
import React, { useEffect, useState } from "react";
const Example = () => {
  const [count, setCount] = useState;
  useEffect(() => {
    console.log(count);
  });
  return (
    <div>
      Your count:{count}
      <button onClick={setCount(count + 1)}>Add</button>
    </div>
  );
};
export default Example;
```

```js
import React, { useEffect, useState } from "react";
log = (count) => {
  console.log(count);
};
const Example = () => {
  const [count, setCount] = useState;
  // useEffect(() => {
  //   //组件变化就执行
  //   log.bind(null, count);
  // });
  // useEffect(() => {
  //   //执行一次
  //   log.bind(null,count)
  // },[]);
  useEffect(() => {
    //count变化就执行
    log.bind(null, count);
  }, [count]);
  return (
    <div>
      Your count:{count}
      <button onClick={setCount(count + 1)}>Add</button>
    </div>
  );
};
export default Example;
```

```js
import React, { useEffect, useState } from "react";
useInterval = (callback, time) => {
  useEffect(() => {
    const I = setInterval(callback, time);
    return () => {
      clearInterval(I);
    };
  }, []);
};
const Example = () => {
  const [count, setCount] = useState;
  useInterval(() => {
    console.log(count);
    // 用方法的方式才能取到最新的state，否则只会取到最早的state
    setCount((count) => count + 1);
  }, 1000);
  return (
    <div>
      Your count:{count}
      <button onClick={setCount(count + 1)}>Add</button>
    </div>
  );
};
export default Example;
```

- 上下文行为

```js
import React, { useEffect, useContext } from "react";
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};
// 创建一个上下文
const ThemeContext = React.createContext({
  theme: themes.light,
  toggle: () => {},
});

const Example = () => {
  const [theme, setTheme] = useState(themes.light);
  // Provider:提供者--->说明提供者是ThemeContext
  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: () => {
          setTheme((theme) => {
            setTheme(theme === theme.light ? theme.dark : theme.light);
          });
        },
      }}
    >
      <Toolbar />
    </ThemeContext.Provider>
  );
};
const Toolbar = () => {
  return <ThemeButton />;
};
const ThemeButton = () => {
  const context = useContext(ThemeContext);
  return (
    <button
      style={{
        color: context.theme.foreground,
        background: context.theme.background,
      }}
      onClick={() => {
        context.toggle();
      }}
    >
      Click Me!
    </button>
  );
};
export default Example;
```

### Hooks 进阶

- reducer
  橘色为 reducer ， 蓝色为 reduce
  <img class='custom'  src='../assets/react/reducer.png' />

```js
import React, { useReducer } from "react";
reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "add":
      return state + 1;
    case "sub":
      return state - 1;
    default:
      throw "……";
  }
};
const Example = () => {
  // useReducer传入两个参数，一个数reducer，另一个为值的初始状态
  const [counter, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      Your counter is:{counter}
      <button onClick={() => dispatch({ type: "add" })}></button>
      <button onClick={() => dispatch({ type: "sub" })}></button>
    </div>
  );
};
export default Example;
```

- ref 引用类型

```js
// 例子一：通过ref获取当前的dom
import React, { useRef } from "react";
const Example = () => {
  const refInput = useRef();
  return (
    <div>
      <input ref={refInput} />
      <button
        onClick={() => {
          refInput.current.focus();
        }}
      >
        Focus
      </button>
    </div>
  );
};
export default Example;
```

```js
// 例子二：通过ref获取 当前的值 和 之前的值 !!!

import React, { useRef, useState } from "react";
const Example = () => {
  const refInput = useRef();
  const [counter, setCounter] = useState(0);
  // 通过引用ref来缓存一个值
  let pre = useRef(null);
  return (
    <div>
      <p>当前的值：{counter}</p>
      <p>之前的值：{pre.current}</p>
      <button
        onClick={() => {
          pre.current = counter;
          setCounter((x) => x + 1);
        }}
      >
        Click me to add
      </button>
      <button
        onClick={() => {
          pre.current = counter;
          setCounter((x) => x - 1);
        }}
      >
        Click me to remove
      </button>
    </div>
  );
};
export default Example;
```

- 缓存

  - 缓存一个函数 （useCallback）

  ```js
  import React, { useCallback, useState } from "react";
  const Example = () => {
    const [count, setCount] = useState(0);
    const add = useCallback(()=>{
      setCount(x=>x+1)
    },[])
    // 缓存这个方法，使其不会每次都被创建一次，但是代码可读性不高
    return (
      <div>
        <button onClick{add}>click me</button>
      </div>
    );
  };
  export default Example;
  ```

  - 缓存一个值 （useMemo）

  ```js
  import React, { useMemo, useState } from "react";
  const Example = () => {
    const [count, setCount] = useState(0);
    const memorizedText = useMemo(()=>{
      console.log("run useMemo function");
      return `this is a memorized text ${Date.now()}`
    },[]);
    // 如果想让memories每十次变化一次，只需要将依赖[]改成Math.floor(count / 10) 就可以了

    return (
      <div>
        {memorizedText}
        <p>You clicked {count} times</p>
        <button onClick{()=>setCount(count+1)}>click me</button>
      </div>
    );
  };
  export default Example;
  ```

### Hooks 使用建议（避坑指南）

- 使用 react.memo 减少重绘次数
- hooks 同步问题

  ```js
  import React, { useEffect, useState } from "react";
  const Example = () => {
    const [count, setCount] = useState(0);
    AInterval = () => {
      const I = setInterval(() => {
        // 3、当useEffect的依赖还是[]的时候count只会是初始的状态；当useEffect的依赖是[count]的时候，count才会跟着变化
        console.log(count);
        // 2、用方法的形式可以解决这个问题
        setCount((count) => count + 1);
      }, 1000);
      return () => clearInterval(I);
    };
    // 1、依赖为空，所以只有第一次执行的才会显示，也就是说虽然AInterval生效了，但是count 依然时候第一次的初始值（0）
    useEffect(AInterval, []);
    return <div>{count}</div>;
  };
  ```

- 构造自己的 hooks 行为
  ```js
  import React, { useEffect, useState } from "react";
  sleep =(time)=>{
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve()
      },time)
    })
  }
  async getList =()=>{
    await sleep(200);
    return ["a","b","c"];
  }
  useList=()=>{
    const [list,setList]=useState(null)
    async request=()=>{
      const list = await getList()
      setList(list)
    }
    useEffect(()=>{
      getList()
    },[])
  }
  const Example=()=>{
    const list = useList()
    if(list===null){
      return <div>Loading……</div>
    }
    return <div>
    {list.map((item,index)=>{
      <li key={index}>{item}</li>
    })}</div>
  }
  export default Example;
  ```
- 每一种行为都是一个Hook
  ```js
  import React, { useEffect, useState } from "react";
  const Example=()=>{
    const [state,setState]=useState({
      count:0,
      company:"Apple"
    });
    // 不要添加一个大状态
    return (
      <div>

      </div>
    )
  }
  export default Example;
  ```
- 不要再思考声明周期（很多东西已经被hooks优化，该忘就忘了，往事如烟，该散就散）