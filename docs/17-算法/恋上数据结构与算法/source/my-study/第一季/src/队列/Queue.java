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

public class Queue<E> implements IQueue<E> {
    LinkList<E> linkList;
    public Queue(){
        linkList = new LinkList<E>();
    }
    @Override
    public void clear() {
        // TODO Auto-generated method stub
        linkList.clear();
        
    }
    @Override
    public int size() {
        // TODO Auto-generated method stub
        return linkList.size();
    }
    @Override
    public boolean isEmpty() {
        // TODO Auto-generated method stub
        return linkList.isEmpty();
    }
    @Override
    public void enQueue(E element) {
        // TODO Auto-generated method stub
        linkList.add(element);
        
    }
    @Override
    public E deQueue() {
        // TODO Auto-generated method stub
        return linkList.remove(0);
    }
    @Override
    public E front() {
        // TODO Auto-generated method stub
        return linkList.get(0);
    }
    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("size=").append(size()).append(", [");
       
        for (int i = 0; i < size(); i++) {
            if (i != 0) {
                string.append(", ");
            }

            string.append(linkList.get(i));

            
        }
        string.append("]");
        return string.toString();
    }
  
}
