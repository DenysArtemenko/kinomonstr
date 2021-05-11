<template>
  <div>
    <NavBar/>
    <h1>Понравившееся фильмы</h1>

    <TableLikedFilms :allPageFilms="allPageFilms"/>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

import TableLikedFilms from "../components/TableLikedFilms";
import {mapGetters} from "vuex";
export default {
  name: "LikedFilms",
  components: {NavBar, TableLikedFilms},
  computed: mapGetters(['allPageFilms']),


mounted() {
  this.$store.dispatch('pushAllPages')

}


}

</script>

<style scoped>

</style>