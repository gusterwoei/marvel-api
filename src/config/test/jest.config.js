module.exports = {
    rootDir: '../../../',
    verbose: true,
    testMatch: [
        "<rootDir>/**/**.test.js"
    ],
    setupFiles:["<rootDir>/src/config/test/testSetup"],
    testEnvironment: "node",
    reporters: [
        "default",
        ["jest-html-reporters", {
            publicPath: "./src/config/test/reports",
            filename: "unit-tests-report.html",
            pageTitle: "Unit tests report"
        }]
    ]
}