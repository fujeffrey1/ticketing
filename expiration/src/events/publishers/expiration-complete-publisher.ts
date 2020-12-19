import {
    Publisher,
    Subjects,
    ExpirationCompleteEvent,
} from "@fujeffrey1/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
