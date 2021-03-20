/**
 * @author Guster
 * @email gusterwoei@gmail.com
 * @create date 2021-03-20 15:31:38
 * @modify date 2021-03-20 15:31:38
 * @desc router
 */

const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const express = require('express')
const router = express.Router()
const characterController = require('./character/character.controller')

// API endpoint routing
router.route('/characters').get(characterController.getCharacters)
router.route('/characters/:id').get(characterController.getCharacterDetail)

// swagger configuration
const options = {
    definition: {
        // open api version
        openapi: '3.0.0',
        info: {
            title: 'Marvel API',
            version: '1.0.0'
        },
    }, 
    apis: ['./src/swagger/*.yml']
}
const swaggerSpec = swaggerJSDoc(options)

// open swagger api
router.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = router