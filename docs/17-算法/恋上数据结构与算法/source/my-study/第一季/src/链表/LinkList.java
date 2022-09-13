package 链表;

 interface List<E> {

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
     * 是否包含某个元素
     * @param element
     * @return
     */
    boolean contains(E element);

    /**
     * 添加元素到尾部
     * @param element
     */
    void add(E element);

    /**
     * 获取index位置的元素
     * @param index
     * @return
     */
    E get(int index);

    /**
     * 设置index位置的元素
     * @param index
     * @param element
     * @return 原来的元素ֵ
     */
    E set(int index, E element);

    /**
     * 在index位置插入一个元素
     * @param index
     * @param element
     */
    void add(int index, E element);

    /**
     * 删除index位置的元素
     * @param index
     * @return
     */
    E remove(int index);

    /**
     * 查看元素的索引
     * @param element
     * @return
     */
    int indexOf(E element);
}


class Node<E>{
      E element;
     Node<E> next;
     Node<E> prev;
     public Node(E element,Node<E> next,Node<E> prev){
        this.element = element;
        this.prev = prev;
        this.next = next;
     }
}

public class LinkList<E> implements List<E> {
    
     private int size;
     private Node<E> first;
     private Node<E> last;
    @Override
    public void clear() {
        // TODO Auto-generated method stub
        size =  0;
        
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
        return false;
    }

    @Override
    public void add(E element) {
        // TODO Auto-generated method stub
        
        
        
    }

    @Override
    public E get(int index) {
        // TODO Auto-generated method stub
        Node<E> node = getNode(index);
        return node.element;
       
    }

    @Override
    public E set(int index, E element) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void add(int index, E element) {
        // TODO Auto-generated method stub
        if(size == index){
            Node<E> oldNode = last;
            last = new Node<E>(element, null, oldNode);
        }else{

             

        }
        
    }

    @Override
    public E remove(int index) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public int indexOf(E element) {
        // TODO Auto-generated method stub
        int index = 0;
        Node<E> current = first;
        while(current !=null){
            if(current.element == element){
                return index; 
            }
            index++;
            current.next = current;
        }
        return -1;
    }

    private Node<E> getNode(int index){
        rangeCheck(index);
        Node<E> current = first;
        if(index < (size >> 1)){
            for(int i = 0;i<index;i++){
                current = current.next;
            } 
        }else{
            for(int i = size-1;i>index;i--){
                current = current.prev;
            } 
        }
        
        return current;
      
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
