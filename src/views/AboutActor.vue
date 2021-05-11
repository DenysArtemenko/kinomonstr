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
      <div v-for="item in findElement(allPageActors,pageNumber,actorNumber).known_for" :key="item.id" class="col-lg-4 text-center about__film-text">
        <router-link :to="`films/${item.original_title}`"><img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face' + item.poster_path" alt=""></router-link>
        <br>
        <h2>{{item.title}}</h2>
        <h2>{{item.name}}</h2>
        <br>
        <p>{{item.overview}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import {mapGetters} from "vuex";
export default {
  name: "AboutActor",
  components: {NavBar},
  props:{

  },


  data() {
    return {
      loaded: false,
      pageNumber: 0,
      actorNumber: 0
    }
  },
  computed: mapGetters(['allPageActors']),

  async mounted(){
    await this.$store.dispatch('pushAllPages')
    this.loaded = true

  },
  methods: {
    findElement(item, i, j){
      for (i = 0; i < 100; i++) {
        for (j = 0; j < 20; j++){
         if (item[i][j].name === this.$route.params.name){
           return item[i][j]
         }
        }
      }
    },

  }
}
</script>

<style scoped>
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
</style>