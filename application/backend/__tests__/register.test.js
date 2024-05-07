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

jest.mock("../models/userSchema.js");

describe("segistration page", () => {
  it("should register a new user", async () => {
    await handleRegistration(mockRequest, mockResponse);
    expect(Users.findOne).toHaveBeenCalledWith({ email: "test@website.com" });
  })
});


