package 链表;

public abstract class Main {
    public static void main(String[] args) {
        LinkList<Character> list = new LinkList<>();
        list.add(0, 'a');
        list.add(1, 'b');
        list.add(2, 'c');
        list.add(0, 'x');
        System.out.print(list);
    }
}
