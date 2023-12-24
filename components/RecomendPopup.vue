<script setup>
import { useUiStore } from "@/stores/ui";
import RecomendSwiper from "./RecomendSwiper.vue";
const uiStore = useUiStore();

const props = defineProps(["products"]);

if (process.client) {
}
</script>

<template>
  <div class="popup-wrap" :class="{ active: uiStore.isRecomendPopupOpened }">
    <div class="popup-overlay">
      <div class="popup" :class="{ active: uiStore.isRecomendPopupOpened }">
        <!-- <div class="popup-inner"> -->
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="popup__close"
          @click="uiStore.toggleRecomendPopup"
        >
          <path
            d="M21 21L1 1M21 1L1 21"
            stroke="#0D0D0D"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="popup__title">Рекомендуем к заказу</div>
        <p class="popup__subtitle">Дополнительные аксессуары</p>
        <div class="popup__swiper">
          <RecomendSwiper
            :products="props.products.slice(0, 5)"
            :is-popup="true"
          ></RecomendSwiper>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup__title {
  font-weight: 700;
  font-size: 38px;
  line-height: 47px;
  text-align: center;
  color: #e41c19;
  margin-bottom: 5px;
}
.popup__subtitle {
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #0d0d0d;
}
.popup__swiper {
  max-width: 100%;
}
.popup-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition-duration: 0.2s;
  overflow-y: scroll;
}
.popup-overlay {
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.popup {
  position: relative;
  width: 1200px;
  background: white;
  border-radius: 10px;
  z-index: 11;
  opacity: 0;
  visibility: hidden;
  transition-duration: 0.2s;
  background-image: url("../assets/img/recomend-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 65px;
  padding-bottom: 20px;
}
.popup-wrap.active {
  visibility: visible;
  opacity: 1;
}
.popup.active {
  visibility: visible;
  opacity: 1;
}
.popup-inner {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup__close {
  position: absolute;
  right: 25px;
  top: 25px;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .popup__title {
    font-size: 27px;
    line-height: 33px;
    margin: 0 auto;
    margin-bottom: 15px;
    max-width: 190px;
  }
  .popup__subtitle {
    font-size: 18px;
    line-height: 22px;
  }
  .popup {
    width: 320px;
    background-image: url("../assets/img/recomend-bg-mob.png");
    padding-top: 65px;
  }
  .popup__close {
    right: 20px;
    top: 20px;
    width: 15px;
  }
  .popup-inner {
    padding-top: 50px;
  }
}
</style>
