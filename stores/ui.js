import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", () => {
  const isMobMenuOpened = ref(false);
  const isCreditPopupOpened = ref(false);
  const isRecomendPopupOpened = ref(false);

  function toggleMobMenu() {
    document.querySelector("body")?.classList.toggle("overflow");
    isMobMenuOpened.value = !isMobMenuOpened.value;
  }

  function toggleCreditPopup() {
    isCreditPopupOpened.value = !isCreditPopupOpened.value;
  }

  function toggleRecomendPopup() {
    document.querySelector("body")?.classList.toggle("overflow");
    isRecomendPopupOpened.value = !isRecomendPopupOpened.value;
  }

  return {
    isMobMenuOpened,
    toggleMobMenu,
    isCreditPopupOpened,
    toggleCreditPopup,
    isRecomendPopupOpened,
    toggleRecomendPopup,
  };
});
