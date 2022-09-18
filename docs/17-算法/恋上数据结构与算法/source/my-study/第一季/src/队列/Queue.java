package 队列;

import 链表.LinkList;

interface IQueue<E> {

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
     * 入队
     * 
     * @return
     */
    void enQueue(E element);

    /**
     * 出队
     * 
     * @return
     */
    E deQueue();

    /**
     * 获取队列的头元素
     * 
     * @return
     */
    E front();
}

public class Queue<E> implements IDeque<E> {
    LinkList<E> linklist;
    public Queue(){
        linklist = new LinkList<E>();
    }
    @Override
    public void clear() {
        // TODO Auto-generated method stub
        
    }

    @Override
    public int size() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public boolean isEmpty() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void enQueueFront(Object element) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public Object deQueueFront() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void enQueueRear(Object element) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public Object deQueueRear() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object front() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object rear() {
        // TODO Auto-generated method stub
        return null;
    }

}
