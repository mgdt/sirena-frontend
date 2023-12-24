<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectForm from "@/components/SelectForm.vue";
import marker from "@/assets/img/map-pin.svg";
import { YandexMap, YandexMarker } from "vue-yandex-maps";

let cooridnates = [56.865801, 60.579239];
if (process.client) {
  if (document.documentElement.offsetWidth < 600) {
    cooridnates = [56.865629, 60.584953];
  }
}

const mapSettings = {
  apiKey: "d45d4e8a-c606-463d-b62e-35ad31020bab",
  coordorder: "latlong",
  debug: false,
  version: "2.1",
};
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
            Контакты
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="contacts">
      <div class="container">
        <h1 class="contacts__title">Контактная информация</h1>
      </div>
      <div id="map">
        <ClientOnly>
          <YandexMap
            class="map__map"
            :coordinates="cooridnates"
            :zoom="16"
            :controls="['smallMapDefaultSet']"
            :settings="mapSettings"
          >
            <YandexMarker
              :coordinates="[56.866982, 60.585168]"
              :markerId="1"
              :options="{
                iconOffset: [-25, -28],
                iconImageHref: marker,
                iconLayout: 'default#image',
                iconImageSize: [71, 71],
              }"
            >
            </YandexMarker>
          </YandexMap>
        </ClientOnly>
        <div class="container">
          <div class="contacts-container">
            <div class="contacts-tel">
              <p class="contacts-container__descr">Телефоны:</p>
              <a
                href="tel:+79221986698"
                class="contacts__link contacts__link_tel"
                >+7 (922) 198-66-98</a
              >
              <a
                href="tel:+79221757075"
                class="contacts__link contacts__link_tel"
                >+7 (922) 175-70-75</a
              >
            </div>
            <div class="contacts-email">
              <p class="contacts-container__descr">E-mail:</p>
              <a
                href="mailto:sirena96.ekb@mail.ru"
                class="contacts__link contacts__link_email"
                >sirena96.ekb@mail.ru</a
              >
            </div>
            <div class="contacts-schedule">
              <p class="contacts-container__descr">Режим работы:</p>
              <p class="contacts__link contacts__link_schedule">
                Ежедневно&nbsp;с&nbsp;10:00 до 19:00
              </p>
            </div>
            <!-- <div class="contacts-requisites">
              <p class="contacts-container__descr">Реквизиты:</p>
              <p class="contacts__link contacts__link_requisites">
                ИП Иван Иванов Иванович,
              </p>
              <p class="contacts__link contacts__link_requisites">
                ИНН 777777777777
              </p>
            </div> -->
          </div>
          <div class="address-container">
            <p class="address-descr">Адрес:</p>
            <address class="address">
              г. Екатеринбург, ул.&nbsp;Армавирская&nbsp;33
            </address>
          </div>
        </div>
      </div>
    </section>
    <SelectForm></SelectForm>
  </main>
  <Footer></Footer>
</template>

<style scoped>
#map {
  position: relative;
}
.map__map {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.map__map > div {
  height: 100%;
}
</style>
