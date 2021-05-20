<template>
  <div class="about__actor">
    <NavBar/>
    <div class=" actors__box-item"  >
      <div class="actors__box-item-img">
        <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face' + findElement(allPageActors,pageNumber,actorNumber).profile_path" alt="">
      </div>
      <div class="actors__box-item-title">
        <p class="actors__box-item-title-name">{{ findElement(allPageActors, pageNumber, actorNumber).name }}</p>
        <p class="actors__box-item-title-year">Рейтинг {{findElement(allPageActors, pageNumber, actorNumber).popularity}}</p>
      </div>
    </div>
    <div class="row about__films">
      <div class="films__block container text-center">
        <h1>Фильмы с {{findElement(allPageActors, pageNumber, actorNumber).name}}</h1>
        <div v-if="loaded && loading" class="row films__block-table">
          
      <!-- <div v-for="item in topFilms" :key="item.id" class="col-lg-4 text-center about__film-text">
        <router-link :to="`films/${item.original_title}`"><img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face' + item.poster_path" alt=""></router-link>
        <br>
        <h2>{{item.title}}</h2>
        <h2>{{item.name}}</h2>
        <br>
        <p>{{item.overview}}</p>
      </div> -->
      <FilmItem   class="film__item"
                  v-for="(item,idx) in  topFilms" :key="idx"
                  :item="item"
        />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import {mapGetters} from "vuex";
import axios from "axios";
import FilmItem from "../components/FilmItem"
export default {
  name: "AboutActor",
  components: {NavBar, FilmItem},
  props:{

  },


  data() {
    return {
      loaded: false,
      loading: false,
      pageNumber: 0,
      actorNumber: 0,
      idActor: 0,
      allFilms: [],
      topFilms: [],
      actors: []
    }
  },
  computed: {
    ...mapGetters(['allPageActors','allPageFilms']),
    // ...mapGetters(['allPageFilms']),
  },

  mounted(){
  
     this.$store.dispatch('pushAllPages')
     console.log(this.allPageActors)
     console.log(this.allPageActors.length)
     this.loaded = true
     setTimeout(() => {
     this.getFilms()
     },100)
    console.log(this.topFilms)
    this.$store.commit('updateTopFilms', this.topFilms);
  },
  methods: {

    findElement(item, i, j){
      if (item.length>0) {
        for (i = 0; i < 100; i++) {
          for (j = 0; j < 20; j++){
          if (item[i][j].name === this.$route.params.name){
            
            return item[i][j]
          }
          }
        }
      }
    },
     getFilms(){
       console.log(this.allPageActors)
       console.log(this.allPageActors.length)
        this.idActor = this.findElement(this.allPageActors, this.pageNumber, this.actorNumber).id
      console.log(this.idActor)
      axios
          .get("https://api.themoviedb.org/3/person/"+this.idActor+"/movie_credits?api_key=2a235b91059bbee0cb0dad81130d7beb&language=ru-RU")
          .then((response) => {
            this.allFilms = response.data.cast
            
            console.log(this.allFilms)
            for (let i = 0; i < 12; i++) {
              this.topFilms.push(this.allFilms[i])
            }
            console.log(this.topFilms)
                
          })
          this.loading = true
    },
      
  }
}
</script>

<style scoped>
h1{
  font-size: 3vw;
  color: #fff;
}
h2{
  font-size: 26px;
  margin: 20px auto;
}
.about__actor {
  background: #000000;
  height: 100vh;
}

.row{
  margin: 0;
}


.actors__box-item{
  width: 201px;
  padding: 2px;
  border: 2px solid white;
  margin: 50px auto;




}

.actors__box-item-title{
  background: #050E12;
  width: 193px;
  height: 66px;
  position: relative;
}
.actors__box-item-title-name{
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;

  color: #B6B6B6;
  position: absolute;
  padding: 15px 0 25px 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 193px;
}
.actors__box-item-title-year{
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;

  color: #828282;
  position: absolute;
  padding: 40px 0 12px 18px ;
}

img{
  width: 193px;
  height: 282px;
  margin: 0 auto;
}

.about__film-text{
  color: #aaaaaa;
  background-color: black;
}
.film__item{
  margin: 30px;
}
.container{
  margin: 0 auto !important;
}
.about__films{
  background-color: #000;
  
}
.films__block-table{
  justify-content: center;
}
</style>