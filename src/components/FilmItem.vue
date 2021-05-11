<template>
  <div>
    <div class=" films__box-item"  >
      <div class="films__box-item-img">
       <router-link :to="`/films/${item.original_title}`"><img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face' + item.backdrop_path" alt=""></router-link>
      </div>
      <div class="films__box-item-title">
        <p class="films__box-item-title-name">{{ item.title }}</p>
        <p class="films__box-item-title-year">{{ item.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmItem",
  props: {
    item: Object,
  },
  mounted() {
  }
}

</script>

<style scoped>
.films__box-item{
  width: 201px;
  padding: 2px;
  border: 2px solid white;


}

.films__box-item-title{
  background: #050E12;
  width: 193px;
  height: 66px;
  position: relative;
}
.films__box-item-title-name{
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;

  color: #B6B6B6;
  position: absolute;
  padding: 15px 0 25px 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 193px;
}
.films__box-item-title-year{
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;

  color: #828282;
  position: absolute;
  padding: 40px 0 12px 18px ;
}
img{
  width: 193px;
  height: 282px;
}
</style>