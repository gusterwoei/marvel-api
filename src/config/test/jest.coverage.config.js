const baseConfig = require('./jest.config');

module.exports = {
    ...baseConfig,
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/app/**/**.js"
    ]
}