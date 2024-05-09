const config = {
    clearMocks: true,
    coverageProvider: "v8",
    moduleFileExtensions: [
        "js",
        "jsx",
        "mjs",
        "cjs",
        "json",
        "node"
    ],
    transform: {
        "\\.[jt]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!axios).+\\.js$"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    testEnvironment: 'jsdom'
};

export default config;