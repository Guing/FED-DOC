package 队列;

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

public class Queue {

}
