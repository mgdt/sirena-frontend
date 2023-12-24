<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SelectForm from "@/components/SelectForm.vue";
import Recomend from "~/components/Recomend.vue";
import RecomendPopup from "~/components/RecomendPopup.vue";
import { useCartStore } from "@/stores/cart";
import { useUiStore } from "~/stores/ui";
import { formatNumber } from "@/helpers";
import {
  baseUrl,
  fetchRecommendedProducts,
  fetchPromocode,
  createOrder,
} from "@/api";
import { useRoute } from "vue-router";
import { vMaska } from "maska";
import { watchDebounced } from "~/.nuxt/imports";

import "swiper/css";
import "swiper/css/pagination";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const cartStore = useCartStore();
const uiStore = useUiStore();
const creditMonths = ref(null);
const route = useRoute();

const monthsText = computed(() => {
  if (creditMonths.value == "3" || creditMonths.value == "4") {
    return "месяца";
  }
  return "месяцев";
});

const fio = ref("");
const phone = ref("");
const deliveryMethod = ref("Самовывоз");
const address = ref("");
const paymentMethod = ref("card");
const promocode = ref("");

const promocodeData = ref({
  text: "",
  amount: 0,
  error: true,
});

function validatePhone() {
  if (phone.value.length < 18) {
    phone.value = "";
  }
}

const deliveryCost = computed(() => {
  if (paymentMethod.value == "card" || deliveryMethod.value == "Самовывоз") {
    return "Бесплатно";
  }
  return "Расчитает менеджер индивидуально";
});

const fetchedRecomendedProducts = await useAsyncData(() =>
  fetchRecommendedProducts()
);
const recomendedProducts = fetchedRecomendedProducts.data;

watchDebounced(
  promocode,
  async () => {
    const response = await fetchPromocode(promocode.value);
    if (response.amount) {
      promocodeData.value.amount = response.amount;
      promocodeData.value.text = response.text;
      promocodeData.value.error = false;
    } else {
      promocodeData.value.amount = 0;
      promocodeData.value.text = "Промокод не найден";
      promocodeData.value.error = true;
    }
  },
  { debounce: 500, maxWait: 1000 }
);

const orderCart = computed(() => {
  const result = [];
  for (let key in cartStore.cart) {
    result.push({
      productVariationId: +key,
      count: cartStore.cart[key].count,
    });
  }
  return result;
});

async function handleSubmit() {
  const order = {
    fio: fio.value,
    phone: phone.value,
    deliveryMethod: deliveryMethod.value,
    address: address.value,
    paymentMethod: paymentMethod.value,
    credit: creditMonths.value,
    promocode: promocodeData.value.error ? "" : promocode.value,
    cartItems: orderCart.value,
  };

  const response = await createOrder(order);

  if (order.paymentMethod == "card") {
    if (response.paymentUrl) {
      window.location.href = response.paymentUrl;
      return;
    }
  }

  window.location.href = "/thanks?clearCart=1";
}

