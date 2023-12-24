import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  const products = ref([]);
  const filters = ref({});

  const currentPage = ref(0);
  const totalPages = ref(0);
  const itemsToShow = 12;
  const perPage = ref(12);

  watch(
    () => currentPage,
    () => {
      window.scrollTo(0, 0);
    },
    { deep: true }
  );

  const filterFields = computed(() => {
    const fields = {
      carModels: [],
      memorySizes: [],
      screenSizes: [],
    };

    products.value.forEach((product) => {
      if (
        product.carModel &&
        fields.carModels.indexOf(product.carModel) == -1
      ) {
        fields.carModels.push(product.carModel);
      }

      product.variations.forEach((variation) => {
        if (
          variation.memorySize &&
          fields.memorySizes.indexOf(variation.memorySize) == -1
        ) {
          fields.memorySizes.push(variation.memorySize);
        }

        if (
          variation.screenSize &&
          fields.screenSizes.indexOf(variation.screenSize) == -1
        ) {
          fields.screenSizes.push(variation.screenSize);
        }
      });
    });

    return fields;
  });

  function checkProductVariations(key, values, product) {
    for (let i = 0; i < product.variations.length; i++) {
      let variation = product.variations[i];

      if (values.indexOf(variation[key]) > -1) return true;
    }
    return false;
  }

  function checkProductPrices(min, max, product) {
    for (let i = 0; i < product.variations.length; i++) {
      let variation = product.variations[i];

      if (variation.price >= min && variation.price <= max) {
        return true;
      }
    }
    return false;
  }

  const filteredProducts = computed(() => {
    let filtered = JSON.parse(JSON.stringify(products.value));

    filtered = filtered.filter((product) => product.variations.length > 0);

    if (filters.value.models) {
      filtered = filtered.filter(
        (product) => filters.value.models.indexOf(product.carModel) > -1
      );
    }

    if (filters.value.memory) {
      filtered = filtered.filter((product) =>
        checkProductVariations("memorySize", filters.value.memory, product)
      );
    }

    if (filters.value.screen) {
      filtered = filtered.filter((product) =>
        checkProductVariations("screenSize", filters.value.screen, product)
      );
    }

    if (filters.value.minPrice >= 0 && filters.value.maxPrice) {
      filtered = filtered.filter((product) =>
        checkProductPrices(
          filters.value.minPrice,
          filters.value.maxPrice,
          product
        )
      );
    }

    totalPages.value = Math.ceil(filtered.length / perPage.value);

    return filtered.slice(
      currentPage.value * perPage.value,
      (currentPage.value + 1) * perPage.value
    );
  });

  return {
    products,
    filteredProducts,
    filterFields,
    filters,
    totalPages,
    currentPage,
    perPage,
    itemsToShow,
  };
});
