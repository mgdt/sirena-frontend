<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useCartStore } from "~/stores/cart";
import { checkOrders } from "~/api";

const route = useRoute();
const cartStore = useCartStore();

if (route.query.clearCart) {
  cartStore.cart = {};
}

if (process.client) {
  localStorage.setItem("cart", "{}");
}

onMounted(async () => {
  const orders = await checkOrders();
  console.log(orders);
});
</script>

<template>
  <Header></Header>
  <main class="main">
    <section class="thankyou">
      <div class="container thankyou-container flex">
        <img src="../assets/img/thankyou.png" alt="" class="thankyou__pic" />
        <h1 class="thankyou__title">Спасибо за вашу заявку!</h1>
        <p class="thankyou__descr">
          Мы ознакомимся с вашей заявкой и свяжемся с вами по указанному
          телефону в ближайшее время
        </p>
        <a href="/" class="not-found__btn thankyou__btn"
          >Вернуться на главную</a
        >
      </div>
    </section>
  </main>
  <Footer></Footer>
</template>
