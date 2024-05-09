// Using ES6 export in .mjs file
export default {
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleNameMapper: {
      '\\.(css|scss|less)$': 'identity-obj-proxy',
    }
};
