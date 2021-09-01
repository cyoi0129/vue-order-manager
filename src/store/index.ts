import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { apiURL } from '@/config';

const api: string = apiURL;

export interface shopType {
  id: number;
  name: string;
}

export interface userType {
  id: number;
  name: string;
}

export interface foodType {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface itemType {
  item: foodType;
  amount: number;
}

export interface orderType {
  id: number;
  time: string;
  ready: boolean;
  payment: boolean;
  pickup: string;
  user: number;
  shop: number;
  total: number;
  items: itemType[];
}

export interface State {
  shops: shopType[];
  users: userType[];
  orders: orderType[];
  currentShop: number;
  currentOrder: number;
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    shops: [],
    users: [],
    orders: [],
    currentShop: 0,
    currentOrder: 0,
  },
  mutations: {
    mutateShop(state: State, payload: shopType[]) {
      state.shops = payload;
    },
    mutateUser(state: State, payload: userType[]) {
      state.users = payload;
    },
    mutateOrder(state: State, payload: orderType[]) {
      state.orders = payload;
    },
    mutateCurrentShop(state: State, payload: number) {
      state.currentShop = payload;
    },
    mutateCurrentOrder(state: State, payload: number) {
      state.currentOrder = payload;
    },
    mutateChangeOrderStatus(state: State, payload: orderType) {
      const targetOrder = state.orders.find(order => order.id === payload.id);
      if (targetOrder !== undefined) {
        targetOrder.ready = payload.ready;
      }
    },
  },
  actions: {
    async fetchShopData(store) {
      const url = api + 'shop'
      const response = await fetch(url).then((res) => res.json());
      store.commit('mutateShop', response);
    },
    async fetchUserData(store) {
      const url = api + 'user'
      const response = await fetch(url).then((res) => res.json());
      store.commit('mutateUser', response);
    },
    async fetchOrderData(store, shopID: number) {
      const url = api + 'order'
      const response: orderType[] = await fetch(url).then((res) => res.json());
      const result = response.filter(item => item.shop === shopID);
      store.commit('mutateOrder', result);
      if (result!==[]) {
        store.commit('mutateCurrentShop', result[0].shop);
      }
    },
    async changeOrderStatus(store, order: orderType) {
      const url = api + 'order/' + order.id;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(order),
        headers: new Headers({ 'Content-type' : 'application/json' })
      }).then((res) => res.json());
      store.commit('mutateChangeOrderStatus', response);
    },
    setCurrentShop(store, shopID: number) {
      store.commit('mutateCurrentShop', shopID);
    },
    setCurrentOrder(store, orderID: number) {
      store.commit('mutateCurrentOrder', orderID);
    }
  },
  getters: {
    getShopData: (state: State) => (shopID: number) => {
      return state.shops.find(shop => shop.id === shopID);
    },
    getUserData: (state: State) => (userID: number) => {
      return state.users.find(user => user.id === userID);
    },
    getOrderData: (state: State) => (orderID: number) => {
      return state.orders.find(order => order.id === orderID);
    },
  },
  modules: {
  }
});

export function useStore () {
  return baseUseStore(key)
}