<template>
  <div class="about__film" >
    <NavBar/>
    <div class=" container " >
      <h1>{{findElement(allPageFilms,pageNumber,filmNumber).title }}</h1>
      <div class="row">
        <div class="col-lg-6 about__film-img">
          <img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face' + findElement(allPageFilms,pageNumber,filmNumber).poster_path" alt="">
        </div>
        <div class="col-lg-6 about__film-overview">
      <p><span>Описание:</span> <br> {{findElement(allPageFilms,pageNumber,filmNumber).overview }}</p>
        </div>
        <div class="btns__likes">
           <b-button v-if="loaded" :class='"heart " + liked' variant="outline" @click="clickButtonLikes()"> </b-button>
<!--           <b-button v-if="loaded" :class='"btn__liked " + liked ' variant="outline" @click="clickButtonLikes()">Like </b-button>-->
        </div>
      </div>
      <h2>Рекомендации:</h2>
    </div>
    <div class="films__block">
      <flickity ref="flickity" :options="flickityOptions" class="carousel__box">
        <div class="slide d-flex "  v-for="(item,idx) in this.findRecommendation(allPageFilms[0])" :key="idx" >
          <div class="films__box " >
            <FilmItem
                  :item="item"
            />
          </div>
        </div>
      </flickity>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import {mapGetters} from "vuex";
import FilmItem from "../components/FilmItem";
import flickity from "vue-flickity";
import axios from "axios";
export default {
  name: "AboutFilm",
  components: {
    FilmItem,
     NavBar,
    flickity
  },
  computed: {
    ...mapGetters(['allPageFilms']),
    liked() {
      let like= false
      for (let i = 0; i < this.users.length; i++) {
          if (this.user && this.user.film.length > 0) {
            if (this.user.username === this.users[i].username) {
              console.log(this.users[i].username)
              for (let k of this.users[i].film) {
                if (k.filmName.toString() === this.$route.params.title) {
                  like = k.like
                  console.log(like)
                  console.log(k.filmName.toString() , this.$route.params.title)
                  return like;
                }
              }
          }
        }
      }
      console.log(like)
      return like
    },

  },
  data() {
    return {
      films: [],
      likes: false ,
      users: [],
      user: JSON.parse(localStorage.user)||'',
      loaded: false,

      pageNumber: 0,
      filmNumber: 0,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false,
        contain: true,
        freeScroll: true,
        // any options from Flickity can be used
      }
    }
  },


   mounted(){
    // console.log(this.$route.params.title)
     this.$store.dispatch('pushAllPages')
    this.loaded = true
     axios.get('http://localhost:5000/auth/users')
         .then(response => {

           this.users = response.data

         })
    // this.like(this.liked)
    // console.log(this.liked)
    // this.$refs.flickity.rerender()

    // console.log(this.allPageFilms)
  },


  methods: {

     findElement(item, i, j) {
      if (item.length>0) {
        for (i = 0; i < 100; i++) {
          for (j = 0; j < 20; j++) {
            if (item[i][j].original_title === this.$route.params.title) {
              return item[i][j]
            }
          }
        }
      }
    },
    findRecommendation(item){
      let film = []

      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < this.findElement(this.allPageFilms, this.pageNumber, this.filmNumber).genre_ids.length; j++) {
          for (let k = 0; k < item[i].genre_ids.length; k++) {
            if (this.findElement(this.allPageFilms, this.pageNumber, this.filmNumber).genre_ids[j] === item[i].genre_ids[k]
                && this.findElement(this.allPageFilms, this.pageNumber, this.filmNumber) !== item[i]) {
              film.push(item[i])
            }
          }
        }
      }
      item = new Set(film)
      return item
    },
    next() {
      this.$refs.flickity.next();
    },

    previous() {
      this.$refs.flickity.previous();
    },

   async clickButtonLikes(){

        this.likes = !this.likes
   const {data} = await axios.put('http://localhost:5000/auth/likes',  {
    film: {
       like: this.likes,
      filmName:this.$route.params.title,
      username:localStorage.username
     }
      })
       console.log(data)
     localStorage.user = JSON.stringify(data.user)


      axios.get('http://localhost:5000/auth/users')
         .then(response => {
           this.users = response.data
         })

    // if(data) {
    //
    //   if (data.message) {
    //     return
    //   }
    //   localStorage.user = JSON.stringify(data.user)
    // }

    }
  }
}


