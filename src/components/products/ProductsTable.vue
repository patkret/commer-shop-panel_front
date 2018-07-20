<template>
    <div>
        <div class="l-table-filters">
            <div class="l-table-filters__left">
                <div :class="{'c-dropdown js-dropdown': true, 'c-dropdown js-dropdown is-opened': displayActions}"
                     @click="displayActions = !displayActions">
                                <span class="c-dropdown__name">
                                    Wybierz działanie
                                    <span class="c-arrow-up" v-if="displayActions"></span>
                                    <span class="c-arrow-down" v-if="!displayActions"></span>
                                </span>

                    <ul class="c-dropdown__menu">
                        <li class="c-dropdown__menu-item" v-for="action in actions"
                            @click.prevent="performAction(action.id)">
                            <a href="">
                                {{action.name}}
                            </a>
                        </li>
                    </ul>
                </div>

                <div :class="{'c-dropdown js-dropdown': true, 'c-dropdown js-dropdown is-opened': showFilters}"
                     @click="showFilters = !showFilters">
                                <span class="c-dropdown__name">
                                    {{selectedFilter.name}}
                                    <span class="c-arrow-up" v-if="showFilters"></span>
                                    <span class="c-arrow-down" v-if="!showFilters"></span>
                                </span>
                    <ul class="c-dropdown__menu">
                        <li :class="{'c-dropdown__menu-item': true, 'c-dropdown__menu-item is-active': selectedFilter.id === item.id}"
                            v-for="item in filters" @click.prevent="selectedFilter = item">
                            <a href="">
                                {{item.name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="l-table-filters__right">
                <div class="c-search-filter">
                    <input type="text" class="c-search-filter__field" placeholder="Szukaj na liście"
                           v-model="searchFor">
                </div>

                <div :class="{'c-dropdown js-dropdown':true, 'c-dropdown js-dropdown is-opened': rowsFilter}"
                     @click="rowsFilter = !rowsFilter">
                                <span class="c-dropdown__name">
                                    {{rows}}
                                    <span class="c-arrow-up" v-if="rowsFilter"></span>
                                    <span class="c-arrow-down" v-if="!rowsFilter"></span>
                                </span>

                    <ul class="c-dropdown__menu">
                        <li :class="{'c-dropdown__menu-item':true, 'c-dropdown__menu-item is-active': row.number === rows }"
                            v-for="row in rowsPerPage" @click.prevent="rows = row.number; filter()">
                            <a href="">
                                {{row.number}}
                                <!--<span class="c-arrow-down"></span>-->
                            </a>
                        </li>
                        <!--<li class="c-dropdown__menu-item is-active" @click.prevent="rows = 50; filter()">-->
                        <!--<a href="">-->
                        <!--50-->
                        <!--<span class="c-arrow-down"></span>-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li class="c-dropdown__menu-item is-active">-->
                        <!--<a href="">-->
                        <!--75-->
                        <!--<span class="c-arrow-down"></span>-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li class="c-dropdown__menu-item is-active">-->
                        <!--<a href="">-->
                        <!--100-->
                        <!--<span class="c-arrow-down"></span>-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li class="c-dropdown__menu-item is-active">-->
                        <!--<a href="">-->
                        <!--150-->
                        <!--<span class="c-arrow-down"></span>-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li class="c-dropdown__menu-item is-active">-->
                        <!--<a href="">-->
                        <!--200-->
                        <!--<span class="c-arrow-down"></span>-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li class="c-dropdown__menu-item is-active">-->
                        <!--<a href="">-->
                        <!--250-->
                        <!--<span class="c-arrow-down"></span>-->
                        <!--</a>-->
                        <!--</li>-->
                        <!--<li class="c-dropdown__menu-item is-active">-->
                        <!--<a href="">-->
                        <!--500-->
                        <!--<span class="c-arrow-down"></span>-->
                        <!--</a>-->
                        <!--</li>-->
                    </ul>
                </div>
            </div>
        </div>
        <div class="products-filters-row">
            <div class="single-filter">
                <div class="filter-name">
                    <span>Producent</span>

                </div>
                <div :class="{'c-dropdown js-dropdown': true, 'c-dropdown js-dropdown is-opened': showVendors}"
                     @click="showVendors = !showVendors">
                                <span class="c-dropdown__name">
                                    {{selectedVendor.name}}
                                    <span class="c-arrow-up" v-if="showFilters"></span>
                                    <span class="c-arrow-down" v-if="!showFilters"></span>
                                </span>
                    <ul class="c-dropdown__menu">
                        <li :class="{'c-dropdown__menu-item': true, 'c-dropdown__menu-item is-active': selectedVendor.id === vendor.id}"
                            v-for="vendor in vendors" @click.prevent="selectedVendor = vendor; filter()">
                            <a href="">
                                {{vendor.name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="single-filter">
                <div class="filter-name">
                    <span>Kategoria główna</span>
                </div>
                <div :class="{'c-dropdown js-dropdown': true, 'c-dropdown js-dropdown is-opened': showCategories}"
                     @click="showCategories = !showCategories">
                                <span class="c-dropdown__name">
                                    {{selectedMainCategory.name}}
                                    <span class="c-arrow-up" v-if="showCategories"></span>
                                    <span class="c-arrow-down" v-if="!showCategories"></span>
                                </span>
                    <ul class="c-dropdown__menu">
                        <li :class="{'c-dropdown__menu-item': true, 'c-dropdown__menu-item is-active': selectedMainCategory.id === category.id}"
                            v-for="category in categories" @click.prevent="selectedMainCategory = category; filter()">
                            <a href="">
                                {{category.name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="single-filter">
                <div class="filter-name filter-name__border">
                    <span>Cena</span>
                </div>
                <div class="filter--price">
                    <span>od</span>
                    <input type="text" v-model="price_from"/>

                    <span>do</span>
                    <input type="text" v-model="price_to"/>
                </div>
            </div>

            <div class="single-filter filter__border">
                <div class="filter-name">
                    <span>Widoczność</span>
                </div>
                <div class="">
                    <div class="c-form__switch">
                        <div class="c-form__switch-control">
                            <input type="checkbox" id="visibility" v-model="visibility">
                            <label for="visibility"></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single-filter">
                <div class="filter-name">
                    <button class="c-button c-form__button"><span>Filtruj</span></button>
                </div>
                <div class="filter-name">
                    <button class="c-button c-form__button"><span>Wyczyść filtry</span></button>
                </div>
            </div>
        </div>

        <div class="c-table">
            <table>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" @change="selectAll" v-model="selectedAll" :value="true">
                    </th>
                    <th></th>
                    <th>Kod produktu</th>
                    <th>Nazwa produktu</th>
                    <th>Producent</th>
                    <th>Stan magazynowy</th>
                    <th>Cena zakupu brutto</th>
                    <th>Cena sprzedaży brutto</th>
                    <th>Aktywność</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(product,key) in items">
                    <td data-th="Wybierz">
                        <input type="checkbox" v-model="selectedProducts" :value="product">
                    </td>
                    <td data-th="Zdjecie" class="product--photo">
                        <img :src="wine"/>
                    </td>
                    <td data-th="Kod">{{product.barcode}}</td>
                    <td data-th="Nazwa">
                        {{product.name}}
                    </td>
                    <td data-th="Producent">
                        <span v-if="product.vendor">{{product.vendor.name}}</span>
                        <span v-else></span>
                    </td>
                    <td data-th="Stan magazynowy">
                        {{product.stock_count}}
                    </td>
                    <td data-th="Cena zakupu">
                        15222
                    </td>
                    <td data-th="Cena sprzedaży">
                        {{product.price}}
                    </td>
                    <td data-th="Aktywność">
                        <p v-if="product.visibility === 1">Tak</p>
                        <p v-if="product.visibility === 0">Nie</p>
                    </td>

                    <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                        <div :class="{'c-actions js-actions': true, 'c-actions js-actions is-active': index === key}">
                            <div class="c-actions__row">
                                <a href="" class="c-actions__item" @click.prevent="deleteProduct(product, key)">Usuń</a>
                                <router-link :to="`/product-edit/${product.id}/main-info`" class="c-actions__item">Edytuj</router-link>
                                <a href="" class="c-actions__item">Duplikuj</a>
                                <router-link :to="`product-details/${product.id}`" class="c-actions__item">Szczegóły</router-link>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="c-pagination">
                <button type="button" @click.prevent="changePage(current_page - 1)" :disabled="current_page === 1"><i
                        class="fa fa-chevron-left"></i></button>
                <input type="number" id="page" v-model="current_page" class="paginator--input"
                       @keyup.enter="changePage(current_page)"/>
                <span>z</span>
                <span class="paginator--last_page"> {{last_page}}</span>
                <button type="button" :disabled="current_page === last_page">
                    <i class="fa fa-chevron-right" @click.prevent="changePage(current_page +1)"></i>
                </button>
            </div>
        </div>
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
        <modal name="addToStock" height="400px">
            <form action="" @submit.prevent="addToStock" class="stock-cont">
                <div class="form-row header">
                    <label class="form-label col-1"></label>
                    <h3 class="stock-name">Dodaj stan magazynowy</h3>
                </div>
                <div class="form-row">
                    <label class="form-label column-1">Ilość</label>
                    <div class="form-data column-2">
                        <input v-model="quantity" v-validate="'required|numeric'"
                               :class="{'input': true, 'is-danger input-border': errors.has('quantity') }"
                               class="form-input "
                               type="text" name="quantity" placeholder="szt">
                        <span v-show="errors.has('quantity')"
                              class="help is-danger">{{ errors.first('quantity') }}</span>
                    </div>
                </div>
                <div class="form-row">
                    <label class="form-label column-1">Cena (netto)</label>
                    <div class="form-data column-2" style="width: 150px">
                        <input v-model="price_zl" v-validate="'required|numeric'"
                               :class="{'input': true, 'is-danger input-border': errors.has('price_zl') }"
                               class="form-input "
                               type="text" name="price_zl" placeholder="zł">
                        <span v-show="errors.has('price_zl')"
                              class="help is-danger">{{ errors.first('price_zl') }}</span>
                    </div>
                    <div class="form-data column-3">
                        <input v-model="price_gr" v-validate="'numeric|max_value:99'"
                               :class="{'input': true, 'is-danger input-border': errors.has('price') }"
                               class="form-input "
                               type="text" name="price" placeholder="gr">
                        <span v-show="errors.has('price')"
                              class="help is-danger">{{ errors.first('price') }}</span>
                        <p>.</p>
                    </div>
                </div>
                <div class="form-row column-2">
                    <button type="submit" class="custom-button col-2" style="margin-left: -320px">ZAPISZ
                    </button>
                </div>
            </form>
        </modal>
    </div>
</template>

<script>
  import changeVisibility from './changeVisibibility'
  import icon from '../../assets/icons'
  import ax from 'axios'

  export default {
    name: 'products-table',
    components: {
      changeVisibility,
    },

    data () {
      return {
        searchFor: '',
        wine: icon.wine,
        items: [],
        selectedProducts: [],
        buttons: [],
        index: '',
        show: false,
        type: 1,
        editingProduct: '',
        tabs: [
          {name: 'Wszystkie produkty', path: '/products/list'},
          {name: 'Szkice', path: '/products/drafts'},
          {name: 'Bilety', path: ''},
          {name: 'Zaimportowane', path: ''},
        ],
        filters: [
          {
            id: 0,
            name: 'Ostatnio dodane',
          },
          {
            id: 1,
            name: 'Od najniższa cena',
          },
          {
            id: 2,
            name: 'Od najwyższa cena',
          },
          {
            id: 3,
            name: 'Nazwa A-Z',
          },
          {
            id: 4,
            name: 'Nazwa Z-A',
          },
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
        selectedFilter: {
          name: 'Sortowanie',
        },
        selectedAction: '',
        showModal: false,
        visibility: null,
        selectedProductsIds: [],
        selectedAll: false,
        selectedMainCategory: {'name': 'Wybierz'},
        main_category: '',
        categories: [],
        vendors: [],
        selectedVendor: {'name': 'Wybierz'},
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
        quantity: '',
        price_zl: '',
        price_gr: '',
        showFilters: false,
        price_from: '',
        price_to: '',
        current_page: '',
        last_page: '',
        info: false,
        filtered: false,
        orderBy: 'name',
        order: 'asc',
        rows: 25,
        rowsPerPage: [
          {'number': 25},
          {'number': 50},
          {'number': 75},
          {'number': 100},
          {'number': 150},
          {'number': 200},
          {'number': 250},
          {'number': 500},
        ],
        rowsFilter: false,
        displayActions: false,
        showVendors: false,
        showCategories: false,
      }
    },
    watch: {
      searchFor: function (value) {
        ax('https://dev.esstet.pl/api/krzysiek?order_by=' + this.orderBy + '&order=' + this.order + '&rows=' + this.rows +
          '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id +
          '&main_category=' +
          this.main_category + '&visibility=' + this.visibility + '&search=' + value).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
          })
      },
      selectedProducts: function (selected) {
        this.selectedProductsIds = selected.map(el => el.id)
      },
      selectedMainCategory: function (value) {
        this.main_category = value.id
      },
      selectedVendor: function (value, old) {
        this.vendor_id = value.id
      },
      selectedFilter: function (value) {
        if (value.id === 0) {
          this.orderBy = 'created_at'
          this.order = 'desc'
        }
        else if (value.id === 1) {
          this.orderBy = 'price'
          this.order = 'asc'
        }
        else if (value.id === 2) {
          this.orderBy = 'price'
          this.order = 'desc'
        }
        else if (value.id === 3) {
          this.orderBy = 'name'
          this.order = 'asc'
        }
        else {
          this.orderBy = 'name'
          this.order = 'desc'
        }

        ax('https://dev.esstet.pl/api/krzysiek?order_by=' + this.orderBy + '&order=' + this.order + '&rows=' + this.rows +
          '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id +
          '&main_category=' +
          this.main_category + '&visibility=' + this.visibility + '&search=' + this.searchFor).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
          })
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
      deleteProduct (item, index) {
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
              // let itemIndex = this.items.map(x => x.id).indexOf(item.id)
              this.items.splice(index, 1)
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
              this.info = true
              if (result.value) {
                axios.delete('/products/delete-all/' + JSON.stringify(this.selectedProductsIds),
                ).then((result) => {
                  this.selectedProducts = []
                  setTimeout(() => {
                    this.info = false
                  }, 300)
                  axios('products').then(result =>
                    this.items = result.data.data)
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
          this.$modal.show('addToStock')
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
        }).then(() => {
            this.$modal.hide('mainCategory')
            this.selectedAction = []
          },
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
              this.items = result.data.data,
                this.selectedProducts = result.data
            },
          )
          this.priceValue = ''
          this.$modal.hide('price')
          this.selectedAction = ''
        })
      },
      addToStock () {
        if (this.price_gr == '') {
          this.price_gr = '00'
        }
        axios('products/add-to-stock', {
          quantity: this.quantity,
          ids: this.selectedProductsIds,
          price: this.price_zl + '.' + this.price_gr,
        }).then(() => {

        })
      },
      filter () {
        ax('https://dev.esstet.pl/api/krzysiek?order_by=' + this.orderBy + '&order=' + this.order + '&rows=' + this.rows +
          '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id +
          '&main_category=' +
          this.main_category + '&visibility=' + this.visibility + '&search=' + this.searchFor).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
          })
        // this.filtered = true
        // axios.post('/products-filter', {
        //   price_from: this.price_from,
        //   price_to: this.price_to,
        //   vendor: this.vendor_id,
        //   category: this.main_category,
        //   visibility: this.visibility,
        // }).then(result => {
        //   this.items = result.data.data
        //   this.current_page = result.data.current_page
        //   this.last_page = result.data.last_page
        //   console.log(result.data)
        //
        // })
      },
      changePage (page) {
        if (page > this.last_page) {
          this.current_page = this.last_page
        }
        else {
          this.current_page = page
        }
        // if (this.filtered === true) {
        ax('https://dev.esstet.pl/api/krzysiek?page=' + page + '&order_by=' + this.orderBy + '&order=' + this.order + '&rows=' +
          this.rows + '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id +
          '&main_category=' +
          this.main_category + '&visibility=' + this.visibility).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
            console.log(result.data)
          })
        // }
        // else {
        //   axios('/products?page=' + page).then(result => {
        //     this.items = result.data.data
        //   })
        // }

      },
    },
    created: function () {

      ax('https://dev.esstet.pl/api/krzysiek?order_by=' + this.orderBy + '&order=' + this.order + '&rows=' + this.rows +
        '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id +
        '&main_category=' +
        this.main_category + '&visibility=' + this.visibility).
        then(result => {

          this.items = result.data.data
          this.current_page = result.data.current_page
          this.last_page = result.data.last_page
          console.log(result.data)
        })

      // axios('products').then(result => {
      //   this.items = result.data.data
      //   this.current_page = result.data.current_page
      //   this.last_page = result.data.last_page
      // })

      axios('all-categories').then(result => {
        this.categories = result.data
      })

      axios('vendors').then(result => {
        this.vendors = result.data
      })

      axios('products-max-price').then(result => {
        this.price_from = 1
        this.price_to = result.data
      })

    },
  }
</script>
<style scoped>

    .products-filters-row .c-dropdown {
        border-bottom: none;
        border-top: none;
    }

    .filter-name__border{
        border-right: 1px solid #dddddd;
        margin-right: 15px;
    }

    .filter__border{
        margin-left: 15px;
        border-right: 1px solid #dddddd;
        border-left: 1px solid #dddddd;
    }
    .c-form__switch{
        margin-right: 15px;
    }

    .c-button{
        margin: 0;
        /*padding: 0;*/
    }
</style>