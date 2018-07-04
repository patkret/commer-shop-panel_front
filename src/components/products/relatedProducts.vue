<template>
    <div>
        <div class="c-table">
            <table>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" @change="selectAll" :checked="true">
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
                <tr v-for="(item,key) in product.related_products">
                    <td data-th="Wybierz">
                        <input type="checkbox" v-model="product.related_products" :value="item">
                    </td>
                    <td data-th="Zdjecie" class="product--photo">
                        <!--<img :src="icon.wine"/>-->
                    </td>
                    <td data-th="Kod">{{item.barcode}}</td>
                    <td data-th="Nazwa">
                        {{item.name}}
                    </td>
                    <td data-th="Producent">
                        <span v-if="item.vendor">{{item.vendor.name}}</span>
                        <span v-else></span>
                    </td>
                    <td data-th="Stan magazynowy">
                        {{item.stock_count}}
                    </td>
                    <td data-th="Cena zakupu">
                        15222
                    </td>
                    <td data-th="Cena sprzedaży">
                        {{item.price}}
                    </td>
                    <td data-th="Aktywność">
                        <p v-if="item.visibility === 1">Tak</p>
                        <p v-if="item.visibility === 0">Nie</p>
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
                                <a href="" class="c-actions__item">Duplikuj</a>
                                <a href="" class="c-actions__item">Szczegóły</a>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="c-pagination">
            </div>
        </div>
    </div>
</template>


<script>
  export default {
    name: 'related-products',
    data: () => ({
      index: '',
      show: false
    }),
    computed: {
      product: {
        get(){
          return this.$store.getters.getProduct
        },
        set(){
          this.$store.commit('setProduct')
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
      selectAll () {
        if (this.product.related_products.length === 0) {
          this.product.related_products = this.items
        }
        else {
          this.product.related_products = []
        }
      },
    }
  }
</script>

<style scoped>

</style>