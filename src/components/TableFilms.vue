<template>
    <div class="films__block container">
      <div class="row films__block-table"
            v-if="pageNumber>0">
        <FilmItem class="film__item"

                  v-for="(item,idx) in this.allPageFilms[pageNumber - 1]" :key="idx"
                  :item="item"
        />
      </div>
      <div class="overflow-auto">
        <b-pagination-nav  :link-gen="linkGen" :number-of-pages="100" use-router></b-pagination-nav>
      </div>
   </div>
</template>

<script>
import FilmItem from "./FilmItem";
export default {
  name: "TableFilms",
  components: {FilmItem},
  props: {
    allPageFilms: [Array]
  },
  data() {
    return {
      pageNumber: '',
      loading: true
    };
  },
  methods: {
    linkGen(pageNum) {
      this.pageNumber = pageNum
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    },
  }
}
</script>

<style scoped>
.films__block{
  margin: 0 auto !important;
}

.films__block-table{
  justify-content: center;
}

.container{
  margin: 0 auto !important;
}

.row{
  margin: 0 auto !important;
}
.film__item{
  margin: 30px;
}

</style>