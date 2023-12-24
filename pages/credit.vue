<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectForm from "@/components/SelectForm.vue";
import { useUiStore } from "@/stores/ui";

const creditMonths = ref("3");
const uiStore = useUiStore();

function handleSubmit() {
  localStorage.setItem("creditMonths", creditMonths.value);
  uiStore.toggleCreditPopup();
}
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
            Рассрочка
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="credit">
      <div class="container">
        <form @submit.prevent="handleSubmit" class="form__credit-form">
          <div class="credit-top">
            <h1 class="credit__title">
              Рассрочка без % от<br />
              банка Тинькофф
            </h1>
            <p class="credit__descr">
              Предоставляем рассрочку:<br />0% первый взнос и 0% переплат
            </p>
            <p class="credit__subdescr">
              Оставьте заявку на оформление рассрочки и менеджер свяжется с вами
              в ближайшее время.
            </p>
            <div class="credit-form__title">Выберите удобный для вас срок:</div>
            <div class="credit-form-inputs flex">
              <input
                class="credit-form__select"
                type="radio"
                v-model="creditMonths"
                id="credit-3"
                value="3"
              />
              <label class="credit-form__label" for="credit-3">3 мес.</label>
              <input
                class="credit-form__select"
                type="radio"
                v-model="creditMonths"
                id="credit-4"
                value="4"
              />
              <label class="credit-form__label" for="credit-4">4 мес.</label>
              <input
                class="credit-form__select"
                type="radio"
                v-model="creditMonths"
                id="credit-6"
                value="6"
              />
              <label class="credit-form__label zero-gap" for="credit-6"
                >6 мес.</label
              >
            </div>
            <button class="btn-reset loan-form__btn credit__btn">
              Оформить рассрочку
            </button>
          </div>
        </form>
      </div>
    </section>
    <SelectForm></SelectForm>
  </main>
  <Footer></Footer>
</template>
