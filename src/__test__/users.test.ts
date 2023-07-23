import supertest from "supertest"
import app from "../app"
import { dbDisconnect } from "../config/mongoDBmemoryconnection";

afterAll(async () => {
    await dbDisconnect();
  });
  
  describe("user register and authentication", () =>{
     test("should create an account for a new user", async () =>{
  
          const user = {
              "firstName": `Daniel${Math.random().toString(36).substring(2, 7)}`,
              "lastName": `Jegede${Math.random().toString(36).substring(2, 7)}`,
              "email": `dallatworld${Math.random().toString(36).substring(2, 7)}@gmail.com`
  
          }
          const res = await supertest(app).post(`/users/create`).send(user);
          expect (res.status).toBe(200);
          expect (res.body).toHaveProperty("message");
          expect (res.body).toHaveProperty("user");
          expect (res.body).toHaveProperty("role");
          expect (res.body.user).toHaveProperty("_id");
          expect (res.body.message).toEqual("User created successfully!");
  
     });

});

beforeAll(async () => {
    const logUser = {
        "firstName": "Nnamdi1",
        "lastName": "Anyaele1",
        "email": "dallatworld@gmail.com"

    }
    await supertest(app)
        .post("/users/create")
        .send(logUser);
});

describe("user authentication", () =>{
   test("should test for login", async () =>{

        const user = {
            "email": "dallatworld@gmail.com",
             "password": "Anyaele127966"

        };
        const res = await supertest(app).post(`/users/login`).send(user);
        expect (res.status).toBe(200);
        console.log("res.body", res.body)
        expect (res.body).toHaveProperty("message");
        expect (res.body).toHaveProperty("email");
        expect (res.body).toHaveProperty("token");
        expect (res.body.message).toEqual("Login successful");

   })

});