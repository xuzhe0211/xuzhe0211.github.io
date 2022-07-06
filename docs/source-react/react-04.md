---
autoGroup-0: react原理
title: React源码解析之优先级Lane模型上
---
## 概述
Lane是React中用于表示任务的优先级。优先级分为高优先级与低优先级，当用户操作界面时，为了避免页面卡顿，需要让出线程的执行权，先执行用户触发的事件，这个我们称之为高优先级任务，其他不那么重要的事件我们称之为低优先级任务。

不同优先级的任务间，会存在一种现象:当执行低优先级任务时，突然插入一个高优先级任务，那么会中断低优先级的任务，先执行高优先级的任务，我们可以将这种现象成为<span style="color:blue">任务插队</span>。当高优先级任务执行完，准备执行低优先级任务时，有插入一个高优先级任务，那么又会执行高优先级任务，如果不断有高优先级任务插队执行，那么低优先级任务便一直得不到执行，我们称这种现象为<span style="color:blue">任务饥饿问题</span>

## 不同的优先级机制
React中有三套优先级机制：
- <span style="color:blue">React事件优先级</span>
- <span style="color:blue">Lane优先级</span>
- <span style="color:blue">Scheduler优先级</span>

### React事件优先级
```js
// 离散事件优先级，例如：点击事件，input输入等触发的更新任务，优先级最高
export const DiscreteEventPriority: EventPrority = SyncLane;
// 连续事件优先级，例如：滚动事件，拖动事件等，连续触发的事件
export const ContinuousEventPriority: EventPriority = InputContinuousLane;
// 默认事件优先级，例如：setTimeout触发的更新任务
export const DefaultEventPriority: EventPriority = DefaultLane;
// 闲置事件优先级，优先级最低
export const IdleEventPriority: EventPriority = IdleLane;
```
可以看到React的事件优先级的值还是使用的Lane的值，那为什么不直接使用Lane呢？我觉得可能是为了不与Lane机制耦合，后面事件优先级有什么变动的话，可以直接修改而不影响到Lane

#### Lane优先级转换为React事件优先级
```js
export function LanesToEventPriority(lanes: Lanes): EventPriority {
    // 找到优先级最高的lane
    const lane = getHighestPriorityLane(lanes);
  if (!isHigherEventPriority(DiscreteEventPriority, lane)) {
    return DiscreteEventPriority;
  }
  if (!isHigherEventPriority(ContinuousEventPriority, lane)) {
    return ContinuousEventPriority;
  }
  if (includesNonIdleWork(lane)) {
    return DefaultEventPriority;
  }
  return IdleEventPriority;
}
```
### Scheduler优先级
```js
export const NoPriority = 0; // 没有优先级
export const ImmediatePriority = 1； // 立即执行任务的优先级，级别最高
export const UserBlockingPriority = 2; // 用户阻塞的优先级
export const NormalPriority = 3; // 正常优先级
export const LowPriority = 4; // 较低的优先级
export const IdlePriority = 5; // 优先级最低，闲表示任务可以闲置
```
#### React事件优先级转换为Scheduler优先级
```js
function ensureRootIsScheduled(root: FiberRoot, currentTime: number) {
    ...
    switch (lanesToEventPriority(nextLanes)) {
      case DiscreteEventPriority:
        schedulerPriorityLevel = ImmediateSchedulerPriority;
        break;
      case ContinuousEventPriority:
        schedulerPriorityLevel = UserBlockingSchedulerPriority;
        break;
      case DefaultEventPriority:
        schedulerPriorityLevel = NormalSchedulerPriority;
        break;
      case IdleEventPriority:
        schedulerPriorityLevel = IdleSchedulerPriority;
        break;
      default:
        schedulerPriorityLevel = NormalSchedulerPriority;
        break;
    }
}
```
lanesToEventPriority函数就是上面Lane优先级转换为React事件优先级的函数，先将lane的优先级转换为React事件的优先级，然后在根据React事件的优先级转换为Scheduler优先级.

### Lane优先级
```js
// lane使用31位二进制来表示优先级车道共31条, 位数越小（1的位置越靠右）表示优先级越高
export const TotalLanes = 31;

// 没有优先级
export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000;

// 同步优先级，表示同步的任务一次只能执行一个，例如：用户的交互事件产生的更新任务
export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;

// 连续触发优先级，例如：滚动事件，拖动事件等
export const InputContinuousHydrationLane: Lane = /*    */ 0b0000000000000000000000000000010;
export const InputContinuousLane: Lanes = /*            */ 0b0000000000000000000000000000100;

// 默认优先级，例如使用setTimeout，请求数据返回等造成的更新
export const DefaultHydrationLane: Lane = /*            */ 0b0000000000000000000000000001000;
export const DefaultLane: Lanes = /*                    */ 0b0000000000000000000000000010000;

// 过度优先级，例如: Suspense、useTransition、useDeferredValue等拥有的优先级
const TransitionHydrationLane: Lane = /*                */ 0b0000000000000000000000000100000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111111111111000000;
const TransitionLane1: Lane = /*                        */ 0b0000000000000000000000001000000;
const TransitionLane2: Lane = /*                        */ 0b0000000000000000000000010000000;
const TransitionLane3: Lane = /*                        */ 0b0000000000000000000000100000000;
const TransitionLane4: Lane = /*                        */ 0b0000000000000000000001000000000;
const TransitionLane5: Lane = /*                        */ 0b0000000000000000000010000000000;
const TransitionLane6: Lane = /*                        */ 0b0000000000000000000100000000000;
const TransitionLane7: Lane = /*                        */ 0b0000000000000000001000000000000;
const TransitionLane8: Lane = /*                        */ 0b0000000000000000010000000000000;
const TransitionLane9: Lane = /*                        */ 0b0000000000000000100000000000000;
const TransitionLane10: Lane = /*                       */ 0b0000000000000001000000000000000;
const TransitionLane11: Lane = /*                       */ 0b0000000000000010000000000000000;
const TransitionLane12: Lane = /*                       */ 0b0000000000000100000000000000000;
const TransitionLane13: Lane = /*                       */ 0b0000000000001000000000000000000;
const TransitionLane14: Lane = /*                       */ 0b0000000000010000000000000000000;
const TransitionLane15: Lane = /*                       */ 0b0000000000100000000000000000000;
const TransitionLane16: Lane = /*                       */ 0b0000000001000000000000000000000;

const RetryLanes: Lanes = /*                            */ 0b0000111110000000000000000000000;
const RetryLane1: Lane = /*                             */ 0b0000000010000000000000000000000;
const RetryLane2: Lane = /*                             */ 0b0000000100000000000000000000000;
const RetryLane3: Lane = /*                             */ 0b0000001000000000000000000000000;
const RetryLane4: Lane = /*                             */ 0b0000010000000000000000000000000;
const RetryLane5: Lane = /*                             */ 0b0000100000000000000000000000000;

export const SomeRetryLane: Lane = RetryLane1;

export const SelectiveHydrationLane: Lane = /*          */ 0b0001000000000000000000000000000;
```
可以看到lane使用31位二进制来表示优先级车道，共31条，位数越小(1的位置越靠右)表示优先级越高。

上面简单的介绍了一下React中的优先级机制，下面我们正式开启源码解析

## 如何为React不同的事件添加不同的优先级


## 源码
[React源码解析之优先级Lane模型上](https://juejin.cn/post/7008802041602506765)