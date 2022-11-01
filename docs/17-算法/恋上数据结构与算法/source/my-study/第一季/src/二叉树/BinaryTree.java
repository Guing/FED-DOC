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

    // 层级遍历
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

    // 获取二叉树的高度。
    public int height() {
        return height(root);
    }

    // 获取二叉树的高度-递归方法
    public int heightRec(Node<E> node) {
        if (node == null) {
            return 0;
        }
        return 1 + Math.max(heightRec(node.right), heightRec(node.left));
    }

    // 获取二叉树的高度-迭代方法
    public int height(Node<E> node) {
        if (node == null) {
            return 0;
        }
        int height = 0;
        int levelSize = 1;
        Queue<Node<E>> queue = new LinkedList<>();
        Node<E> current;
        queue.offer(root);
        // 利用层级遍历，遍历完一层时，队列的size就是这一层的节点数量。
        while (queue.size() != 0) {
            current = queue.poll();
            levelSize--;

            if (current.left != null) {
                queue.offer(current.left);
            }

            if (current.right != null) {
                queue.offer(current.right);
            }
            if (levelSize == 0) {
                height++;
                levelSize = queue.size();
            }

        }

        return height;
    }

    public boolean isComplete() {
        Queue<Node<E>> queue = new LinkedList<>();
        Node<E> current = null;
        boolean isLeaf = false;
        queue.offer(root);
        // 利用层级遍历
        while (queue.size() != 0) {
            current = queue.poll();
            if (isLeaf == true && !current.isLeaf()) {
                return false;
            }
            if (current.left != null) {
                queue.offer(current.left);
            }

            if (current.right != null) {
                queue.offer(current.right);
            }
            // 下面根据左右子节点是否为空的四种情况，来做判断：

            // 左子节点为空，右子节点不为空，则肯定不是完全二叉树
            if (current.left == null && current.right != null) {
                return false;

            } // 左子节点不为空，右子节点为空，则后续的节点必须是叶子节点，不然就不是完全二叉树
            else if (current.left != null && current.right == null) {
                isLeaf = true;
            }
            // 左子节点为空，右子节点为空，则后续的节点必须是叶子节点，不然就不是完全二叉树
            else if (current.left == null && current.right == null) {
                isLeaf = true;
            }
            // 左子节点和右子节点不为空，则继续
            else if (current.left != null && current.right != null) {

            }
        }

        return true;
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

        // 是否是叶子节点
        public boolean isLeaf() {
            return left == null && right == null;
        }

        // 是否是两个子节点
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
