import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import BootstrapVue from "bootstrap-vue"
import VueCarousel from 'vue-carousel'
import store from './store'
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);



Vue.use(BootstrapVue)
Vue.use(VueCarousel)
Vue.use(VueAxios,axios)



Vue.config.productionTip = false

Vue.component('modal', {
  template: `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box"><slot></slot></div>
      </div>
      <button class="modal-close" @click="$emit('close')"></button>
    </div>
  `
});


new Vue({
  el: '#app',
  data: {
    showModal: false
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')

