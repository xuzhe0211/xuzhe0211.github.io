---
title: 性能指标
---
## P50,P90 P99(pct50, pct90, pct99)指什么？
P50,P90,P99(或写作pct50, pct90, pct99)都是数据聚合统计的一种方式，跟百分比相关(p的函数是 percentile)

- p50:数据集按升序排列，第50分位置大的数据(即升序排列后排在50%位置的数据)。
- p90:数据集按升序排列，第90分位置大的数据(即升序排列后排在90%位置的数据)。
- p99: 数据集按升序排列，第99分位置大的数据(即升序排列后排在99%位置的数据).

### 有什么实际意义和用处？
经常用来衡量服务响应延迟。

以最常用的p99威力，它衡量了99%的情况下能达到的最大延迟，99%的请求都低于这个数值，即绝大多数情况下的最差情况


- COUNT：根据时间粒度进行计数
- UNIQ：计算时间粒度内的总和后按DID去重
- AVG：SUM(时间粒度内的指标数值)/样本量
- PCT25：升序排列后排在25%位置的数据
- PCT50：升序排列后排在50%位置的数据
- PCT75：升序排列后排在75%位置的数据
- PCT90：升序排列后排在90%位置的数据