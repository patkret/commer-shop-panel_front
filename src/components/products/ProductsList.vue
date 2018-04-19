<template>
    <div>
        <h1 class="card-name">Lista Produktów</h1>
        <ul class="products-list">
            <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 1}"-->
                <!--@click.prevent="changeComponent(1)"> Wszystkie produkty-->
            <!--</li>-->
            <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 2}"-->
                <!--@click.prevent="changeComponent(2)">Wyróżnione produkty-->
            <!--</li>-->
            <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 3}"-->
                <!--@click.prevent="changeComponent(3)">Zaimportowane-->
            <!--</li>-->
            <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 4}"-->
                <!--@click.prevent="changeComponent(4)">Brak na magazynie-->
            <!--</li>-->
            <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 5}"-->
                <!--@click.prevent="changeComponent(5)">Szkice produktów-->
            <!--</li>-->
        </ul>

        <div class="products-container">
            <h4 class="products-container-heading">Produkty</h4>
            <div class="products-row">
                <div class="filter-container">
                    <div class="filter-status">
                        <label class="action-select-p">Filtruj</label>
                        <multiselect
                                class="admin-select"
                                v-model="selectedFilter"
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
                    <th class="col-1"></th>
                    <th class="col-2">Obraz</th>
                    <th class="col-3">SKU Produktu</th>
                    <th class="col-4 text-left">Nazwa produktu</th>
                    <th class="col-5">Cena</th>
                    <th class="col-6">Akcja</th>
                </tr>
                </thead>
                <tbody>
                <tr class="table-row" v-for="(item,key) in items"
                    :class="{'attr-list-item': true, 'attr-list-item active': index === key}">
                    <td class="col-1">
                        <label class="check-container">
                            <input type="checkbox" v-model="selectedProduct" :value="item">
                            <span class="checkmark"></span>
                        </label>
                    </td>
                    <td class="col-2">{{item.name}}</td>
                    <td class="col-3">{{item.symbol}}</td>
                    <td class="col-4 text-left">{{item.name}}</td>
                    <td class="col-5">{{item.price}}</td>
                    <td class="col-6">
                        <div class="buttons-container">
                            <button @click="showActions(key)"
                                    :class="{'more-button': true, 'more-button active': show === true && index === key}">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </button>
                            <div class="arrow-left" v-if="index === key && show === true">
                                <div class="action-buttons">
                                    <button @click="deleteVariant(item)" class="delete">Usuń</button>

                                    <button class="edit"> <router-link :to="'/products/edit/'+item.id">Edytuj</router-link></button>

                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="action-select-container">
                <p class="action-select-p">Wybierz akcję</p>
                <div class="action-select">
                    <multiselect
                            class=" admin-select products-select"
                            v-model="selectedAction"
                            :allow-empty="false"
                            :searchable="false"
                            :selectedLabel="''"
                            track-by="name"
                            :options="actions"
                            label="name"
                            :deselectLabel="''"
                            :selectLabel="''"
                            :hideSelected="true"
                            placeholder="Wybierz"></multiselect>
                    <button class="use-button">Wykonaj</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    name: 'products-list',
    data () {
      return {
        items: [],
        selectedProduct: [],
        buttons: [],
        index: '',
        show: false,

        filters: [
          {name: 'Po ID'},
          {name: 'Po nazwie'},
          {name: 'Po dacie'},
          {name: 'Po swojemu :0'},
        ],
        actions: [
          {
            id: 0,
            name: 'Zaznacz wszystkie',
          },
          {
            id: 1,
            name: 'Usuń zaznaczone',
          },
        ],
        value: '',
        selectedFilter: '',
        selectedAction: '',
      }
    },
    watch: {
      selectedAction: function (val) {
        if (val.id === 0) {
          this.selectedProduct = this.items
          console.log(this.selectedProduct)
        }
      },
    },
    methods: {
      showActions (key) {
        if (this.index === key) {
          this.show = false
          this.index = ''
        }
        else {
          this.show = true
          this.index = key
        }
      },
    },
    created: function () {
      axios('products').then(result =>
        this.items = result.data)
    },
  }
</script>
<style scoped>
    .products-container {
        background-color: #ffffff;
        font-size: 16px;
        font-weight: 500;
    }

    .attr-list-item {
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
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
        background: linear-gradient(to right, #21c8cc, #2595ec);
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
        grid-template-columns: 35px 100px 150px 350px 65px 300px;
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

    .table-row {
        text-align: center;
        margin: 20px 0;
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
        /*margin-top: 10px;*/
        padding-right: 60px;
        padding-left: 10px;
        font-weight: 700;
    }

    .admin-select {
        /*margin-top: 10px;*/
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

    .action-select-container {
        padding-bottom: 30px;
    }

    /*ACTION BUTTONS*/

    .buttons-container {
        position: relative;
    }

    .more-button {
        height: 40px;
        border: none;
        color: #dde0e5;
        background-color: #ffffff;
    }

    .dot {
        height: 6px;
        width: 6px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }

    .action-buttons {
        position: absolute;
        top: -22px;
        display: flex;
        border: 1px solid #dde0e5;
        border-radius: 5px;
        z-index: -1;
    }

    .action-buttons button {
        background-color: #ffffff;
        height: 40px;
        border-radius: 5px;
        border: none;
    }

    .action-buttons button:first-child {
        border-right: 1px solid #dde0e5;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }

    .action-buttons button:last-child {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }

    .action-buttons button:hover {
        cursor: pointer;
        background-color: #dde0e5;
    }

    .active {
        background-color: #F3F4F8;
        border-radius: 5px;
    }

    .arrow-left {
        position: absolute;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 15px solid transparent;
        z-index: 20;
        top: 36%;
    }

    .table-row th {
        font-size: 14px;
        text-transform: uppercase;
    }

    /*CHECKBOX*/
    .check-container {
        display: block;
        position: relative;
        margin-top: 10px;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 18px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .check-container p {
        padding-top: 3px;
    }

    .check-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        margin-top: -35px;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 23px;
        width: 23px;
        background-color: #FFFFFF;
        border: 1px solid #DAD8DA;
        border-radius: 5px;
    }

    .check-container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .check-container input:checked ~ .checkmark:after {
        display: block;
    }

    .check-container .checkmark:after {
        left: 8px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .action-select-p {
        font-size: 14px;
        font-weight: 700;
    }

    .text-left {
        text-align: left;
        padding-left: 30px;
        margin-bottom: 10px;
    }

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