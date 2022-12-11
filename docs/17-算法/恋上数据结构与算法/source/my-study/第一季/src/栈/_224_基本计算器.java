package 栈;

public class _224_基本计算器 {
    public int calculate(String s) {
        int length = s.length();
        Character c;
        int result = 0;
        StringBuilder sb;
        for (int i = 0; i < length; i++) {
            c = s.charAt(i);
          

        }

        return result;
    }

    public static void main(String[] args) {
        _224_基本计算器 test = new _224_基本计算器();
        System.out.println( test.calculate("(1+(4+5+2)-3)+(6+8)"));
    }
}
