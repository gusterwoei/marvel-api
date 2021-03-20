const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const express = require('express')
const router = express.Router()
const path = require('path');
const characterController = require('./character/character.controller')

// API endpoint routing
router.route('/characters').get(characterController.getCharacters)
router.route('/characters/:id').get(characterController.getCharacterDetail)

// swagger configuration
const options = {
    definition: {
        // open api version
        openapi: '3.0.0',

        // swagger pages
        info: {
            title: 'Marvel API',
            version: '1.0.0'
        },
    }, 

    //path to collect swagger comment
    apis: [ path.join(__dirname, '/*/*swagger.js') ]
}

// generate jsDoc
const swaggerSpec = swaggerJSDoc(options)

// open swagger api
router.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = router