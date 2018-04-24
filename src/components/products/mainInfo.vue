<template>
    <div class="product-form-container">
        <form class="product-form" @submit.prevent="saveProduct()">
            <div class="form-row">
                <label class="form-label">
                    Nazwa produktu
                </label>
                <div class="input-container">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('name')}">
                        <input type="text" v-validate="'required'"
                               placeholder="Nazwa..." name="name" v-model="product.name">
                    </div>
                    <span v-show="errors.has('name')" class="validator-help">{{ errors.first('name') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Aktywność
                </label>
                <div class="input-container" style="width: 30%">
                    <div class="checkbox-square form-group">
                        <input type="checkbox" id="attr-visibility" class="visibility-hidden"
                               v-model="product.visibility">
                        <label for="attr-visibility" class="square"></label>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Stan dostępności
                </label>
                <div class="input-container" style="width: 30%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('stockAvail')}">
                        <input type="text" v-validate="'required|numeric'"
                               placeholder="..." name="stockAvail" v-model="product.stockAvail">
                    </div>
                    <span v-show="errors.has('stockAvail')"
                          class="validator-help">{{ errors.first('stockAvail') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Cena wejścia
                </label>
                <div class="input-container" style="width: 30%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('intoStockPrice')}">
                        <input type="text" v-validate="'required|numeric'"
                               placeholder="Cena..." name="intoStockPrice" v-model="product.intoStockPrice">
                    </div>
                    <p>zł</p>
                    <span v-show="errors.has('intoStockPrice')" class="validator-help">{{ errors.first('intoStockPrice') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Kod kreskowy
                </label>
                <div class="input-container" style="width: 30%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('barcode')}">
                        <input type="text" v-validate="'required'"
                               placeholder="Kod..." name="barcode" v-model="product.barcode">
                    </div>
                    <span v-show="errors.has('barcode')" class="validator-help">{{ errors.first('barcode') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Cena
                </label>
                <div class="input-container" style="width: 30%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('price')}">
                        <input type="text" v-validate="'required|numeric'"
                               placeholder="Cena..." name="price" v-model="product.price">
                    </div>
                    <p>zł</p>
                    <span v-show="errors.has('price')" class="validator-help">{{ errors.first('price') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Stawka VAT
                </label>
                <div class="input-container" style="justify-self: start">
                    <multiselect
                            class="shop-select product-select"
                            v-model="selectedRate"
                            :options="vat_rates"
                            :allow-empty="false"
                            :searchable="false"
                            :selectedLabel="''"
                            track-by="name"
                            label="name"
                            id="ms-1"
                            :custom-label="nameWithRate"
                            :deselectLabel="''"
                            :selectLabel="''"
                            :hideSelected="true"
                            placeholder="Wybierz"></multiselect>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    SKU
                </label>
                <div class="input-container" style="width: 30%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('symbol')}">
                        <input type="text" v-validate="'required'"
                               placeholder="Kod..." name="symbol" v-model="product.symbol">
                    </div>
                    <span v-show="errors.has('symbol')" class="validator-help">{{ errors.first('symbol') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    PKWiU
                </label>
                <div class="input-container" style="width: 30%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('pkwiuCode')}">
                        <input type="text" v-validate="'required'"
                               placeholder="..." name="pkwiuCode" v-model="product.pkwiuCode">
                    </div>
                    <span v-show="errors.has('pkwiuCode')" class="validator-help">{{ errors.first('pkwiuCode') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Producent
                </label>
                <div class="input-container" style="justify-self: start">
                    <multiselect
                            class="shop-select product-select"
                            v-model="selectedVendor"
                            :options="vendors"
                            :allow-empty="false"
                            :searchable="false"
                            :selectedLabel="''"
                            track-by="name"
                            label="name"
                            :deselectLabel="''"
                            :selectLabel="''"
                            :hideSelected="true"
                            placeholder="Wybierz"></multiselect>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Kategorie
                </label>
                <div class="input-container" style="justify-self: start">
                    <multiselect
                            class="shop-select product-categories-select"
                            v-model="selectedCategories"
                            :options="options"
                            :multiple="true"
                            :close-on-select="false"
                            :clear-on-select="false"
                            :hide-selected="true"
                            label="name"
                            track-by="name"
                            :selectLabel="''"
                            :deselectLabel="''"
                            placeholder="Wybierz"
                    >

                        <template slot="tag" slot-scope="props">
                            <span class="custom__tag">
                                <!--<span>{{ props.option.name }}</span>-->
                                <!--<span class="custom__remove" @click="props.remove(props.option)">❌</span>-->
                                <span @click="props.remove(props.option)"> {{ props.option.name }} ❌</span>

                            </span>
                        </template>
                    </multiselect>
                </div>
            </div>
            <br>
            <br>
            <button type="submit" class="custom-button">Zapisz</button>
        </form>
    </div>
</template>

<script>
  export default {
    name: 'main-info',
    props: ['attributeSets',],
    computed: {
      product: function () {
          return this.$store.getters.getProduct
      },
      selectedVendor: {
        get: function () {
          return this.$store.getters.getVendor
        },
        set: function (value) {
          this.$store.commit('saveVendor', value)
        }
      },
      selectedRate: {
        get: function () {
          return this.$store.getters.getVatRate
        },
        set: function (value) {
          this.$store.commit('saveVatRate', value)
        }
      },
      selectedCategories: {
        get: function () {
          return this.$store.getters.getCategories
        },
        set: function (value) {
          this.$store.commit('saveCategories', value)
        }
      },

    },
    data: () => ({
      vat_rates: [],
      vendors: [],
      options: [],
    }),
    methods: {
      nameWithRate ({name, rate}) {
        return `${name} — [${rate}%] `
      },

      saveProduct(){
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.product.attributeSets = JSON.stringify(this.product.attributeSets)
            this.product.variantSets = JSON.stringify(this.product.variantSets)
            if (this.product.id > 0) {
              axios.put('/products/'+ this.product.id, {
                product: this.product,
              }).then(() => {
                this.$router.push('/products')
                this.$store.commit('clearProduct')
                this.$store.commit('clearSets')
              })
            } else {
              axios.post('/products' , {
                product: this.product
              }).then(() => {
                this.$router.push('/products')
                this.$store.commit('clearProduct')
                this.$store.commit('clearSets')
              })
            }

          }
        })
      },

    },

    created: function () {

      axios('vat-rates').then(result => {
        this.vat_rates = result.data
      })

      axios('vendors').then(result => {
        this.vendors = result.data
      })
      axios('all-categories').then(result => {
        this.options = result.data
      })
    },

    beforeDestroy: function () {

      this.$store.commit('addProduct', this.product)
    }
  }
</script>

<style scoped>
    .product-form-container {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-areas: "product-form .";
    }

    .product-form {
        grid-area: product-form;

    }

    .form-row {
        display: grid;
        grid-template-columns: 20% 40px 80%;
        grid-template-areas: "form-label . input-container";
        margin-bottom: 20px;
    }

    .form-label {
        grid-area: form-label;
        justify-self: start;
        align-self: center;
    }

    .input-container {
        grid-area: input-container;
        display: flex;
        flex-direction: column;

    }

    .input-container p {
        position: absolute;
        margin-left: 205px;

    }

    .custom-input {
        width: 100%;
        height: 40px;
        padding-left: 15px;
        border: none;
        border-radius: 5px;
        background-color: #FFFFFF;
    }

    .custom-input input {
        width: 96%;
        margin-top: 9px;
        border: none;
        font-size: 110%;
    }

    .inpt-border {
        border: 1px solid red;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .validator-help {
        background-color: red;
        border-radius: 5px;
        color: #fff;
        padding: 12px 0 10px 10px;
        font-size: 12px;
        font-weight: 700;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        margin-right: -17px;
    }

    .form-group {
        margin-left: -13px;
    }

    .multiselect .custom__tag {
        background: linear-gradient(right, #2599E9, #21C7CC);
        border-radius: 8px;
        color: #FFFFFF;
        padding: 4px;
        margin-right: 5px;
        margin-bottom: 25px;
        line-height: 30px;
    }

</style>