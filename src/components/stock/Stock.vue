<template>
    <div id="main-content-with-side-menu">
        <h1 class="card-name">Magazyny</h1>
        <div class="side-menu-container">
            <div id="side-menu">
                <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type === 1}" @click.prevent="changeComponent(1)">
                    <p>Dodaj magazyn</p>
                </div>
                <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type === 2}" @click.prevent="changeComponent(2)">
                    <p>Wszystkie magazyny</p>
                </div>
                <div class="side-button side-menu-item active" v-if="type === 4">
                    <p>Stan magazynu</p>
                </div>
                <div class="side-button" v-if="type == 3" :class="{'side-menu-item' : true, 'side-menu-item active': type == 3}">
                    <p>Edycja magazynu</p>
                </div>
            </div>
        </div>
        <div class="component-container">
            <stock-form v-if="type === 1 "/>
            <stock-list v-if="type === 2" @stock="stockToEdit" @addToStock="addToStock"/>
            <stock-items v-if="type === 4" :stock="stock"/>
            <!--<add-to-stock v-if="type === 4" :stock="stock"/>-->
            <stock-form v-if="type === 3" :editStock="stock"/>
        </div>
    </div>
</template>

<script>
  import StockForm from './StockForm'
  import StockList from './StockList'
  import AddToStock from './addToStock'
  import StockItems from './StockItems'

  export default {
    components: {
      StockItems,
      AddToStock,
      StockForm,
      StockList
    },
    name: "stock",
    data: () => ({
      type: 2,
      stock: ''
    }),
    methods:{
      changeComponent(type){
        this.type = type
        this.vendor = ''
      },

      stockToEdit(stock){
        this.stock = stock
        this.type = 3
      },

      addToStock(stock){
        this.stock = stock
        this.type = 4
      }
    }
  }
</script>

<style scoped>
    .active{
        background-color: #F4F4F9;
        border-radius: 5px;
    }

</style>