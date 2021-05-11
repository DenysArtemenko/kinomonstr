<template>
  <div class="actor__page">
    <NavBar class="navbar__actor"/>
    <div class="container">
      <h1>Фильмы</h1>
      <div class="row actor__page-genres">
        <h2>Боевик</h2>
        <h2>Комедия</h2>
        <h2>Фантастика</h2>
        <h2>Детектив</h2>
        <h2>Исторический</h2>
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
// import axios from "axios";
// import SearchForm from "../components/SearchForm";
import TableFilms from "../components/TableFilms";
import {mapGetters} from "vuex";
export default {
  name: "FilmsPage",
  components: {
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
      loadingFilm: false,
    }
  },



  mounted() {
    this.$store.dispatch('pushAllPages')
    console.log(this.allPageFilms)
  //   axios
  //       .get("https://api.themoviedb.org/3/movie/popular?api_key=2a235b91059bbee0cb0dad81130d7beb&language=en-US&page=1")
  //       .then((response) => {
  //         // console.log(response.data.results)
  //         this.films = response.data.results
  //         this.loadingFilm = true
  //       })
  //
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
  .actor__page-genres{
    justify-content: space-between;
    margin: 50px 0;
    color: #aaaaaa;
  }
  .navbar__actor{
    background: black;
  }



</style>