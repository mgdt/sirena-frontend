<script setup>
import { fetchCategories, baseUrl } from "@/api";

const fetchedCats = await useAsyncData(() => fetchCategories());
const categories = fetchedCats.data;

function getLink(index, slug) {
  if (index === 0) {
    return "/brands";
  }
  return `/products?category=${slug}`;
}
</script>

<template>
  <section class="catalogue">
    <div class="container">
      <h2 class="radio__title">Каталог товаров</h2>
      <div class="catalogue__list flex">
        <a
          v-for="(category, index) in categories"
          :href="getLink(index, category.slug)"
          class="catalogue__item flex"
        >
          <img
            :src="`${baseUrl}${category.image}`"
            alt=""
            class="catalogue__pic"
          />
          <div class="catalogue__link">
            {{ category.name }}
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
