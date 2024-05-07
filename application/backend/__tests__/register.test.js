import { handleRegistration } from "../handlers/handleRegisterUser.js";
import { Users } from "../models/userSchema.js";

//think of this as request.body.email
const mockRequest = {
  body : {
    email: "test@website.com",
    password: "123",
    username: "test",
  }
};

//jest will mock the status and json function
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
};

//for Users.mockResolvedValue() call
jest.mock("../models/userSchema.js");

// describe("segistration page", () => {
//   it("should register a new user", async () => {
//     await handleRegistration(mockRequest, mockResponse);
//     expect(Users.findOne).toHaveBeenCalledWith({ email: "test@website.com" });
//   })
// });

describe("Registration Page", () => {
  it("should register a new user", async () => {
    //Users.findOne return a null value 
    Users.findOne.mockResolvedValue(null);

    await handleRegistration(mockRequest, mockResponse);

    expect(Users.findOne).toHaveBeenCalledWith({ email: "test@website.com" });
    expect(mockResponse.status).not.toHaveBeenCalledWith(409);
    //there is an insertId error here since we're not actually putting anything into MongoDB
  });

  it("should respond with 409 if the email already exists", async () => {
    //Users.findOne return a user
    Users.findOne.mockResolvedValue({});

    await handleRegistration(mockRequest, mockResponse);

    expect(Users.findOne).toHaveBeenCalledWith({ email: "test@website.com" });
    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Email is already in use" });
  });
});

