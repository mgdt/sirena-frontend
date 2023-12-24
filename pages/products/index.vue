<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Filters from "@/components/Filters.vue";
import SelectForm from "@/components/SelectForm.vue";
import { fetchProducts, baseUrl, fetchBrand, fetchCategory } from "@/api";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";

const route = useRoute();
const productsStore = useProductsStore();

const filters = {};

filters.search = route.query.search;

const currentCategory = ref({});
const currentBrand = ref({});

if (route.query.category) {
  const fetchedCategory = await useAsyncData(() =>
    fetchCategory(route.query.category.toString())
  );

  currentCategory.value = fetchedCategory.data.value;
  filters.category = currentCategory.value.id;
}

if (route.query.brand) {
  const fetchedBrand = await useAsyncData(() =>
    fetchBrand(route.query.brand.toString())
  );

  currentBrand.value = fetchedBrand.data.value;
  filters.brand = currentBrand.value.id;
}

const fetchedProducts = await useAsyncData(() => fetchProducts(filters));
productsStore.products = fetchedProducts.data.value;

function formatNumber(number) {
  return new Intl.NumberFormat("ru-RU").format(number);
}

function getProductPrices(product) {
  if (product.variations[0] && product.variations[0].price) {
    let priceMin = product.variations[0].price;
    let priceMax = product.variations[product.variations.length - 1].price;
    if (priceMin == priceMax) {
      return `${formatNumber(priceMin)} ₽`;
    }
    return `${formatNumber(priceMin)} ₽ - ${formatNumber(priceMax)} ₽`;
  }
  return "Цена не указана";
}

function catalogTitle() {
  if (route.query.search) {
    return `Поиск по запроу: ${route.query.search}`;
  }
  if (currentCategory.value.name) {
    return currentCategory.value.name;
  }
  if (currentBrand.value.name) {
    return currentBrand.value.name;
  }
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
          <a href="/catalog" class="tree__link">
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
            Каталог
          </a>
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
            {{ catalogTitle() }}
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="category">
      <div class="container">
        <h1 class="category__title">{{ catalogTitle() }}</h1>
        <div class="category-container flex">
          <Filters v-if="!route.query.search"></Filters>
          <div class="category__list">
            <div
              class="category__items"
              v-if="productsStore.filteredProducts.length > 0"
            >
              <div
                v-for="product in productsStore.filteredProducts"
                :key="product.id"
                class="category__item"
              >
                <a
                  :href="`/products/${product.id}`"
                  class="product__image-wrap"
                >
                  <img
                    v-if="product.images"
                    :src="`${baseUrl}${product.images[0]?.src}`"
                    alt=""
                    class="category-item__pic"
                  />
                </a>
                <a
                  :href="`/products/${product.id}`"
                  class="category-item__title"
                  >{{ product.name }}</a
                >
                <p class="category-item__price">
                  {{ getProductPrices(product) }}
                </p>
                <p class="category-item__descr">Цена за 1 шт.</p>
                <div class="category-item-bottom flex">
                  <a
                    :href="`/products/${product.id}`"
                    class="btn-reset category-item__btn_order"
                    >Купить</a
                  >
                </div>
              </div>
            </div>
            <div style="font-size: 20px" v-else>Ничего не найдено</div>
            <div
              class="category-list-bottom flex"
              v-if="productsStore.totalPages > 1"
            >
              <div class="category-list-navigation flex">
                <button
                  @click="
                    productsStore.currentPage > 0
                      ? productsStore.currentPage--
                      : ''
                  "
                  class="btn-reset category-list__btn_prev"
                >
                  Назад
                </button>
                <div class="category-list__pagination flex">
                  <div
                    v-for="page in productsStore.totalPages"
                    class="pagination__bullet"
                    @click="productsStore.currentPage = page - 1"
                    :class="{
                      'pagination__bullet--active':
                        page - 1 === productsStore.currentPage,
                    }"
                  ></div>
                </div>
                <button
                  @click="
                    productsStore.currentPage < productsStore.totalPages - 1
                      ? productsStore.currentPage++
                      : ''
                  "
                  class="btn-reset category-list__btn_next"
                >
                  Вперед
                </button>
              </div>
              <button
                class="btn-reset category-list__btn more-btn"
                @click="productsStore.perPage += productsStore.itemsToShow"
              >
                Показать больше
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <SelectForm></SelectForm>
  </main>
  <Footer></Footer>
</template>

<style src="@vueform/slider/themes/default.css"></style>
