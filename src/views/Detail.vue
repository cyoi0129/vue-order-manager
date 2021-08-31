<template>
  <OrderEdit :order="orderDetail" />
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "../store";
import OrderEdit from "../components/OrderEdit.vue";

export default defineComponent({
  name: "Detail",
  props: ["id"],
  components: {
    OrderEdit: OrderEdit
  },
  setup(props) {
    const store = useStore();
    return {
      orderDetail: computed(() => store.state.orders.find(order => order.id === Number(props.id))),
    };
  },
  methods: {},
});
</script>
