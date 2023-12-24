<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper";
import { baseUrl } from "~/api";

const modules = [Pagination, Navigation];

function formatNumber(number) {
  return new Intl.NumberFormat("ru-RU").format(number);
}

const props = defineProps(["products", "isPopup"]);

function getProductPrices(product) {
  if (product.variations[0] && product.variations[0].price) {
    let priceMin = product.variations[0].price;
    let priceMax = product.variations[product.variations.length - 1].price;
    if (priceMin == priceMax) {
      return `${formatNumber(priceMin)} ₽`;
    }
    return `${formatNumber(priceMin)} ₽ - ${formatNumber(priceMax)} ₽`;
  }
  return "Цена не указана";
}
</script>

<template>
  <div class="recomend__items" :class="{ popup: props.isPopup }">
    <div class="recomend__swiper-prev">
      <svg
        width="12"
        height="22"
        viewBox="0 0 12 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L1 11L11 21"
          stroke="#0D0D0D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <Swiper
      class="recomend__swiper"
      :modules="modules"
      :spaceBetween="props.isPopup ? 40 : 0"
      :slidesPerView="1"
      :loop="false"
      :auto-height="true"
      :pagination="{
        el: isPopup ? '.recomend__popup-swiper-pag' : '.recomend__swiper-pag',
        clickable: true,
      }"
      :navigation="{
        nextEl: '.recomend__swiper-next',
        prevEl: '.recomend__swiper-prev',
      }"
      :breakpoints="{
        600: {
          autoHeight: false,
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }"
    >
      <SwiperSlide
        v-for="(product, index) in props.products"
        class="recomend__slide"
        :key="product.id"
      >
        <div class="recomend__item" :key="product.id">
          <div class="recomend__item-image-wrap">
            <img
              :src="`${baseUrl}${product.images[0].src}`"
              alt=""
              class="recomend__item-img"
            />
          </div>
          <h3 class="recomend__item-title">{{ product.name }}</h3>
          <div class="recomend__prices">
            {{ getProductPrices(product) }}
          </div>
          <div class="recomend__note">Цена за 1 шт.</div>
          <a :href="`/products/${product.id}`" class="recomend__btn">Купить</a>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="recomend__swiper-next">
      <svg
        width="12"
        height="22"
        viewBox="0 0 12 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L11 11L1 21"
          stroke="#0D0D0D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
  <div v-if="isPopup" class="recomend__popup-swiper-pag"></div>
  <div v-else class="recomend__swiper-pag"></div>
</template>

<style scoped>
.recomend__popup-swiper-pag {
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
}
.recomend__items.popup .recomend__swiper {
  padding-left: 33px;
  padding-right: 33px;
  padding-bottom: 20px;
  padding-top: 55px;
}
.recomend__items.popup .recomend__btn {
  background-color: white;
  width: calc(100% - 2px);
}
.recomend__items.popup .recomend__item {
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(9, 15, 37, 0.1);
  border-radius: 10px;
  border: 1px solid transparent;
}
.recomend__items.popup .recomend__swiper-prev {
  display: none;
}
.recomend__items.popup .recomend__swiper-next {
  display: none;
}
.recomend__slide {
  height: 100%;
}
.recomend__item {
  display: flex;
  flex-direction: column;
  height: 100% !important;
  min-height: 440px;
}
.recomend__item-image-wrap {
  flex-grow: 1;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  display: flex;
  align-items: center;
}
.recomend__item-title {
  padding-left: 15px;
  padding-right: 15px;
}
* {
  user-select: none;
}
.recomend__swiper-pag:deep(.swiper-pagination-bullet) {
  margin-left: 6px !important;
  margin-right: 6px !important;
}
.recomend__swiper-prev,
.recomend__swiper-next {
  cursor: pointer;
}
.recomend__items {
  display: flex;
  align-items: center;
  gap: 18px;
}
.recomend__swiper-pag {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  display: none;
}
.recomend__btn {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 135%;
  color: #0d0d0d;
  width: calc(100% - 3px);
}
.recomend__note {
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #323232;
  opacity: 0.5;
  margin-bottom: 25px;
}
.recomend__item-title {
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 15px;
}
.recomend__prices {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #e41c19;
  margin-bottom: 15px;
}
.recomend__item-img {
  display: block;
  max-width: 100%;
  margin-bottom: 20px;
}
.recomend__item-top {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
.recomend__item {
  width: 210px;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  border: 1px solid #f7f7f7;
  border-radius: 10px;
}

@media screen and (max-width: 600px) {
  .recomend__items.popup .recomend__swiper {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
    padding-top: 30px;
  }
  .recomend__swiper-pag {
    display: flex;
  }
  .recomend__slide {
    min-height: 490px;
  }
  .recomend__item {
    width: calc(100% - 2px);
    min-height: 490px;
  }
  .recomend__btn {
    width: calc(100% - 2px);
  }
  .recomend__item-title {
    font-size: 20px;
    line-height: 24px;
  }
  .recomend__prices {
    font-size: 24px;
    line-height: 30px;
  }
  .recomend__btn {
    font-weight: 500;
    font-size: 18px;
    line-height: 135%;
  }
  .recomend__swiper-prev {
    display: none;
  }
  .recomend__swiper-next {
    display: none;
  }
}
</style>
