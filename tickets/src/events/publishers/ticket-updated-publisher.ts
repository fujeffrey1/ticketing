import { Publisher, Subjects, TicketUpdatedEvent } from "@fujeffrey1/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
