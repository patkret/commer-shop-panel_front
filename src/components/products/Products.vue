<template>
    <div>
        <h1 class="card-name">Lista Produktów</h1>
        <ul class="products-list">
            <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 1}" @click.prevent="changeComponent(1)">Wszystkie produkty</li>
            <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 2}" @click.prevent="changeComponent(2)">Wyróżnione produkty</li>
            <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 3}" @click.prevent="changeComponent(3)">Zaimportowane</li>
            <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 4}" @click.prevent="changeComponent(4)">Brak na magazynie</li>
            <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 5}" @click.prevent="changeComponent(5)">Szkice produktów</li>
        </ul>
        <div class="component-container">
            <products-list v-if="type == 1"></products-list>
            <highlited-products v-if="type == 2"></highlited-products>
            <imported-products v-if="type == 3"></imported-products>
            <off-products v-if="type == 4"></off-products>
            <sketch-products v-if="type == 5"></sketch-products>
        </div>
    </div>
</template>

<script>
    import ProductsList from './ProductsList'
    import ImportedProducts from './ImportedProducts'
    import SketchProducts from './SketchProducts'
    import HighlitedProducts from './HighlitedProducts'
    import OffProducts from './OffProducts'
    import addProduct from './addProduct'
  export default {
      components: {
        ProductsList,
        ImportedProducts,
        SketchProducts,
        HighlitedProducts,
        OffProducts,
      },

    name: "products",
    data () {
        return {
          type: 1,
        }
    },
    methods: {
      changeComponent(type){
        this.type = type
      }
    }
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
        padding: 0 0 20px 0;
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