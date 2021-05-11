<template>
  <div class=" serials__block">
    <router-link to="/serials"><h1>Популярные сериалы</h1></router-link>
    <flickity ref="flickity" :options="flickityOptions" class="carousel__box" >
      <div class="slide d-flex " v-for="(item,idx) in this.films" :key="idx" >
        <div class="serials__box  " >
          <div class=" serials__box-item">
            <div class="serials__box-item-img">
              <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face' + item.backdrop_path" alt="">
            </div>
            <div class="serials__box-item-title">
              <p class="serials__box-item-title-name">{{item.title}}</p>
              <p class="serials__box-item-title-year">{{ item.release_date }}</p>
            </div>
         </div>
        </div>
      </div>
    </flickity>
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel';
import flickity from "vue-flickity";
export default {
  name: "FilmTrends",
  components: {
    flickity
  },
  props:{
    films: [Array]
  },
  data(){
    return{
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        contain: true,
        freeScroll: true,
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.flickity.rerender()

    },500)
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

.serials__block{

  background: #000000;
  min-height: 640px;
}
@media (max-width: 900px) {
  h1{
    font-size: 6vw !important;
  }
}
h1{
  margin: 50px auto;
  text-align: center;
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 4vw;
  line-height: 58px;
  color: #FFFFFF;
}
h1:hover{
  color: #e50914;
}
.serials__box{
  display: flex;
  background: black;
  margin: 0 30px;
}
.carousel__box{
  margin: 0 65px;
}
.serials__box-item{
  width: 193px;

}
/*.serials__box-item-img{*/
/*  width: 100%;*/
/*  height: 80%;*/
/*}*/
.serials__box-item-title{
  background: #050E12;
  width: 193px;
  height: 66px;
  position: relative;
}
.serials__box-item-title-name{
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
.serials__box-item-title-year{
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
}




</style>