<template>
  <div class="films__block container">
    <div v-if="loaded" class="row films__block-table">
      <FilmItem class="film__item"

            v-for="(item,idx) in likedFilms" :key="idx"
            :item="item"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FilmItem from "./FilmItem";

export default {
  name: "TableLikedFilms",
  components: {FilmItem},
  data(){
    return{
      username: '',
      users: [],
      likedFilms: [],
      pageNumber: 0,
      filmNumber: 0,
      loaded: false
    }
  },
  props: {
    allPageFilms: [Array]
  },
  mounted() {

    this.username = localStorage.username

    axios.get('http://localhost:5000/auth/users')
        .then(response => {
          this.users = response.data

          this.findLikedElement(this.allPageFilms, this.pageNumber, this.filmNumber)
          this.loaded = true
        })



  },
  methods: {
    findLikedElement(item, i, j) {
      console.log(item.length , this.users.length)
      if (item.length>0 && this.users.length>0) {
        for (let k of this.users) {
          if (k.username === this.username) {
            for (i = 0; i < 100; i++) {
              for (j = 0; j < 20; j++) {
                for (let n = 0; n < k.film.length; n++) {
                  if (item[i][j].original_title === k.film[n].filmName ) {
                    if(k.film[n].like) {
                      console.log(123)
                      this.likedFilms.push(item[i][j])
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  }
}
</script>

<style scoped>
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