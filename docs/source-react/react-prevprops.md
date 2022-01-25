---
title: react hooks如何获取上一轮props、state
---
通过ref来手动获取上一轮props或者state的值
```
function Counter() {
    const [count, setCount] = useState(0);

    const prevCountRef = useRef();
    useEffect(() => {
        prevCountRef.current = count;
    });
    const prevCount = prevCountRef.current;

    return <h1>Now: {count}, before: {prevCount}</h1>
}
```
这或许有一点错综复杂，但你可以把它抽取成一个自定义Hook：
```
function Counter() {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);
    return <h1>Now: {count}, before: {prevCount}</h1>
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })
    return ref.current;
}
```
