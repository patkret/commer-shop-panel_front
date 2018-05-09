<template>
    <div>
        <h1 class="card-name">Ustawienia konta</h1>
        <ul class="products-list">
            <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 1}" @click.prevent="changeComponent(1)">Dane użytkownika</li>
            <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 2}" @click.prevent="changeComponent(2)">Dane rozliczeniowe</li>
        </ul>
        <div class="component-container">
            <account-data v-if="type == 1 "></account-data>
            <account-billing-data v-if="type == 2"></account-billing-data>
        </div>
    </div>
</template>

<script>
  import AccountData from "./accountData";
  import AccountBillingData from "./accountBillingData"

  export default {
    components: {AccountData, AccountBillingData},
    name: "account",
    data () {
      return {
        type: 1,
        items: [],
      }
  },
    methods: {
      changeComponent(type){
        this.type = type
      },
    },
  }
</script>

<style scoped>
    .products-list {
        display: flex;
        border-bottom: 1px solid #dde0e5;
        font-weight: 700;
        font-size: 12px;
        margin: 40px;
        padding-left: 0;
    }
    .products-list-item {
        padding: 20px;
        margin: 0 20px;
        cursor: pointer;
        color: #626364;
        font-weight: 700;
    }
    .products-list-item:first-child {
        margin-left: 0;
        padding-left: 0;
    }
    .active-blue {
        border-bottom: 2px solid #2596eb;
        color: #000000;
    }
</style>