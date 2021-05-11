const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require('./config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret,{expiresIn: "24h"} )
}

class AuthController {
    async registration(req, res){
        try {
            res.set('Access-Control-Allow-Origin', '*')
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: "Ошибка при регистрации", errors})

            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = await bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегестрирован'})
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res){
        try {
            // res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000')
            // res.set('Access-Control-Allow-Credentials', 'true')

            res.set('Access-Control-Allow-Origin', '*')
            const {username, password} = req.body
            const user = await User.findOne({username})
            if ((!user)){
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req, res){
        try {
            const users = await User.find()
            // const userRole = new Role()
            // const adminRole = new Role({value: "Admin"})
            // await userRole.save()
            // await adminRole.save()
            res.json(users)
        }catch (e){

        }
    }
    async getLikes(req, res){
        try {
            res.set('Access-Control-Allow-Origin', '*')
            const {username,filmName,like} = req.body.film
            // console.log(req.body.like)
            const user = await User.findOne({username})
            console.log(user)
            if(user) {
                if (user.film.length > 0) {
                    for (let i of user.film) {
                        if (i.filmName === filmName && username === user.username) {
                            i.like = like
                            const updatedUser = await user.save()
                            console.log(updatedUser)
                            return res.json({user: updatedUser, message: `fILM NAME ALREADY EXIST ${like}`})
                        }
                    }

                }
                user.film.push({filmName, like})
                const updatedUser = await user.save()
                console.log(updatedUser)
                res.json({user: updatedUser, message: `Film added to likes array ${like}`})
            }

        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new AuthController()