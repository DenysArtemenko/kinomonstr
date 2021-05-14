<template>
  <div>
        <NavBar/>
        <h1>Понравившееся фильмы</h1>

        <TableLikedFilms v-if="loaded" :allPageFilms="allPageFilms"/>
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
  data(){
    return{
      loaded: false
    }
  },


mounted() {
  this.$store.dispatch('pushAllPages')
  this.loaded = true
}


}

</script>

<style scoped>

</style>