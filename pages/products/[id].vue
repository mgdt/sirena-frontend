<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectForm from "@/components/SelectForm.vue";
import FaqItem from "@/components/FaqItem.vue";
import Recomend from "~/components/Recomend.vue";
import { useRoute } from "vue-router";
import { fetchProduct, baseUrl, fetchRecommendedProducts } from "@/api";
import { formatNumber } from "@/helpers";
import { useCartStore } from "@/stores/cart";

import Lightbox from "vue-my-photos";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs } from "swiper";
import "swiper/css";

// import { useNotification } from "@kyvg/vue3-notification";
// const { notify } = useNotification();

const route = useRoute();
const productId = route.params.id;

let product = ref({
  name: "",
  description: "",
  video: "",
  variations: [
    {
      id: "",
      articul: "",
      name: "",
      price: 0,
      specs: "",
      kit: "",
    },
  ],
  images: [
    {
      id: 0,
      src: "",
    },
  ],
});
const activeVariationId = ref("");
const myLightbox = ref(null);
const images = ref([]);
const currentImageName = ref("");

const fetchedProduct = await useAsyncData(() => fetchProduct(+productId));
product = fetchedProduct.data;

const fetchedRecomendedProducts = await useAsyncData(() =>
  fetchRecommendedProducts()
);
const recomendedProducts = fetchedRecomendedProducts.data;

product.value.variations.forEach((variation) => {
  variation.id = variation.id.toString();
});
activeVariationId.value = product.value.variations[0].id;
product.value.images.forEach((image) => {
  images.value.push({
    name: `${baseUrl}${image.src}`,
  });
});

const seoMeta = [];
if (product.value.seoDescription) {
  seoMeta.push({
    name: "description",
    content: product.value.seoDescription,
  });
}
if (product.value.seoKeywords) {
  seoMeta.push({
    name: "keywords",
    content: product.value.seoKeywords,
  });
}

useHead({
  title: product.value.seoTitle ? product.value.seoTitle : undefined,
  meta: seoMeta,
});

const modules = [Navigation, Thumbs];

const cartStore = useCartStore();

const activeVariation = computed(() => {
  return product.value.variations.find(
    (variation) => variation.id === activeVariationId.value
  );
});

const video = computed(() => {
  if (
    activeVariation.value.video &&
    activeVariation.value.video.includes("youtube")
  ) {
    return activeVariation.value.video;
  }
  return "Нет информации";
});

// const video = computed(() => {
//   if (product.value.video && product.value.video.includes("youtube")) {
//     return product.value.video;
//   }
//   return "Нет информации";
// });

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

function openLightBox(imageUrl) {
  currentImageName.value = imageUrl;
  myLightbox.value.show();
}

function closeLightBox() {
  currentImageName.value = "";
}

function handleAddToCart() {
  cartStore.addToCart(activeVariationId.value);
}

const activeTab = ref("specs");

function handleCreditClick() {
  handleAddToCart();
  window.location.href = "/cart?payment=credit";
}
</script>

