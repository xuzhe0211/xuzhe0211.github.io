---
autoGroup-2: 图表可视化
title: 项目中的具体使用
---

## tooltip

```
tooltip: {
    trigger: 'axis',
    backgroundColor: '#122649',
    textStyle: {
        fontSize: 8
    },
    axisPointer: {
        type: 'shadow'
    },
    formatter: (params) => {
        let showHtm = `${params[0].name}<br/>`;
        for (var i = 0; i < params.length; i++) {
            const text = params[i].seriesName;
            const value = params[i].value;
            text !== '超速' ? (showHtm += `${text}: ${value}<br/>`) : '';
        }
        return showHtm;
    }
},
```

## 图表位置、下滑快

```
grid: {
    top: '20%',
    left: 0,
    right: 0,
    bottom: 8,
    containLabel: true
},
dataZoom: [
    {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        height: 3,
        left: '0%',
        bottom: '5',
        start: 0,
        textStyle: false,
        borderColor: 'rgba(0, 0, 0, 0)',
        backgroundColor: 'rgba(23, 56, 98, 0)',
        fillerColor: 'rgba(23, 56, 98, 1)',
        end: 90 // 初始化滚动条
    }
],
```

## 图表背景 

```
graphic: [
    {
        type: 'text',
        left: 'center',
        elements: [
            {
                type: 'image', // 需要填充图片,配置image,如果不需要图片可以配置其他的, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
                style: {
                    image: pieBackgroundImg, // 这里添加图片地址
                    // width: 108.44,
                    // height: 109.33
                    width: '64%',
                    height: '100%'
                },
                left: 0, //
                top: 'center' // 配置图片居中
            }
        ]
    }
]
```

## pie图表内文案
```
series: [
    {
        name: '面积模式',
        type: 'pie',
        // roseType: 'radius',
        radius: ['53%', '65%'],
        center: ['32.5%', '50%'],
        clockWise: false,
        hoverAnimation: true,
        hoverOffset: 4,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                formatter: (params) => {
                    const name = params.data.name;
                    const percent = `${params.percent}%`;
                    const str = `${percent}\n${name}`;
                    return str;
                },
                textStyle: {
                    color: '#fff',
                    fontSize: '8.5',
                    lineHeight: '14',
                    fontWeight: 'bold'
                }
            }
        },
        data: []
    }
]
```