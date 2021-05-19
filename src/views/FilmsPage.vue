<template>
  <div class="actor__page">
    <NavBar class="navbar__actor"/>
    <div class="container">
      <h1>Фильмы</h1>
      <div v-if="loaded" class="row films__block-table" >
        <Genre v-for="(genre,idx) in genres" :key="idx"
                :genre = genre
      />
      </div>
    </div>
<!--    <SearchForm v-if="loadingFilm" :films="films"-->
<!--    />-->
<!--    <SearchResult-->
<!--        v-for="films in allPageFilms"-->
<!--        :key="films.id"-->
<!--        :films="films"/>-->
    <TableFilms :allPageFilms="this.allPageFilms"/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
// import SearchResult from "../components/SearchResult";
import axios from "axios";
// import SearchForm from "../components/SearchForm";
import TableFilms from "../components/TableFilms";
import {mapGetters} from "vuex";
import Genre from "../components/Genre";
export default {
  name: "FilmsPage",
  components: {
    Genre,
    TableFilms,
    // SearchForm,
    // SearchResult,
    NavBar},
  props:{
    titles: Array
  },
  computed: mapGetters(['allPageFilms']),
  data(){
    return{
      films: [],
      actors: [],
      loaded: false,
      genres: [],
    }
  },



  mounted() {
    this.$store.dispatch('pushAllPages')
    axios
        .get("https://api.themoviedb.org/3/genre/movie/list?api_key=2a235b91059bbee0cb0dad81130d7beb&language=en-US")
        .then((response) => {
          // console.log(response.data.results)
          this.genres = response.data.genres
          this.loaded = true
          console.log(this.genres)

        })

  }

}

</script>

<style scoped>
  h1{
    text-align: center;
    margin: 0 auto;
    font-family: Inter,sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 58px;
    color: #FFFFFF;
    text-decoration: none;
  }
  @media (max-width: 1000px) {


    h2 {
      font-size: 3vw;
    }
  }
  .actor__page{

    background: #000000;
  }

  .navbar__actor{
    background: black;
  }
  .films__block-table{
    justify-content: center;
  }



</style>