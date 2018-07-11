<template>
    <div>
        <div class="c-table">
            <table>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" @change="selectAll">
                        <!--v-model="selectedAll"-->
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
                        <!--<img :src="icon.wine"/>-->
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
                                <a href="" class="c-actions__item" @click="deleteProduct(product)">Usuń</a>
                                <router-link :to="`/product-edit/${product.id}/main-info`" class="c-actions__item">
                                    Edytuj
                                </router-link>
                                <a href="" class="c-actions__item">Szczegóły</a>
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
    </div>
</template>

<script>
  export default {
    name: 'related-products-list',
    computed: {
      product () {
        return this.$store.getters.getProduct
      },
      selectedProducts: {
        get () {
          return this.$store.getters.getSelectedProducts
        },
        set (products) {
          this.$store.commit('setSelectedProducts', products)
        },
      },
    },
    data: () => ({
      current_page: '',
      last_page: '',
      items: [],
      index: '',
    }),

    watch: {
      selectedProducts (products) {
        let temp = []
        products.forEach(el => temp.push(el.id))
        this.$store.commit('setSelectedProductsIds', temp)
      },
    },

    methods: {
      changePage (page) {
        if (page > this.last_page) {
          this.current_page = this.last_page
        }
        else {
          this.current_page = page
        }
        this.fetchProducts(this.current_page)
      },
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
      fetchProducts (page) {
        axios('products/?page=' + page).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
            console.log(result.data)
          })
      },
      selectAll () {
        if (!!this.selectedProducts) {
          this.selectedProducts = this.items
        }
        else {
          this.selectedProducts = []
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
    },

    created () {
      this.fetchProducts(1)
    },
  }
</script>

<style scoped>

</style>