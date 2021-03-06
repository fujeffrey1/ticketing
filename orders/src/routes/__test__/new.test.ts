import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

const supertest = request(app);

it("returns an error if the ticket does not exist", async () => {
    const ticketId = mongoose.Types.ObjectId();

    await supertest
        .post("/api/orders")
        .set("Cookie", global.signup())
        .send({ ticketId })
        .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20,
    });
    await ticket.save();

    const order = Order.build({
        ticket,
        userId: "adglkjnamfkldgsa",
        status: OrderStatus.Created,
        expiresAt: new Date(),
    });
    await order.save();

    await supertest
        .post("/api/orders")
        .set("Cookie", global.signup())
        .send({ ticketId: ticket.id })
        .expect(400);
});

it("reserves a ticket", async () => {
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20,
    });
    await ticket.save();

    await supertest
        .post("/api/orders")
        .set("Cookie", global.signup())
        .send({ ticketId: ticket.id })
        .expect(201);
});

it("emits an order created event", async () => {
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20,
    });
    await ticket.save();

    await supertest
        .post("/api/orders")
        .set("Cookie", global.signup())
        .send({ ticketId: ticket.id })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
