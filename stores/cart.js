import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { fetchCartItems } from "@/api";

export const useCartStore = defineStore("cart", () => {
  const cart = ref({});

  function addToCart(id) {
    if (cart.value[id]) {
      cart.value[id].count += 1;
    } else {
      cart.value[id] = {
        count: 1,
      };
    }
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }

  function decreaseFromCart(id) {
    if (cart.value[id].count > 1) {
      cart.value[id].count -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }

  function deleteFromCart(id) {
    delete cart.value[id];
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }

  async function fetchCartProducts() {
    const ids = Object.keys(cart.value).join(",");

    const cartItems = await fetchCartItems(ids);

    for (const key in cart.value) {
      cart.value[key].product = cartItems.find((item) => item.id == key);
      if (!cart.value[key].product) {
        delete cart.value[key];
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }

  const cartList = computed(() => {
    const list = [];
    for (const key in cart.value) {
      if (cart.value[key].product) {
        list.push(cart.value[key]);
      }
    }
    return list;
  });

  const cartCount = computed(() => {
    let sum = 0;
    for (const key in cart.value) {
      sum += cart.value[key].count;
    }
    return sum;
  });

  const cartPrice = computed(() => {
    let sum = 0;
    for (const key in cart.value) {
      if (!cart.value[key].product) {
        return 0;
      }
      sum += cart.value[key].product.price * cart.value[key].count;
    }
    return sum;
  });

  return {
    cart,
    addToCart,
    fetchCartProducts,
    cartList,
    cartPrice,
    decreaseFromCart,
    deleteFromCart,
    cartCount,
  };
});
