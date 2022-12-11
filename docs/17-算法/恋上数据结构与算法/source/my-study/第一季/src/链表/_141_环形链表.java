package 链表;

import java.rmi.server.RemoteStub;
import java.util.ArrayList;

//https://leetcode.cn/problems/linked-list-cycle/
public class _141_环形链表 {
	class ListNode {
		int val;
		ListNode next;

		ListNode(int x) {
			val = x;
			next = null;
		}
	}
//使用快，慢指针思想
	public boolean hasCycle(ListNode head) {
		if(head == null  || head.next == null) {
			return false;
		}
		
		ListNode low = head;
		ListNode fast = head.next;
		while(fast != null && fast.next != null) {
			low = low.next;
			fast = fast.next.next;
			if(low == fast) {
				 return true;
			}
		}
		return false;
	}

}
