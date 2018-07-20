<template>
    <div class="l-wrapper">
        <!-- <transition name="fade">
            <div class="err-info" v-if="errorInfo">
                <p v-for="message in messages" v-show="message.show">{{message.text}}</p>
            </div>
        </transition> -->
        <div style="width: 50%;">
            <!-- <form class="c-form" @submit.prevent="saveProduct"> -->

                <div class="c-form__fieldset">
                    <custom-input label="Nazwa produktu" rules="required" v-model="product.name"
                                  min-input-length="3"></custom-input>
                </div>
                <div class="c-form__fieldset">
                    <custom-input label="Stan dostępności" rules="required|numeric" v-model="product.stockAvail"
                                  min-input-length="1"></custom-input>
                </div>
                <div class="c-form__fieldset">
                    <single-select v-model="product.vat_rate" :options="vatRates" class="select__full-width"
                                   placeholder="Stawka VAT"></single-select>
                </div>
                <div class="c-form__fieldset">
                    <single-select v-model="product.stock" :options="stocks" class="select__full-width"
                                   placeholder="Magazyn"></single-select>
                </div>
                <div class="c-form__fieldset">
                    <single-select v-model="product.vendor" :options="vendors" class="select__full-width"
                                   placeholder="Producent"></single-select>
                </div>
                <div class="c-form__fieldset">
                    <single-select v-model="product.main_category" :options="categories" class="select__full-width"
                                   placeholder="Kategoria główna"></single-select>
                </div>
                <div class="c-form__fieldset">
                    <div class="c-form__switch">
                        <div class="c-form__switch-label">Aktywność</div>

                        <div class="c-form__switch-control">
                            <input type="checkbox" id="visibility" v-model="product.visibility">
                            <label for="visibility"></label>
                        </div>
                    </div>
                </div>
                <div class="c-form__fieldset info__row" v-if="warningInfo">
                    <span>Aby automatycznie przeliczyć cenę wybierz stawkę VAT</span>
                </div>
                <div class="c-form__fieldset prices__row">
                    <custom-input label="Cena sprzedaży NETTO" v-model="product.price" rules="decimal:2|required"></custom-input>
                    <custom-input label="Cena sprzedaży BRUTTO" v-model="grossPrice" rules="decimal:2" ifDisabled="true"></custom-input>
                </div>
                <div class="c-form__fieldset prices__row">
                    <custom-input label="Cena hurtowa NETTO" v-model="product.wholesale_price"
                                  rules="decimal:2|required"></custom-input>
                    <custom-input label="Cena hurtowa BRUTTO" v-model="wholesaleGrossPrice"
                                  rules="decimal:2" ifDisabled="true"></custom-input>
                </div>
                <!-- <div class="h-center">
                    <button type="submit" class="c-button c-form__button">
                        <span>Zapisz</span>
                    </button>
                </div>-->

            <!-- </form> -->
        </div>
    </div>
</template>

