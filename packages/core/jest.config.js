module.exports = {
    roots: ["<rootDir>/src"],
    setupFilesAfterEnv: ["../../tests/setupJest.ts"],
    testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
