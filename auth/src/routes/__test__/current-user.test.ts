import request from "supertest";

import { app } from "../../app";

const supertest = request(app);

it("responds with details about the current user", async () => {
    const cookie = await global.signup();

    const response = await supertest
        .get("/api/users/currentuser")
        .set("Cookie", cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
    const response = await supertest
        .get("/api/users/currentuser")
        .send()
        .expect(200);

    expect(response.body.currentUser).toBeNull();
});
