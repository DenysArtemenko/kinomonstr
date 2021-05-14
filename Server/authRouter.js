const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")



router.post('/registration',[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 12 символов").isLength({min: 4, max: 12})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)
router.put('/likes', controller.getLikes)
router.put('/rating', controller.getRating)
router.put('/stars', controller.getStars)

module.exports = router