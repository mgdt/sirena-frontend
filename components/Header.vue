<script setup>
import MobMenu from "@/components/MobMenu.vue";
import { useUiStore } from "@/stores/ui";
import { useCartStore } from "@/stores/cart";
import { ref } from "vue";
import { useRoute } from "vue-router";
import IconLogo from "./icons/IconLogo.vue";
import HeaderAndroid from "./icons/HeaderAndroid.vue";

const route = useRoute();

const search = ref("");

const uiStore = useUiStore();
const cartStore = useCartStore();

if (route.query.search) {
  search.value = route.query.search.toString();
}

function handleSearch() {
  if (search.value.length > 0)
    window.location.href = `/products?search=${search.value}`;
}
</script>

<template>
  <MobMenu></MobMenu>
  <header class="header">
    <div class="container">
      <div class="header-mob flex">
        <a href="/" class="mob-logo__link">
          <IconLogo style="width: 170px" />
        </a>

        <div class="header-mob-links">
          <a href="tel:+79221986698" class="mob-header__link_phone">
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.5679 20.5072C22.5551 19.5073 21.2908 19.5073 20.2845 20.5072C19.5168 21.2684 18.7492 22.0296 17.9944 22.8037C17.788 23.0166 17.6138 23.0617 17.3622 22.9198C16.8655 22.6489 16.3366 22.4295 15.8592 22.1328C13.6337 20.733 11.7694 18.9332 10.118 16.9076C9.29873 15.9013 8.56979 14.824 8.06017 13.6113C7.95696 13.3662 7.97631 13.2049 8.17629 13.0049C8.94393 12.2631 9.69223 11.5019 10.447 10.7407C11.4985 9.68274 11.4985 8.44419 10.4405 7.3798C9.84059 6.77343 9.24067 6.17995 8.64074 5.57358C8.02147 4.9543 7.40864 4.32857 6.78291 3.71574C5.77013 2.72877 4.50578 2.72877 3.49945 3.7222C2.72535 4.48339 1.98351 5.26394 1.19651 6.01223C0.467571 6.70247 0.0998754 7.54752 0.0224657 8.5345C-0.1001 10.1407 0.2934 11.6567 0.848169 13.1339C1.98351 16.1916 3.71233 18.9074 5.80884 21.3974C8.64074 24.7647 12.021 27.4289 15.9753 29.3513C17.7557 30.2157 19.6007 30.8801 21.6069 30.9898C22.9873 31.0672 24.1872 30.7188 25.1484 29.6415C25.8063 28.9061 26.5482 28.2353 27.2449 27.5321C28.277 26.4871 28.2835 25.2227 27.2578 24.1906C26.0321 22.9585 24.8 21.7328 23.5679 20.5072Z"
                fill="#E41C19"
              />
              <path
                d="M22.3358 15.3659L24.7162 14.9595C24.342 12.7727 23.3099 10.7923 21.7423 9.2183C20.0845 7.56044 17.988 6.51541 15.6786 6.19287L15.3431 8.58612C17.13 8.8377 18.7556 9.64405 20.0393 10.9278C21.2521 12.1405 22.0455 13.6758 22.3358 15.3659Z"
                fill="#323232"
              />
              <path
                d="M26.0579 5.01873C23.3099 2.27068 19.8329 0.535417 15.9947 0L15.6592 2.39325C18.9749 2.85771 21.981 4.36075 24.3549 6.72819C26.6062 8.97953 28.0835 11.8243 28.6189 14.953L30.9992 14.5466C30.3735 10.9212 28.664 7.63131 26.0579 5.01873Z"
                fill="#323232"
              />
            </svg>
          </a>
          <a href="/cart" class="mob-header__link_cart">
            <ClientOnly>
              <div v-if="cartStore.cartCount > 0" class="header__cart-count">
                {{ cartStore.cartCount }}
              </div>
            </ClientOnly>
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.21876 11.3438C7.06201 11.3438 6.90526 11.3088 6.75676 11.2345C6.24733 10.9808 6.04108 10.36 6.29683 9.85059L10.4218 1.60059C10.6776 1.09115 11.2943 0.886965 11.8058 1.13859C12.3152 1.39434 12.5215 2.01309 12.2678 2.52253L8.14276 10.7725C7.9592 11.1355 7.5962 11.3438 7.21876 11.3438Z"
                fill="#323232"
              />
              <path
                d="M25.7813 11.3437C25.4038 11.3437 25.0408 11.1354 24.8593 10.7745L20.7343 2.52448C20.4807 2.01504 20.6869 1.39629 21.1963 1.14054C21.7058 0.888918 22.3245 1.09311 22.5803 1.60254L26.7053 9.85254C26.959 10.362 26.7527 10.9807 26.2433 11.2365C26.0927 11.3087 25.936 11.3437 25.7813 11.3437Z"
                fill="#323232"
              />
              <path
                d="M30.7209 13.8022C30.525 13.5527 30.2239 13.4062 29.9062 13.4062H3.09374C2.77612 13.4062 2.47706 13.5527 2.28112 13.8022C2.08518 14.0518 2.01712 14.3797 2.09343 14.6871L6.21843 31.1871C6.33393 31.647 6.74643 31.9688 7.21874 31.9688H25.7812C26.2536 31.9688 26.6681 31.647 26.7816 31.1871L30.9066 14.6871C30.9829 14.3797 30.9148 14.0518 30.7209 13.8022Z"
                fill="#E41C19"
              />
              <path
                d="M31.9688 9.28125H1.03125C0.462 9.28125 0 9.74325 0 10.3125V14.4375C0 15.0068 0.462 15.4688 1.03125 15.4688H31.9688C32.538 15.4688 33 15.0068 33 14.4375V10.3125C33 9.74325 32.538 9.28125 31.9688 9.28125Z"
                fill="#F44336"
              />
              <path
                d="M16.5 27.8438C15.9308 27.8438 15.4688 27.3818 15.4688 26.8125V20.625C15.4688 20.0558 15.9308 19.5938 16.5 19.5938C17.0692 19.5938 17.5312 20.0558 17.5312 20.625V26.8125C17.5312 27.3818 17.0692 27.8438 16.5 27.8438Z"
                fill="#FAFAFA"
              />
              <path
                d="M11.3438 27.8438C10.7745 27.8438 10.3125 27.3818 10.3125 26.8125V20.625C10.3125 20.0558 10.7745 19.5938 11.3438 19.5938C11.913 19.5938 12.375 20.0558 12.375 20.625V26.8125C12.375 27.3818 11.913 27.8438 11.3438 27.8438Z"
                fill="#FAFAFA"
              />
              <path
                d="M21.6562 27.8438C21.087 27.8438 20.625 27.3818 20.625 26.8125V20.625C20.625 20.0558 21.087 19.5938 21.6562 19.5938C22.2255 19.5938 22.6875 20.0558 22.6875 20.625V26.8125C22.6875 27.3818 22.2255 27.8438 21.6562 27.8438Z"
                fill="#FAFAFA"
              />
            </svg>
          </a>
        </div>

        <div class="burger" @click="uiStore.toggleMobMenu">
          <span
            class="burger__line"
            :class="{ active: uiStore.isMobMenuOpened }"
          ></span>
          <span
            class="burger__line"
            :class="{ active: uiStore.isMobMenuOpened }"
          ></span>
          <span
            class="burger__line"
            :class="{ active: uiStore.isMobMenuOpened }"
          ></span>
        </div>
      </div>
      <div class="header-top flex">
        <a href="/" class="logo__link">
          <IconLogo style="width: 190px; position: relative; left: -10px" />
        </a>
        <div class="header-catalogue">
          <a href="/catalog" class="btn-reset catalogue__btn">Каталог</a>
          <div class="catalogue__btn-lines">
            <span class="catalogue__btn-line"></span>
            <span class="catalogue__btn-line"></span>
            <span class="catalogue__btn-line"></span>
          </div>
          <div class="header__categories-wrap">
            <CategoriesMenu></CategoriesMenu>
          </div>
        </div>
        <form
          @submit.prevent="handleSearch"
          action=""
          class="header__search-form"
          id="header__search-form"
        >
          <input
            type="text"
            class="search-form__input"
            placeholder="Поиск по каталогу"
            v-model="search"
          />
          <button type="button" class="btn-reset search-form__btn">
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
          </button>
        </form>
        <div class="hedaer__cart">
          <a href="/cart" class="btn-reset cart__btn">
            <ClientOnly>
              <div v-if="cartStore.cartCount > 0" class="header__cart-count">
                {{ cartStore.cartCount }}
              </div>
            </ClientOnly>
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.21876 11.3438C7.06201 11.3438 6.90526 11.3088 6.75676 11.2345C6.24733 10.9808 6.04108 10.36 6.29683 9.85059L10.4218 1.60059C10.6776 1.09115 11.2943 0.886965 11.8058 1.13859C12.3152 1.39434 12.5215 2.01309 12.2678 2.52253L8.14276 10.7725C7.9592 11.1355 7.5962 11.3438 7.21876 11.3438Z"
                fill="#323232"
              />
              <path
                d="M25.7813 11.3437C25.4038 11.3437 25.0408 11.1354 24.8593 10.7745L20.7343 2.52448C20.4807 2.01504 20.6869 1.39629 21.1963 1.14054C21.7058 0.888918 22.3245 1.09311 22.5803 1.60254L26.7053 9.85254C26.959 10.362 26.7527 10.9807 26.2433 11.2365C26.0927 11.3087 25.936 11.3437 25.7813 11.3437Z"
                fill="#323232"
              />
              <path
                d="M30.7209 13.8022C30.525 13.5527 30.2239 13.4062 29.9062 13.4062H3.09374C2.77612 13.4062 2.47706 13.5527 2.28112 13.8022C2.08518 14.0518 2.01712 14.3797 2.09343 14.6871L6.21843 31.1871C6.33393 31.647 6.74643 31.9688 7.21874 31.9688H25.7812C26.2536 31.9688 26.6681 31.647 26.7816 31.1871L30.9066 14.6871C30.9829 14.3797 30.9148 14.0518 30.7209 13.8022Z"
                fill="#E41C19"
              />
              <path
                d="M31.9688 9.28125H1.03125C0.462 9.28125 0 9.74325 0 10.3125V14.4375C0 15.0068 0.462 15.4688 1.03125 15.4688H31.9688C32.538 15.4688 33 15.0068 33 14.4375V10.3125C33 9.74325 32.538 9.28125 31.9688 9.28125Z"
                fill="#F44336"
              />
              <path
                d="M16.5 27.8438C15.9308 27.8438 15.4688 27.3818 15.4688 26.8125V20.625C15.4688 20.0558 15.9308 19.5938 16.5 19.5938C17.0692 19.5938 17.5312 20.0558 17.5312 20.625V26.8125C17.5312 27.3818 17.0692 27.8438 16.5 27.8438Z"
                fill="#FAFAFA"
              />
              <path
                d="M11.3438 27.8438C10.7745 27.8438 10.3125 27.3818 10.3125 26.8125V20.625C10.3125 20.0558 10.7745 19.5938 11.3438 19.5938C11.913 19.5938 12.375 20.0558 12.375 20.625V26.8125C12.375 27.3818 11.913 27.8438 11.3438 27.8438Z"
                fill="#FAFAFA"
              />
              <path
                d="M21.6562 27.8438C21.087 27.8438 20.625 27.3818 20.625 26.8125V20.625C20.625 20.0558 21.087 19.5938 21.6562 19.5938C22.2255 19.5938 22.6875 20.0558 22.6875 20.625V26.8125C22.6875 27.3818 22.2255 27.8438 21.6562 27.8438Z"
                fill="#FAFAFA"
              />
            </svg>
          </a>
        </div>
        <a
          href="https://wa.me/79022737241"
          target="_blank"
          class="header__link_social"
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5039 0H15.4961C6.94981 0 0 6.95175 0 15.5C0 18.8906 1.09275 22.0333 2.95081 24.5849L1.01912 30.3432L6.97694 28.4386C9.42787 30.0623 12.3516 31 15.5039 31C24.0502 31 31 24.0463 31 15.5C31 6.95369 24.0502 0 15.5039 0Z"
              fill="#4CAF50"
            />
            <path
              d="M24.5229 21.8879C24.149 22.9439 22.6649 23.8196 21.4811 24.0754C20.6712 24.2478 19.6133 24.3854 16.0522 22.909C11.4971 21.0219 8.56375 16.3932 8.33512 16.0929C8.11619 15.7926 6.4945 13.6419 6.4945 11.4177C6.4945 9.19344 7.62406 8.11037 8.07938 7.64537C8.45331 7.26369 9.07137 7.08931 9.66425 7.08931C9.85606 7.08931 10.0285 7.099 10.1835 7.10675C10.6388 7.12612 10.8674 7.15325 11.1677 7.87206C11.5417 8.773 12.4523 10.9972 12.5608 11.2259C12.6712 11.4545 12.7817 11.7645 12.6267 12.0648C12.4814 12.3748 12.3535 12.5124 12.1249 12.7759C11.8962 13.0394 11.6792 13.2409 11.4506 13.5237C11.2414 13.7698 11.005 14.0333 11.2685 14.4886C11.532 14.9342 12.4426 16.4203 13.7834 17.6138C15.5136 19.1541 16.9163 19.6462 17.4181 19.8555C17.7921 20.0105 18.2377 19.9737 18.5109 19.6831C18.8577 19.3091 19.2859 18.6891 19.7218 18.0788C20.0318 17.6409 20.4232 17.5867 20.8339 17.7417C21.2524 17.887 23.467 18.9817 23.9223 19.2084C24.3776 19.437 24.6779 19.5455 24.7884 19.7373C24.8969 19.9291 24.8969 20.8301 24.5229 21.8879Z"
              fill="#FAFAFA"
            />
          </svg>
        </a>
        <div class="header-contact-wrapper flex">
          <a href="tel:+79221986698" class="header__link_tel"
            >+7 (922) 198-66-98</a
          >
          <span class="header__schedule">Ежедневно с 10:00 до 19:00</span>
        </div>
      </div>
      <div class="header-bottom">
        <nav class="nav">
          <ul class="list-reset nav__list flex">
            <li class="nav__item">
              <a href="/credit" class="nav__link"> Рассрочка </a>
            </li>
            <li class="nav__item">
              <a href="/delivery" class="nav__link"> Доставка и оплата </a>
            </li>
            <li class="nav__item">
              <a href="/faq" class="nav__link"> Вопросы и ответы </a>
            </li>
            <li class="nav__item">
              <a href="/feed" class="nav__link"> Отзывы </a>
            </li>
            <li class="nav__item">
              <a href="/blog" class="nav__link"> Блог </a>
            </li>
            <li class="nav__item">
              <a href="/contacts" class="nav__link"> Контакты </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
