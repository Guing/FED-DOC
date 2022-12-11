package 栈;

import 动态数组.ArrayList;

interface IStack<E> {

    /**
     * 清除所有元素
     */
    void clear();

    /**
     * 元素的数量
     * 
     * @return
     */
    int size();

    /**
     * 是否为空
     * 
     * @return
     */
    boolean isEmpty();

    /**
     * 入栈
     * 
     * @return
     */
    void push(E element);

    /**
     * 出栈
     * 
     * @return
     */
    E pop();

    /**
     * 获取栈顶元素
     * 
     * @return
     */
    E top();
}

public class Stack<E> implements IStack<E> {
    ArrayList<E> list = new ArrayList<>();

    @Override
    public void clear() {
        // TODO Auto-generated method stub
        list.clear();
    }

    @Override
    public int size() {
        // TODO Auto-generated method stub
        return list.size();
    }

    @Override
    public boolean isEmpty() {
        // TODO Auto-generated method stub
        return list.isEmpty();
    }

    @Override
    public void push(E element) {
        // TODO Auto-generated method stub
        list.add(element);
    }

    @Override
    public E pop() {
        // TODO Auto-generated method stub
        return list.remove(list.size() - 1);
    }

    @Override
    public E top() {
        // TODO Auto-generated method stub
        return list.get(list.size() - 1);
    }
    public String toString() {

        StringBuilder string = new StringBuilder();
        string.append("size=").append(list.size()).append(", [");
        for (int i = 0; i < list.size(); i++) {
            if (i != 0) {
                string.append(", ");
            }
            string.append(list.get(i));
        }
        string.append("]");
        return string.toString();
    }

}
