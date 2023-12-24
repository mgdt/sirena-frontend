<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectForm from "@/components/SelectForm.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper";
// import Fancybox from "@fancyapps/ui";
import "swiper/css";
import "swiper/css/pagination";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { fetchFeedbacks, fetchVideoFeedbacks, baseUrl } from "@/api";

const fetchedFeedbacks = await useAsyncData(() => fetchFeedbacks());
const feedbacks = fetchedFeedbacks.data;

const fetchedVideoFeedbacks = await useAsyncData(() => fetchVideoFeedbacks());
const videoFeedbacks = fetchedVideoFeedbacks.data;

// Fancybox.bind("[data-fancybox]");
const modules = [Pagination, Navigation];

useHead({
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js",
    },
    {
      innerHTML: `setTimeout(() => {
        Fancybox.bind("[data-fancybox]");
      }, 0)`,
    },
  ],
  noscript: [],
});
</script>

<template>
  <Header></Header>
  <div class="tree">
    <div class="container">
      <ul class="list-reset tree__list flex">
        <li class="tree__item">
          <a href="/" class="tree__link">Главная</a>
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
            Отзывы
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="testimonials">
      <div class="container">
        <h1 class="testimonials__title">Отзывы наших клиентов</h1>
        <Swiper
          class="testimonials-swiper"
          :modules="modules"
          :spaceBetween="20"
          :slidesPerView="1"
          :loop="true"
          :auto-height="true"
          :pagination="{
            el: '.feed__pag',
            clickable: true,
          }"
          :centeredSlides="true"
          :loopedSlides="2"
          :breakpoints="{
            600: {
              slidesPerView: 3,
              spaceBetween: 30,
              autoHeight: false,
            },
          }"
        >
          <SwiperSlide
            v-for="feedback in feedbacks"
            class="testimonials-slide-container"
          >
            <div class="testimonials__item">
              <p class="testimonials__descr">
                {{ feedback.text }}
              </p>
              <div class="testimonials-item-bottom flex">
                <img
                  :src="`${baseUrl}${feedback.image}`"
                  alt=""
                  class="testimonials__pic"
                />
                <span class="testimonials__name">{{ feedback.fio }}</span>
              </div>
            </div>
          </SwiperSlide>
          <!-- <div class="testimonials-swiper-button-prev">Назад</div>
          <div class="testimonials-swiper-button-next">Вперед</div> -->
        </Swiper>
        <div class="testimonials-swiper-pagination feed__pag"></div>
      </div>
    </section>
    <section class="testimonials-video">
      <div class="container">
        <h2 class="testimonials__title">Видеоотзывы</h2>
        <Swiper
          class="testimonials-swiper"
          :modules="modules"
          :spaceBetween="10"
          :slidesPerView="3"
          :loop="true"
          :pagination="{
            el: '.testimonials-swiper-pagination',
            clickable: true,
          }"
          :navigation="{
            nextEl: '.testimonials-swiper-button-next',
            prevEl: '.testimonials-swiper-button-prev',
          }"
          :centeredSlides="true"
          :loopedSlides="2"
          :breakpoints="{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }"
        >
          <SwiperSlide
            v-for="videoFeedback in videoFeedbacks"
            class="testimonials-slide-container"
          >
            <div class="testimonials-video__pic">
              <img :src="`${baseUrl}${videoFeedback.preview}`" alt="" />
              <a data-fancybox :href="videoFeedback.link">
                <svg
                  width="84"
                  height="84"
                  viewBox="0 0 84 84"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42 78C61.8823 78 78 61.8823 78 42C78 22.1177 61.8823 6 42 6C22.1177 6 6 22.1177 6 42C6 61.8823 22.1177 78 42 78Z"
                    fill="#E41C19"
                  />
                  <path
                    d="M51.0009 38.9625L38.9184 31.9875C38.3844 31.6739 37.7769 31.5072 37.1577 31.5042C36.5384 31.5012 35.9294 31.6621 35.3924 31.9706C34.8555 32.2791 34.4097 32.7241 34.1003 33.2606C33.7909 33.797 33.629 34.4058 33.6309 35.025V48.975C33.629 49.5943 33.7909 50.203 34.1003 50.7395C34.4097 51.2759 34.8555 51.7209 35.3924 52.0294C35.9294 52.3379 36.5384 52.4988 37.1577 52.4958C37.7769 52.4929 38.3844 52.3261 38.9184 52.0125L51.0009 45.0375C51.5334 44.7291 51.9755 44.2862 52.2829 43.7531C52.5902 43.2199 52.752 42.6154 52.752 42C52.752 41.3846 52.5902 40.7801 52.2829 40.247C51.9755 39.7138 51.5334 39.2709 51.0009 38.9625Z"
                    fill="white"
                  />
                  <circle
                    opacity="0.5"
                    cx="42"
                    cy="42"
                    r="41.5"
                    stroke="white"
                  />
                </svg>
              </a>
            </div>
          </SwiperSlide>

          <div class="testimonials-swiper-pagination"></div>
          <div class="testimonials-swiper-button-prev">Назад</div>
          <div class="testimonials-swiper-button-next">Вперед</div>
        </Swiper>
        <!-- <div class="swiper testimonials-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide testimonials-slide-container">
              <img
                src="../assets/img/testimonials-video-pic.png"
                alt=""
                class="testimonials-video__pic"
              />
            </div>
            <div class="swiper-slide testimonials-slide-container">
              <img
                src="../assets/img/testimonials-video-pic.png"
                alt=""
                class="testimonials-video__pic"
              />
            </div>
            <div class="swiper-slide testimonials-slide-container">
              <img
                src="../assets/img/testimonials-video-pic.png"
                alt=""
                class="testimonials-video__pic"
              />
            </div>
            <div class="swiper-slide testimonials-slide-container">
              <img
                src="../assets/img/testimonials-video-pic.png"
                alt=""
                class="testimonials-video__pic"
              />
            </div>
            <div class="swiper-slide testimonials-slide-container">
              <img
                src="../assets/img/testimonials-video-pic.png"
                alt=""
                class="testimonials-video__pic"
              />
            </div>
          </div>
          <div class="testimonials-swiper-pagination"></div>
          <div class="testimonials-swiper-button-prev">Назад</div>
          <div class="testimonials-swiper-button-next">Вперед</div>
        </div> -->
      </div>
    </section>
    <SelectForm></SelectForm>
  </main>
  <Footer></Footer>
</template>
