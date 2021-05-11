<template>
  <div class=" actors__block">
    <router-link to="/actors"><h1>Популярные актеры</h1></router-link>
    <flickity ref="flickity" :options="flickityOptions" class="carousel__box" >
      <div class="slide d-flex " v-for="(item,idx) in this.actors" :key="idx" >
        <div class="actors__box " >
          <ActorItem
              :item="item"
          />
        </div>
      </div>
    </flickity>

  </div>
</template>

<script>
import ActorItem from "./ActorItem";
import flickity from "vue-flickity";
import '@ocrv/vue-tailwind-pagination/dist/style.css'
export default {
  name: "ActorTrends",
  components: {
    ActorItem,
    flickity
  },
  props: {
    actors: [Array]
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
        // any options from Flickity can be used
      },
    }

  },
  mounted() {

      this.$refs.flickity.rerender()


  },
}
</script>

<style scoped>
.actors__block{
  background: #000000;
  min-height: 640px;
}
.carousel__box{
  margin: 0 65px;
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
  text-decoration: none;
  color: #e50914;
}

.actors__box{
  display: flex;
  background: black;
  margin: 0 30px;
}
</style>