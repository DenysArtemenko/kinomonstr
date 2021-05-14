<template>
  <div>

    <b-button lg="4" class="pb-2" variant="danger" v-b-modal.modal-prevent-closing>Войти</b-button>
    <div class="mt-3">
      <div v-if="submittedNames.length === 0"></div>
    </div>
    <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Sign in"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
    >
      <form ref="form">
<!--        @submit.stop.prevent="handleSubmit">-->
        <h2 class="form-signin-heading my-3">Please sign in</h2>

        <label for="inputUsername" class="sr-only">Email address</label>
        <input type="text" id="inputUsername" name="login" v-model="username" class="form-control" placeholder="Email address" required autofocus>
        <br>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" name="password" v-model="password" class="form-control" placeholder="Password" required>

        <br/>

       <button class="btn btn-lg btn-default btn-block" @click="handleSubmitLogin" variant="danger" type="button">Sign in</button>


      </form>
      <b-button lg="4" class="pb-2 btn btn-lg btn-default btn-block my-3" variant="danger" v-b-modal.modal-prevent-closing>Registration</b-button>
      <div class="mt-3">
        <div v-if="submittedNames.length === 0"></div>
      </div>
      <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Registration"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
      >
        <form ref="form">
          <h2 class="form-registration-heading my-3">Please do registration</h2>

          <label for="inputNewUsername" class="sr-only">Email address</label>
          <input type="text" id="inputNewUsername" name="registration" v-model="username" class="form-control" placeholder="Email address" required autofocus>
          <br>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputNewPassword" name="password" v-model="password" class="form-control" placeholder="Password" required>
          <br>


          <button class="btn btn-lg btn-default btn-block" @click="handleSubmitRegistration" type="button">Send</button>

        </form>
      </b-modal>
    </b-modal>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: '',
      nameState: null,
      submittedNames: [],
      username: '',
      password: '',
      users: []
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmitLogin()
    },
    handleSubmitLogin() {

      // localStorage.password = this.password
        axios.post('http://localhost:5000/auth/login',  {
        username: this.username,
        password: this.password,
      })

      axios.get('http://localhost:5000/auth/users').then(response => {

        this.users = response.data

        for (let i = 0; i < this.users.length; i++) {
          // console.log(this.users[i].username , this.username)
          if (this.username === this.users[i].username) {
            localStorage.username = this.username
            return window.location.reload()

          }
        }
        if(this.username !== this.users[this.users.length -1].username){
          alert("Неверный логин или пароль")
        }
      })

          // .then(function (response) {
          //   console.log(response.data);
          //
          // })
          // .catch(function (error) {
          //   console.log(error);
          //
          //   alert("Неверный логин или пароль")
          // });


    },
    handleSubmitRegistration() {
      axios.post('http://localhost:5000/auth/registration',  {
        username: this.username,
        password: this.password
      })
          .then(function (response) {
            console.log(response.data);

          })
          .catch(function (error) {
            console.log(error);
            alert("Пользователь с таким именем уже существует")
          });
    },
  }
}
</script>

<style scoped>
.btn{
  color: #FFFFFF;
  background-color: #e50914;
}
</style>