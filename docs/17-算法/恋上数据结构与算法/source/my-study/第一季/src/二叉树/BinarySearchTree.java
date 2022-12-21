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
        remove(node(element));
    }

    public void remove(Node<E> node) {

        if (node == null) {
            return;
        }
        size--;

        // 度为2的节点
        if (node.hasTwoChildren()) {
            // 找到后继节点
            Node<E> suNode = successor(node);
            // 用后继节点的值覆盖度为2的节点的值
            node.element = suNode.element;
            // 将node赋值为后继节点，下面的就是删除后继节点
            node = suNode;
        }

        // 删除node节点（node的度必然是1或者0）
        Node<E> replacement = node.left != null ? node.left : node.right;

        if (replacement != null) { // node是度为1的节点
            // 更改parent
            replacement.parent = node.parent;
            // 更改parent的left、right的指向
            if (node.parent == null) { // node是度为1的节点并且是根节点
                root = replacement;
            } else if (node == node.parent.left) {
                node.parent.left = replacement;
            } else { // node == node.parent.right
                node.parent.right = replacement;
            }
        } else if (node.parent == null) { // node是叶子节点并且是根节点
            root = null;
        } else { // node是叶子节点，但不是根节点
            if (node == node.parent.left) {
                node.parent.left = null;
            } else { // node == node.parent.right
                node.parent.right = null;
            }
        }

    }

    private Node<E> node(E element) {
        Node<E> node = root;
        while (node != null) {
            int cmp = compare(element, node.element);
            if (cmp == 0)
                return node;
            if (cmp > 0) {
                node = node.right;
            } else { // cmp < 0
                node = node.left;
            }
        }
        return null;
    }

    public boolean contains(E element) {

        return node(element) != null;
    }

    private void elementNotNullCheck(E element) {
        if (element == null) {
            throw new IllegalArgumentException("element must not be null");
        }
    }

}
