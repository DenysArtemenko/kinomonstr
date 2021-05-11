<template>
  <div class=" films__block">
    <router-link to="/films"><h1>Популярные фильмы</h1></router-link>
    <flickity ref="flickity" :options="flickityOptions" class="carousel__box" >
      <div class="slide d-flex " v-for="(item,idx) in this.films" :key="idx" >

                <div class="films__box " >
                      <FilmItem
                      :item="item"
                      />
                </div>
      </div>
    </flickity>



  </div>
</template>

<script>

// import axios from "axios";
import flickity from "vue-flickity";
import FilmItem from "./FilmItem";


export default {
  name: "FilmTrends",
  components: {
    FilmItem,
    flickity
  },
  props:{
    films: [Array],

  },
  data(){
    return{
      // films: [],
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        contain: true,
        freeScroll: true,
        // any options from Flickity can be used
      },

    }


  },

  mounted() {
      this.$refs.flickity.rerender()
  },
  computed:{

  },
  methods: {
    next() {
      this.$refs.flickity.next();
    },

    previous() {
      this.$refs.flickity.previous();
    }
  }


}
</script>

<style scoped>
@media (max-width: 900px) {
  h1{
    font-size: 6vw !important;
  }
}

.films__block{
  background: #000000;
  min-height: 640px;
}
.carousel__box{
  margin: 0 65px;
}
h1{
  text-align: center;
  margin: 50px auto;
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 4vw;
  line-height: 58px;
  color: #FFFFFF;
  text-decoration: none;
}
h1:hover{
  text-decoration: none;
  color: #e50914;
}

.films__box{
  display: flex;
  background: black;
  margin: 0 30px;
}







</style>