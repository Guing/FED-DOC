package 队列;

import java.util.LinkedList;
import java.util.Queue;

public class _225_用队列实现栈 {

    // 官方的方法
    // queue1用于存储栈内的元素，queue2作为入栈操作的辅助队列。
    // 入栈操作时，首先将元素入队到 queue2
    // 然后将 queue1 的全部元素依次出队并入队到 queue2
    // 此时 queue2 的前端的元素即为新入栈的元素，
    // 再将 queue1 和 queue2 互换，则 queue1 的元素即为栈内的元素，
    // queue1 的前端和后端分别对应栈顶和栈底。

    class MyStack {
        Queue<Integer> queue1;
        Queue<Integer> queue2;

        /** Initialize your data structure here. */
        public MyStack() {
            queue1 = new LinkedList<Integer>();
            queue2 = new LinkedList<Integer>();
        }

        /** Push element x onto stack. */
        public void push(int x) {
            queue2.offer(x);
            while (!queue1.isEmpty()) {
                queue2.offer(queue1.poll());
            }
            Queue<Integer> temp = queue1;
            queue1 = queue2;
            queue2 = temp;
        }

        /** Removes the element on top of the stack and returns that element. */
        public int pop() {
            return queue1.poll();
        }

        /** Get the top element. */
        public int top() {
            return queue1.peek();
        }

        /** Returns whether the stack is empty. */
        public boolean empty() {
            return queue1.isEmpty();
        }
    }

    // 自己的方法
    class MyStack_my {
        Queue<Integer> inQueue;
        Queue<Integer> outQueue;

        public MyStack_my() {
          inQueue = new  LinkedList<>();
          outQueue = new  LinkedList<>();
        }

        public void push(int x) {
            Queue<Integer> queue;
            if (!outQueue.isEmpty()) {
                queue = outQueue;
                outQueue = inQueue;
                inQueue = queue;
            }
            inQueue.add(x);
        }

        public int pop() {
            Queue<Integer> queue;
            if (!outQueue.isEmpty()) {
                queue = outQueue;
                outQueue = inQueue;
                inQueue = queue;
            }
            int first = -1;
            while (!inQueue.isEmpty()) {
                first = inQueue.poll();
                if (!inQueue.isEmpty()) {
                    outQueue.add(first);
                }

            }
            return first;
        }

        public int top() {
            Queue<Integer> queue;
            if (!outQueue.isEmpty()) {
                queue = outQueue;
                outQueue = inQueue;
                inQueue = queue;
            }
            int first = -1;
            while (!inQueue.isEmpty()) {
                first = inQueue.poll();
                outQueue.add(first);
            }
            return first;
        }

        public boolean empty() {

            return inQueue.isEmpty() && outQueue.isEmpty();

        }
    }
}
