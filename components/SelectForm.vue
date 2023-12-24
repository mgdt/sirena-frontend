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
  <section class="select">
    <div class="container">
      <div class="select-container">
        <h2 class="select__title">
          <span class="text-highlight">Поможем подобрать автомагнитолу</span
          ><br />или аксессуары для&nbsp;вашего авто
        </h2>
        <p class="select__descr">
          Оставьте ваши контакты и получите актуальный прайс-лист с полным
          ассортиментом
        </p>
        <form
          @submit.prevent="handleSubmit"
          class="select-form flex"
          method="post"
        >
          <div class="select-form-top flex">
            <input
              type="text"
              class="select-form__input"
              name="model"
              id="select-model"
              v-model="formData.carModel"
              placeholder="Марка и модель авто"
              required
            />
            <input
              type="tel"
              class="select-form__input"
              placeholder="Ваш телефон"
              @change="validatePhone"
              v-model="formData.phone"
              v-maska
              data-maska="+7 (###) ###-##-##"
              required
            />
          </div>
          <div class="select-form-bottom">
            <label class="select-form__label" for="select-checkbox">
              <span class="select-form__label-text"
                >Я принимаю
                <a href="#" class="select-form-checkbox__link"
                  >условия <br />передачи информации</a
                ></span
              >
              <input
                type="checkbox"
                class="select-form__checkbox"
                id="select-checkbox"
                required
                checked
              />
              <span class="select-form__check-btn"></span>
            </label>
            <button class="btn-reset select-form__btn" type="submit">
              Заявка на подбор
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
