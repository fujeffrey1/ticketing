import { Publisher, Subjects, PaymentCreatedEvent } from "@fujeffrey1/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
