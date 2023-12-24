<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectForm from "@/components/SelectForm.vue";
import { baseUrl, fetchArticles } from "@/api";
import { formatDate } from "@/helpers";

const fetchedArticles = await useAsyncData(() => fetchArticles());
const articles = fetchedArticles.data;
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
            Блог
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="blog">
      <div class="container">
        <h1 class="blog__title">Блог</h1>
        <div class="blog__list">
          <article v-for="article in articles" class="article-thumb flex">
            <div class="article-thumb-left">
              <img
                class="article-thumb__pic"
                :src="`${baseUrl}${article.image}`"
              />
            </div>
            <div class="article-thumb-right">
              <div class="article-thumb__date">
                {{ formatDate(new Date(article.createdAt)) }}
              </div>
              <h2 class="article-thumb__title">
                {{ article.title }}
              </h2>
              <p class="article-thumb__descr">
                {{ article.shortDescription }}
              </p>
              <a :href="`/blog/${article.slug}`" class="article-thumb__btn"
                >Читать статью</a
              >
            </div>
          </article>
        </div>
        <!-- <div class="blog-bottom flex">
          <div class="blog-bottom-left flex">
            <button class="btn-reset blog__btn_prev">Назад</button>
            <div class="blog-pagination flex">
              <div class="blog-pagination__bullet"></div>
              <div class="blog-pagination__bullet"></div>
              <div
                class="blog-pagination__bullet blog-pagination__bullet--active"
              ></div>
              <div class="blog-pagination__bullet"></div>
              <div class="blog-pagination__bullet"></div>
              <div class="blog-pagination__bullet"></div>
            </div>
            <button class="btn-reset blog__btn_next">Вперед</button>
          </div>
          <div class="blog-bottom-right">
            <button class="btn-reset blog__btn_more">
              Посмотреть все статьи
            </button>
          </div>
        </div> -->
      </div>
    </section>
    <SelectForm></SelectForm>
  </main>
  <Footer></Footer>
</template>
