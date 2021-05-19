<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
a{
  color: white !important;
}
.dropdown-menu {
  background-color: transparent !important;
  padding: 0 !important;
  min-width: 0 !important;


}
.dropdown-item {
  color: #fff !important;
  background-color: gray !important;


}
.dropdown-item:hover {
  background: orange !important;
}
.dropdown{
  margin-right: 20px;
}
/*button{*/
/*  background-color: #e50914 !important;*/
/*}*/
#app{
  background-color: #000 !important;
  min-height: 100vh;
}

</style>
