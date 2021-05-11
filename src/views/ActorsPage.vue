<template>
  <div class="actor__page">
    <NavBar class="navbar__actor"/>
    <h1>Актеры</h1>
<!--    <SearchForm/>-->

    <TableActors :allPageActors="allPageActors"/>



  </div>
</template>

<script>
// import SearchForm from "../components/SearchForm";
import NavBar from "../components/NavBar";
import TableActors from "../components/TableActors";
import {mapGetters} from "vuex";



export default {
  name: "ActorsPage",
  components: {
     TableActors, NavBar,
    // SearchForm
  },
  data() {
    return {
      items: [],

    }
  },
  computed: mapGetters(['allPageActors']),

   mounted(){

     this.waitLoading()

    // console.log(this.allPages)
  },

  methods:{
    waitLoading(){
       this.$store.dispatch('pushAllPages')

    }
  }


}
</script>

<style scoped>
h1{
  text-align: center;
  margin-left: 65px;
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 58px;
  color: #FFFFFF;
  text-decoration: none;
}
.actor__page{
  background: #000000;
}
.navbar__actor{
  background: black;
}
</style>