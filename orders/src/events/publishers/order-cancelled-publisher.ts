import { Publisher, Subjects, OrderCancelledEvent } from "@fujeffrey1/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
