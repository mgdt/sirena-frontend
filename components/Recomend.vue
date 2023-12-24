<script setup>
import RecomendSwiperVue from "./RecomendSwiper.vue";

const props = defineProps(["products"]);
</script>

<template>
  <div class="recomend">
    <h2 class="recomend__title">Рекомендуем посмотреть</h2>
    <RecomendSwiperVue :products="props.products"></RecomendSwiperVue>
  </div>
</template>

<style scoped>
.recomend__title {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 50px;
}

@media screen and (max-width: 600px) {
  .recomend__title {
    font-size: 27px;
    line-height: 33px;
  }
  .recomend__title {
    margin-bottom: 40px;
  }
  .order .container {
    margin-bottom: 50px;
  }
}
</style>
