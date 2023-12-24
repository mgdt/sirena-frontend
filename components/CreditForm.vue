<script setup>
import { ref } from "vue";
import { useUiStore } from "@/stores/ui";

const creditMonths = ref("3");
const uiStore = useUiStore();

function handleSubmit() {
  localStorage.setItem("creditMonths", creditMonths.value);
  uiStore.toggleCreditPopup();
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="loan__form">
    <div class="loan-form__title">Выберите удобный для вас срок:</div>

    <div class="loan-form-center">
      <input
        v-model="creditMonths"
        class="loan-form__input"
        type="radio"
        value="3"
        id="credit-3"
      />
      <label class="loan-form__label" for="credit-3">3 мес.</label>

      <input
        v-model="creditMonths"
        class="loan-form__input"
        type="radio"
        value="4"
        id="credit-4"
      />
      <label class="loan-form__label" for="credit-4">4 мес.</label>

      <input
        v-model="creditMonths"
        class="loan-form__input"
        type="radio"
        value="6"
        id="credit-6"
      />
      <label class="loan-form__label" for="credit-6">6 мес.</label>
    </div>

    <button class="btn-reset loan-form__btn">Оформить рассрочку</button>
  </form>
</template>
