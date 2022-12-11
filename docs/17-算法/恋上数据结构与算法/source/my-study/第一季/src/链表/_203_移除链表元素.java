package 链表;

class ListNode {
    int val;
    ListNode next;

    ListNode() {
    }

    ListNode(int val) {
        this.val = val;
    }

    ListNode(int val, ListNode next) {
        this.val = val;
        this.next = next;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(val);
        return sb.toString();
    }
}

public class _203_移除链表元素 {

    // 方法一：使用递归
    // 执行用时：1 ms
    // 内存消耗：42.1 MB
    public static ListNode removeElements1(ListNode head, int val) {\
        if(head == null){
            return head;
        }
         head.next = removeElements1(head.next,val);
         return head.val == val?head.next:head;
    }

    // 方法二：使用快慢指针
    // 执行用时：0 ms
    // 内存消耗：42.3 MB
    public static ListNode removeElements2(ListNode head, int val) {
        while (head != null && head.val == val) {// 排除第一个节点就相等的情况
            head = head.next;
        }

        if (head == null)
            return head; // 这里有两层意义，第一是本来就是空的([])，第二种是全部删光了的([7,7,7,7]) 注意：一定写在上一步while之后

        ListNode slow = head; // 定义快慢指针，也要写在上一步之后
        ListNode fast = head.next;

        while (fast != null) {
            if (fast.val == val) { // 遇到相等就删除
                slow.next = fast.next;
                fast = slow.next;
            } else { // 否则快慢指针依次后移
                slow = slow.next;
                fast = fast.next;
            }
        }
        return head;
    }

    // 方法三：使用迭代
    // 执行用时：1 ms
    // 内存消耗：41.9 MB
    public static ListNode removeElements3(ListNode head, int val) {
        ListNode dummyHead = new ListNode(0);
        dummyHead.next = head;

        ListNode prev = dummyHead;
        // 判断当前结点的后继结点是否为null
        while (prev.next != null) {
            // 如果当前结点的后继结点的值与给定值val相等
            // 则需将其后继结点删除
            if (prev.next.val == val) {
                // 通过将当前结点后继结点的后继结点挂在当前结点之后
                // 来删除当前结点的后继结点
                prev.next = prev.next.next;
            } else {
                // 如果当前结点的后继结点的值与给定值不相等
                // 则当前结点需要保留，因此prev向前移动一个位置
                prev = prev.next;
            }
        }
        return dummyHead.next;

    }

    // 自己的写法
    // 执行用时：1 ms
    // 内存消耗：42.1 MB
    public static ListNode removeElements_my(ListNode head, int val) {
        if (head == null) {
            return head;
        }
        ListNode current = head;
        ListNode prev = null;
        while (current != null) {
            if (current.val == val) {
                if (prev == null) {
                    head = current.next;
                } else {
                    prev.next = current.next;
                }
            } else {
                prev = current;
            }
            current = current.next;
        }
        return head;
    }

    // 测试代码
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        // head.next = new ListNode(2);
        // head.next.next = new ListNode(3);
        // head.next.next.next = new ListNode(4);
        // head.next.next.next.next = new ListNode(5);
        // head.next.next.next.next.next = new ListNode(6);
        head = removeElements1(head, 1);
        System.out.println(getString(head));
    }

    // 输出字符串
    public static String getString(ListNode head) {
        StringBuilder string = new StringBuilder();
        string.append("[");
        ListNode node = head;
        int index = 0;
        while (node != null) {
            if (index != 0) {
                string.append(", ");
            }
            string.append(node.val);
            node = node.next;
            index++;
        }
        string.append("]");
        return string.toString();
    }
}
