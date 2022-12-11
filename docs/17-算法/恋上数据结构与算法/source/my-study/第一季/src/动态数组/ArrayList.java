package 动态数组;

interface IArrayList<E> {
    int size(); // 元素的数量

    boolean isEmpty(); // 是否为空

    boolean contains(E element); // 是否包含某个元素

    void add(E element); // 添加元素到最后面

    E get(int index); // 返回index位置对应的元素

    E set(int index, E element); // 设置index位置的元素

    void add(int index, E element); // 往index位置添加元素

    E remove(int index); // 删除index位置对应的元素

    int indexOf(E element); // 查看元素的位置

    void clear(); // 清除所有元素
}

@SuppressWarnings("unchecked")
public class ArrayList<E> implements IArrayList<E> {
    /**
     * 元素的数量
     */
    private int size;
    /**
     * 所有的元素
     */
    private E[] elements;

    private static final int DEFAULT_CAPACITY = 10;
    private static final int ELEMENT_NOT_FOUND = -1;

    public ArrayList(int capaticy) {
        capaticy = (capaticy < DEFAULT_CAPACITY) ? DEFAULT_CAPACITY : capaticy;
        elements = (E[]) new Object[capaticy];
    }

    public ArrayList() {
        this(DEFAULT_CAPACITY);
    }

    @Override
    public int size() {
        
        return size;
    }

    @Override
    public boolean isEmpty() {

        return size == 0;
    }

    @Override
    public boolean contains(E element) {
        return indexOf(element) != ELEMENT_NOT_FOUND;
    }

    @Override
    public void add(E element) {

        add(size, element);
    }

    @Override
    public E get(int index) {
        rangeCheck(index);
        return elements[index];
    }

    @Override
    public E set(int index, E element) {
        rangeCheck(index);
        E old = elements[index];
        elements[index] = element;
        return old;
    }

    @Override
    public void add(int index, E element) {
        ensureCapacity();
        rangeCheck(index);
        for (int i = size - 1; i >= index; i--) {
            elements[i + 1] = elements[i];
        }
        elements[index] = element;
        size++;
    }

    @Override
    public E remove(int index) {
        rangeCheck(index);
        E tmp = elements[index];
        for (int i = index; i < size - 1; i++) {
            elements[i] = elements[i + 1];
        }
        elements[--size] = null; 
        trim();
        return tmp;
    }
    private void trim() {
		// 30
		int oldCapacity = elements.length;
		// 3
		int newCapacity = oldCapacity /3;
		if (size > (newCapacity) || oldCapacity <= DEFAULT_CAPACITY) return;
		
		// 剩余空间还很多
		E[] newElements = (E[]) new Object[newCapacity];
		for (int i = 0; i < size; i++) {
			newElements[i] = elements[i];
		}
		elements = newElements;
		
		System.out.println(oldCapacity + "缩容为" + newCapacity);
	}
    @Override
    public int indexOf(Object element) {
        if (element == null) {  // 1
			for (int i = 0; i < size; i++) {
				if (elements[i] == null) return i; 
			}
		} else {
			for (int i = 0; i < size; i++) {
				if (element.equals(elements[i])) return i; // n
			}
		}
        return ELEMENT_NOT_FOUND;
    }

    @Override
    public void clear() {
        // 释放内存
        for (int i = 0; i < size; i++) {
			elements[i] = null;
		}
        size = 0;
    }

    private void ensureCapacity() {
        if (size >= elements.length) {
            E[] newElements = (E[]) new Object[elements.length + DEFAULT_CAPACITY];
            for (int i = 0; i < elements.length; i++) {
                newElements[i] = elements[i];
            }
            elements = newElements;
        }
    }

    private void outOfBounds(int index) {
        throw new IndexOutOfBoundsException("Index:" + index + ", Size:" + size);
    }

    private void rangeCheck(int index) {
        if (index < 0 || index > size) {
            outOfBounds(index);
        }
    }

    public String toString() {

        StringBuilder string = new StringBuilder();
        string.append("size=").append(size).append(",length=").append(elements.length).append(", [");
        for (int i = 0; i < size; i++) {
            if (i != 0) {
                string.append(", ");
            }
            string.append(elements[i]);
        }
        string.append("]");
        return string.toString();
    }

}