<template>
  <div>
    <div class=" actors__box-item"  >
      <div class="actors__box-item-img">
       <router-link  :to="`${item.name}`"><img :src="'https://www.themoviedb.org/t/p/w220_and_h330_face' + item.profile_path" alt=""></router-link>
      </div>
      <div class="actors__box-item-title">
        <p class="actors__box-item-title-name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActorItem",
  props: {
    item: Object
  },
}
</script>

<style scoped>
.actors__box-item{
  width: 201px;
  padding: 2px;
  border: 2px solid white;



}

.actors__box-item-title{
  background: #050E12;
  width: 193px;
  height: 66px;
  position: relative;
}
.actors__box-item-title-name{
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 66px;
  text-align: center;

  color: #B6B6B6;
  /*position: absolute;*/
  /*padding: 15px 0 25px 18px;*/
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 193px;
}


img{
  width: 193px;
  height: 282px;
}
</style>