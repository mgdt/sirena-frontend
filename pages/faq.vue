<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import FaqItem from "@/components/FaqItem.vue";
import { vMaska } from "maska";
import { fetchQuestions } from "@/api";
import { sendQuestion } from "@/api";

const formData = ref({
  question: "",
  phone: "",
  name: "",
  email: "",
});

const fetchedQuestions = await useAsyncData(() => fetchQuestions());
const questions = fetchedQuestions.data;

async function handleSubmit() {
  await sendQuestion(formData.value);
  window.location.href = "/thanks";
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
            Вопросы и ответы
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="faq">
      <div class="container">
        <h1 class="faq__title">Часто задаваемые вопросы</h1>

        <div class="accordion-container">
          <FaqItem
            v-for="question in questions"
            :title="question.title"
            :description="question.content.replaceAll('\n', '<br>')"
          ></FaqItem>
        </div>
      </div>
    </section>
    <section class="question">
      <div class="container">
        <div class="question-container">
          <h2 class="question__title">
            <span class="text-highlight">Не нашли ответ</span><br />
            на свой вопрос?
          </h2>
          <p class="question__descr">
            Напишите ваш вопрос и мы обязательно ответим!
          </p>
          <form
            @submit.prevent="handleSubmit"
            action="#"
            method="post"
            class="question-form flex"
            id="question-form"
          >
            <div class="question-form-top flex">
              <div class="question-form-left">
                <textarea
                  name="question-form__textarea"
                  id="question-form__textarea"
                  cols="30"
                  rows="10"
                  class="question-form__textarea"
                  v-model="formData.question"
                  placeholder="Ваш вопрос*"
                  required
                ></textarea>
              </div>
              <div class="question-form-right flex">
                <input
                  type="text"
                  class="question-form__input"
                  v-model="formData.name"
                  id="question-form__name"
                  placeholder="Введите имя*"
                  required
                />
                <input
                  type="email"
                  class="question-form__input"
                  v-model="formData.email"
                  id="question-form__email"
                  placeholder="Введите e-mail*"
                  required
                />
                <input
                  type="tel"
                  class="question-form__input"
                  name="tel"
                  v-model="formData.phone"
                  v-maska
                  data-maska="+7 (###) ###-##-##"
                  placeholder="Введите телефон*"
                  required
                />
              </div>
            </div>
            <button class="btn-reset question-form__btn">Отправить</button>
          </form>
        </div>
      </div>
    </section>
  </main>
  <Footer></Footer>
</template>

<style scoped>
.accordion-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
