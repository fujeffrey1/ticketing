import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";

const supertest = request(app);

it("fetches the order", async () => {
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20,
    });
    await ticket.save();

    const user = global.signup();

    const { body: order } = await supertest
        .post("/api/orders")
        .set("Cookie", user)
        .send({ ticketId: ticket.id })
        .expect(201);

    const { body: fetchedOrder } = await supertest
        .get(`/api/orders/${order.id}`)
        .set("Cookie", user)
        .send()
        .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error if one user tries to fetch another users order", async () => {
    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20,
    });
    await ticket.save();

    const user = global.signup();

    const { body: order } = await supertest
        .post("/api/orders")
        .set("Cookie", user)
        .send({ ticketId: ticket.id })
        .expect(201);

    await supertest
        .get(`/api/orders/${order.id}`)
        .set("Cookie", global.signup())
        .send()
        .expect(401);
});
