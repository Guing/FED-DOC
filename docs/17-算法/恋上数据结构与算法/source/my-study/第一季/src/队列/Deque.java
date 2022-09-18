package 队列;

import 链表.LinkList;

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
public class Deque<E> implements IDeque<E> {
    LinkList<E> linkList;
	public Deque(){
		linkList = new LinkList<>();
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
	public void enQueueFront(E element) {
		// TODO Auto-generated method stub
		linkList.add(0, element);
		
	}

	@Override
	public E deQueueFront() {
		// TODO Auto-generated method stub
		return linkList.remove(0);
	}

	@Override
	public void enQueueRear(E element) {
		// TODO Auto-generated method stub
		linkList.add(element);
		
	}

	@Override
	public E deQueueRear() {
		// TODO Auto-generated method stub
		return linkList.remove(linkList.size() -1);
	}

	@Override
	public E front() {
		// TODO Auto-generated method stub
		return linkList.get(0);
	}

	@Override
	public E rear() {
		// TODO Auto-generated method stub
		return linkList.get(linkList.size()-1);
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
