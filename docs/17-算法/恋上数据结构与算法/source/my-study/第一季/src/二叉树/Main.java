package 二叉树;

import java.util.Comparator;

import 二叉树.BinaryTree.Visitor;
import 二叉树.printer.BinaryTrees;

public class Main {
    public static void main(String[] args) {

        // BstTest1();
        // BstTest2();
        // BstTest3();
        // BtPreTest();
        // BtInTest();
        // BtPostTest();
        BtLevelTest();
    }

    public static void BstTest1() {
        BinarySearchTree<Integer> bst1 = new BinarySearchTree<>();
        int[] arr = new int[] {
                10, 2, 4, 5, 12, 42, 21, 34
        };
        for (int i = 0; i < arr.length; i++) {
            bst1.add(arr[i]);
        }
        BinaryTrees.println(bst1);

    }

    // 使用对象的话，对象需要继承Comparable接口
    public static void BstTest2() {
        BinarySearchTree<Person> bst1 = new BinarySearchTree<>();
        int[] arr = new int[] {
                1, 2, 3, 54, 7, 3, 2
        };
        for (int i = 0; i < arr.length; i++) {
            bst1.add(new Person(arr[i]));
        }
        BinaryTrees.println(bst1);
    }

    // 也可以对象不继承Comparable接口，直接传入比较对象。
    // 这样可以构造出每个不同的实例对象，不同的比较逻辑，比如我一个对象比较年龄，一个对象比较名字
    public static void BstTest3() {
        BinarySearchTree<Person1> bst1 = new BinarySearchTree<>(new Comparator<Person1>() {
            @Override
            public int compare(Person1 o1, Person1 o2) {
                return o1.age - o2.age;
            }

        });

        BinarySearchTree<Person1> bst2 = new BinarySearchTree<>(new Comparator<Person1>() {
            @Override
            public int compare(Person1 o1, Person1 o2) {
                return o1.name.compareTo(o2.name);
            }

        });
        int[] arr = new int[] {
                1, 2, 3, 54, 7, 3, 2
        };
        for (int i = 0; i < arr.length; i++) {
            bst1.add(new Person1(arr[i]));

        }
        String[] arr1 = new String[] {
                "xiaohei", "lihuang", "zhengqing", "yige"
        };
        for (int i = 0; i < arr1.length; i++) {
            bst2.add(new Person1(arr1[i]));
        }
        BinaryTrees.println(bst1);
        BinaryTrees.println(bst2);
    }

    // 前序遍历测试
    public static void BtPreTest() {
        BinarySearchTree<Integer> bst1 = new BinarySearchTree<>();
        int[] arr = new int[] {
                10, 2, 4, 5, 12, 42, 21, 34
        };
        for (int i = 0; i < arr.length; i++) {
            bst1.add(arr[i]);
        }
        BinaryTrees.println(bst1);
        bst1.preOrder(new Visitor<Integer>() {

            @Override
            boolean visit(Integer element) {

                System.out.println(element);
                // 返回true可中止遍历
                return true;
            }

        });
    }

    // 中序遍历测试
    public static void BtInTest() {
        BinarySearchTree<Integer> bst1 = new BinarySearchTree<>();
        int[] arr = new int[] {
                10, 2, 4, 5, 12, 42, 21, 34
        };
        for (int i = 0; i < arr.length; i++) {
            bst1.add(arr[i]);
        }
        BinaryTrees.println(bst1);
        bst1.inOrder(new Visitor<Integer>() {

            @Override
            boolean visit(Integer element) {

                System.out.println(element);
                // 返回true可中止遍历
                return false;
            }

        });
    }
     // 后序遍历测试
     public static void BtPostTest() {
        BinarySearchTree<Integer> bst1 = new BinarySearchTree<>();
        int[] arr = new int[] {
                10, 2, 4, 5, 12, 42, 21, 34
        };
        for (int i = 0; i < arr.length; i++) {
            bst1.add(arr[i]);
        }
        BinaryTrees.println(bst1);
        bst1.postOrder(new Visitor<Integer>() {

            @Override
            boolean visit(Integer element) {

                System.out.println(element);
                // 返回true可中止遍历
                return false;
            }

        });
    }
    // 层级遍历测试
    public static void BtLevelTest() {
        BinarySearchTree<Integer> bst1 = new BinarySearchTree<>();
        int[] arr = new int[] {
                10, 2, 4, 5, 12, 42, 21, 34
        };
        for (int i = 0; i < arr.length; i++) {
            bst1.add(arr[i]);
        }
        BinaryTrees.println(bst1);
        bst1.levelOrder(new Visitor<Integer>() {

            @Override
            boolean visit(Integer element) {

                System.out.println(element);
                // 返回true可中止遍历
                return false;
            }

        });
    }
}

class Person implements Comparable<Person> {
    private int age;

    public Person(int age) {
        this.age = age;
    }

    @Override
    public int compareTo(Person e) {

        return age - e.age;
    }

    @Override
    public String toString() {
        return age + "";
    }

}

class Person1 {
    public int age;
    public String name;

    public Person1(int age) {
        this.age = age;
    }

    public Person1(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return age + "_" + name;
    }

}