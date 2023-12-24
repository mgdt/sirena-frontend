<script setup>
import Slider from "@vueform/slider";
import { ref } from "vue";
import { useProductsStore } from "@/stores/products";
import { onClickOutside } from "@vueuse/core";

const sliderValue = ref([0, 50000]);
const route = useRoute();
const filtersElement = ref(null);
const filtersOpened = ref(false);

function handleFiltersLabelClick() {
  if (process.client) {
    if (document.documentElement.offsetWidth < 600) {
      filtersOpened.value = true;
    }
  }
}

onClickOutside(filtersElement, (event) => {
  if (filtersOpened.value) {
    filtersOpened.value = false;
  }
});

const productsStore = useProductsStore();

const filters = ref({
  models: [],
  memory: [],
  screen: [],
  minPrice: sliderValue.value[0],
  maxPrice: sliderValue.value[1],
});

function applyFilters() {
  const preparedFilters = {};
  if (filters.value.models.length)
    preparedFilters.models = filters.value.models;
  if (filters.value.memory.length)
    preparedFilters.memory = filters.value.memory;
  if (filters.value.screen.length)
    preparedFilters.screen = filters.value.screen;

  if (filters.value.screen.length)
    preparedFilters.screen = filters.value.screen;

  preparedFilters.minPrice = sliderValue.value[0];
  preparedFilters.maxPrice = sliderValue.value[1];

  productsStore.filters = preparedFilters;
  filtersOpened.value = false;
}
</script>

<template>
  <button
    @click="handleFiltersLabelClick"
    class="btn-reset filter__btn"
    v-if="!route.query.search"
  >
    Фильтры
  </button>
  <div
    ref="filtersElement"
    class="category-filter"
    :class="{ active: filtersOpened }"
  >
    <div class="category-filter__inner">
      <div class="filters__close" @click="filtersOpened = false">&times;</div>
      <div class="filter">
        <div class="filter-top flex">
          <div class="filter__title">Фильтр</div>
          <button class="btn-reset filter-hide-btn"></button>
        </div>
        <div class="filter-range">
          <div class="filter-range__title">Цена</div>
          <input
            v-model="sliderValue[0]"
            type="text"
            class="filter-range-left"
          />
          <input
            v-model="sliderValue[1]"
            type="text"
            class="filter-range-right"
          />
          <div class="range">
            <Slider v-model="sliderValue" :min="0" :max="50000" />
          </div>
        </div>
      </div>

      <!-- model -->
      <div class="category-model">
        <div class="filter-top flex">
          <div class="filter__title">Модель автомобиля</div>
          <button class="btn-reset filter-hide-btn"></button>
        </div>
        <label
          v-for="model in productsStore.filterFields.carModels"
          :key="model"
          class="category__label_check flex"
        >
          <input
            type="checkbox"
            v-model="filters.models"
            :value="model"
            class="category__input_check"
          />
          <span class="category__check_btn"></span>
          <span class="category__input_title">{{ model }}</span>
        </label>
      </div>
      <!-- memory -->
      <!-- <div class="category-memory">
        <div class="filter-top flex">
          <div class="filter__title">Размер памяти</div>
          <button class="btn-reset filter-hide-btn"></button>
        </div>
        <label
          v-for="memory in productsStore.filterFields.memorySizes"
          class="category__label_check flex"
        >
          <input
            type="checkbox"
            name="memory"
            class="category__input_check"
            v-model="filters.memory"
            :value="memory"
          />
          <span class="category__check_btn"></span>
          <span class="category__input_title">{{ memory }}</span>
        </label>
      </div> -->
      <!-- display -->
      <!-- <div class="category-display">
        <div class="filter-top flex">
          <div class="filter__title">Размер экрана</div>
          <button class="btn-reset filter-hide-btn"></button>
        </div>
        <label
          v-for="display in productsStore.filterFields.screenSizes"
          class="category__label_check flex"
        >
          <input
            type="checkbox"
            name="display"
            class="category__input_check"
            :value="display"
            v-model="filters.screen"
          />
          <span class="category__check_btn"></span>
          <span class="category__input_title">{{ display }}</span>
        </label>
      </div> -->
      <button @click="applyFilters" class="btn-reset category-filter-btn">
        Применить фильтры
      </button>
    </div>
  </div>
</template>