</script>

<style scoped>
.about__film-img{
  margin: auto 0;
  background-color: black;
}
.about__film-overview{
  margin: auto 0;
  background-color: #000000;
}
span {
  font-size: 30px;
  font-weight: bold;
}
p{
  color: #aaaaaa;
  font-size: 22px;

}
.about__film{
  background: #000000;

}

img{

  width: 400px;
  height: 600px;
}
.films__block{
  background: #000000;
  min-height: 640px;
}
.carousel__box{
  margin: 0 65px;
}
h1{
  text-align: center;
  margin: 50px auto;
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 4vw;
  line-height: 58px;
  color: #FFFFFF;
  text-decoration: none;
}
h1:hover{
  text-decoration: none;
  color: #e50914;
}
h2{
  color: #FFFFFF;
  margin: 30px 0;
}

.films__box{
  display: flex;
  background: black;
  margin: 0 30px;
}

/*.true{*/
/*  background-color: #c11fc1;*/
/*  color: #c11fc1;*/
/*}*/
/*.false{*/
/*  background-color: #B6B6B6;*/
/*  color: #B6B6B6;*/
/*}*/

/*.true:hover{*/
/*  !*border-color: #ffffff;*!*/
/*  background-color: #e50914;*/
/*  color: #e50914;*/
/*}*/

/*.false:hover{*/
/*  background-color: #e50914;*/
/*  color: #e50914;*/
/*  !*border-color: #ffffff;*!*/
/*}*/

/*.btns__likes{*/
/*  position: absolute;*/
/*  margin-top: 825px;*/
/*}*/

/*.btn__likes{*/
/*  transform: rotate(*/
/*      45deg*/
/*  );*/
/*  border-bottom-left-radius: 25px;*/
/*  border-top-left-radius: 25px;*/
/*  position: relative;*/
/*  z-index: 10;*/
/*}*/
/*.btn__liked{*/
/*  transform: rotate(*/
/*      -45deg*/
/*  );*/
/*  position: relative;*/
/*  margin-left: -42px;*/
/*  border-bottom-right-radius: 25px;*/
/*  border-top-right-radius: 25px;*/
/*  z-index: 10;*/
/*}*/
.true {
  position: relative;
  width: 25px;
  height: 44px;
  background-color: #c11fc1;
  box-shadow: -1px 0px 2px #444;
  /* Скругляем верхние углы */
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
  /* Определяем угол наклона */
  -webkit-transform: rotate(315deg);
  -moz-transform: rotate(315deg);
  -ms-transform: rotate(315deg);
  -o-transform: rotate(315deg);
  transform: rotate(315deg);
}
/* Формируем правую часть */
.true:before {
  position: absolute;
  width: 44px;
  height: 25px;
  left: 0;
  bottom: 0;
  content: "";
  background-color: #c11fc1;
  box-shadow: 0px 3px 3px #444444;
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 0 50px 50px 0;
}
.false {
  position: relative;
  width: 25px;
  height: 44px;
  background-color: #B6B6B6;
  box-shadow: -1px 0px 2px #444;
  /* Скругляем верхние углы */
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
  /* Определяем угол наклона */
  -webkit-transform: rotate(315deg);
  -moz-transform: rotate(315deg);
  -ms-transform: rotate(315deg);
  -o-transform: rotate(315deg);
  transform: rotate(315deg);
}
/* Формируем правую часть */
.false:before {
  position: absolute;
  width: 44px;
  height: 25px;
  left: 0;
  bottom: 0;
  content: "";
  background-color: #B6B6B6;
  box-shadow: 0px 3px 3px #444444;
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 0 50px 50px 0;
}
/* Убираем тень при наведении */
.heart:hover:before, .heart:hover{
  background-color: #e50914;
  box-shadow:none;
}

.heart{
  margin-left: 20px;
}

</style>