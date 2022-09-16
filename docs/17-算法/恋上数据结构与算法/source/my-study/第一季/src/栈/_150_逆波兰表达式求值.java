package 栈;

public class _150_逆波兰表达式求值 {
    
    //执行用时：7 ms, 在所有 Java 提交中击败了21.06%的用户
    //内存消耗：40.8 MB, 在所有 Java 提交中击败了93.16%的用户
    public int evalRPN_my(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < tokens.length; i++) {
            if (tokens[i].equals("+")
                    || tokens[i].equals("-")
                    || tokens[i].equals("*")
                    || tokens[i].equals("/")) {

                int sec = stack.pop();
                int first = stack.pop();
                switch (tokens[i]) {
                    case "+":
                        stack.push(first + sec);
                        break;
                    case "-":
                        stack.push(first - sec);
                        break;
                    case "*":
                        stack.push(first * sec);
                        break;
                    case "/":
                        stack.push(first / sec);
                        break;
                    default:
                }

            } else {
                stack.push(Integer.parseInt(tokens[i]));
            }
        }
        return stack.pop();
    }
}
