import { Users } from "../models/userSchema.js";
import { handleLogin } from "../handlers/handleLogin.js";
import bcrypt from "bcrypt";

const mockRequest = {
  body: {
    email: "bcrypt@gmail.com",
    password: "123",
  },
};

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
};

jest.mock("../models/userSchema.js");

describe("handleLogin function", () => {

  it("should try to search database if email exists", async () => {
    await handleLogin(mockRequest, mockResponse);
    // await handleLogin(mockRequest, mockResponse);

    expect(Users.findOne).toHaveBeenCalledWith({ email: "bcrypt@gmail.com" });
  });

  it("should return 401 if user does not exists", async () => {
    //mock db query
    Users.findOne.mockResolvedValue(null);

    await handleLogin(mockRequest, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message:"Invalid credentials"  });
  });

});
