<template>
  <div>
    <NavBar/>

    <Recommendation
        :limitRecommendFilms="limitRecommendFilms"
    />

  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Recommendation from "../components/Recommendation";
export default {
  name: "RecommendationPage",
  components: {Recommendation, NavBar},
  data(){
    return{
      allRecommendFilms: [],
      limitRecommendFilms: []
    }
  },
  mounted() {

    console.log(this.limitRecommendFilms)
  }
}
</script>

<style scoped>

</style>