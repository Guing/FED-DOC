package 链表;

interface List<E> {

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
     * 是否包含某个元素
     * 
     * @param element
     * @return
     */
    boolean contains(E element);

    /**
     * 添加元素到尾部
     * 
     * @param element
     */
    void add(E element);

    /**
     * 获取index位置的元素
     * 
     * @param index
     * @return
     */
    E get(int index);

    /**
     * 设置index位置的元素
     * 
     * @param index
     * @param element
     * @return 原来的元素ֵ
     */
    E set(int index, E element);

    /**
     * 在index位置插入一个元素
     * 
     * @param index
     * @param element
     */
    void add(int index, E element);

    /**
     * 删除index位置的元素
     * 
     * @param index
     * @return
     */
    E remove(int index);

    /**
     * 查看元素的索引
     * 
     * @param element
     * @return
     */
    int indexOf(E element);
}

class Node<E> {
    E element;
    Node<E> next;
    Node<E> prev;

    public Node(E element, Node<E> next, Node<E> prev) {
        this.element = element;
        this.prev = prev;
        this.next = next;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();

        if (prev != null) {
            sb.append(prev.element);
        } else {
            sb.append("null");
        }

        sb.append("_").append(element).append("_");

        if (next != null) {
            sb.append(next.element);
        } else {
            sb.append("null");
        }

        return sb.toString();
    }
}

public class LinkList<E> implements List<E> {

    private int size;
    private Node<E> first;
    private Node<E> last;

    @Override
    public void clear() {
        // TODO Auto-generated method stub
        size = 0;
        first = null;
		last = null;

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
    public boolean contains(E element) {
        // TODO Auto-generated method stub
        
        return indexOf(element) <0;
    }

    @Override
    public void add(E element) {
        // TODO Auto-generated method stub
        add(size, element);

    }

    @Override
    public E get(int index) {
        // TODO Auto-generated method stub
        rangeCheck(index);
        Node<E> node = getNode(index);
        return node.element;

    }

    @Override
    public E set(int index, E element) {
        // TODO Auto-generated method stub
        rangeCheck(index);
        Node<E> node = getNode(index);
        node.element = element;
        return element;
    }

    @Override
    public void add(int index, E element) {
        // TODO Auto-generated method stub
        rangeCheckForAdd(index);
        if (size == index) {
            Node<E> oldNode = last;
            last = new Node<E>(element, null, oldNode);
            if (oldNode == null) { // 这是链表添加的第一个元素
                first = last;
            } else {
                oldNode.next = last;
            }
        } else {

            Node<E> current = getNode(index);
            Node<E> currentPrev = current.prev;
         
            Node<E> newNode = new Node<E>(element, current, currentPrev);
            
            current.prev = newNode;
          
            if(currentPrev == null){ //第一个元素
                first = newNode;
            }else{
                currentPrev.next = newNode;
            }
        }
        size++;

    }

    @Override
    public E remove(int index) {
        // TODO Auto-generated method stub
        rangeCheck(index);
        Node<E> node = getNode(index);
        if(index == 0){
            first = node.next;
            node.next.prev = node.prev; 
        }else if(index == size-1){
            last = node.prev;
            node.prev.next = node.next;
        }else{
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        
        size--;
        return node.element;
    }

    @Override
    public int indexOf(E element) {
        // TODO Auto-generated method stub
        int index = 0;
        Node<E> current = first;
        while (current != null) {
            if (current.element == element) {
                return index;
            }
            index++;
            current.next = current;
        }
        return -1;
    }

    private Node<E> getNode(int index) {
        rangeCheck(index);
        Node<E> current;
        if (index < (size >> 1)) {
             current = first;
            for (int i = 0; i < index; i++) {
                current = current.next;
            }
        } else {
             current = last;
            for (int i = size - 1; i > index; i--) {
                current = current.prev;
            }
        }

        return current;

    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder();
        string.append("size=").append(size).append(", [");
        Node<E> node = first;
        for (int i = 0; i < size; i++) {
            if (i != 0) {
                string.append(", ");
            }

            string.append(node);

            node =  node.next;
        }
        string.append("]");
        return string.toString();
    }

    private void outOfBounds(int index) {
        throw new IndexOutOfBoundsException("Index:" + index + ", Size:" + size);
    }

    private void rangeCheck(int index) {
        if (index < 0 || index >= size) {
            outOfBounds(index);
        }
    }

    private void rangeCheckForAdd(int index) {
        if (index < 0 || index > size) {
            outOfBounds(index);
        }
    }

}
