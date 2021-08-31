<template>
  <h2>Order ID: {{ order.id }}</h2>
  <p>
    Order Time: {{ order.time }} | Pickup: {{ order.pickup }} | Status:
    {{ order.ready ? "Done" : "Cooking" }} | User: {{ getUserName }} | Total: ¥
    {{ order.total }}
  </p>
  <ul>
    <li v-for="item in order.items" :key="item.item.id">
      <FoodItem :item="item" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import FoodItem from "../components/FoodItem.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "OrderItem",
  props: ["order"],
  components: {
    FoodItem: FoodItem,
  },
  setup(props) {
    const store = useStore();
    const setCurrentOrder = (orderID: number) => {
      store.dispatch("setCurrentOrder", orderID);
    };
    return {
      setCurrentOrder,
      getUserName: computed(() => store.state.users.find(user => user.id === Number(props.order.user))?.name),
    };
  },
});
</script>
