<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectForm from "@/components/SelectForm.vue";
import Brands from "@/components/Brands.vue";
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
            Каталог
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <Brands :expanded="true"></Brands>
    <SelectForm></SelectForm>
  </main>
  <Footer></Footer>
</template>
