const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        expect.hasAssertions();
        const response = await request(app)
            .get("/")
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Hello World!");
    });
});

describe("Test the status path", () => {
    test("It should response with JSON containing API status", async () => {
        expect.hasAssertions();
        const response = await request(app)
            .get("/status")
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ status: "API is running" });
    });
});

describe("Test the version path", () => {
    test("It should response with JSON containing API version", async () => {
        const response = await request(app).get("/version")
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ version: "1.0.1" });
    });
});
