<script setup>
import { fetchCategories, baseUrl } from "@/api";

const fetchedCats = await useAsyncData(() => fetchCategories());
const categories = fetchedCats.data;
const openedCategories = ref(true);

function getLink(index, slug) {
  if (index === 0) {
    return "/brands";
  }
  return `/products?category=${slug}`;
}
</script>

<template>
  <div
    class="header__categories-header"
    @click="openedCategories = !openedCategories"
  >
    <span>Каталог товаров</span>
    <svg
      width="17"
      height="9"
      viewBox="0 0 17 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :class="{ active: openedCategories }"
    >
      <path
        d="M9.19991 0.259201C9.12192 0.179261 9.01757 0.1139 8.89585 0.0687466C8.77412 0.023592 8.63867 0 8.50115 0C8.36364 0 8.22818 0.023592 8.10646 0.0687466C7.98473 0.1139 7.88038 0.179261 7.8024 0.259201L0.151798 8.05866C0.063242 8.14862 0.0113125 8.25399 0.00164795 8.36332C-0.00801659 8.47265 0.0249557 8.58175 0.096981 8.67879C0.169008 8.77582 0.277332 8.85706 0.410189 8.91369C0.543043 8.97032 0.695349 9.00017 0.850554 9H16.1518C16.3066 8.99955 16.4583 8.96931 16.5907 8.91255C16.723 8.85578 16.8309 8.77463 16.9027 8.67783C16.9746 8.58102 17.0077 8.47222 16.9985 8.36312C16.9893 8.25403 16.9381 8.14877 16.8505 8.05866L9.19991 0.259201Z"
        fill="white"
      />
    </svg>
  </div>
  <div class="header__categories-outer" :class="{ active: openedCategories }">
    <div class="header__categories">
      <a
        :href="getLink(index, category.slug)"
        class="header__category"
        v-for="(category, index) in categories"
      >
        <div>
          <IconsHeaderAndroid v-if="index == 0"></IconsHeaderAndroid>
          <IconsHeaderPhoto v-if="index == 1"></IconsHeaderPhoto>
          <IconsHeaderVideo v-if="index == 2"></IconsHeaderVideo>
          <IconsHeaderWifi v-if="index == 3"></IconsHeaderWifi>
        </div>
        <span>{{ category.name }}</span>
      </a>
    </div>
  </div>
</template>
