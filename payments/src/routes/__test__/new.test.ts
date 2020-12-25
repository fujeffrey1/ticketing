import request from "supertest";
import mongoose from "mongoose";
import { OrderStatus } from "@fujeffrey1/common";

import { app } from "../../app";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

const supertest = request(app);

it("returns a 404 when purchasing an order that does not exist", async () => {
    await supertest
        .post("/api/payments")
        .set("Cookie", global.signup())
        .send({
            token: "asjfnamsf",
            orderId: mongoose.Types.ObjectId().toHexString(),
        })
        .expect(404);
});

it("returns a 401 when purchasing an order that doesnt belong to the user", async () => {
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status: OrderStatus.Created,
    });

    await supertest
        .post("/api/payments")
        .set("Cookie", global.signup())
        .send({
            token: "asjfnamsf",
            orderId: order.id,
        })
        .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
    const userId = mongoose.Types.ObjectId().toHexString();
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled,
    });

    await supertest
        .post("/api/payments")
        .set("Cookie", global.signup(userId))
        .send({
            token: "asjfnamsf",
            orderId: order.id,
        })
        .expect(400);
});
