import type { Config } from "jest"
import nextJest from "next/jest"

const createJestConfig = nextJest({
    dir: "./",
})

const customJestConfig: Config = {
    setupFiles: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "<rootDir>/"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
}

export default createJestConfig(customJestConfig)