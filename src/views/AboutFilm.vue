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
        <div class="about__film-genres">
          <FilmGenre class="about__film-genres"
                     v-for="(item,idx) in filmGenres" :key="idx"
                     :item = "item"
                     :filmGenresArray = "filmGenresArray"

          />
        </div>

        <div class="btns__likes col-lg-12">
          <div class="row">

           <b-button v-if="loaded && user" :class='"heart " + liked' variant="outline" @click="clickButtonLikes()"> </b-button>
          <star-rating v-if="user" class="about__film-stars" :rating="ratinged" @rating-selected ="clickStarRating"  @click="clickStarRating(clickStarRating)"/>
          </div>
<!--           <b-button v-if="loaded" :class='"btn__liked " + liked ' variant="outline" @click="clickButtonLikes()">Like </b-button>-->
        </div>
      </div>

    </div>
    <div class="films__block container">
      <Recommendation class="row films__block-table" v-if="loaded && user"
                      :allRecommendFilms="allRecommendFilms"
                      :limitRecommendFilms="limitRecommendFilms"
      />
      <div v-else>
        <p>Чтобы видеть рекомендации нужна авторизация</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
import {mapGetters} from "vuex";
// import FilmItem from "../components/FilmItem";
// import flickity from "vue-flickity";
import axios from "axios";
import StarRating from 'vue-star-rating'
import FilmGenre from "../components/FilmGenre";
import Recommendation from "../components/Recommendation";

