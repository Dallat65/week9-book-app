import supertest from "supertest";
import app from "../app";
import { dbDisconnect } from "../config/mongoDBmemoryconnection";

afterAll(async () => {
  await dbDisconnect();
});


let token = "";
let bookId = "";
beforeAll(async () => {
  const logUser = {
    firstName: "Nnamdi1",
    lastName: "Anyaele1",
    email: "dallatworld@gmail.com",
  };

  await supertest(app)
    .post("/users/create")
    .send(logUser);

    const loginBody = {
        "email": "dallatworld@gmail.com",
         "password": "Anyaele127966"
    };

    const resLogin = await supertest(app).post(`/users/login`).send(loginBody);
    token = resLogin.body.token
    // console.log({resLogin});

});




describe("Books Routes", () => {
  test("should create a new book", async () => {
    const newBook =  {"title": "!Police is your friend",
    "description": "new edition",
    "pagecount": "250",}

    const res = await supertest(app)
      .post(`/books/create`)
      .send(newBook)
      .set("authorization", `Bearer ${token}`);
      bookId = res.body.book._id
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("book");
    expect(res.body.book).toHaveProperty("_id");
    expect(res.body.message).toEqual("Book created successfully!");
  });




  test("should get all books", async () => {
    const res = await supertest(app)
      .get(`/books/getAllBooks`)
      .set("authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("allBooks");
    expect(res.body.message).toEqual("Books fetched successfully!");
  });


  test("should update a book", async () => {
    const newBook = {

        "title": "!Police is your friend",
              "description": "new edition",
              "pagecount": 251
    };

    const res = await supertest(app)

      .put(`/books/updateBook`)
      .send(newBook)
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("updatedBook");
    expect(res.body.updatedBook).toHaveProperty("_id");
    expect(res.body.message).toEqual(`book updated successfully!`);
  });



  test("should delete a book", async () => {
    const deletedBook = {
        "title": "!Police is your friend",
    };

    const res = await supertest(app)
      .delete(`/books/deletingBook`)
      .send(deletedBook)
      .set("authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("book deleted successfully!");

  });

});