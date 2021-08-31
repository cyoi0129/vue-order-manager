<template>
  <h1>Order Manager</h1>
  <div class="container">
    <div id="login">
      <dl>
        <dt>Shop</dt>
        <dd>
          <select @change="select" v-model="selected">
            <option disabled value="">Please select a shop</option>
            <option v-for="shop in shopList" :value="shop.id" :key="shop.id">
              {{ shop.name }}
            </option>
          </select>
        </dd>
        <dt>Password</dt>
        <dd><input v-model="password" type="password" /></dd>
      </dl>
      <button @click="login" :disabled="shop.name === '' || password === ''">Login</button>
    </div>
    <p>Shop: {{ shop.name }} | Password: {{ password }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import router from "../router";
import { useStore } from "../store";

export default defineComponent({
  name: "Home",
  props: [],
  data() {
    return {
      selected: "",
      shop: {
        id: null,
        name: "",
      },
      password: "",
    };
  },
  setup() {
    const store = useStore();
    const setCurrentShop = (shopID: number) => {
      store.dispatch("setCurrentShop", shopID);
    };
    return {
      shopList: computed(() => store.state.shops),
      setCurrentShop,
    };
  },
  methods: {
    login() {
      this.setCurrentShop(Number(this.shop.id));
      router.push({
        name: "List",
        params: { shopID: this.shop.id, shopName: this.shop.name },
      });
    },
    select(event: any) {
      this.shop.id = event.target.value;
      this.shop.name = event.target.options[event.target.selectedIndex].text;
    },
  },
});
</script>

<style lang="scss">
#login {
  margin: 32px 0;
  font-size: 20px;

  dt {
    width: 80px;
    float: left;
    height: 40px;
    padding: 8px 0;
  }

  dd {
    height: 40px;
    padding: 8px 0 8px 100px;

    select {
      height: 32px;
      font-size: 16px;
      width: 200px;
      color: #2c3e50;
    }

    input {
      height: 24px;
      font-size: 16px;
      width: 192px;
      color: #2c3e50;
    }
  }

  button {
    font-size: 18px;
    padding: 8px 32px;
    background: #42b983;
    color: #fff;
    border-radius: 4px;
    border: none;

    &:disabled {
      background: #efefef;
    }
  }
}
</style>
