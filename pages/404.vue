<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header></Header>
  <main class="main">
    <section class="not-found">
      <div class="container not-found-container flex">
        <h1 class="not-found__title">Страница не найдена</h1>
        <img src="../assets/img/404.png" alt="" class="not-found__pic" />
        <p class="not-found__descr">
          Страница, которую вы ищете не существует, либо она перемещена по
          другому адресу
        </p>
        <a href="/" class="not-found__btn">Вернуться на главную</a>
      </div>
    </section>
  </main>
  <Footer></Footer>
</template>
