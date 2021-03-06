import request from "supertest";

import { app } from "../../app";
const supertest = request(app);

const createTicket = () => {
    return supertest
        .post("/api/tickets")
        .set("Cookie", global.signup())
        .send({ title: "egdvlkmaf", price: 30 });
};

it("can fetch a list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await supertest.get("/api/tickets").send().expect(200);

    expect(response.body.length).toEqual(3);
});
