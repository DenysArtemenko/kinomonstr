import Vue from 'vue';
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        pageActors: [],
        pageFilms: [],
        load: false,
        allRecommendFilms: [],
        limitRecommendFilms: [],
        topFilms: []
    },
    actions:{

     async pushAllPages({state,commit}){
         let allActors =[]
         let allFilms = []
         for (let i = 1; i <= 100; i++) {

                axios
                    .get("https://api.themoviedb.org/3/person/popular?api_key=2a235b91059bbee0cb0dad81130d7beb&language=ru&page="+i)
                    .then((response) => {
                        allActors =  response.data.results
                        state.pageActors.push(allActors)

                    })
             axios
                 .get("https://api.themoviedb.org/3/movie/popular?api_key=2a235b91059bbee0cb0dad81130d7beb&language=ru-US&page="+i)
                 .then((response) => {
                     // console.log(response.data.results)
                     allFilms = response.data.results
                     state.pageFilms.push(allFilms)
                 })

            }


         commit('updatePageActors', state.pageActors)
         commit('updatePageFilms', state.pageFilms)

         // state.load = true
        }
    },
    mutations:{
        updatePageActors(state, pages) {
            state.pageActors = pages
        },
        updatePageFilms(state, pages) {
            state.pageFilms = pages
        },
        updateAllRecommendFilms(state, recFilms) {
            state.allRecommendFilms = recFilms
        },
        updateLimitRecommendFilms(state, recFilms) {
            state.limitRecommendFilms = recFilms
        },
        updateTopFilms(state, topFilms) {
            state.topFilms = topFilms

        }

    },

    getters:{
        allRecommendFilms(state){
                return state.allRecommendFilms
        },
        limitRecommendFilms(state){
                return state.limitRecommendFilms
        },
        allPageActors(state){

            return state.pageActors
        },
        allPageFilms(state) {

            return state.pageFilms
        },
        topFilms(state){

            return state.topFilms
        }
    },

    modules:{}
})