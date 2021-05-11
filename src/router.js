import Vue from "vue";
import Router from 'vue-router'


Vue.use(Router)
export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'home',
            component: () => import ('./views/Home')
        },
        // {
        //     path: '/:username',
        //     name: 'home',
        //     component: () => import ('./views/Home')
        // },
        {
            path: '/films',
            name: 'films',
            component: () => import ('./views/FilmsPage')
        },
        {
            path: '/serials',
            name: 'serials',
            component: () => import ('./views/Serials')
        },
        {
            path: '/actors',
            name: 'actors',
            component: () => import ('./views/ActorsPage')
        },
        // {
        //     path: '/:username/films',
        //     name: 'films',
        //     component: () => import ('./views/FilmsPage')
        // },
        // {
        //     path: '/:username/serials',
        //     name: 'serials',
        //     component: () => import ('./views/Serials')
        // },
        // {
        //     path: '/:username/actors',
        //     name: 'actors',
        //     component: () => import ('./views/ActorsPage')
        // },
        {
            path: '/search',
            name: 'search',
            component: () => import ('./components/SearchResult')
        },
        // {
        //     path: '/actors/:name',
        //     name: 'actorsName',
        //     component: () => import ('./views/AboutActor')
        // },
        // {
        //     path: '/films/:title',
        //     name: 'filmsName',
        //     component: () => import ('./views/AboutFilm')
        // },
        {
            path: '/films/:title',
            name: 'Title',
            component: () => import ('./views/AboutFilm')
        },
        {
            path: '/:name',
            name: 'Name',
            component: () => import ('./views/AboutActor')
        },
        // {
        //     path: '/:username/films/:title',
        //     name: 'Title',
        //     component: () => import ('./views/AboutFilm')
        // },
        // {
        //     path: '/:username/:name',
        //     name: 'Name',
        //     component: () => import ('./views/AboutActor')
        // },
        {
            path: '/likedFilms',
            name: 'Liked',
            component: () => import ('./views/LikedFilms')
        }



    ]
})