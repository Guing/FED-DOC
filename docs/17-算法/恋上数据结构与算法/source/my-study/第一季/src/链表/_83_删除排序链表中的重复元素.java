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

public class _83_删除排序链表中的重复元素 {

    // 方法一：使用迭代
    // 执行用时：0 ms
    // 内存消耗：41.5 MB
    public static ListNode deleteDuplicates(ListNode head ) {
       ListNode newNode = new ListNode(-1000,head);
       ListNode tmp = newNode;
        while(tmp.next != null){
             if(tmp.val == tmp.next.val){
                tmp.next = tmp.next.next;
               
             }else{
                tmp = tmp.next;
             }
             
             
        }
       return newNode.next;
    }
    // 方法二：使用递归
    // 执行用时：0 ms
    // 内存消耗：41.4 MB

    //找终止条件：当head指向链表只剩一个元素的时候，自然是不可能重复的，因此return
    //想想应该返回什么值：应该返回的自然是已经去重的链表的头节点
    //每一步要做什么：宏观上考虑，此时head.next已经指向一个去重的链表了，而根据第二步，我应该返回一个去重的链表的头节点。因此这一步应该做的是判断当前的head和head.next是否相等，如果相等则说明重了，返回head.next，否则返回head
    public static ListNode deleteDuplicates2(ListNode head ) {
        if(head == null || head.next == null){
            return head;
        }
        head.next = deleteDuplicates2(head.next);
        if(head.val == head.next.val) head = head.next;
        return head;
     }
   
  
    // 测试代码
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(3);
        head.next.next = new ListNode(3);
        // head.next.next.next = new ListNode(4);
        // head.next.next.next.next = new ListNode(5);
        // head.next.next.next.next.next = new ListNode(5);
        head = deleteDuplicates(head);
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
