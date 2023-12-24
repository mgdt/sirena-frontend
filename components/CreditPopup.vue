<script setup>
import { useUiStore } from "@/stores/ui";

const uiStore = useUiStore();

function handleClick() {
  window.location.href = "/catalog";
}
</script>

<template>
  <div
    class="popup-wrap"
    :class="{ active: uiStore.isCreditPopupOpened }"
  ></div>
  <div class="popup" :class="{ active: uiStore.isCreditPopupOpened }">
    <div class="popup-inner">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="popup__close"
        @click="uiStore.toggleCreditPopup"
      >
        <path
          d="M21 21L1 1M21 1L1 21"
          stroke="#0D0D0D"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="popup__title">
        Для оформления рассрочки выберите интересующие вас товары в Каталоге и
        оформите заказ
      </div>
      <button @click="handleClick" class="popup__btn">Перейти в Каталог</button>
    </div>
  </div>
</template>

<style scoped>
.popup__btn {
  width: 304px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #e41c19;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 135%;
  color: #ffffff;
  cursor: pointer;
}
.popup__title {
  max-width: 495px;
  text-align: center;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 36px;
}
.popup-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition-duration: 0.2s;
}
.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  background: #f7f7f7;
  border-radius: 10px;
  z-index: 11;
  opacity: 0;
  visibility: hidden;
  transition-duration: 0.2s;
}
.popup-wrap.active {
  visibility: visible;
  opacity: 1;
}
.popup.active {
  visibility: visible;
  opacity: 1;
}
.popup-inner {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup__close {
  position: absolute;
  right: 25px;
  top: 25px;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .popup {
    width: 320px;
  }
  .popup__close {
    right: 20px;
    top: 20px;
    width: 15px;
  }
  .popup-inner {
    padding-left: 25px;
    padding-right: 25px;
  }
  .popup__title {
    font-size: 20px;
    line-height: 130%;
    margin-bottom: 20px;
  }
  .popup__btn {
    max-width: 100%;
    font-size: 18px;
  }
}
</style>
