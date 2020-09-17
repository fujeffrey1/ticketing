import { Publisher, Subjects, TicketCreatedEvent } from "@fujeffrey1/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
