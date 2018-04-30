<template>
    <div>
        <div>
            <h1 class="card-name">Lista Produktów</h1>
            <ul class="products-list">
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 1}"
                    @click.prevent="changeComponent(1)">Wszystkie produkty
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 2}"
                    @click.prevent="changeComponent(2)">Wyróżnione produkty
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 3}"
                    @click.prevent="changeComponent(3)">Zaimportowane
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 4}"
                    @click.prevent="changeComponent(4)">Brak na magazynie
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 5}"
                    @click.prevent="changeComponent(5)">Szkice produktów
                </li>
            </ul>
            <div class="component-container">
                <div v-if="type == 1" @singleProduct="editProduct">
                    <div class="products-container">
                        <h4 class="products-container-heading">Produkty</h4>
                        <div class="products-row">
                            <div class="filter-container">
                                <div class="filter-status">
                                    <label class="filter-label">Filtruj</label>
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
                                            placeholder="Wybierz"/>
                                </div>
                            </div>
                            <div class="search-container"></div>
                        </div>
                        <table class="products-table">
                            <thead class="table-heading">
                            <tr class="table-row">
                                <th class="col-1">
                                    <label class="check-container check-all">
                                        <input type="checkbox" @change="selectAll" v-model="selectedAll" :value="true">
                                        <span class="checkmark"></span>
                                    </label>
                                </th>
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
                                <td class="table-td col-1">
                                    <label class="check-container">
                                        <input type="checkbox" v-model="selectedProducts" :value="item">
                                        <span class="checkmark"></span>
                                    </label>
                                </td>
                                <td class="table-td col-2"><img class="ziemniak" src="../../assets/img/bottle.png"
                                                                alt=""></td>
                                <td class="table-td col-3">{{item.symbol}}</td>
                                <td class="table-td col-4 text-left">{{item.name}}</td>
                                <td class="table-td col-5">{{item.price}}</td>
                                <td class="table-td col-6">
                                    <div class="buttons-container">
                                        <button @click="showActions(key)"
                                                :class="{'more-button': true, 'more-button active': show === true && index === key}">
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                        </button>
                                        <div class="arrow-left" v-if="index === key && show === true">
                                            <div class="action-buttons">
                                                <button @click="deleteProduct(item)" class="delete">Usuń</button>
                                                <router-link :to="'/products/edit/' +item.id" tag="button" class="edit">
                                                    Edytuj
                                                </router-link>
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
                                        placeholder="Wybierz"/>
                                <button @click="performAction(selectedAction.id)"
                                        :class="{'use-button' : true, 'use-button disabled' : selectedProducts.length === 0}"
                                        :disabled="selectedProducts.length === 0">Wykonaj
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <highlited-products v-if="type == 2"></highlited-products>
                <imported-products v-if="type == 3"></imported-products>
                <sketch-products v-if="type == 5"></sketch-products>

                <modal name="visibility"
                       width="800px">
                    <div class="modal-form">
                        <div class="modal-header">
                            <h2>Zmień widoczność dla wybranych produktów</h2>
                        </div>

                        <div class="modal-body">
                            <label>Widoczność</label>
                            <div class="checkbox-square form-group">
                                <input type="checkbox" id="attr-visibility" class="visibility-hidden"
                                       v-model="visibility">
                                <label for="attr-visibility" class="square"></label>
                            </div>
                        </div>
                        <button type="button" class="custom-button" @click="saveVisbility">ZAPISZ</button>
                    </div>
                </modal>

                <modal name="mainCategory"
                       width="800px" height="500px">
                    <div class="modal-form">
                        <div class="modal-header">
                            <h2>Zmień kategorię główną dla produktów</h2>
                        </div>

                        <div class="modal-body">
                            <label>Kategoria główna</label>
                            <multiselect
                                    class="shop-select product-categories-select"
                                    v-model="selectedMainCategory"
                                    :options="categories"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :clear-on-select="false"
                                    :hide-selected="true"
                                    label="name"
                                    track-by="name"
                                    :selectLabel="''"
                                    :deselectLabel="''"
                                    placeholder="Wybierz"
                            >
                            </multiselect>
                        </div>
                        <button type="button" class="custom-button" @click="saveMainCategory" style="margin-top: 150px">
                            ZAPISZ
                        </button>
                    </div>
                </modal>
                <modal name="vendor"
                       width="800px" height="500px">
                    <div class="modal-form">
                        <div class="modal-header">
                            <h2>Zmień producenta dla produktów</h2>
                        </div>

                        <div class="modal-body">
                            <label>Producent</label>
                            <multiselect
                                    class="shop-select product-categories-select"
                                    v-model="selectedVendor"
                                    :options="vendors"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :clear-on-select="false"
                                    :hide-selected="true"
                                    label="name"
                                    track-by="name"
                                    :selectLabel="''"
                                    :deselectLabel="''"
                                    placeholder="Wybierz"
                            >
                            </multiselect>
                        </div>
                        <button type="button" class="custom-button" @click="saveVendor" style="margin-top: 150px">
                            ZAPISZ
                        </button>
                    </div>
                </modal>
                <modal name="price"
                       width="800px" height="600px">
                    <div class="modal-form">
                        <div class="modal-header">
                            <h2>Zmień cenę dla produktów</h2>
                        </div>

                        <div class="modal-body row">
                            <label>Cena</label>
                            <multiselect
                                    class="admin-select price-select"
                                    v-model="selectedPriceOption"
                                    :options="priceOptions"
                                    :searchable="false"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :clear-on-select="false"
                                    :hide-selected="true"
                                    label="name"
                                    track-by="name"
                                    :selectLabel="''"
                                    :deselectLabel="''"
                                    placeholder="Wybierz"
                                    style="margin-left: 40px"
                            >
                            </multiselect>
                            <input type="text" class="products-input" v-model="priceValue"/>
                            <multiselect
                                    class="admin-select price-select"
                                    v-model="selectedCurr"
                                    :options="currOptions"
                                    :searchable="false"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :clear-on-select="false"
                                    :hide-selected="true"
                                    label="name"
                                    track-by="name"
                                    :selectLabel="''"
                                    :deselectLabel="''"
                                    placeholder="Wybierz"
                                    style="margin-left: 40px;"
                            >
                            </multiselect>
                        </div>
                        <button type="button" class="custom-button" @click="savePrice" style="margin-top: 50px">
                            ZAPISZ
                        </button>
                    </div>
                </modal>


            </div>
        </div>
    </div>
