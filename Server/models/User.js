const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    // like: [{type: Boolean, required: true}]
    film: [
        {
            filmName: {type: String},
            like: {type: Boolean},
            rating: {type: Number}
        }],
    ratingStarsFilms:[
        {
            rating5StarFilms: {type: Array},
            rating4StarFilms: {type: Array},
            rating3StarFilms: {type: Array},
            rating2StarFilms: {type: Array},
            rating1StarFilms: {type: Array}
        }],
})

module.exports = model('User', User)