<template>
    <div class="products-container">
        <h4 class="products-container-heading">Produkty niedostępne w magazynie</h4>
        <div class="products-row">
            <div class="filter-container">
                <div class="filter-status">
                    <label for="">Filtruj po statusie</label>
                    <multiselect
                            class="admin-select"
                            v-model="selectedCategory"
                            :allow-empty="false"
                            :searchable="false"
                            :selectedLabel="''"
                            track-by="name"
                            :options="filters"
                            label="name"
                            :deselectLabel="''"
                            :selectLabel="''"
                            :hideSelected="true"
                            placeholder="Wybierz"></multiselect>
                </div>
            </div>
            <div class="search-container"></div>
        </div>
        <table class="products-table">
            <thead class="table-heading">
            <tr class="table-row">
                <th class="col-1">C</th>
                <th class="col-2">Obraz</th>
                <th class="col-3">SKU Produktu</th>
                <th class="col-4">Nazwa produktu</th>
                <th class="col-5">Cena</th>
                <th class="col-6">Akcja</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">


            </tr>
            </tbody>
            <div class="action-select-container">
                <p class="action-select-p">Wybierz akcję</p>
                <div class="action-select">
                    <multiselect
                            class=" admin-select products-select"
                            v-model="selectedCategory"
                            :allow-empty="false"
                            :searchable="false"
                            :selectedLabel="''"
                            track-by="name"
                            :options="filters"
                            label="name"
                            :deselectLabel="''"
                            :selectLabel="''"
                            :hideSelected="true"
                            placeholder="Wybierz"></multiselect>
                    <button class="use-button">Wykonaj</button>
                </div>
            </div>
        </table>
    </div>
    </div>
</template>

<script>
  export default {
    name: "off-products",
    data () {
      return {
        items: [],
        filters: [
          { name: 'Po ID'},
          {name: 'Po nazwie'},
          {name: 'Po dacie'},
          {name: 'Po swojemu :0'},
        ],
        value: '',
      }
    },
    methods: {

    },
  }
</script>

<style scoped>
    .products-container {
        background-color: #ffffff;
    }
    .products-table {
        margin-top: 40px;
        font-size: 12px;
        font-weight: 700;
    }
    .products-select {
        width: 200px;
        align-self: center;
        height: 20px;
    }
    .action-select-container {
        display: flex;
        flex-direction: column;
        margin: 40px 0;
    }
    .action-select {
        display: flex;
        height: 40px;
    }
    .action-select-p {
        font-size: 12px;
        padding-left: 5px;
    }
    .use-button {
        margin: 10px 0 0 10px;
        align-self: center;
        background: linear-gradient(to right,#21c8cc,#2595ec);
        border: none;
        font-weight: 700;
        height: 40px;
        width: 130px;
        border-radius: 5px;
        color: #ffffff;
        font-size: 14px;
    }
    .table-row {
        display: grid;
        grid-template-columns: 35px 130px 160px 390px 65px 200px;
        grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6';
    }
    .col-1 {
        grid-area: col-1;
    }
    .col-2 {
        grid-area: col-2;
    }
    .col-3 {
        grid-area: col-3;
    }
    .col-4 {
        grid-area: col-4;
    }
    .col-5 {
        grid-area: col-5;
    }
    .col-6 {
        grid-area: col-6;
    }
    .table-heading {
        padding-top: 40px;
    }
    .products-row {
        display: flex;
        justify-content: space-between;
    }
    .filter-container {
        display: flex;
    }
    .filter-status, .filter-keyword {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        font-size: 12px;
        font-weight: 700;
    }
    .filter-status {
        margin-right: 20px;
    }
    .products-input {
        background-color: #f5f7fa;
        border-radius: 5px;
        border: none;
        height: 40px;
        line-height: 40px;
        margin-top: 10px;
        padding-right: 60px;
        padding-left: 10px;
        font-weight: 700;
    }
    .admin-select {
        margin-top: 10px;
        font-size: 10px;
        border-radius: 5px;
    }
    .admin .multiselect__tags {
        background-color: #f5f7fa;
        border: none;
        width: 170px;
        margin-top: 1px;
        color: #000;
        border-radius: 5px;
    }
    .admin .multiselect__single {
        background-color: #f5f7fa;
        font-size: 12px;
        font-weight: 700;
    }
    .admin .multiselect__content-wrapper {
        border: 1px solid #f5f7fa;
        border-top: none;
        border-radius: 5px;
        width: 100%;
    }
</style>