</template>
<script>
  import changeVisibility from './changeVisibibility'

  export default {
    name: 'products-list',
    components: {
      changeVisibility,
    },
    data () {
      return {
        items: [],
        selectedProducts: [],
        buttons: [],
        index: '',
        show: false,
        type: 1,
        editingProduct: '',
        filters: [
          {name: 'Po ID'},
          {name: 'Po nazwie'},
          {name: 'Po dacie'},
          {name: 'Po swojemu :0'},
        ],
        actions: [
          {
            id: 0,
            name: 'Usuń zaznaczone',
          },
          {
            id: 1,
            name: 'Zmiana producenta',
          },
          {
            id: 2,
            name: 'Zmiana widoczności',
          },
          {
            id: 3,
            name: 'Zmiana stanu magazynowego',
          },
          {
            id: 4,
            name: 'Zmiana kategorii głównej',
          },
          {
            id: 5,
            name: 'Zmiana ceny',
          },

        ],
        value: '',
        selectedFilter: '',
        selectedAction: '',
        showModal: false,
        visibility: 1,
        selectedProductsIds: [],
        selectedAll: false,
        selectedMainCategory: '',
        main_category: '',
        categories: [],
        vendors: [],
        selectedVendor: '',
        vendor_id: '',
        priceOptions: [
          {
            id: 0,
            name: 'zwiększ o',
          },
          {
            id: 1,
            name: 'zmniejsz o',
          },
        ],
        currOptions: [
          {
            id: 0,
            name: '%',
          },
          {
            id: 1,
            name: 'zł',
          },
        ],
        selectedPriceOption: {
          id: 0,
          name: 'zwiększ o',
        },
        priceValue: '',
        selectedCurr: {
          id: 1,
          name: 'zł',
        },
      }
    },
    watch: {
      selectedProducts: function (selected) {
        this.selectedProductsIds = selected.map(el => el.id)
      },
      selectedMainCategory: function (value) {
        this.main_category = value.id
      },
      selectedVendor: function (value) {
        this.vendor_id = value.id
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
      selectAll () {
        if (this.selectedAll === false) {
          this.selectedProducts = []
          this.selectedProductsIds = []
        }
        else {
          this.selectedProducts = this.items
          this.selectedProductsIds = this.selectedProducts.filter(el => this.selectedProducts[el.id])
        }

      },
      deleteProduct (item) {
        this.$swal({
          title: 'Czy chcesz usunąć produkt',
          text: 'Ta akcja nieodwracalnie usunie produkt',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if (result.value) {
              let itemIndex = this.items.map(x => x.id).indexOf(item.id)
              this.items.splice(itemIndex, 1)
              axios.delete('products/' + item.id).then(
                result => {
                  console.log(result)
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Produkt został usunięty',
                type: 'success',
                confirmButtonText: 'OK',
              })
            } else {
              this.$swal('Anulowane', 'Produkt nie został usunięty.', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },

      editProduct (item) {
        this.$emit('singleProduct', item)
      },
      changeComponent (type) {
        this.type = type
      },

      performAction (id) {
        if (id === 0) {
          this.$swal({
            title: 'Czy chcesz usunąć produkty',
            text: 'Ta akcja nieodwracalnie usunie zaznaczone produkty',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Anuluj',
            confirmButtonText: 'Usuń',
          }).then((result) => {
              if (result.value) {
                axios.delete('/products/delete-all/' + JSON.stringify(this.selectedProductsIds),
                ).then((result) => {
                  axios('products').then(result =>
                    this.items = result.data)
                })

                this.$swal({
                  title: 'Usunięto!',
                  text: 'Produkty zostały usunięte',
                  type: 'success',
                  confirmButtonText: 'OK',
                })
              } else {
                this.$swal('Anulowane', 'Produkty nie zostały usunięte.', 'info')
              }
            },
            dismiss => {
            }).catch(this.$swal.noop)
        }
        else if (id === 1) {
          this.$modal.show('vendor')
        }
        else if (id === 2) {
          this.$modal.show('visibility')
        }
        else if (id === 3) {

        }
        else if (id === 4) {
          this.$modal.show('mainCategory')
        }
        else {
          this.$modal.show('price')
        }
      },

      saveVisbility () {
        axios.put('/products/change-visibility', {
          visibility: ~~this.visibility,
          ids: this.selectedProductsIds,

        }).then(() => {
          this.$modal.hide('visibility')
          this.selectedAction = []

        })
      },
      saveMainCategory () {
        axios.put('products/change-main-category', {
            main_category: this.main_category,
            ids: this.selectedProductsIds,
          }.then(() => {
            this.$modal.hide('mainCategory')
            this.selectedAction = []
          }),
        )
      },
      saveVendor () {
        axios.put('products/change-vendor', {
          ids: this.selectedProductsIds,
          vendor: this.vendor_id,
        }).then(() => {
          this.$modal.hide('vendor')
          this.selectedAction = []
        })
      },
      savePrice () {
        axios.put('products/change-price', {
          ids: this.selectedProductsIds,
          selectedPriceOption: this.selectedPriceOption,
          priceValue: this.priceValue,
          selectedCurr: this.selectedCurr,

        }).then(() => {
          axios('products').then(result => {
              this.items = result.data,
                this.selectedProducts = result.data
            },
          )
          this.priceValue = ''
          this.$modal.hide('price')
          this.selectedAction = ''
        })
      },
    },
    created: function () {
      axios('products').then(result =>
        this.items = result.data)

      axios('all-categories').then(result => {
        this.categories = result.data
      })

      axios('vendors').then(result => {
        this.vendors = result.data
      })
    },
  }
</script>
<style scoped>
    /*PRODUKTY */
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

    /*KONIEC PRODUKTÓW*/
    .products-container {
        background-color: #ffffff;
        font-size: 16px;
        font-weight: 500;
    }

    .attr-list-item {
        padding: 10px 0 10px 10px;
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

    thead .table-row {
        display: grid;
        grid-template-columns: 35px 100px 150px 350px 65px 300px;
        grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6';
        text-align: center;
        padding: 20px 0 0 0;
        height: 20px;
        line-height: 20px;
    }

    thead .check-container {
        bottom: 40%;
        left: 35%;
    }

    .table-row {
        display: grid;
        grid-template-columns: 35px 100px 150px 350px 65px 300px;
        grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6';
        text-align: center;
        margin: 40px 0;
    }

    .table-td {
        height: 50px;
        line-height: 50px;
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

    .table-row:first-of-type {
        margin-top: 10px;
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

    .filter-label {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .ziemniak {
        height: 62px;
        width: 62px;
    }

    .modal-form {

        display: flex;
        flex-direction: column;
    }

    .modal-body {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 50px;
        margin-left: -30px;
        align-items: center;
        font-size: 120%;
    }

    .modal-header {
        text-align: center;
        margin-top: 20px;
    }

    .custom-button {
        margin: 50px 0 0 40%;
        background: linear-gradient(to right, #21c8cc, #2595ec);
        color: white;
    }

    .v--modal-box .v--modal {
        background-color: #F6F7FB;

    }

    .v--modal-overlay {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .modal-info {
        font-size: 130%;
        color: #2595ec;
        text-align: center;
        opacity: 0.5;
        vertical-align: middle;
        line-height: 130px;
    }

    .disabled {
        background: #DDE0E5;
        color: black;
    }

    /*.row{*/
    /*display: grid;*/
    /*grid-template-columns: 100px 150px 100px;*/
    /*}*/

    .products-input {
        margin-left: 50px;
        width: 100px;
    }

    .products-input input {
        border: 1px solid lightcoral;
    }
</style>