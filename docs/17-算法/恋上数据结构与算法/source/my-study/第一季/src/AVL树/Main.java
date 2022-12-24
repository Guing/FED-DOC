package AVL树;


import AVL树.printer.BinaryTrees;

public class Main {
    public static void main(String[] args) {

        BstTest1();

    }

    public static void BstTest1() {
        AVLTree<Integer> bst1 = new AVLTree<>();
        int[] arr = new int[] {
                10, 2, 4, 5, 12, 42, 21, 34
        };
        for (int i = 0; i < arr.length; i++) {
            bst1.add(arr[i]);
        }
    
        bst1.remove(12);
        BinaryTrees.println(bst1);

    }
    
}

   