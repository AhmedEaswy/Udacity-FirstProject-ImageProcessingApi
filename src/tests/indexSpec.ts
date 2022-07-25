import supertest from "supertest";
import app from "../index";

const request = supertest.agent(app);

describe("Get /image/:fileName endpoint", () => {

  it("Expect to success", async () => {
    const response = await request.get("/image/1.jpg");
    expect(response.status).toBe(200);
  });

  
  it("Expect to throw error not found", async () => {
    const response = await request.get("/image/274856.jpg");
    expect(response.status).toBe(404);
  });

});
