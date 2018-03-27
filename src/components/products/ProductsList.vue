<template>
    <div class="products-container">
        <h4 class="products-container-heading">Produkty</h4>
        <div class="products-row">
            <div class="filter-container">
                <div class="filter-status">
                    <label for="">Filtruj po statusie</label>
                    <multiselect
                            class="shop-select"
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
                <div class="filter-keyword">
                    <label for="">Filtruj po słowie kluczowym</label>
                    <input class="products-input" type="text">
                </div>
            </div>
            <div class="search-container"></div>
        </div>
      <table>
          <thead class="table-heading">
          <!--<input type="checkbox">-->
          <th>Obraz</th>
          <th>SKU Produktu</th>
          <th>Nazwa produktu</th>
          <th>Cena</th>
          <th>Akcja</th>
          </thead>
          <tbody>
          <tr v-for="item in items">


          </tr>
          </tbody>
      </table>
    </div>

</template>

<script>
  export default {
    name: "products-list",
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
    // created: function () {
    //   axios('products')
    //     .then(result => this.items = result.data)
    // },
  }
</script>

<style scoped>
    .table-heading {
        display: grid;
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
        background-color: #dde0e5;
        border-radius: 5px;
        border: none;
        height: 25px;
        line-height: 25px;
        margin-top: 10px;
        padding-right: 60px;
        padding-left: 10px;
        font-weight: 700;
    }
</style>