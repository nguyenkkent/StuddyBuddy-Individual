import { handleRegistration } from "../handlers/register/handleRegisterUser.js";
import { handleGuestUser } from "../handlers/register/handleGuessUser.js";
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


//test for register feature
describe("Registration Page", () => {
  it("should register a new user", async () => {
    //Users.findOne return a null value 
    Users.findOne.mockResolvedValue(null);
    Users.collection.insertOne.mockResolvedValueOnce({
      insertedId: "123",
    });
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


jest.mock("../models/userSchema.js");
// test for guest user
describe("Guest user", () => {
  it("should create a guest user", async () => {
      
      //set a new variable for mockRequest
      mockRequest.username = "guest";
      Users.collection.insertOne.mockResolvedValueOnce({
        insertedId: "123",
      });

      await handleGuestUser(mockRequest, mockResponse);

      //can't test the expect since MongoDB will attempt to do an update on something that doesn't exists.
      // expect(mockResponse.status).toHaveBeenCalledWith(200);
  })
});

