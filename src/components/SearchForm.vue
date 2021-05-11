<template>
  <div class="container">
    <div class="search__form container">
        <b-form-input v-model="message" type="search" list="input-list" id="input-with-list" placeholder="Поиск"></b-form-input>
<!--        <b-form-datalist  id="input-list" :options=titles></b-form-datalist>-->
        <router-link class="btn-danger"   :to="`${message}`">Поиск</router-link>
    </div>
  </div>
</template>

<script>

// import {mapGetters} from "vuex";

export default {
  name: "SearchForm",
  props: {
    films: [Array],
    actors: [Array],
    allPageActors: [Array],
  },


  data() {
    return {
      titles: [],
      message: '',
      path: ''
    }
  },

  created() {
    // this.pushArray()
    // this.checkInput()
  },
  methods:{
     // pushArray() {
     //
     //   for (let i = 0; i < this.films.length; i++) {
     //     this.titles.push(this.films[i].original_title)
     //   }
     //   for (let i = 0; i < this.allPageActors.length; i++) {
     //     for (let j = 0; j < 20; j++) {
     //       this.titles.push(this.allPageActors[i][j].name)
     //     }
     //   }
     // },

      checkInput( ){
        // for (let i = 0; i < this.films.length; i++) {
        //   if (this.message === this.films[i].original_title){
        //     pathItem = 'films/'
        //     return pathItem
        //   }
        // }
        // for (let i = 0; i < this.allPageActors.length; i++) {
        //   for (let j = 0; j < 20; j++) {
        //     if (this.message === this.allPageActors[i][j].name) {
        //       pathItem = 'actors/'
        //       return pathItem
        //     }
        //   }
        // }
      }
  }
}
</script>


<style scoped>

.search__form{
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 280px;
  max-width: 1000px;
  font-size: 1em;
  min-height: 50px;
  line-height: 50px;
}
#input-with-list{
  height: 60px;
  width: 100%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-danger {
  position: relative;
  font-size: 1.6em;
  min-width: 74px;
  width: 480px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  max-height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #e50914;
  text-decoration: none;

}

@media (max-width: 768px ) {
  .search__form {
    display: block;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    min-width: 200px;

  }
  .btn-danger{
    display: flex;
    margin: 30px auto;
    justify-content: center;
    position: relative;
    font-size: 1.6em;
    min-width: 74px;
    width: 200px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    max-height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #e50914;
    text-decoration: none;

  }
  #input-with-list{
    display: flex;
    width: 100%;
    height: 40px;

  }

}
@media (max-width: 280px ){
  #input-with-list{
    display: inline-block;
    width: 80%;
    min-width: 200px;
  }

}

</style>