package 二叉树;

import java.util.Comparator;

import 二叉树.printer.BinaryTreeInfo;

interface IBST<E> {
    int size(); // 元素的数量

    boolean isEmpty(); // 是否为空

    void clear(); // 清空所有元素

    void add(E element); // 添加元素

    void remove(E element); // 删除元素

    boolean contains(E element); // 是否包含某元素
}

class Node<E> {
    public E element;
    public Node<E> left;
    public Node<E> right;
    public Node<E> parent;

    public Node(E element) {
        this.element = element;
    }

    public Node(E element, Node<E> parent) {
        this.element = element;
        this.parent = parent;
    }

}

@SuppressWarnings("unchecked")
public class BinarySearchTree<E> implements IBST<E>, BinaryTreeInfo {

    public int size;
    private Node<E> root;
    private Comparator<E> comparator;

    public BinarySearchTree() {
        this(null);
    }

    public BinarySearchTree(Comparator<E> comparator) {
        this.comparator = comparator;
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
    public void clear() {

    }

    @Override
    public void add(E element) {

        // 添加第一个节点
        if (root == null) {
            root = new Node<E>(element, null);
            size++;
            return;
        }

        // 添加的不是第一个节点
        // 找到父节
        Node<E> current = root;
        Node<E> parent = root;
        int result = 0;
        while (current != null) {
            result = compare(current.element, element);
            parent = current;
            if (result > 0) {
                current = current.left;
            } else if (result < 0) {
                current = current.right;
            } else {
                current.element = element;
                return;
            }

        }
        // 看看插入到父节点的哪个位置
        Node<E> newNode = new Node<>(element,parent);
        if (result < 0) {
            parent.right = newNode;
        } else {
            parent.left = newNode;
        }
        size++;
        return;

    }

    /**
     * @return 返回值等于0，代表e1和e2相等；返回值大于0，代表e1大于e2；返回值小于于0，代表e1小于e2
     */
    private int compare(E e1, E e2) {
        if (comparator != null) {
            return comparator.compare(e1, e2);
        }
        return ((Comparable<E>) e1).compareTo(e2);
    }

    @Override
    public void remove(E element) {

    }

    @Override
    public boolean contains(E element) {

        return false;
    }

    /**
     * 
     * 打印接品
     */

    @Override
    public Object root() {
        // TODO Auto-generated method stub
        return root;
    }

    @Override
    public Object left(Object node) {
        // TODO Auto-generated method stub
        return ((Node<E>)node).left;
    }

    @Override
    public Object right(Object node) {
        // TODO Auto-generated method stub
        return ((Node<E>)node).right;
    }

    @Override
    public Object string(Object node) {
        Node<E> myNode = (Node<E>)node;
		String parentString = "null";
		if (myNode.parent != null) {
			parentString = myNode.parent.element.toString();
		}
		return myNode.element + "_p(" + parentString + ")";
    }

}
