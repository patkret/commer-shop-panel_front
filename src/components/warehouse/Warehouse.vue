<template>
    <div>
        <h1 class="card-name">Magazyn</h1>
        <ul class="warehouse-list">
            <li  :class="{'warehouse-list-item': true, 'warehouse-list-item active-blue': type == 1}" @click.prevent="changeComponent(1)">Produkty w magazynie</li>

        </ul>
        <div class="component-container">
            <warehouse-list v-if="type == 1"></warehouse-list>
        </div>
    </div>
</template>

<script>
    import WarehouseList from './WarehouseList.vue'

  export default {
    name: "warehouse",
    data () {
      return {
        type: 1,
      }
    },
    components: {
      WarehouseList
    },
    methods: {
      changeComponent(type){
        this.type = type
      },
    },

  }
</script>

<style scoped>
    .warehouse-list {
        display: flex;
        border-bottom: 1px solid #dde0e5;
        font-weight: 700;
        font-size: 12px;
        margin: 40px;
        padding-left: 0;
    }
    .warehouse-list-item {
        padding: 0 0 20px 0;
        margin: 0 20px;
        cursor: pointer;
        color: #626364;
        font-weight: 700;
    }
    .warehouse-list-item:first-child {
        margin-left: 0;
        padding-left: 0;
    }
    .active-blue {
        border-bottom: 2px solid #2596eb;
        color: #000000;
    }
</style>