<script>
  export default {
    name: 'main-info',
    computed: {
      product: function () {
        return this.$store.getters.getProduct
      },
      relatedProductsIds () {
        return this.$store.getters.getSelectedProductsIds
      },
      vatRates () {
        return this.$store.getters.getVatRates
      },
      stocks () {
        return this.$store.getters.getStocks
      },
      vendors () {
        return this.$store.getters.getVendors
      },
      categories () {
        return this.$store.getters.getCategories
      },
    },
    data: () => ({
      options: [],
      grossPrice: '',
      wholesaleGrossPrice: '',
      // wholesaleNetPrice: '',
      warningInfo: false,
      errorInfo: false,
      tempProduct: {},
      messages: [
        {
          show: false,
          text: 'Wybierz kategorię główną!',
        },
        {
          show: false,
          text: 'Wybierz stawkę VAT!',
        },
        {
          show: false,
          text: 'Wybierz magazyn!',
        },
        {
          show: false,
          text: 'Wybierz producenta!',
        },
      ],
    }),

    watch: {
      'product.vat_rate': function () {
        if (this.product.price > 0 && this.grossPrice > 0) {
          this.countGrossPrice(this.product.price)
        }
        else if (this.product.price > 0) {
          this.countGrossPrice(this.product.price)
        }
        else if (this.product.price == 0) {
          this.grossPrice = ''
        }
        // else {
        //   this.countNetPrice(this.grossPrice)
        // }


        if (this.product.wholesale_price > 0 && this.wholesaleGrossPrice > 0) {
          this.countWholesaleGrossPrice(this.product.wholesale_price)
        }
        else if (this.product.wholesale_price > 0) {
          this.countWholesaleGrossPrice(this.product.wholesale_price)
        }
        // else if (this.product.wholesale_price == 0) {
        //   this.wholesaleGrossPrice = ''
        // }
        // else {
        //   console.log('liczę netto')
        //   this.countWholesaleNetPrice(this.wholesaleGrossPrice)
        // }
      },
      'product.price': function (price) {
        if (this.checkIfVatRateSelected()) {
          this.countGrossPrice(price)
        }
      },
      // grossPrice: function (price) {
      //
      //   if (this.checkIfVatRateSelected()) {
      //     this.countNetPrice(price)
      //   }
      // },

      'product.main_category'(category){
        this.$store.dispatch('fetchAttributeSets', category.id)
      },
      'product.wholesale_price': function (price) {
        if (this.checkIfVatRateSelected()) {
          this.countWholesaleGrossPrice(price)
        }
      },
      // wholesaleGrossPrice: function(price){
      //   if (this.checkIfVatRateSelected()) {
      //       this.countWholesaleNetPrice(price)
      //   }
      // }
    },

    methods: {
      checkIfVatRateSelected () {
        if (!this.product.vat_rate) {
          this.warningInfo = true
          setTimeout(() => {
            this.warningInfo = false
          }, 4000)
        }
        else {
          return true
        }
      },
      roundPrice (price) {
        return +(Math.round(price + 'e+2') + 'e-2')
      },

      countNetPrice (price) {
        this.$store.state.products.product.price = this.roundPrice(price / (1 + (this.product.vat_rate.rate / 100)))
      },
      countGrossPrice (price) {
        this.grossPrice = this.roundPrice(price * (1 + (this.product.vat_rate.rate / 100)))
      },
      countWholesaleNetPrice(price) {
        this.$store.state.products.product.wholesale_price = this.roundPrice(price * (1 + (this.product.vat_rate.rate / 100)))
      },
      countWholesaleGrossPrice(price) {
        this.wholesaleGrossPrice = this.roundPrice(price * (1 + (this.product.vat_rate.rate / 100)))
      },
      // setVariantSetValues () {
      //   this.tempProduct.variantSets = this.$store.state.products.selectedVariantSet
      //   if (!!this.tempProduct.variantSets) {
      //     this.tempProduct.variantSets.selectedVariants = this.$store.state.products.selectedVariants
      //   }
      // },
      // setAttributeSets () {
      //   this.tempProduct.attributeSets = this.$store.state.products.selectedAttributeSets
      // },
      // validateSelects () {
      //
      //   this.messages[0].show = this.product.main_category ? false : true
      //   this.messages[1].show = this.product.vat_rate ? false : true
      //   this.messages[2].show = this.product.stock ? false : true
      //   this.messages[3].show = this.product.vendor ? false : true
      //   this.showErrorInfo()
      // },
      // showErrorInfo () {
      //   if (this.messages.find(el => el.show == true)) {
      //     this.errorInfo = true
      //     setTimeout(() => {
      //       this.errorInfo = false
      //     }, 3000)
      //   }
      // },
      //
      // async saveProduct () {
      //
      //   this.tempProduct = JSON.parse(JSON.stringify(this.product));
      //   this.setVariantSetValues()
      //   this.setAttributeSets()
      //   this.validateSelects()
      //
      //   this.$validator.validateAll().then((result) => {
      //     if (result && this.errorInfo === false) {
      //
      //       if(!!this.product.barcode){
      //         this.tempProduct.main_category = this.product.main_category.id
      //         this.tempProduct.vendor = this.product.vendor.id
      //         this.tempProduct.vat_rate = this.product.vat_rate.id
      //         this.tempProduct.stock = this.product.stock.id
      //         this.tempProduct.attributeSets = JSON.stringify(this.tempProduct.attributeSets)
      //         this.tempProduct.variantSets = JSON.stringify(this.tempProduct.variantSets)
      //         this.tempProduct.relatedProducts = this.relatedProductsIds
      //         if(this.product.description_template){
      //           this.tempProduct.description_template_id = this.product.description_template.id
      //         }
      //           console.log(this.tempProduct)
      //         axios.post('/products', {
      //           product: this.tempProduct,
      //         }).then(() => {
      //           this.$router.push('/products/list')
      //           this.$store.commit('clearProduct')
      //           this.$store.commit('clearState')
      //         })
      //       }
      //
      //       else{
      //         this.$parent.currentRoute = 'additional-info'
      //         this.$router.replace('additional-info')
      //         let fieldError = {
      //             field: "'Kod kreskowy'",
      //             msg: "Pole wymagane",
      //             rule: "required" // optional
      //         }
      //         this.$validator.errors.add(fieldError)
      //       }
      //
      //
      //       // if (this.product.id > 0) {
      //       //   axios.put('/products/' + this.product.id, {
      //       //     product: this.product,
      //       //     categories: this.categories,
      //       //   }).then(() => {
      //       //     this.$router.push('/products')
      //       //     this.$store.commit('clearProduct')
      //       //     this.$store.commit('clearSets')
      //       //     this.$store.state.selectedRate = ''
      //       //     this.$store.state.selectedVendor = ''
      //       //     this.$store.state.selectedStock = ''
      //       //   })
      //       // } else {
      //       //
      //
      //     }
      //   })
      // },

    },
    created: function () {
console.log(this.product)
    },
  }
</script>

<style scoped>

    .select__full-width {
        width: 100%;
    }

    .prices__row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 25px;
    }

    .info__row {
        background: darkorange;
        color: white;
        height: 45px;
        font-size: 0.8rem;
        padding-left: 25px;
    }

    .err-info {
        position: absolute;
        font-size: 0.9rem;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        top: 100px;
        left: 350px;
        width: 79vw;
        background-color: red;
        color: #ffffff;
        padding: 20px;
        border-radius: 3px;
    }

    .err-info p {
        padding: 5px 0;
    }
</style>
