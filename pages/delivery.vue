<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import IconPost from "~/components/icons/IconPost.vue";
import IconLogo from "~/components/icons/IconLogo.vue";
import DeliveryIconLogo from "~/components/icons/DeliveryIconLogo.vue";
import IconSdek from "~/components/icons/IconSdek.vue";
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
            Доставка и оплата
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="options">
      <div class="container">
        <h1 class="delivery-main__title">Доставка и оплата</h1>
        <p class="delivery-main__descr">Способы оформления заказа</p>
        <div class="options__list flex">
          <a href="/catalog" class="options__item options__img-1">Через сайт</a>
          <a href="tel:+79221986698" class="options__item options__img-2"
            >По телефону</a
          >
          <a
            href="https://wa.me/79022737241"
            class="options__item options__img-3"
            >Через мессенджеры</a
          >
        </div>
      </div>
    </section>
    <section class="payment">
      <div class="container">
        <h2 class="payment__title">Оплата</h2>
        <div class="payment__list flex">
          <div class="payment__item pay-img1">
            <h3 class="payment__subtitle">Безналичный расчет</h3>
            <p class="payment__descr">
              Банковскими картами в режиме онлайн на сайте (VISA, MasterCard,
              МИР); перевод на расчетный счет компании по реквизитам; Сбербанк
              онлайн.
            </p>
          </div>
          <div class="payment__item pay-img2">
            <h3 class="payment__subtitle">Наличные</h3>
            <p class="payment__descr">
              Оплата заказа в нашем магазине, по адресу: г. Екатеринбург,
              ул.&nbsp;Армавирская&nbsp;33.
            </p>
          </div>
          <div class="payment__item pay-img3">
            <h3 class="payment__subtitle">Рассрочка без переплат</h3>
            <p class="payment__descr">
              Приобрести товар можно в рассрочку без%. Предоставляется онлайн от
              Тинькофф банка на 3/6/12 месяцев.
            </p>
          </div>
          <div class="payment__item pay-img4">
            <h3 class="payment__subtitle">
              Безналичный расчет для Юридических лиц
            </h3>
            <p class="payment__descr">Работаем без оплаты НДС!</p>
          </div>
          <div class="payment__item pay-img5">
            <h3 class="payment__subtitle">Наложенный платеж</h3>
            <p class="payment__descr">
              Оплата заказа на Почте при получении. Комиссия 3-5%.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="delivery">
      <div class="container">
        <h2 class="delivery__title">Доставка</h2>
        <p class="delivery__descr">Доставка по Екатеринбургу - бесплатно!</p>
        <div class="delivery__list flex">
          <div class="delivery__item">
            <div class="delivery__subtitle-wrap">
              <IconPost class="del__pic del__pic-post" />
              <h3 class="delivery__subtitle">Почта России</h3>
            </div>
            <p class="delivery__subdescr">
              Товар можно оплатить при получении и по предоплате. Подходит для
              доставки в любой пункт России.
            </p>
            <p class="delivery__subdescr">
              При&nbsp;оплате&nbsp;наложенного&nbsp;платежа взымается комиссия
              3-5% от оценочной стоимость товара.
            </p>
          </div>
          <div class="delivery__item">
            <div class="delivery__subtitle-wrap">
              <IconLogo class="del__pic del__pic-pickup" />
              <DeliveryIconLogo class="del__pic del-mob__pic del__pic-pickup" />
              <h3 class="delivery__subtitle">Самовывоз</h3>
            </div>
            <p class="delivery__subdescr">
              Можете самостоятельно забрать заказ в магазине по предварительно
              согласованной заявке.
            </p>
            <p class="delivery__subdescr">
              Адрес: г. Екатеринбург, ул.&nbsp;Армавирская&nbsp;33
            </p>
            <p class="delivery__subdescr">Часы работы: с 11:00 - 19:00.</p>
          </div>
          <div class="delivery__item">
            <div class="delivery__subtitle-wrap">
              <img
                src="../assets/img/del-mob-3.png"
                alt=""
                class="del-mob__pic"
              />
              <IconSdek class="del__pic del__pic-sdek" />
              <h3 class="delivery__subtitle">Транспортной компанией СДЭК</h3>
            </div>
            <p class="delivery__subdescr">
              Платно, в зависимости от региона отправки
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer></Footer>
</template>
