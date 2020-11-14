import { Publisher, Subjects, OrderCreatedEvent } from "@fujeffrey1/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
