package 队列;
interface IDeque<E> {

	/**
	 * 清除所有元素
	 */
	void clear();

	/**
	 * 元素的数量
	 * @return
	 */
	int size();

	/**
	 * 是否为空
	 * @return
	 */
	boolean isEmpty();
    
    /**
	 * 从队头入队
	 * @return
	 */
	void enQueueFront(E element); 
    
     /**
	 * 从队头出队
	 * @return
	 */
	 E deQueueFront();
    
    /**
	 * 从队尾入队
	 * @return
	 */
	void enQueueRear(E element); 
    
     /**
	 * 从队尾出队
	 * @return
	 */
	 E deQueueRear();

    /**
	 * 获取队列的头元素
	 * @return
	 */
	 E front();
    /**
	 * 获取队列的尾元素
	 * @return
	 */
	 E rear();
}
public class Deque {
    
}
