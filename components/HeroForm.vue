<script setup>
import CarIcon from "@/assets/icons/CarIcon.vue";
import { sendCallback } from "~/api";
import { vMaska } from "maska";

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
    class="form-tel flex"
    method="post"
    id="form__tel"
  >
    <div class="hero__form-wrap">
      <input
        class="form-tel__input"
        type="tel"
        v-model="formData.phone"
        v-maska
        @change="validatePhone"
        data-maska="+7 (###) ###-##-##"
        placeholder="Введите номер телефона"
        required
      />
      <svg
        class="form-tel__decor"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.5"
          d="M16.2364 12.2748L13.6912 11.9842C13.392 11.949 13.0886 11.9822 12.804 12.0811C12.5194 12.18 12.2609 12.3422 12.0479 12.5553L10.2042 14.3991C7.35968 12.9524 5.04761 10.6403 3.60092 7.79573L5.45465 5.94199C5.88552 5.51112 6.09594 4.90991 6.0258 4.29868L5.73522 1.77358C5.67841 1.28477 5.44382 0.83392 5.07613 0.506872C4.70843 0.179823 4.2333 -0.000583433 3.7412 1.41755e-06H2.00771C0.875436 1.41755e-06 -0.0664603 0.941902 0.00368089 2.07419C0.53475 10.6315 7.37853 17.4652 15.9257 17.9963C17.058 18.0665 17.9999 17.1246 17.9999 15.9923V14.2588C18.0099 13.2467 17.2484 12.395 16.2364 12.2748Z"
          fill="#808080"
        />
      </svg>
    </div>
    <div class="hero__form-wrap">
      <input
        class="form-tel__input"
        type="text"
        v-model="formData.carModel"
        placeholder="Марка вашего авто"
        required
        style="padding-left: 63px"
      />
      <CarIcon class="hero__input-car"></CarIcon>
    </div>
    <button class="btn-reset form-tel__btn" type="submit">
      Получить варианты
    </button>
  </form>
</template>
