<template>
  <div class="container">
    <div class="card-title">
      <h1>Фильмы, сериалы и многое другое без ограничений.</h1>
      <h2>Смотрите где угодно. Отменить подписку можно в любое время.</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title"
}
</script>

<style scoped>
@media  (max-width: 950px) {
  h1 {
    font-size: 4vw ;
    margin: 1rem auto;
  }
  h2 {
    font-size: 2vw ;
  }
}
@media (max-width: 770px){
  .card-title{
    margin: 100px 0 !important;
  }
}

.card-title{
  margin: 100px 150px;
}
h1{
  font-size: 3vw ;
  display: block;
  text-align: center;
  margin: 1rem auto;
  font-weight: bold;
  color: white;
}
h2{
  font-size: 2vw ;
  margin: 1rem auto;
  color: white;
  text-align: center;
}
</style>