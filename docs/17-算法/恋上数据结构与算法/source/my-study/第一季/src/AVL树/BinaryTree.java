package AVL树;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;

import AVL树.printer.BinaryTreeInfo;

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

    // 获取AVL树的高度。
    public int height() {
        return height(root);
    }

    // 获取AVL树的高度-递归方法
    public int heightRec(Node<E> node) {
        if (node == null) {
            return 0;
        }
        return 1 + Math.max(heightRec(node.right), heightRec(node.left));
    }

    // 获取AVL树的高度-迭代方法
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

    // 判断是否为完全AVL树
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

            // 左子节点为空，右子节点不为空，则肯定不是完全AVL树
            if (current.left == null && current.right != null) {
                return false;

            } // 左子节点不为空，右子节点为空，则后续的节点必须是叶子节点，不然就不是完全AVL树
            else if (current.left != null && current.right == null) {
                isLeaf = true;
            }
            // 左子节点为空，右子节点为空，则后续的节点必须是叶子节点，不然就不是完全AVL树
            else if (current.left == null && current.right == null) {
                isLeaf = true;
            }
            // 左子节点和右子节点不为空，则继续
            else if (current.left != null && current.right != null) {

            }
        }

        return true;
    }

    protected Node<E> createNode(E element, Node<E> parent) {
		return new Node<>(element, parent);
	}


    //获取前驱节点（中序遍历的前一个节点）
    public Node<E> predecessor(Node<E> node) {
        if (node == null) return null;
		
		// 前驱节点在左子树当中（left.right.right.right....）
		Node<E> p = node.left;
		if (p != null) {
			while (p.right != null) {
				p = p.right;
			}
			return p;
		}
		
		// 从父节点、祖父节点中寻找前驱节点
		while (node.parent != null && node == node.parent.left) {
			node = node.parent;
		}

		// node.parent == null
		// node == node.parent.right
		return node.parent;
    }
    //获取后继节点（中序遍历的后一个节点）
    protected Node<E> successor(Node<E> node) {
        if (node == null) return null;
		
		// 前驱节点在左子树当中（right.left.left.left....）
		Node<E> p = node.right;
		if (p != null) {
			while (p.left != null) {
				p = p.left;
			}
			return p;
		}
		
		// 从父节点、祖父节点中寻找前驱节点
		while (node.parent != null && node == node.parent.right) {
			node = node.parent;
		}

		return node.parent;
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
        //是否是父节点的左子节点
        public boolean isLeftChild(){
             return parent != null && this == parent.left;
        }
        //是否是父节点的右子节点
        public boolean isRightChild() {
			return parent != null && this == parent.right;
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
