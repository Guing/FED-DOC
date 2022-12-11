package 栈;

import java.util.Stack;

public class _856_括号的分数 {
    //方法一：使用栈
    // 执行用时：1 ms, 在所有 Java 提交中击败了46.05%的用户
    // 内存消耗：39.1 MB, 在所有 Java 提交中击败了95.76%的用户
    public int scoreOfParentheses(String s) {
        Stack<Integer> stack = new Stack<>();
        stack.push(0);
        int length = s.length();
        for (int i = 0; i < length; i++) {
            char c = s.charAt(i);
            if (c == '(') {
                stack.push(0);
            } else {
                int w = stack.pop();
                int v = stack.pop();
                stack.push(v + Math.max(2 * w, 1));
            }
        }
        return stack.pop();
    }
}
