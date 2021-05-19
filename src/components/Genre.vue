<template>
  <div>
    <div class="container film__page-genres">
        <h1 @click="routeId">{{genre.name}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Genre",
  props: {
    genre: Object
  },


  mounted() {

  },

  methods: {
    routeId(){
      this.$router.push({ path: `/films/genre/${this.genre.id}` })
    }
  }
}
</script>

<style scoped>
.film__page-genres{
  justify-content: space-between;
  margin: 20px 0;
  color: #aaaaaa;
}

</style>