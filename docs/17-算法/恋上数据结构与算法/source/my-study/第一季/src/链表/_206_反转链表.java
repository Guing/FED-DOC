package 链表;

import java.rmi.server.RemoteStub;
import java.util.ArrayList;
//https://leetcode.cn/problems/reverse-linked-list/
public class _206_反转链表 {
	class ListNode {
	     int val;
	     ListNode next;
	     ListNode() {}
	      ListNode(int val) { this.val = val; }
	      ListNode(int val, ListNode next) { this.val = val; this.next = next; }
	 }
//	使用递归
	public ListNode reverseList_1(ListNode head) {
		if(head == null) {
			 return  null;
		}
		if(head.next == null) {
			return head;
		}
		ListNode newHead = reverseList_1(head.next);
		head.next.next = head;
		head.next = null;
		return newHead;
	}
//	不使用递归
	public ListNode reverseList_2(ListNode head) {
		if(head == null) {
			 return  null;
		}
		if(head.next == null) {
			return head;
		}
		ListNode newHead = null;
		while(head !=null) {
			ListNode tmp = head.next;
			head.next = newHead;
			newHead = head;
			head = tmp;
		}
		return newHead;
	}
//自己的想法-错误
	public ListNode reverseList_my(ListNode head) {
		
		ArrayList<ListNode> list = new ArrayList<>();
	    ListNode myHead = head;
		while(myHead != null) {
			list.add(myHead);
			myHead = head.next;
		}
		ListNode current = null;
		ListNode prev  = null;
	    for (int i = list.size()-1; i >=0; i--) {
	    	 prev = current;
	    	 current =list.get(i);
			 if(prev != null) {
				 prev.next = current;
			 }
			 if(i == list.size()) {
				 myHead = current;
			 }
		}
		
		
		return myHead;

    }
}
