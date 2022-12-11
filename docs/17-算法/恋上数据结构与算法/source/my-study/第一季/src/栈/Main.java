package 栈;

public abstract class Main {
    public static void main(String[] args) {
         Stack<Integer> stack = new Stack<>();
         stack.push(1);
         stack.push(2);
         stack.push(3);
         stack.push(4);
         stack.pop();
         
         System.out.println(stack.top()); 
        System.out.println(stack);
        stack.clear();
        System.out.println( stack.isEmpty());
    }
}
