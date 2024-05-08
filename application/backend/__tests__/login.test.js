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
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

jest.mock("../models/userSchema.js");

describe("handleLogin function", () => {

  it("should try to search database if email exists", async () => {
    await handleLogin(mockRequest, mockResponse);

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(mockRequest.body.password, salt); 

    // expect(Users.findOne).toHaveBeenCalledWith({ email: "bcrypt@gmail.com", password: hashedPassword });
    expect(Users.findOne).toHaveBeenCalledWith({ email: "bcrypt@gmail.com" });


  });
});
