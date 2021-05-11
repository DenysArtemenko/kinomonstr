<template >
  <div class="films__block container">
    <div class="row">
      <ActorItem class="film__item"
                 v-for="(item,idx) in allPageActors[pageNumber-1]" :key="idx"
                 :item="item"
      />
    </div>
<!--    <Loader v-if="loading"/>-->
    <div class="overflow-auto">
      <b-pagination-nav  :link-gen="linkGen" :number-of-pages="100" use-router></b-pagination-nav>
    </div>



  </div>
</template>

<script>
// import {mapGetters} from "vuex";


import ActorItem from "./ActorItem";
// import Loader from "./Loader";
export default {
  components: {
    // Loader,
    ActorItem
  },
  props: {
    items: [Array],
    allPageActors: [Array],

  },
  data() {
    return {
      pageNumber: '',
      loading: true
    };
  },
  // computed: mapGetters(['allPages']),

  methods: {
    linkGen(pageNum) {
      this.pageNumber = pageNum
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },

    async mounted() {
      // await this.$store.dispatch('pushAllPages')
      // console.log(this.pageNumber)
      this.loading = false
    },

  }
};
</script>
<style scoped>
.films__block{
}
.row{
  margin-left: 35px;
}
.film__item{
  margin: 30px;
}
.row{
  margin-right: 0;
}
</style>
