<script setup>
import { ref } from "vue";

const props = defineProps(["title", "description"]);
const opened = ref(false);
</script>

<template>
  <div class="faq__item">
    <div class="faq__item-line" :class="{ active: opened }"></div>
    <h2
      class="faq__item-header"
      :class="{ active: opened }"
      @click="opened = !opened"
    >
      <p>{{ props.title }}</p>
      <button class="faq__item-btn" v-if="opened">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="26" height="26" rx="3" fill="#E41C19" />
          <path
            d="M18.3333 12.2998C18.7015 12.2998 19 12.6132 19 12.9998C19 13.3588 18.708 13.6998 18.3333 13.6998H7.66667C7.29848 13.6998 7 13.3864 7 12.9998C7 12.6408 7.25725 12.2998 7.66667 12.2998H18.3333Z"
            fill="white"
          />
        </svg>
      </button>
      <button class="faq__item-btn" v-else>
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="25"
            height="25"
            rx="2.5"
            stroke="#0D0D0D"
          />
          <path
            d="M13 7C13.3419 7 13.6667 7.26927 13.6667 7.66667V12.3333H18.3333C18.7015 12.3333 19 12.6318 19 13C19 13.3419 18.7076 13.6667 18.3333 13.6667H13.6667V18.3333C13.6667 18.7015 13.3682 19 13 19C12.6581 19 12.3333 18.727 12.3333 18.3333V13.6667H7.66667C7.29848 13.6667 7 13.3682 7 13C7 12.6581 7.28378 12.3333 7.66667 12.3333H12.3333V7.66667C12.3333 7.29848 12.6318 7 13 7Z"
            fill="#0D0D0D"
          />
        </svg>
      </button>
    </h2>
    <div class="faq__content" :class="{ active: opened }">
      <p class="faq__text" v-html="props.description"></p>
    </div>
  </div>
</template>

<style scoped>
.faq__item-btn {
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  padding: 0;
  border-radius: 3px;
}
.faq__item-btn svg {
  width: 26px;
  height: 26px;
  display: block;
  border-radius: 3px;
}
.faq__content {
  transition-duration: 0.2s;
  display: grid;
  grid-template-rows: 0fr;
}
.faq__content.active {
  grid-template-rows: 1fr;
}
.faq__item-line {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 14px;
  background: #0d0d0d;
  border-radius: 4px;
}
.faq__item-line.active {
  background: #e41c19;
}
.faq__item {
  background: #f7f7f7;
  border-radius: 7px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-right: 40px;
  padding: 40px;
  position: relative;
  transition-duration: 0.2s;
}
.faq__item * {
  transition-duration: 0.2s;
}
.faq__item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  gap: 15px;
}
.faq__item-header p {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #0d0d0d;
  cursor: pointer;
}
.faq__item-header.active p {
  color: #e41c19;
}
.faq__text {
  padding-right: 40px;
  padding-top: 0;
  font-size: 18px;
  line-height: 140%;
  color: #323232;
  overflow: hidden;
}
.faq__content.active .faq__text {
  padding-top: 25px;
}

@media screen and (max-width: 600px) {
  .faq__item-header p {
    font-size: 18px;
    line-height: 120%;
  }
  .faq__text {
    font-size: 14px;
    line-height: 140%;
    padding-top: 0px;
    padding-right: 0;
  }
  .faq__content.active .faq__text {
    padding-top: 20px;
  }
  .faq__item {
    padding: 20px;
    padding-left: 30px;
  }
  .faq__item-line {
    width: 8px;
  }
}
</style>
