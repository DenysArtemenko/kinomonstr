<template>
  <div class="genre__page">
    <NavBar class="navbar__genre"/>
    <h1>{{nameGenre}}</h1>
    <div class="films__block container">
      <div class="row films__block-table"
           >
        <FilmItem class="film__item"

                  v-for="(item,idx) in this.genreArray" :key="idx"
                  :item="item"
        />
      </div>

    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import FilmItem from "../components/FilmItem";
import axios from "axios";
import {mapGetters} from "vuex";
export default {
  name: "GenrePage",
  components: {NavBar, FilmItem},
  computed: mapGetters(['allPageFilms']),
  data(){
    return{
      genres: [],
      nameGenre: '',
      pageNumber: '',
      genreArray: [],
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

          for (let i = 0; i < this.genres.length; i++) {
            if (this.genres[i].id.toString() === this.$route.params.id){
              this.nameGenre = this.genres[i].name
            }
          }
          this.genreFilter()
        })

  },
  methods: {

    genreFilter(){
      for (let i = 0; i < this.allPageFilms.length; i++) {
        for (let j = 0; j < this.allPageFilms[i].length; j++) {
          for (let k = 0; k < this.allPageFilms[i][j].genre_ids.length; k++) {
              if (this.allPageFilms[i][j].genre_ids[k].toString() === this.$route.params.id){
                this.genreArray.push(this.allPageFilms[i][j])
              }
          }
        }
      }
    }
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
.genre__page{

  background: #000000;
}

.navbar__genre{
  background: black;
}
.films__block-table{
  justify-content: center;
}
.films__block{
  margin: 0 auto !important;
}

.films__block-table{
  justify-content: center;
}

.container{
  margin: 0 auto !important;
}

.row{
  margin: 0 auto !important;
}
.film__item{
  margin: 30px;
}

</style>