<template>
  <!-- <notifications /> -->
  <Lightbox
    id="myLightbox"
    ref="myLightbox"
    @on-lightbox-close="closeLightBox"
    :currentImageName="currentImageName"
    :images="images"
    :filter="'all'"
  />
  <Header></Header>
  <div class="tree">
    <div class="container">
      <ul class="list-reset tree__list flex">
        <li class="tree__item">
          <a href="/" class="tree__link">Главная</a>
        </li>
        <li class="tree__item">
          <a href="/products" class="tree__link">
            <svg
              class="tree__arrow"
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.18 0.899999H6.44L10.64 5.1L6.44 9.3H5.18L8.932 5.548H0.84V4.652H8.932L5.18 0.899999Z"
                fill="#C4C4C4"
              />
            </svg>
            Каталог
          </a>
        </li>
        <li class="tree__item">
          <a href="#" class="tree__link current__link">
            <svg
              class="tree__arrow"
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.18 0.899999H6.44L10.64 5.1L6.44 9.3H5.18L8.932 5.548H0.84V4.652H8.932L5.18 0.899999Z"
                fill="#C4C4C4"
              />
            </svg>
            {{ product.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="item product-single">
      <div class="container item-container flex">
        <div class="item-mob__title">
          {{ product.name }}
        </div>
        <p class="item-mob__pos">Артикул: {{ activeVariation?.articul }}</p>
        <div class="item-pic-block">
          <Swiper :modules="modules" :thumbs="{ swiper: thumbsSwiper }">
            <SwiperSlide
              v-for="image in images"
              @click="openLightBox(image.name)"
            >
              <img class="product__image-big" :src="image.name" alt="" />
            </SwiperSlide>
          </Swiper>

          <div class="product__image-preview" v-show="images.length > 1">
            <div class="swiper-button-prev">
              <svg
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 15L1 8L8 1"
                  stroke="#0D0D0D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <Swiper
              @swiper="setThumbsSwiper"
              watch-slides-progress
              :slides-per-view="3"
              :space-between="10"
              :modules="modules"
              :navigation="{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }"
            >
              <SwiperSlide v-for="image in images">
                <div class="product__image-small">
                  <img class="product__image-big" :src="image.name" alt="" />
                </div>
              </SwiperSlide>
            </Swiper>
            <div class="swiper-button-next">
              <svg
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 15L8 8L1 1"
                  stroke="#0D0D0D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div class="swiper-pagination"></div>
        </div>
        <div class="item-select">
          <h1 class="item__title">
            {{ product.name }}
          </h1>
          <p class="item__pos">Артикул: {{ activeVariation?.articul }}</p>
          <div class="item__variations-label">Выбрать версию магнитолы:</div>
          <div class="item-options flex">
            <div class="item-options-left flex">
              <label
                class="item__label"
                v-for="variation in product.variations"
              >
                <input
                  v-model="activeVariationId"
                  type="radio"
                  class="item__input"
                  :value="variation.id"
                  :key="variation.id"
                />
                <div class="item-input__btn">
                  <div></div>
                </div>
                <span class="item-label__text">{{ variation.name }}</span>
                <span class="item__price"
                  >{{ formatNumber(variation.price) }} ₽</span
                >
              </label>
            </div>
          </div>
          <div class="item-options-bottom flex">
            <button
              class="btn-reset item__btn_cart"
              @click="handleAddToCart"
              v-if="product.variations.length > 0"
            >
              В корзину
            </button>
            <button
              @click="handleCreditClick"
              class="btn-reset item__btn_credit"
            >
              Оформить рассрочку
            </button>
          </div>
        </div>

        <div class="item-mob__variations-label">Выбрать версию магнитолы:</div>

        <div class="item-mob-options">
          <label
            v-for="variation in product.variations"
            class="item__label"
            :class="{ active: activeVariationId == variation.id }"
            @click="activeVariationId = variation.id"
          >
            <div class="variation-mob__left">
              <div class="variation-mob__circle">
                <div></div>
              </div>
              <div class="variation-mob__name">{{ variation.name }}</div>
            </div>
            <div class="variation-mob__right">
              {{ formatNumber(variation.price) }} ₽
            </div>
          </label>
        </div>
      </div>

      <div class="container">
        <div class="item-center flex">
          <button
            :class="{ 'item__btn_center--active': activeTab == 'description' }"
            @click="activeTab = 'description'"
            class="btn-reset item__btn_center"
            data-path="1"
          >
            Описание
          </button>
          <button
            :class="{ 'item__btn_center--active': activeTab == 'video' }"
            @click="activeTab = 'video'"
            class="btn-reset item__btn_center"
            data-path="2"
          >
            Видео-обзор
          </button>
          <button
            :class="{ 'item__btn_center--active': activeTab == 'specs' }"
            @click="activeTab = 'specs'"
            class="btn-reset item__btn_center"
          >
            Технические характеристики
          </button>
          <button
            :class="{ 'item__btn_center--active': activeTab == 'complect' }"
            @click="activeTab = 'complect'"
            class="btn-reset item__btn_center"
            data-path="4"
          >
            Комплект поставки
          </button>
        </div>

        <div
          class="item-bottom"
          :class="{ active: activeTab == 'description' }"
          v-html="
            activeVariation.description?.replaceAll('\n', '<br>') ||
            'Нет информации'
          "
        ></div>

        <!-- <div
          class="item-bottom"
          :class="{ active: activeTab == 'description' }"
          v-html="
            product.description?.replaceAll('\n', '<br>') || 'Нет информации'
          "
        ></div> -->

        <div
          class="item-bottom video"
          :class="{ active: activeTab == 'video' }"
          v-html="video"
        ></div>

        <div
          class="item-bottom"
          :class="{ active: activeTab == 'specs' }"
          v-html="
            activeVariation.specs?.replaceAll('\n', '<br>') || 'Нет информации'
          "
        ></div>

        <div
          class="item-bottom"
          :class="{ active: activeTab == 'complect' }"
          v-html="
            activeVariation.kit?.replaceAll('\n', '<br>') || 'Нет информации'
          "
        ></div>

        <div class="item__specs-mob">
          <FaqItem
            title="Описание"
            :description="
              activeVariation.description?.replaceAll('\n', '<br>') ||
              'Нет информации'
            "
          ></FaqItem>
          <!-- <FaqItem
            title="Описание"
            :description="
              product.description?.replaceAll('\n', '<br>') || 'Нет информации'
            "
          ></FaqItem> -->
          <FaqItem title="Видео-обзор" :description="video"></FaqItem>
          <FaqItem
            title="Технические характеристики"
            :description="
              activeVariation.specs?.replaceAll('\n', '<br>') ||
              'Нет информации'
            "
          ></FaqItem>
          <FaqItem
            title="Комплект поставки"
            :description="
              activeVariation.kit?.replaceAll('\n', '<br>') || 'Нет информации'
            "
          ></FaqItem>
        </div>
        <button
          class="product__order-btn-mob"
          @click="handleAddToCart"
          v-if="product.variations.length > 0"
        >
          В корзину
        </button>
        <button
          class="product__credit-btn-mob"
          @click="handleCreditClick"
          v-if="product.variations.length > 0"
        >
          Оформить рассрочку
        </button>
        <div class="product__line"></div>
        <Recomend :products="recomendedProducts"></Recomend>
        <div class="product__after-rec"></div>
      </div>
    </section>
    <SelectForm></SelectForm>
  </main>
  <Footer></Footer>
</template>
