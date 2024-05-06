it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });


// import supertest from "supertest";
import request from "supertest";
import {Users} from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




//Create express app to use for testing
import {app, server} from "../socket.js";


test("should respond with a 200 status code", async () => {
  const response = await request(app).post("/register");
  expect(response.statusCode).toBe(200);
})

// app.use(express.json()); // Add JSON parsing middleware to the app
// app.use('/register', registerRouter); // Mount your register router


// Mock the user model's findOne and collection methods
// jest.mock('../models/userSchema', () => ({
//     Users: {
//       findOne: jest.fn(),
//       collection: {
//         insertOne: jest.fn(),
//         updateOne: jest.fn()
//       }
//     }
//   }));
  
//   // Mock bcrypt's genSalt and hash methods
//   jest.mock('bcrypt', () => ({
//     genSalt: jest.fn(),
//     hash: jest.fn()
//   }));
  
//   // Mock jwt's sign method
//   jest.mock('jsonwebtoken', () => ({
//     sign: jest.fn()
//   }));

