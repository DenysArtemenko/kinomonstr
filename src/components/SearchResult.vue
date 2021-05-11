<template>
  <div>
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search title.."/>
      <label>Search title:</label>
    </div>
    <div class="wrapper">
      <div class="card" v-for="film in filteredFilms" :key="film.id">

      </div>
    </div>
  </div>
</template>

<script>



export default {
  data() {
    return {
      search: '',
      film: Object
    }
  },
  props: {
    films: [Array]
  },
  mounted() {



  },
  computed: {

  }
}
</script>

