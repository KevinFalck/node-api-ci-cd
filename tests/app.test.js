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