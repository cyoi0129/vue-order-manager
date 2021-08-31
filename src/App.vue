<template>
  <router-view :shopList="getShopData" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "./store";

export default defineComponent({
  name: "App",
  data() {
    return {
      shopList: [],
    };
  },
  setup() {
    const store = useStore();
    store.dispatch("fetchShopData");
    store.dispatch("fetchUserData");
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  background: #efefef;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background: #fff;
  -moz-box-shadow: 1px 1px 2px #ccc;
  -webkit-box-shadow: 1px 1px 2px #ccc;
  min-height: 100vh;
}
.container {
  padding: 32px 16px;
}
h1 {
  margin: 0;
  color: #fff;
  background: #42b983;
  padding: 16px;
}
h2 {
  color: #42b983;
}
li {
  list-style: none;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
