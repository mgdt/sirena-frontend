<script setup>
import { fetchBrands, baseUrl } from "@/api";

const fetchedBrands = await useAsyncData(() => fetchBrands());
const brands = fetchedBrands.data;

const props = defineProps(["expanded"]);

const expandned = ref(props.expanded ? props.expanded : false);
const search = ref("");

const filteredBrands = computed(() => {
  if (search.value == "") {
    if (expandned.value) {
      return brands.value;
    }
    return brands.value.slice(0, 12);
  }
  return brands.value.filter((brand) =>
    brand.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <section class="radio">
    <div class="container">
      <h2 class="radio__title">
        Подбор магнитолы <br /><span class="text-highlight"
          >по марке автомобиля</span
        >
      </h2>
      <div class="brands__search">
        <input v-model="search" type="text" placeholder="Поиск марки" />
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M22.7312 21.3772L17.0156 15.6616C18.5732 13.7567 19.339 11.326 19.1546 8.87221C18.9703 6.41847 17.8498 4.12946 16.0251 2.47864C14.2004 0.827817 11.811 -0.0585053 9.35106 0.0029996C6.89117 0.0645046 4.54903 1.06913 2.80908 2.80908C1.06913 4.54903 0.0645046 6.89117 0.0029996 9.35106C-0.0585053 11.811 0.827817 14.2004 2.47864 16.0251C4.12946 17.8498 6.41847 18.9703 8.87221 19.1546C11.326 19.339 13.7567 18.5732 15.6616 17.0156L21.3772 22.7312C21.5578 22.9056 21.7997 23.0021 22.0508 23C22.3018 22.9978 22.542 22.8971 22.7195 22.7195C22.8971 22.542 22.9978 22.3018 23 22.0508C23.0021 21.7997 22.9056 21.5578 22.7312 21.3772ZM9.60611 17.2665C8.09104 17.2665 6.60998 16.8172 5.35024 15.9755C4.0905 15.1337 3.10865 13.9374 2.52885 12.5376C1.94906 11.1379 1.79736 9.59762 2.09293 8.11165C2.38851 6.62568 3.11809 5.26074 4.18941 4.18941C5.26074 3.11809 6.62568 2.38851 8.11165 2.09293C9.59762 1.79736 11.1379 1.94906 12.5376 2.52885C13.9374 3.10865 15.1337 4.0905 15.9755 5.35024C16.8172 6.60998 17.2665 8.09104 17.2665 9.60611C17.2642 11.6371 16.4564 13.5842 15.0203 15.0203C13.5842 16.4564 11.6371 17.2642 9.60611 17.2665Z"
            fill="#0D0D0D"
          />
        </svg>
      </div>
      <div class="radio__list flex">
        <a
          :href="`/products?brand=${brand.slug}`"
          v-for="brand in filteredBrands"
          class="radio__item"
        >
          <div style="flex-grow: 1; display: flex; align-items: center">
            <img
              :src="`${baseUrl}${brand.image}`"
              :alt="brand.name"
              class="radio-mob__img"
            />
            <img
              :src="`${baseUrl}${brand.image}`"
              :alt="brand.name"
              class="radio__img"
            />
          </div>
          <div class="radio-item__link">
            {{ brand.name }}
          </div>
        </a>
      </div>
      <button
        v-if="!expandned"
        @click="expandned = true"
        class="brands__more-btn"
      >
        Показать все
      </button>
    </div>
  </section>
</template>

<style scoped>
.brands__more-btn {
  width: 300px;
  height: 60px;
  border: 1px solid #e41c19;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: transparent;
  margin: 0 auto;
  margin-top: 50px;
  font-weight: 600;
  font-size: 18px;
  line-height: 135%;
  color: #e41c19;
}
.brands__search {
  width: 480px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 60px;
  border: 1px solid #e41c19;
  border-radius: 5px;
  height: 45px;
  align-items: center;
  padding-right: 20px;
  gap: 20px;
}
.brands__search svg {
  cursor: pointer;
}
.brands__search input {
  flex-grow: 1;
  border: none;
  height: auto;
  border-radius: 5px;
  padding-left: 20px;
  font-size: 18px;
}

@media screen and (max-width: 600px) {
  .brands__more-btn {
    width: 100%;
    margin-top: 30px;
  }
  .brands__search {
    width: 100%;
  }
}
</style>
