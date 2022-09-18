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
@SuppressWarnings("unchecked")
public class CircleDeque<E> implements IDeque<E> {

    /**
     * 元素的数量
     */
    private int size;
    /**
     * 所有的元素
     */
    private E[] elements;

    private static final int DEFAULT_CAPACITY = 10;

    private int first = 0;

    public CircleDeque() {
        elements = (E[]) new Object[DEFAULT_CAPACITY];

    }
    @Override
    public void clear() {
        // TODO Auto-generated method stub
        for (int i = 0; i < size; i++) {
            elements[getIndex(i)] = null;
        }
        size = 0;
        first = 0;
    }
    private int getIndex(int index) {
        if(first + index < 0){
            return elements.length-1;
        }
        return (first + index) % elements.length;
    }

    @Override
    public int size() {
        // TODO Auto-generated method stub
        return size;
    }

    @Override
    public boolean isEmpty() {
        // TODO Auto-generated method stub
        return size == 0;
    }

    @Override
    public void enQueueFront(E element) {
        // TODO Auto-generated method stub
        ensureCapacity();
        elements[getIndex(-1)] = element;
        first = getIndex(-1);
        size++;
        
    }

    @Override
    public E deQueueFront() {
        // TODO Auto-generated method stub
        E element = front();
        elements[first] = null;
        first = getIndex(1);
        size--;
        return element;
    }

    @Override
    public void enQueueRear(E element) {
        // TODO Auto-generated method stub
        ensureCapacity();
        elements[getIndex(size)] = element;
        size++;
        
    }

    @Override
    public E deQueueRear() {
        // TODO Auto-generated method stub
        E element = rear();
        elements[size-1] = null;
        size--;
        return element;
    }

    @Override
    public E front() {
        // TODO Auto-generated method stub
        return elements[getIndex(0)];
    }

    @Override
    public E rear() {
        // TODO Auto-generated method stub
        return elements[getIndex(size-1)];
    }
    private void ensureCapacity() {
        if (size >= elements.length) {
            E[] newElements = (E[]) new Object[elements.length + DEFAULT_CAPACITY];
            for (int i = 0; i < elements.length; i++) {
                newElements[i] = elements[getIndex(i)];
            }
            elements = newElements;
            first = 0;
        }
    }
    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("size=").append(size()).append(", [");

        for (int i = 0; i < size(); i++) {
            if (i != 0) {
                string.append(", ");
            }

            string.append(elements[getIndex(i)]);

        }
        string.append("]");
        return string.toString();
    }
}
