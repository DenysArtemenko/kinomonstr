<template>
  <div>
    <NavBar/>

    <Recommendation

    />

  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import Recommendation from "../components/Recommendation";
export default {
  name: "RecommendationPage",
  components: {Recommendation, NavBar},


}
</script>

<style scoped>

</style>