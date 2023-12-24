<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectForm from "@/components/SelectForm.vue";
import { useRoute } from "vue-router";
import { fetchArticle } from "@/api";

const route = useRoute();

const fetchedArticle = await useAsyncData(() =>
  fetchArticle(route.params.slug.toString())
);
const article = fetchedArticle.data;

const seoMeta = [];
if (article.value.seoDescription) {
  seoMeta.push({
    name: "description",
    content: article.value.seoDescription,
  });
}
if (article.value.seoKeywords) {
  seoMeta.push({
    name: "keywords",
    content: article.value.seoKeywords,
  });
}

useHead({
  title: article.value.seoTitle ? article.value.seoTitle : undefined,
  meta: seoMeta,
});

const articleCrumbs = computed(() => {
  if (!article.value.title) return "";
  if (article.value.title.length >= 16)
    return article.value.title.slice(0, 16) + "...";
  return article.value.title;
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
          <a href="/blog" class="tree__link">
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
            {{ articleCrumbs }}
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <article class="article">
      <div class="container">
        <h1 class="article__title">
          {{ article.title }}
        </h1>
        <div class="article__content" v-html="article.content"></div>
        <a href="/blog" class="article__link_back">
          <svg
            class="article__link_arrow"
            width="13"
            height="11"
            viewBox="0 0 13 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.544 0.599999H5.672L0.872 5.4L5.672 10.2H7.544L3.416 6.072H12.12V4.728H3.416L7.544 0.599999Z"
              fill="#E41C19"
            />
          </svg>
          Вернуться назад
        </a>
      </div>
    </article>
    <SelectForm></SelectForm>
  </main>
  <Footer></Footer>
</template>

<style scoped>
.article__link_back {
  margin-top: 40px;
  display: block;
}

.article__content :deep(h2) {
  font-size: 24px;
  line-height: 29px;
  color: #0d0d0d;
  padding-top: 30px;
  padding-bottom: 30px;
  background: #f7f7f7;
  border-radius: 10px;
  padding-left: 69px;
  padding-right: 55px;
  position: relative;
  margin-top: 70px;
}
.article__content :deep(h2):first-of-type {
  margin-top: 0;
}
.article__content :deep(p) {
  font-size: 20px;
  line-height: 140%;
  text-align: justify;
  color: #0d0d0d;
}
.article__content :deep(h2)::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 14px;
  height: 100%;
  background: #e41c19;
  border-radius: 4px;
}
.article__content :deep(img) {
  margin-top: 20px;
  max-width: 100%;
}

@media (max-width: 575.9px) {
  .article__content :deep(h2) {
    font-size: 18px;
    line-height: 22px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 40px;
    padding-right: 30px;
    margin-top: 50px;
  }
  .article__content :deep(p) {
    font-size: 16px;
    line-height: 140%;
  }
}
</style>
