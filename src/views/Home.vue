<template>
  <div class="home">
    <div class="header">
    <router-view/>
    <NavBar/>
    <Title/>
    <SearchForm v-if="loadingFilm && loadingActor" :films="films"
                 :actors="actors"
                :allPageActors="allPageActors"
    />
    </div>
    <b-button  @click="goToLikedFilm" lg="4" class="pb-2" variant="danger" >Понравившиеся фильмы</b-button>
    <FilmTrends v-if="loadingFilm" :films="films "/>
<!--    <SerialTrends v-if="loadingFilm" :films="films"/>-->
    <ActorTrends v-if="loadingActor" :actors="actors"/>

  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import SearchForm from "../components/SearchForm";
import FilmTrends from "../components/FilmTrends";
// import SerialTrends from "../components/SerialTrends"
import axios from "axios";
import ActorTrends from "../components/ActorTrends";
import {mapGetters} from "vuex";

// import {mapGetters} from 'vuex'

export default {
  name: "Home",
  components: {ActorTrends, FilmTrends, SearchForm, Title, NavBar,
    // SerialTrends
  },
  computed: mapGetters(['allPageActors', 'allPageFilms']),

  data(){
    return{
      films: [],
      actors: [],
      loadingFilm: false,
      loadingActor: false
    }
  },
  // computed: mapGetters(['allPages']),


   created() {
     this.$store.dispatch('pushAllPages')
    // axios
    //     .get("https://api.themoviedb.org/3/search/movie?api_key=2a235b91059bbee0cb0dad81130d7beb&language=ru&page=1&include_adult=false&query=A")
    //     .then((response) => {this.films = response.data.results
    //       this.loadingFilm = true
    //       // console.log(response.data.results)
    //         }
    //     )
      axios
        .get("https://api.themoviedb.org/3/person/popular?api_key=2a235b91059bbee0cb0dad81130d7beb&language=ru&page=1")
        .then((response) => {
          // console.log(response)
           this.actors = response.data.results
          this.loadingActor = true
        })

     axios
         .get("https://api.themoviedb.org/3/movie/popular?api_key=2a235b91059bbee0cb0dad81130d7beb&language=en-US&page=1")
         .then((response) => {
            // console.log(response.data.results)
           this.films = response.data.results
            this.loadingFilm = true
         })

  },

  methods:{
    goToLikedFilm(){
      this.$router.push('/likedFilms')
    }
  },

  // async mounted(){
  //   await this.$store.dispatch('pushAllPages')
  //   console.log(this.allPages)
  // }
}



</script>

<style>

.header{
  position: relative;
  height: 750px;
  background-image: linear-gradient( rgba(255, 255, 255, 0), rgba(0, 0, 0, 1) ), url("../assets/netflix.jpg");
  background-size: cover;

}
.home{
  background-color: black;
}

</style>

