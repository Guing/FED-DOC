![](image/04-Jest Timers Mock/1644894415107.png)

原生的定时器函数(如：`setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`)并不是很方便测试，因为程序需要等待相应的延时。 Jest可以通过一个函数转换计时器以便允许你控制时间流量。

![image-20220215110739841](image/image-20220215110739841.png)

可以从任何地方调用 `jest.useFakeTimers()` 或 `jest.useRealTimers()`(顶层，`it`内部块，等)，它是一个 **全局操作** ，并将影响到同一文件中的其他测试用例。

![image-20220215111219105](image/image-20220215111219105.png)

![image-20220215111159175](image/image-20220215111159175.png)

-  jest.runAllTimers() 运行所有计时器

 ![image-20220215111235133](image/image-20220215111235133.png)

- jest.runOnlyPendingTimers(); 运行等待计时器

![image-20220215111318472](image/image-20220215111318472.png)

- jest. advancertimersbytime () -计时器都将以毫秒前进。

![image-20220215111413261](image/image-20220215111413261.png)

