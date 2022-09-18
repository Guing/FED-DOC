package 队列;

import java.util.Stack;

public class _232_用栈实现队列 {
    //执行用时：0 ms, 在所有 Java 提交中击败了100.00%的用户
    //内存消耗：39.3 MB, 在所有 Java 提交中击败了51.43%的用户
    class MyQueue {
        Stack<Integer> inStack;
        Stack<Integer> outStack;
        public MyQueue() {
             inStack = new Stack<>();
             outStack = new Stack<>();
        }
        
        public void push(int x) {
            inStack.push(x);
        }
        
        public int pop() {
            if(outStack.isEmpty()){
                while(!inStack.isEmpty()){
                    outStack.push(inStack.pop());
                }
            }
           return outStack.pop();
        }
        
        public int peek() {
            if(outStack.isEmpty()){
                while(!inStack.isEmpty()){
                    outStack.push(inStack.pop());
                }
            }
            return outStack.peek();
        }
        
        public boolean empty() {
            return inStack.isEmpty() && outStack.isEmpty();
        }
    }
}
