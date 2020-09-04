import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
    namespace NodeJS {
        interface Global {
            signup(): string[];
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

global.signup = () => {
    // Build JWT payload. { id, email }
    const payload = {
        id: "1",
        email: "test@test.com",
    };
    const token = jwt.sign(payload, process.env.JWT_KEY!); // Create the JWT
    const session = { jwt: token }; // Build session object. { jwt: MY_JWT }
    const sessionJSON = JSON.stringify(session); // Turn session into JSON
    const base64 = Buffer.from(sessionJSON).toString("base64"); // Take JSON and encode it as base64

    return [`express:sess=${base64}`]; // Return a string that is the cookie with the encoded data
};
