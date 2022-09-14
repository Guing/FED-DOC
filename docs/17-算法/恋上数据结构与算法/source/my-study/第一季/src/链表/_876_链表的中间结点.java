package 链表;
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(val);
        return sb.toString();
    }
}

public class _876_链表的中间结点 {


    //方法一：
    //首先遍历一遍单链表，记录链表的长度len，计算中间节点的位置。 
    //用空间换时间：即开辟一个数据ListNode arr[]，记录所有节点，最后返回arr[len/2]的节点即可；
    //用时间换空间：再次遍历以便链表，遍历到len/2次时返回当前节点记为中间节点。
    public static ListNode middleNode1(ListNode head) {
        ListNode[] list = new ListNode[100];
        ListNode current = head;
        int index = 0;
        while(current != null){
             list[index] = current;
             index++;
             current = current.next;
        }
      
        int pos =  index/2; 

        return list[pos];
    }
    //方法2：
    //方法二：利用快慢指针，快指针每次走两步，慢指针每次走一步，所以快指针走的距离为慢指针的两倍，
    //故当快指针遍历到链表末尾时，慢指针指向记为中间节点
    public static ListNode middleNode2(ListNode head) {
        ListNode slow = head;
        ListNode quick = head;
        while(quick !=null && quick.next != null){
            slow = slow.next;
            quick = quick.next.next;
        }
        return slow;

      
    }



     //测试代码
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next   = new ListNode(5);
        head.next.next.next.next.next   = new ListNode(6);
        middleNode2(head);
        System.out.println(getString(head));
    }
    //输出字符串
    public static String getString(ListNode head) {
        StringBuilder string = new StringBuilder();
        string.append("[");
        ListNode node = head;
        int index = 0;
        while(node != null){
           if(index != 0){
            string.append(", ");
           }
            string.append(node.val);
            node =  node.next;
            index++;
        }
        string.append("]");
        return string.toString();
    }
}


