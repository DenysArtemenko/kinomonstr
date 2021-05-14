<template>
  <div >
    <b-navbar class="navbar" cl toggleable="lg" type="dark" >
      <router-link to="/"><b-navbar-brand ><img src="../assets/klipartz.png" alt=""></b-navbar-brand></router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">


            <b-nav-item-dropdown class="lang__dropdown" text="Русский" right>
              <div class="lang__dropdown-box">
              <b-dropdown-item class="lang__dropdown-item" href="#">English</b-dropdown-item>
              <b-dropdown-item class="lang__dropdown-item" href="#">Русский</b-dropdown-item>
              </div>
            </b-nav-item-dropdown>

          <div>
          <RegisterModal v-if="!username"/>


            <!-- Using modifiers -->
            <b-button v-else id="show-btn" @click="showModal" lg="4" class="pb-2" variant="danger" >{{ username }}</b-button>
            <b-modal ref="my-modal" hide-footer title="Using Component Methods">
              <div class="d-block text-center">
                <h3>Точно хотите выйти?</h3>
              </div>
              <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Нет</b-button>
              <b-button class="mt-2" variant="outline-warning" block @click="clearLocalStorage">Да</b-button>
            </b-modal>

          </div>



        </b-navbar-nav>

      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>

import RegisterModal from "./RegisterModal";
export default {

  name: "NavBar",
  components: {RegisterModal},
  data(){
    return{
      username: localStorage.username
    }
  },
  methods: {
    clearLocalStorage(){
      localStorage.clear()
      window.location.reload()
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
  }
}


</script>

<style scoped>
.navbar{
  background-color: transparent;
  position: relative;
  margin: 0 3.5rem;
  height: 100%;
}
.lang__dropdown-box{
  max-width: 6rem;


}
.lang__dropdown{
  text-align: center;
  background: rgba(0,0,0,.4);
  padding: -0.5rem 1.375rem;
  width: 100px;
  height: 50%;
  color: #fff;
  margin-left: -4px;
}
.lang__dropdown-item{
  background: rgba(0,0,0,.4);
  border: 1px solid #aaa;
  color: #fff;
  font-size: .875rem;
  width: 100px;
  line-height: 0.5;
}
.lang__dropdown-item:hover{
  background-color: orange;
}



</style>