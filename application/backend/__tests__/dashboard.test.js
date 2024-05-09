import { handleDashboard } from "../handlers/handleDashboard.js";
import { Users } from "../models/userSchema.js";

const mockRequest = {
    body: {
        username: "test@website.com",
    }
};

const mockResponse = {
    status : jest.fn().mockReturnThis(),
    json : jest.fn(),
    send: jest.fn(),
}

jest.mock("../models/userSchema.js");

describe("handle dashboard component", () => {
    it("should load user data", async () => {
        const userData = [{ name: "Test User", email: "test@website.com" }];
        Users.collection.find = jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue(userData) });

        await handleDashboard(mockRequest, mockResponse);

        expect(Users.collection.find).toHaveBeenCalledWith("test@website.com");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({ userData }); 
    });

});