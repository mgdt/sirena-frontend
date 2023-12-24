<script setup>
import { useCartStore } from "./stores/cart";
import { fetchSeo } from "@/api";

const route = useRoute();

const fetchedSeo = await useAsyncData(() => fetchSeo());
const seo = fetchedSeo.data;

const seoPage = seo.value[route.matched[0].path];

useHead({
  title: seoPage.title,
  meta: [
    {
      name: "description",
      content: seoPage.description,
    },
    {
      name: "keywords",
      content: seoPage.keywords,
    },
  ],
  script: [
    {
      innerHTML: `
          (function (d, w) {
              var n = d.getElementsByTagName("script")[0],
                s = d.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://victorycorp.ru/index.php?ref="+d.referrer+"&page=" + encodeURIComponent(w.location.href);
                n.parentNode.insertBefore(s, n);
          })(document, window);
      `,
    },
  ],
  noscript: [],
});

const cartStore = useCartStore();

if (process.client) {
  const cart = localStorage.getItem("cart");
  if (!cart) {
    cartStore.cart = {};
    localStorage.setItem("cart", JSON.stringify({}));
  } else {
    cartStore.cart = JSON.parse(cart);
  }
}
</script>

<template>
  <NuxtPage></NuxtPage>
</template>

<style>
@import "@/assets/css/normolize.css";
@import "@/assets/css/style.css";
@import "@/assets/css/media.css";
</style>
