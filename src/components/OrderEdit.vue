<template>
  <h1>Order ID: {{ order.id }}</h1>
  <div class="container">
    <dl>
      <dt>Order Time</dt>
      <dd>{{ order.time }}</dd>
      <dt>Pickup</dt>
      <dd>{{ order.pickup }}</dd>
      <dt>Status</dt>
      <dd>{{ order.ready ? "Done" : "Cooking" }}</dd>
      <dt>User</dt>
      <dd>{{ getUserName }}</dd>
      <dt>Total</dt>
      <dd>¥ {{ order.total }}</dd>
    </dl>
    <ul>
      <li v-for="item in order.items" :key="item.item.id">
        <FoodItem :item="item" />
      </li>
    </ul>
    <button @click="changeStatus">Change Status</button>
    <p class="cancel"><router-link :to="{ name: 'List'}">Cancel</router-link></p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import FoodItem from "../components/FoodItem.vue";
import { useStore } from "../store";
import router from "../router";

export default defineComponent({
  name: "OrderEdit",
  props: ["order"],
  components: {
    FoodItem: FoodItem,
  },
  setup(props) {
    const store = useStore();
    const changeOrderStatus = () => {
      let newOrder = props.order;
      newOrder.ready = !props.order.ready;
      store.dispatch("changeOrderStatus", newOrder);
    };
    return {
      changeOrderStatus,
      currentShopID: computed(() => store.state.currentShop),
      currentShopName: computed(
        () => store.state.shops.find((shop) => shop.id === store.state.currentShop)?.name
      ),
      getUserName: computed(() => store.state.users.find(user => user.id === Number(props.order.user))?.name),
    };
  },
  methods: {
    changeStatus() {
      this.changeOrderStatus();
      router.push({
        name: "List",
        params: { shopID: this.currentShopID, shopName: this.currentShopName },
      });
    },
  },
});
</script>
<style lang="scss">
.container {

  dt {
    width: 80px;
    float: left;
    height: 40px;
    padding: 8px 0;
  }

  dd {
    height: 40px;
    padding: 8px 0 8px 100px;
  }

  button {
    font-size: 18px;
    padding: 8px 32px;
    background: #42b983;
    color: #fff;
    border-radius: 4px;
    border: none;
  }
  .cancel {
    margin-top: 16px;
    width: 160px;
    text-align: center;;
    a {
      color: #2c3e50;
      text-decoration: none;
    }
  }
}
</style>
