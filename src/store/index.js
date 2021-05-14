import Vue from 'vue';
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    actions:{
     async pushAllPages(ctx){

         for (let i = 1; i <= 100; i++) {
             let allActors =[]
             let allFilms = []
                axios
                    .get("https://api.themoviedb.org/3/person/popular?api_key=2a235b91059bbee0cb0dad81130d7beb&language=ru&page="+i)
                    .then((response) => {
                        allActors =  response.data.results
                        this.state.pageActors.push(allActors)
                    })
             axios
                 .get("https://api.themoviedb.org/3/movie/popular?api_key=2a235b91059bbee0cb0dad81130d7beb&language=ru-US&page="+i)
                 .then((response) => {
                     // console.log(response.data.results)
                     allFilms = response.data.results
                     this.state.pageFilms.push(allFilms)
                 })

            }

            ctx.commit('updatePageActors', this.state.pageActors)
         ctx.commit('updatePageFilms', this.state.pageFilms)
         this.state.load = true
        }
    },
    mutations:{
        updatePageActors(state, pages) {
            state.pageActors = pages
        },
        updatePageFilms(state, pages) {
            state.pageFilms = pages
        }
    },
    state:{
        pageActors: [],
        pageFilms: [],
        load: false
    },
    getters:{
        allPageActors(state){
            if (state.load)
            return state.pageActors
        },
        allPageFilms(state){
            if (state.load)
                return state.pageFilms
        }
    },

    modules:{}
})