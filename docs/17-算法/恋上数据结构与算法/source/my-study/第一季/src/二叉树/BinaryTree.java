package 二叉树;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;

import 二叉树.printer.BinaryTreeInfo;

@SuppressWarnings("unchecked")
public class BinaryTree<E> implements BinaryTreeInfo {
    protected int size;
    protected Node<E> root;

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void clear() {
        root = null;
        size = 0;
    }

    // 前序遍历
    public void preOrder(Visitor<E> visitor) {
        if (visitor == null)
            return;
        preOrderRec(root, visitor);
    }

    // 前序遍历-递归方法
    private void preOrderRec(Node<E> node, Visitor<E> visitor) {
        if (node == null || visitor.stop)
            return;

        visitor.stop = visitor.visit(node.element);
        preOrderRec(node.left, visitor);
        preOrderRec(node.right, visitor);

    }

    // 中序遍历
    public void inOrder(Visitor<E> visitor) {
        if (visitor == null)
            return;
        inOrderRec(root, visitor);
    }

    // 中序遍历-递归方法
    private void inOrderRec(Node<E> node, Visitor<E> visitor) {
        if (node == null || visitor.stop)
            return;

        inOrderRec(node.left, visitor);
        if (visitor.stop)
            return;
        visitor.stop = visitor.visit(node.element);
        inOrderRec(node.right, visitor);

    }

    // 后序遍历
    public void postOrder(Visitor<E> visitor) {
        if (visitor == null)
            return;
        postOrderRec(root, visitor);
    }

    // 后序遍历-递归方法
    private void postOrderRec(Node<E> node, Visitor<E> visitor) {
        if (node == null || visitor.stop)
            return;

        postOrderRec(node.left, visitor);
        postOrderRec(node.right, visitor);
        if (visitor.stop)
            return;
        visitor.stop = visitor.visit(node.element);

    }

    public void levelOrder(Visitor<E> visitor) {
        if (visitor == null || root == null)
            return;
        Queue<Node<E>> queue = new LinkedList<>();
        Node<E> node;
        queue.offer(root);
        while (queue.size() != 0) {
            node = queue.poll();

            if (visitor.visit(node.element))
                return;
            if (node.left != null) {
                queue.offer(node.left);
            }

            if (node.right != null) {
                queue.offer(node.right);
            }

        }

    }

    // 遍历树时，需要传递的访问类
    public static abstract class Visitor<E> {
        boolean stop;

        /**
         * @return 如果返回true，就代表停止遍历
         */
        abstract boolean visit(E element);
    }

    // 节点类
    protected static class Node<E> {
        E element;
        Node<E> left;
        Node<E> right;
        Node<E> parent;

        public Node(E element, Node<E> parent) {
            this.element = element;
            this.parent = parent;
        }

        public boolean isLeaf() {
            return left == null && right == null;
        }

        public boolean hasTwoChildren() {
            return left != null && right != null;
        }
    }

    /**
     * 
     * 打印数据接口
     */

    @Override
    public Object root() {

        return root;
    }

    @Override
    public Object left(Object node) {

        return ((Node<E>) node).left;
    }

    @Override
    public Object right(Object node) {

        return ((Node<E>) node).right;
    }

    @Override
    public Object string(Object node) {
        Node<E> myNode = (Node<E>) node;
        String parentString = "null";
        if (myNode.parent != null) {
            parentString = myNode.parent.element.toString();
        }
        return myNode.element + "_p(" + parentString + ")";
    }

}
