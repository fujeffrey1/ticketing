import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "../app";

const supertest = request(app);

declare global {
    namespace NodeJS {
        interface Global {
            signup(): Promise<string[]>;
        }
    }
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = "glakmdklfmavlke";

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signup = async () => {
    const email = "test@test.com";
    const password = "password";

    const response = await supertest
        .post("/api/users/signup")
        .send({ email, password })
        .expect(201);

    const cookie = response.get("Set-Cookie");

    return cookie;
};
