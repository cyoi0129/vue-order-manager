<template>
  <div class="foodItem">
    <div class="img">
      <img :src="'/img/' + item.item.image" :alt="item.item.name" />
    </div>
    <div class="foodDetail">
      <p>{{ item.item.name }} ({{ item.amount }}): ¥ {{ Number(item.item.price) * Number(item.amount) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FoodItem",
  props: ["item"],
});
</script>
<style lang="scss">
.foodItem {
  display: flex;

  .img {
    width: 80px;
    margin-right: 24px;
    height: 80px;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
