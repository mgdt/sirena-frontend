<script setup>
import { vMaska } from "maska";
import { sendCallback } from "~/api";

const formData = ref({
  carModel: "",
  phone: "",
});

function validatePhone() {
  if (formData.value.phone.length < 18) {
    formData.value.phone = "";
  }
}

async function handleSubmit() {
  await sendCallback(formData.value);
  window.location.href = "/thanks";
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    method="post"
    class="hero-mob__form flex"
  >
    <input
      type="text"
      class="hero-mob__input hero-input-img1"
      v-model="formData.carModel"
      placeholder="Subaru Forester"
      required
    />
    <input
      type="tel"
      class="hero-mob__input hero-input-img2"
      @change="validatePhone"
      v-model="formData.phone"
      v-maska
      data-maska="+7 (###) ###-##-##"
      placeholder="Ваш номер телефона"
      required
    />
    <button class="btn-reset hero-mob__form__btn">Получить варианты</button>
  </form>
</template>
