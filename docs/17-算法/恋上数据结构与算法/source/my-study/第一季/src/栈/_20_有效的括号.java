package 栈;

public class _20_有效的括号 {
    // 方法一：使用栈
    // 执行用时：1 ms
    // 内存消耗：39.8 MB
    public boolean isValid(String s) {
        int length = s.length();
        Stack<Character> stack = new Stack<>();
        char c ;
        for (int i = 0; i < length; i++) {
            c = s.charAt(i);
            if(c == '(' || c == '{' || c == '['){
                stack.push(c);
            }else{
                if(stack.isEmpty()){
                    return false;
                }
                char top = stack.pop();
                if(top == '(' && c != ')' || top == '{' && c != '}' || top == '[' && c != ']' ){
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}
