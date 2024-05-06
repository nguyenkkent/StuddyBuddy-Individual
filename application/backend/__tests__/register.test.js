it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });

// import request from 'supertest'; 
// import express from 'express';
// import registerRouter from './register'; 
// import {Users} from "../models/userSchema.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const request = require('supertest');
const express = require('express');
const registerRouter = require('../routes/register'); 
const { Users } = require('../models/userSchema'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a mock express app to use for testing
// const app = express();
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

