package 二叉树;

import java.util.Comparator;

@SuppressWarnings("unchecked")
public class BinarySearchTree<E> extends BinaryTree<E> {

    private Comparator<E> comparator;

    public BinarySearchTree() {
        this(null);
    }

    public BinarySearchTree(Comparator<E> comparator) {
        this.comparator = comparator;
    }

    public void add(E element) {

        elementNotNullCheck(element);
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
        Node<E> newNode = new Node<>(element, parent);
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

    public void remove(E element) {

    }

    public boolean contains(E element) {

        return false;
    }

    private void elementNotNullCheck(E element) {
		if (element == null) {
			throw new IllegalArgumentException("element must not be null");
		}
	}

}
