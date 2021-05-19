<template>
  <div>
    <router-link to="/films/user/recommendation"><h1>Ваши рекомендации</h1></router-link>
    <div class="films__block container">
      <div v-if="loaded && user && $route.params.title" class="row films__block-table">
        <FilmItem  class="film__item"
                  v-for="(item,idx) in  filmLimitRecommend" :key="idx"
                  :item="item"
        />
      </div>
      <div v-else-if="loaded && user && !$route.params.title" class="row films__block-table">
        <FilmItem  class="film__item"
                   v-for="(item,idx) in filmRecommend " :key="idx"
                   :item="item"
        />
      </div>
      <div v-else-if="loaded">
        <p>Чтобы видеть рекомендации нужна авторизация</p>
      </div>
    </div>
  </div>
</template>

<script>
import FilmItem from "./FilmItem";
import {mapGetters} from "vuex";
export default {
  name: "Recommendation",
  components:{FilmItem},
  computed:{
    ...mapGetters(["allRecommendFilms"]),
    ...mapGetters(["limitRecommendFilms"])
  },
  // props:{
  //   allRecommendFilms:{
  //     type:Array,
  //     default(){
  //       return []
  //     }
  //   } ,
  //   limitRecommendFilms:{
  //     type:Array,
  //     default(){
  //       return []
  //     }
  //   } ,
  // },
  data(){
    return{
      loaded: false,
      user: '',
      filmRecommend: [],
      filmLimitRecommend:[]
    }
  },

  mounted() {

   this.user = localStorage.user


    this.filmLimitRecommend = this.limitRecommendFilms
    this.filmRecommend = this.allRecommendFilms
    console.log(this.filmRecommend, this.filmLimitRecommend)
    this.loaded = true
  },
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


.film__item{
  margin: 30px;
}
</style>