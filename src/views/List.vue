<template>
<h1>{{ currentShopName }} Order List</h1> 
  <div class="container">
    <ul class="orderList">
      <li v-for="order in orderList" :key="order.id" @click="toDetail(order.id)">
        <OrderItem :order="order" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import OrderItem from "../components/OrderItem.vue";
import router from "../router";

export default defineComponent({
  name: "List",
  props: ["shopID", "shopName"],
  components: {
    OrderItem: OrderItem,
  },
  setup(props) {
    const store = useStore();
    const targetShopID = props.shopID? Number(props.shopID) : store.state.currentShop;
    store.dispatch("fetchOrderData", targetShopID);
    const setCurrentOrder = (orderID: number) => {
      store.dispatch("setCurrentOrder", orderID);
    }
    return {
      orderList: computed(() => store.state.orders),
      currentShopName: computed(() => store.getters.getShopData(targetShopID).name),
      setCurrentOrder
    };
  },
  methods: {
    toDetail(orderID: number) {
      this.setCurrentOrder(orderID);
      router.push({ name: "Detail", params: { id: orderID }});
    }, 
  },
});
</script>
<style lang="scss">
.orderList {
  padding-left: 0;

  > li {
    background: #fff;
    -moz-box-shadow: 1px 1px 2px gray;;
    -webkit-box-shadow: 1px 1px 2px gray;;
    border-radius: 16px;
    padding: 8px 16px;
    margin: 32px 0;
  }
}
</style>