onMounted(async () => {
  await cartStore.fetchCartProducts();
  creditMonths.value = localStorage.getItem("creditMonths");
  localStorage.removeItem("creditMonths");

  if (creditMonths.value && creditMonths.value !== null) {
    paymentMethod.value = "credit";
  }
  if (route.query.payment == "credit") {
    paymentMethod.value = "credit";
  }

  setTimeout(() => {
    uiStore.toggleRecomendPopup();
  }, 3000);
});
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
            Оформление заказа
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main class="main">
    <section class="order">
      <div class="container">
        <h1 class="order__title">Ваш заказ:</h1>
        <ClientOnly>
          <div class="order__list" v-if="cartStore.cartList.length > 0">
            <div
              class="order__item flex"
              v-for="cartItem in cartStore.cartList"
            >
              <img
                :src="`${baseUrl}${cartItem.product.Product.images[0].src}`"
                alt=""
                class="oreder-item__pic"
              />
              <div class="oreder-item-descr">
                <h3 class="order-item__title">
                  {{ cartItem.product.Product.name }}
                </h3>
                <p class="order-item__descr">
                  {{ cartItem.product.name }}
                </p>
              </div>
              <div class="order-item__amount flex">
                <button
                  class="btn-reset order-item__btn_minus"
                  @click="
                    cartStore.decreaseFromCart(cartItem.product.id.toString())
                  "
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="14.5" stroke="#0D0D0D" />
                    <path d="M22 15L8 15" stroke="#0D0D0D" />
                  </svg>
                </button>
                <div class="order-item__num">{{ cartItem.count }}</div>
                <button
                  class="btn-reset order-item__btn_plus"
                  @click="cartStore.addToCart(cartItem.product.id.toString())"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15" cy="15" r="14.5" stroke="#0D0D0D" />
                    <path d="M15 8V22M8 15H22" stroke="#0D0D0D" />
                  </svg>
                </button>
              </div>
              <div class="order-item__price">
                <p class="order-item__descr">Цена за 1 шт.</p>
                <p class="order-item__cost">
                  {{ formatNumber(cartItem.product.price) }} ₽
                </p>
              </div>

              <div class="order-item-bottom">
                <button
                  class="btn-reset oreder-item__btn_remove flex"
                  @click="cartStore.deleteFromCart(cartItem.product.id)"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.82 11.16L22.14 27.16C22.098 27.3896 21.977 27.5972 21.7981 27.7469C21.6191 27.8967 21.3934 27.9791 21.16 27.98H8.84C8.60664 27.9791 8.38092 27.8967 8.20195 27.7469C8.02297 27.5972 7.902 27.3896 7.86 27.16L5.18 11.16C5.15691 11.0176 5.16491 10.8719 5.20344 10.7329C5.24198 10.5939 5.31013 10.4648 5.40323 10.3546C5.49633 10.2444 5.61216 10.1557 5.74279 10.0945C5.87342 10.0333 6.01574 10.001 6.16 10H23.82C23.9659 9.99812 24.1105 10.0282 24.2436 10.0881C24.3767 10.1481 24.495 10.2364 24.5903 10.347C24.6856 10.4575 24.7555 10.5876 24.7952 10.728C24.8349 10.8685 24.8434 11.0159 24.82 11.16ZM25 8H5V6H10V3C10 2.73478 10.1054 2.48043 10.2929 2.29289C10.4804 2.10536 10.7348 2 11 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V6H25V8ZM18 6V4H12V6H18Z"
                      fill="#0D0D0D"
                    />
                    <path
                      d="M22.789 12.9291L20.6631 25.7433C20.6297 25.9271 20.5338 26.0934 20.3918 26.2133C20.2498 26.3333 20.0708 26.3993 19.8857 26.4H10.1128C9.92764 26.3993 9.74859 26.3333 9.60662 26.2133C9.46464 26.0934 9.36869 25.9271 9.33537 25.7433L7.20944 12.9291C7.19113 12.815 7.19747 12.6984 7.22804 12.587C7.2586 12.4757 7.31267 12.3723 7.38652 12.2841C7.46037 12.1958 7.55226 12.1247 7.65588 12.0757C7.7595 12.0267 7.8724 12.0009 7.98683 12.0001H21.9957C22.1115 11.9986 22.2262 12.0227 22.3318 12.0707C22.4373 12.1187 22.5312 12.1894 22.6068 12.278C22.6824 12.3665 22.7379 12.4707 22.7693 12.5831C22.8008 12.6956 22.8075 12.8137 22.789 12.9291Z"
                      fill="#F7F7F7"
                    />
                  </svg>
                  <span class="oreder-btn-remove__text">Удалить</span>
                </button>
                <div class="order-item-mob__amount flex">
                  <button
                    class="btn-reset order-item__btn_minus"
                    @click="
                      cartStore.decreaseFromCart(cartItem.product.id.toString())
                    "
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="15"
                        cy="15"
                        r="14.25"
                        stroke="#0D0D0D"
                        stroke-width="1.5"
                      />
                      <line
                        x1="22.0605"
                        y1="16"
                        x2="7.9429"
                        y2="16"
                        stroke="#0D0D0D"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                  <div class="order-item__num">{{ cartItem.count }}</div>
                  <button
                    class="btn-reset order-item__btn_plus"
                    @click="cartStore.addToCart(cartItem.product.id.toString())"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="15"
                        cy="15"
                        r="14.25"
                        stroke="#0D0D0D"
                        stroke-width="1.5"
                      />
                      <path
                        d="M15.0002 7.94116V22.0588M7.94141 15H22.0591"
                        stroke="#0D0D0D"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="oreder-total flex">
              <p class="oreder-total__descr">Итого:</p>
              <div class="order-total__sum">
                {{ formatNumber(cartStore.cartPrice) }} ₽
              </div>
            </div>
            <a href="#order" class="btn-reset order__btn cart-anchor">
              Перейти к оформлению
            </a>
          </div>
          <div
            style="
              font-size: 20px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 40px;
              color: #e41c19;
            "
            v-else
          >
            Ваша корзина пуста
          </div>
        </ClientOnly>
        <Recomend :products="recomendedProducts"></Recomend>
      </div>
    </section>
    <section>
      <div class="container" id="order">
        <ClientOnly>
          <form
            method="post"
            class="order-form flex"
            v-if="cartStore.cartList.length > 0"
            @submit.prevent="handleSubmit"
          >
            <div class="order-form-left">
              <div class="order-form-top">
                <label for="order-name" class="order-form__label">ФИО:</label>
                <input
                  type="text"
                  class="oreder-form__input"
                  v-model="fio"
                  placeholder="Алексей Иванов"
                  required
                />
                <label for="order-tel" class="order-form__label"
                  >Номер телефона:</label
                >
                <input
                  type="tel"
                  class="oreder-form__input"
                  placeholder="+7 (999) 999-99-99"
                  @change="validatePhone"
                  v-model="phone"
                  v-maska
                  data-maska="+7 (###) ###-##-##"
                  required
                />
              </div>
              <div class="order-form-center">
                <div class="order-form-center__title">
                  Выберите способ доставки:
                </div>
                <label class="order-form__label_radio flex">
                  <input
                    type="radio"
                    value="Самовывоз"
                    class="order-form__input_option"
                    v-model="deliveryMethod"
                  />
                  <span class="order-form__input_btn"></span>
                  <span class="order-form__input_title">Самовывоз</span>
                </label>
                <label class="order-form__label_radio flex">
                  <input
                    type="radio"
                    value="Доставка по Екатеринбургу"
                    class="order-form__input_option"
                    v-model="deliveryMethod"
                  />
                  <span class="order-form__input_btn"></span>
                  <span class="order-form__input_title"
                    >Доставка по Екатеринбургу</span
                  >
                </label>
                <label class="order-form__label_radio flex">
                  <input
                    type="radio"
                    value="Доставка Почтой России"
                    class="order-form__input_option"
                    v-model="deliveryMethod"
                  />
                  <span class="order-form__input_btn"></span>
                  <span class="order-form__input_title"
                    >Доставка Почтой России</span
                  >
                </label>
                <label class="order-form__label_radio flex">
                  <input
                    type="radio"
                    value="СДЭК"
                    class="order-form__input_option"
                    v-model="deliveryMethod"
                  />
                  <span class="order-form__input_btn"></span>
                  <span class="order-form__input_title">СДЭК</span>
                </label>

                <label for="order-name" class="order-form__label_details"
                  >Укажите адрес доставки:</label
                >
                <input
                  type="text"
                  class="oreder-form__input"
                  v-model="address"
                  placeholder="Aдрес доставки"
                  :required="deliveryMethod != 'Самовывоз'"
                  :disabled="deliveryMethod == 'Самовывоз'"
                />
                <label for="order-check" class="order-form__label_check flex">
                  <input
                    type="checkbox"
                    name="order-check"
                    id="order-check"
                    class="order-form__input_check"
                    checked
                  />
                  <span class="order-form__check_btn"></span>
                  <span class="oreder-form__check_descr">
                    Я согласен с
                    <a href="" class="order-form__check_link"
                      >политикой конфидециальности</a
                    >
                  </span>
                </label>
              </div>
              <div class="order-form-bottom">
                <div class="order-form-center__title">
                  Выберите способ оплаты:
                </div>
                <label for="card" class="order-form__label_radio flex">
                  <input
                    type="radio"
                    id="card"
                    class="order-form__input_option"
                    value="card"
                    v-model="paymentMethod"
                  />
                  <span class="order-form__input_btn"></span>
                  <span class="order-form__input_title"
                    >Оплата картой (Доставка бесплатная)</span
                  >
                </label>
                <label for="pay-fact" class="order-form__label_radio flex">
                  <input
                    type="radio"
                    id="pay-fact"
                    class="order-form__input_option"
                    value="cash"
                    v-model="paymentMethod"
                  />
                  <span class="order-form__input_btn"></span>
                  <span class="order-form__input_title"
                    >Оплата при получении (Изначально оплачивается только
                    доставка)</span
                  >
                </label>
                <label for="pay-credit" class="order-form__label_radio flex">
                  <input
                    type="radio"
                    id="pay-credit"
                    class="order-form__input_option"
                    value="credit"
                    v-model="paymentMethod"
                  />
                  <span class="order-form__input_btn"></span>
                  <span class="order-form__input_title" v-if="!creditMonths">
                    Рассрочка без процентов на 3, 4 или 6 месяцев от банка
                    Тинькофф
                  </span>
                  <span class="order-form__input_title" v-else>
                    Рассрочка без процентов на {{ creditMonths }}
                    {{ monthsText }} от банка Тинькофф
                  </span>
                </label>
              </div>
            </div>
            <div class="order-form-right">
              <div class="order-form-right-top">
                <div class="order-form-right__title">Ваш заказ:</div>
                <div class="order-right-items flex">
                  <div class="order-right-items__descr">
                    Товары (<span class="order-right-items__num">{{
                      Object.keys(cartStore.cart).length
                    }}</span
                    >):
                  </div>
                  <div class="order-right-items__sum">
                    {{ formatNumber(cartStore.cartPrice) }} ₽
                  </div>
                </div>
                <div
                  class="order-right-delivery flex"
                  v-if="promocodeData.amount"
                >
                  <div class="order-right-delivery__descr">Скидка:</div>
                  <div class="order-right-delivery__sum">
                    {{ formatNumber(promocodeData.amount) }} ₽
                  </div>
                </div>
                <div class="order-right-delivery flex">
                  <div class="order-right-delivery__descr">Доставка:</div>
                  <div class="order-right-delivery__sum">
                    {{ deliveryCost }}
                  </div>
                </div>
                <div class="order-right-total flex">
                  <div class="order-right-total__descr">Итоговая сумма:</div>
                  <div class="order-right-total__sum">
                    {{
                      formatNumber(cartStore.cartPrice - +promocodeData.amount)
                    }}
                    ₽
                  </div>
                </div>
              </div>

              <div class="order-right-promo flex">
                <div class="order-right-promo__descr">Промокод:</div>
                <input
                  type="text"
                  class="order__input_promo"
                  v-model="promocode"
                  placeholder="Введите промокод"
                />
                <div
                  v-if="promocodeData.text"
                  class="promocode-text"
                  :class="{ red: promocodeData.error }"
                >
                  {{ promocodeData.text }}
                </div>
              </div>
              <button class="btn-reset order__btn">Оформить заказ</button>
              <div
                v-if="paymentMethod == 'credit' && !creditMonths"
                class="order__credit-note"
              >
                Выбрана рассрочка на 3, 4 или 6 месяцев. После подтверждения
                заказа, менеджер свяжется с вами для оформления рассрочки
              </div>
              <div
                v-else-if="paymentMethod == 'credit' && creditMonths"
                class="order__credit-note"
              >
                Выбрана рассрочка на {{ creditMonths }} {{ monthsText }}. После
                подтверждения заказа, менеджер свяжется с вами для оформления
                рассрочки
              </div>
            </div>
          </form>
        </ClientOnly>
      </div>
    </section>
    <SelectForm></SelectForm>
  </main>

  <Footer></Footer>
  <RecomendPopup :products="recomendedProducts"></RecomendPopup>
</template>