export default {
  name: "AboutFilm",
  components: {
    Recommendation,
    FilmGenre,
    // FilmItem,
     NavBar,
    // flickity,
    StarRating
  },
  computed: {
    ...mapGetters(['allPageFilms']),
    ...mapGetters(['allPageActors']),
    liked() {
      let like= false
      for (let i = 0; i < this.users.length; i++) {
          if (this.user && this.user.film.length > 0) {
            if (this.user.username === this.users[i].username) {
              console.log(this.users[i].username)
              for (let k of this.users[i].film) {
                if (k.filmName === this.$route.params.title) {
                  like = k.like
                  console.log(like)
                  console.log(k.filmName.toString() , this.$route.params.title)
                  return like;
                }
              }
          }
        }
      }
      return like
    },
    ratinged() {
      let rating= 0
      for (let i = 0; i < this.users.length; i++) {
        if (this.user && this.user.film.length > 0) {
          if (this.user.username === this.users[i].username) {
            for (let k of this.users[i].film) {
              if (k.filmName === this.$route.params.title) {
                rating = k.rating
                return rating;
              }
            }
          }
        }
      }
      return rating
    },

  },
  data() {
    return {
      rating: 0,
      films: [],
      likes: false ,
      users: [],
      user: '',
      loaded: false,
      username: localStorage.username,
      ratingAllStarFilms: [],
      rating5StarFilms: [],
      rating4StarFilms: [],
      rating3StarFilms: [],
      rating2StarFilms: [],
      rating1StarFilms: [],
      recommendFilmsArray: [],
      recommendFilmsName: [],
      genres_id: 0,
      genresFilmsArray:[],
      allRecommendFilms:[],
      limitRecommendFilms:[],
      filmGenres: [],
      filmGenresArray: [],
      actorsArray: [],
      actorsFilmArray: [],

      pageNumber: 0,
      filmNumber: 0,
      actorNumber: 0,
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

  // created() {
  //   this.$store.commit('allRecommendFilms', this.allRecommendFilms);
  //   this.$store.commit('limitRecommendFilms', this.limitRecommendFilms);
  // },
  mounted(){
    // console.log(this.$route.params.title)
     this.$store.dispatch('pushAllPages')
    this.loaded = true
     let id = this.findElement(this.allPageFilms,this.pageNumber,this.filmNumber).id
     axios
         .get("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=2a235b91059bbee0cb0dad81130d7beb&language=ru")
         .then((response) => {
          let allActors =  response.data
           console.log(allActors)
         })
     axios.get('http://localhost:5000/auth/users')
         .then(response => {
           this.users = response.data
           this.ratingStarsFilms()
           for (let i = 0; i < this.users.length; i++) {

             if (this.users[i].username === localStorage.username) {
               this.user = this.users[i]
               localStorage.user = this.users[i]
               for (let j = 0; j < this.users[i].film.length; j++) {
                 if (this.users[i].film[j].filmName === this.$route.params.title) {
                   this.rating = this.users[i].film[j].rating
                 }
               }
             }
           }
           this.findRecommendation1(this.allPageFilms,this.pageNumber,this.filmNumber)
           this.findGenre_ids()
           this.findRecommendationByGenre()

           this.getGenres()
           this.filmGenresArray = this.findElement(this.allPageFilms,this.pageNumber,this.filmNumber).genre_ids


           this.findRecommendationByActor()
           this.myArrayToSet()
           this.$store.commit('updateAllRecommendFilms', this.allRecommendFilms);
           this.$store.commit('updateLimitRecommendFilms', this.limitRecommendFilms);
         })


    // this.like(this.liked)
    // console.log(this.liked)
    // this.$refs.flickity.rerender()

    // console.log(this.allPageFilms)
  },


  methods: {

    getGenres(){
      axios
          .get("https://api.themoviedb.org/3/genre/movie/list?api_key=2a235b91059bbee0cb0dad81130d7beb&language=en-US")
          .then((response) => {
            // console.log(response.data.results)
            this.genres = response.data.genres
            this.loaded = true
            for (let i = 0; i < this.findElement(this.allPageFilms,this.pageNumber,this.filmNumber).genre_ids.length; i++) {
              for (let j = 0; j < this.genres.length; j++) {
                if (this.findElement(this.allPageFilms,this.pageNumber,this.filmNumber).genre_ids[i] === this.genres[j].id){
                  this.filmGenres.push(this.genres[j].name)
                }
              }
            }

          })
    },

    myArrayToSet(){
      let timeArray
      console.log(this.genresFilmsArray)
      for (let i = 0; i < this.recommendFilmsArray.length; i++) {
        this.genresFilmsArray.push(this.recommendFilmsArray[i])
      }
      for (let i = 0; i < this.ratingAllStarFilms.length; i++) {
        for (let j = 0; j < this.genresFilmsArray.length; j++) {
        if (this.ratingAllStarFilms[i] === this.genresFilmsArray[j].original_title){
          this.genresFilmsArray.splice(j,1)
        }
        }
      }
        this.allRecommendFilms = new Set(this.genresFilmsArray)
        timeArray = Array.from(this.allRecommendFilms)
      for (let i = 0; i < 4; i++) {
        this.limitRecommendFilms.push(timeArray[i])
      }
      this.allRecommendFilms = timeArray

      for (let i = 0; i < this.actorsFilmArray.length; i++) {
        this.allRecommendFilms.push(this.actorsFilmArray[i])
      }
      console.log(this.allRecommendFilms)
      this.allRecommendFilms = new Set(this.allRecommendFilms)
      this.allRecommendFilms = Array.from(this.allRecommendFilms)
      console.log(this.allRecommendFilms)
      for (let i = 0; i < this.ratingAllStarFilms.length; i++) {
        for (let j = 0; j < this.allRecommendFilms.length; j++) {
          if (this.ratingAllStarFilms[i] === this.allRecommendFilms[j].original_title){
            this.allRecommendFilms.splice(j,1)
          }
        }
      }


    },

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
    findRecommendationByGenre(){
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < this.allPageFilms[0][i].genre_ids.length; j++) {
            if (this.allPageFilms[0][i].genre_ids[j] === this.genres_id) {
              this.genresFilmsArray.push(this.allPageFilms[0][i])
            }
        }
      }
      console.log(this.genresFilmsArray)
    },
    findRecommendationByActor(){

      if (this.loaded) {
        let count = 0
        // let newCount = 0
          for (let i = 0; i < this.allPageActors.length; i++) {
            for (let j = 0; j < this.allPageActors[i].length; j++) {
              if (this.allPageActors[i][j].length>0) {
                for (let k = 0; k < this.allPageActors[i][j].known_for.length; k++) {

                  for (let l = 0; l < this.rating5StarFilms.length; l++) {

                    if (this.allPageActors[i][j].known_for[k].original_title === this.rating5StarFilms[l] ||
                        this.allPageActors[i][j].known_for[k].original_name === this.rating5StarFilms[l]) {
                      count++
                    }
                    if (count >= 2) {
                      // console.log(this.allPageActors[i][j].name,this.rating5StarFilms[l], count)
                      this.actorsArray.push(this.allPageActors[i][j])
                    }
                  }
                }
              }
              count = 0
            }
          }
          let timeArray = new Set(this.actorsArray)
          let timeFilmArray = []
        this.actorsArray = Array.from(timeArray)
        for (let i = 0; i < this.actorsArray.length; i++) {
          for (let j = 0; j < this.actorsArray[i].known_for.length; j++) {
            if (this.actorsArray[i].known_for[j].original_title === undefined){
              timeFilmArray.push(this.actorsArray[i].known_for[j].name)
            } else {
              timeFilmArray.push(this.actorsArray[i].known_for[j].original_title)
            }
          }
        }

        this.actorsFilmArray = new Set(timeFilmArray)
        this.actorsFilmArray = Array.from(this.actorsFilmArray)
        let array = []
        for (let i = 0; i < 100; i++) {
          for (let j = 0; j < 20; j++) {
            for (let k = 0; k < this.actorsFilmArray.length; k++) {
              if (this.allPageFilms[i][j].original_title === this.actorsFilmArray[k]) {
                array.push(this.allPageFilms[i][j])
              }
            }
          }
        }
        this.actorsFilmArray = array
        console.log(this.actorsFilmArray)
      }


    },
    ratingStarsFilms(){

      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].username === localStorage.username){
          for (let j = 0; j < this.users[i].film.length; j++) {
            if (this.users[i].film[j].rating === 5){
              this.rating5StarFilms.push(this.users[i].film[j].filmName)
            } else if (this.users[i].film[j].rating === 4){
              this.rating4StarFilms.push(this.users[i].film[j].filmName)
            } else if (this.users[i].film[j].rating === 3){
              this.rating3StarFilms.push(this.users[i].film[j].filmName)
            } else if (this.users[i].film[j].rating === 2){
              this.rating2StarFilms.push(this.users[i].film[j].filmName)
            } else if (this.users[i].film[j].rating === 1){
              this.rating1StarFilms.push(this.users[i].film[j].filmName)
            }
            if(this.users[i].film[j].rating === 5 || this.users[i].film[j].rating === 4 || this.users[i].film[j].rating === 3 ||
                this.users[i].film[j].rating === 2 || this.users[i].film[j].rating === 1){
              this.ratingAllStarFilms.push(this.users[i].film[j].filmName)

            }
          }
        }
      }

      axios.put('http://localhost:5000/auth/stars',  {
        ratingStarsFilms: {
          username:localStorage.username,
          rating5StarFilms: this.rating5StarFilms,
          rating4StarFilms: this.rating4StarFilms,
          rating3StarFilms: this.rating3StarFilms,
          rating2StarFilms: this.rating2StarFilms,
          rating1StarFilms: this.rating1StarFilms
        }
      })
    },
    // findPearson_correlation(){
    //   let pearson_correlation = function(dataset, p1, p2){
    //     let existp1p2 = {};
    //
    //     for (const item in dataset[p1]){
    //         if (item in dataset[p2]){
    //           existp1p2[item] = 1
    //         }
    //     }
    //   }
    //
    // },
    findRecommendation1(item, i, j){
      let count = 0
      let countSimilar = 0
      let usersFilmsSet =[]
      let userFilmsSet = []
      let recommendFilmsName = []
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].username !== this.user.username) {
          for (let j = 0; j < this.users[i].ratingStarsFilms[1].rating5StarFilms.length; j++) {
            for (let k = 0; k < this.user.ratingStarsFilms[1].rating5StarFilms.length; k++) {
              if (this.users[i].ratingStarsFilms[1].rating5StarFilms[j] === this.user.ratingStarsFilms[1].rating5StarFilms[k]) {
                count++
              }
            }
            if (countSimilar < count) {
              countSimilar = count
              usersFilmsSet = this.users[i].ratingStarsFilms[1].rating5StarFilms
              userFilmsSet = this.user.ratingStarsFilms[1].rating5StarFilms
              recommendFilmsName = usersFilmsSet.filter(el => !userFilmsSet.includes(el))
            }
          }
        }
        count = 0
      }
      if (item.length>0) {
        for ( i = 0; i < 100; i++) {
          for (j = 0; j < 20; j++) {
            for (let m = 0; m < recommendFilmsName.length; m++) {
              if (item[i][j].original_title === recommendFilmsName[m]) {
                this.recommendFilmsArray.push(item[i][j])
              }
            }
          }
        }
      }
      console.log(this.recommendFilmsArray)
    },
    findGenre_ids(){
       let genresArray = []

      for (let i = 0; i < this.recommendFilmsArray.length; i++) {
        for (let j = 0; j < this.recommendFilmsArray[i].genre_ids.length; j++) {
          genresArray.push(this.recommendFilmsArray[i].genre_ids[j])
          }
        }
      console.log(genresArray)
      let count = 0
      let countSimilar = 0
      for (let i = 0; i < genresArray.length; i++) {
        for (let j = 0; j < genresArray.length; j++) {
          if (genresArray[i] === genresArray[j] && i !== j){
            count++
          }
        }
        if (countSimilar < count) {
          countSimilar = count
          this.genres_id = genresArray[i]
        }
        count = 0

      }

      },

    next() {
      this.$refs.flickity.next();
    },

    previous() {
      this.$refs.flickity.previous();
    },

   async clickButtonLikes(){
        this.likes = !this.likes
   await axios.put('http://localhost:5000/auth/likes',  {
    film: {
      like: this.likes,
      filmName:this.$route.params.title,
      username:localStorage.username
     }
      })
      axios.get('http://localhost:5000/auth/users')
         .then(response => {
           this.users = response.data
           for (let i = 0; i < this.users.length; i++) {
             if (this.users[i].username === localStorage.username) {
               localStorage.user = this.users[i]
             }
           }
         })
    },
    setRating: function(rating){
      this.rating= rating;
    },

    async clickStarRating(rating){
      this.rating= rating;
     const {data} = await axios.put('http://localhost:5000/auth/rating',  {
        film: {
          username:localStorage.username,
          filmName:this.$route.params.title,
          rating: this.rating
        }
      })
      console.log(data)
      axios.get('http://localhost:5000/auth/users')
          .then(response => {
            this.users = response.data
            for (let i = 0; i < this.users.length; i++) {
              if (this.users[i].username === localStorage.username) {
                localStorage.user = this.users[i]
                for (let j = 0; j < this.users[i].film.length; j++) {
                  if (this.users[i].film[j].filmName === this.$route.params.title) {
                    this.rating = this.users[i].film[j].rating
                  }
                }
              }
            }
          })
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
.about__film-stars{
  margin-left: 50px;
}
.about__film-genres{
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
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
.undefined {
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
.undefined:before {
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
.films__block{
  margin: 0 auto !important;
}

.films__block-table{
  justify-content: center;
}

.container{
  margin: 0 auto !important;
}


.film__item{
  margin: 30px;
}


</style>