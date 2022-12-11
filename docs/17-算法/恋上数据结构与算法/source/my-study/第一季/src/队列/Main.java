package 队列;

public class Main {
    public static void main(String[] args) {
        // Queue<Integer> queue = new Queue<>();
        // queue.enQueue(1);
        // queue.enQueue(2);
        // queue.deQueue();
        // queue.enQueue(3);
        // System.out.println(queue);

        // Deque<Integer> deque = new Deque<>();
        // deque.enQueueFront(1);
        // deque.enQueueFront(2);
        // deque.deQueueFront();
        // deque.enQueueRear(3);
        // deque.enQueueFront(4);
        // deque.deQueueRear();
        // System.out.println(deque);

        // CircleQueue<Integer> circleDeque = new CircleQueue<>();
        // circleDeque.enQueue(1);
        // circleDeque.enQueue(2);
        // circleDeque.deQueue();
        // circleDeque.enQueue(3);
        // System.out.println(circleDeque);


       CircleDeque<Integer> circleDeque = new CircleDeque<>();
       circleDeque.enQueueFront(1);
        circleDeque.enQueueFront(2);
        circleDeque.deQueueFront();
        circleDeque.enQueueRear(3);
        circleDeque.enQueueFront(4);
        circleDeque.deQueueRear();
        System.out.println(circleDeque);
    }
}
