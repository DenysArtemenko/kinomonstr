<template>
  <div>
      <p @click="routeId">{{item}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "filmGenre",
  props:{
    item: String,

  },
  mounted() {
    axios
        .get("https://api.themoviedb.org/3/genre/movie/list?api_key=2a235b91059bbee0cb0dad81130d7beb&language=en-US")
        .then((response) => {
          // console.log(response.data.results)
          this.genres = response.data.genres
          this.loaded = true

        })
  },
  methods: {
    routeId(){

      for (let i = 0; i < this.genres.length; i++) {
          if (this.genres[i].name === this.item) {
           return  this.$router.push({ path: `/films/genre/${this.genres[i].id}` })
          }
      }

    }
  }
}
</script>

<style scoped>
p{

  margin: 0 auto;
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #FFFFFF;
  text-decoration: none;

}
</style>