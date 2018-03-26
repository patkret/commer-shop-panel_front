<template>
    <div>
        <h1 class="card-name">Lista Produktów</h1>
        <ul class="products-list">
            <li class="products-list-item">Wszystkie produkty</li>
            <li class="products-list-item">Wyróżnione produkty</li>
            <li class="products-list-item">Zaimportowane</li>
            <li class="products-list-item">Brak na magazynie</li>
            <li class="products-list-item">Szkice produktów</li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "products"
  }
</script>

<style scoped>
    .products-list {
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid #dde0e5;
        font-weight: 700;
        font-size: 12px;
    }
    .products-list-item {
        padding-right: 20px;
    }
</style>