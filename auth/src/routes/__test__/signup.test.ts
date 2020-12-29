import request from "supertest";

import { app } from "../../app";

const supertest = request(app);

it("returns a 201 on successful signup", async () => {
    return supertest
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(201);
});

it("returns a 400 with an invalid email", async () => {
    return supertest
        .post("/api/users/signup")
        .send({
            email: "dgkamdflgkmage",
            password: "password",
        })
        .expect(400);
});

it("returns a 400 with an invalid password", async () => {
    return supertest
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "p",
        })
        .expect(400);
});

it("returns a 400 with missing email or password", async () => {
    await supertest
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
        })
        .expect(400);

    await supertest
        .post("/api/users/signup")
        .send({
            password: "p",
        })
        .expect(400);
});

it("disallows duplicate emails", async () => {
    await global.signup();

    await supertest
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(400);
});

it("sets a cookie after successful signup", async () => {
    const cookie = global.signup();

    expect(cookie).toBeDefined();
});
