import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";

it("returns a 404 if the provided id does not exist", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set("Cookie", global.signup())
        .send({
            title: "asfjkgnaksjgvmasd",
            price: 40,
        })
        .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "asfjkgnaksjgvmasd",
            price: 40,
        })
        .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
    const response = await request(app).post("/api/tickets").set("Cookie", global.signup()).send({
        title: "asfjkgnaksjgvmasd",
        price: 40,
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", global.signup())
        .send({
            title: "ddfdsfv",
            price: 45,
        })
        .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
    const cookie = global.signup();

    const response = await request(app).post("/api/tickets").set("Cookie", cookie).send({
        title: "asfjkgnaksjgvmasd",
        price: 40,
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "",
            price: 45,
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title: "ddfdsfv",
            price: -45,
        })
        .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
    const cookie = global.signup();
    const title = "new title";
    const price = 100;

    const response = await request(app).post("/api/tickets").set("Cookie", cookie).send({
        title: "asfjkgnaksjgvmasd",
        price: 40,
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set("Cookie", cookie)
        .send({
            title,
            price,
        })
        .expect(200);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});
