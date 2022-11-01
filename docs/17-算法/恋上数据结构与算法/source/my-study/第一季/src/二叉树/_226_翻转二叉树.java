package 二叉树;

public class _226_翻转二叉树 {
    public class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode() {
        }

        TreeNode(int val) {
            this.val = val;
        }

        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    public TreeNode invertTree(TreeNode root) {
        return preOrder(root);
    }

    public TreeNode preOrder(TreeNode node) {
        if (node == null)
            return null;
        TreeNode current = new TreeNode();
        current = node.left;
        node.left = node.right;
        node.right = current;
        preOrder(node.left);
        preOrder(node.right);
        return node;
    }
}
