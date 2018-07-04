<template>
    <!--<div class="product-form-container">-->
    <!--<form class="product-form" @submit.prevent="saveProduct()">-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Nazwa produktu-->
    <!--</label>-->
    <!--<div class="input-container">-->
    <!--<div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('name')}">-->
    <!--<input type="text" v-validate="'required'"-->
    <!--placeholder="Nazwa..." name="name" v-model="product.name">-->
    <!--</div>-->
    <!--<span v-show="errors.has('name')" class="validator-help">{{ errors.first('name') }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Aktywność-->
    <!--</label>-->
    <!--<div class="input-container" style="width: 30%">-->
    <!--<div class="checkbox-square form-group">-->
    <!--<input type="checkbox" id="attr-visibility" class="visibility-hidden"-->
    <!--v-model="product.visibility">-->
    <!--<label for="attr-visibility" class="square"></label>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Magazyn-->
    <!--</label>-->
    <!--<div class="input-container" style="justify-self: start">-->
    <!--<multiselect-->
    <!--class="shop-select product-select"-->
    <!--v-model="selectedStock"-->
    <!--:options="stocks"-->
    <!--:allow-empty="false"-->
    <!--:searchable="false"-->
    <!--:selectedLabel="''"-->
    <!--track-by="name"-->
    <!--label="name"-->
    <!--:deselectLabel="''"-->
    <!--:selectLabel="''"-->
    <!--:hideSelected="true"-->
    <!--placeholder="Wybierz"/>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Stan dostępności-->
    <!--</label>-->
    <!--<div class="input-container" style="width: 30%">-->
    <!--<div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('stockAvail')}">-->
    <!--<input type="text" v-validate="'required|numeric'"-->
    <!--placeholder="..." name="stockAvail" v-model="product.stockAvail">-->
    <!--</div>-->
    <!--<span v-show="errors.has('stockAvail')"-->
    <!--class="validator-help">{{ errors.first('stockAvail') }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Kod kreskowy-->
    <!--</label>-->
    <!--<div class="input-container" style="width: 30%">-->
    <!--<div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('barcode')}">-->
    <!--<input type="text" v-validate="'required'"-->
    <!--placeholder="Kod..." name="barcode" v-model="product.barcode">-->
    <!--</div>-->
    <!--<span v-show="errors.has('barcode')" class="validator-help">{{ errors.first('barcode') }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Cena-->
    <!--</label>-->
    <!--<div class="input-container" style="width: 30%">-->
    <!--<div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('price')}">-->
    <!--<input type="text" v-validate="'required'"-->
    <!--placeholder="Cena..." name="price" v-model="product.price">-->
    <!--</div>-->
    <!--<p>zł</p>-->
    <!--<span v-show="errors.has('price')" class="validator-help">{{ errors.first('price') }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Stawka VAT-->
    <!--</label>-->
    <!--<div class="input-container" style="justify-self: start">-->
    <!--<multiselect-->
    <!--class="shop-select product-select"-->
    <!--v-model="selectedRate"-->
    <!--:options="vat_rates"-->
    <!--:allow-empty="false"-->
    <!--:searchable="false"-->
    <!--:selectedLabel="''"-->
    <!--track-by="name"-->
    <!--label="name"-->
    <!--id="ms-1"-->
    <!--:custom-label="nameWithRate"-->
    <!--:deselectLabel="''"-->
    <!--:selectLabel="''"-->
    <!--:hideSelected="true"-->
    <!--placeholder="Wybierz"/>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--SKU-->
    <!--</label>-->
    <!--<div class="input-container" style="width: 30%">-->
    <!--<div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('symbol')}">-->
    <!--<input type="text" v-validate="'required'"-->
    <!--placeholder="Kod..." name="symbol" v-model="product.symbol">-->
    <!--</div>-->
    <!--<span v-show="errors.has('symbol')" class="validator-help">{{ errors.first('symbol') }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--PKWiU-->
    <!--</label>-->
    <!--<div class="input-container" style="width: 30%">-->
    <!--<div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('pkwiuCode')}">-->
    <!--<input type="text" v-validate="'required'"-->
    <!--placeholder="..." name="pkwiuCode" v-model="product.pkwiuCode">-->
    <!--</div>-->
    <!--<span v-show="errors.has('pkwiuCode')" class="validator-help">{{ errors.first('pkwiuCode') }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Producent-->
    <!--</label>-->
    <!--<div class="input-container" style="justify-self: start">-->
    <!--<multiselect-->
    <!--class="shop-select product-select"-->
    <!--v-model="selectedVendor"-->
    <!--:options="vendors"-->
    <!--:allow-empty="false"-->
    <!--:searchable="false"-->
    <!--:selectedLabel="''"-->
    <!--track-by="name"-->
    <!--label="name"-->
    <!--:deselectLabel="''"-->
    <!--:selectLabel="''"-->
    <!--:hideSelected="true"-->
    <!--placeholder="Wybierz"/>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Kategoria główna-->
    <!--</label>-->
    <!--<div class="input-container" style="justify-self: start">-->
    <!--<multiselect-->
    <!--class="shop-select product-categories-select"-->
    <!--v-model="selectedMainCategory"-->
    <!--:options="options"-->
    <!--:multiple="false"-->
    <!--:close-on-select="true"-->
    <!--:clear-on-select="false"-->
    <!--:hide-selected="true"-->
    <!--label="name"-->
    <!--track-by="name"-->
    <!--:selectLabel="''"-->
    <!--:deselectLabel="''"-->
    <!--placeholder="Wybierz"-->
    <!--&gt;-->
    <!--</multiselect>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="form-row">-->
    <!--<label class="form-label">-->
    <!--Kategorie-->
    <!--</label>-->
    <!--<div class="input-container" style="justify-self: start">-->
    <!--<multiselect-->
    <!--class="shop-select product-categories-select"-->
    <!--v-model="selectedCategories"-->
    <!--:options="options"-->
    <!--:multiple="true"-->
    <!--:close-on-select="false"-->
    <!--:clear-on-select="false"-->
    <!--:hide-selected="true"-->
    <!--label="name"-->
    <!--track-by="name"-->
    <!--:selectLabel="''"-->
    <!--:deselectLabel="''"-->
    <!--placeholder="Wybierz"-->
    <!--&gt;-->

    <!--<template slot="tag" slot-scope="props">-->
    <!--<span class="custom__tag">-->
    <!--&lt;!&ndash;<span>{{ props.option.name }}</span>&ndash;&gt;-->
    <!--&lt;!&ndash;<span class="custom__remove" @click="props.remove(props.option)">❌</span>&ndash;&gt;-->
    <!--<span @click="props.remove(props.option)"> {{ props.option.name }} ❌</span>-->

    <!--</span>-->
    <!--</template>-->
    <!--</multiselect>-->
    <!--</div>-->
    <!--</div>-->
    <!--<br>-->
    <!--<br>-->
    <!--<button type="submit" class="custom-button">Zapisz</button>-->
    <!--</form>-->
    <!--</div>-->
    <div class="l-wrapper">
        <div style="width: 50%;">
            <form action="" class="c-form">

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
                    <custom-input label="Cena sprzedaży NETTO" v-model="product.price" rules="decimal:2"></custom-input>
                    <custom-input label="Cena sprzedaży BRUTTO" v-model="grossPrice" rules="decimal:2"></custom-input>
                </div>
                <div class="c-form__fieldset prices__row">
                    <custom-input label="Cena hurtowa NETTO" v-model="wholesaleGrossPrice" rules="decimal:2"></custom-input>
                    <custom-input label="Cena hurtowa BRUTTO" v-model="wholesaleNetPrice" rules="decimal:2"></custom-input>
                </div>
                <div class="h-center">
                    <button type="submit" class="c-button c-form__button">
                        <span>Zapisz</span>
                    </button>
                </div>

            </form>
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
      // selectedVendor: {
      //   get: function () {
      //     return this.$store.getters.getVendor
      //   },
      //   set: function (value) {
      //     this.$store.commit('saveVendor', value)
      //   },
      // },
      // selectedRate: {
      //   get: function () {
      //     return this.$store.getters.getVatRate
      //   },
      //   set: function (value) {
      //     this.$store.commit('saveVatRate', value)
      //   },
      // },
      // selectedCategories: {
      //   get: function () {
      //     return this.$store.getters.getCategory
      //   },
      //   set: function (value) {
      //     this.$store.commit('saveCategories', value)
      //   },
      // },
      // selectedStock: {
      //   get: function () {
      //     return this.$store.getters.getStock
      //   },
      //   set: function (value) {
      //     this.$store.commit('saveStock', value)
      //   },
      // },
      // selectedMainCategory: {
      //   get: function () {
      //     return this.$store.getters.getMainCategory
      //   },
      //   set: function (value) {
      //     this.$store.commit('saveMainCategory', value)
      //   },
      // },

      price () {
        return this.product.price
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
      // vat_rates: [],
      // vendors: [],
      options: [],
      // stocks: [],
      // categories: [],
      toggleMultiselect: false,
      toggleVendor: false,
      toggleCategory: false,
      showOptions: false,
      toggleRate: false,
      grossPrice: '',
      wholesaleGrossPrice: '',
      wholesaleNetPrice: '',
      warningInfo: false,
    }),

    watch: {
      selectedRate: function (value) {
        this.product.vat_rate = value.id
      },
      selectedVendor: function (value) {
        this.product.vendor = value.id
      },
      selectedCategories: function (value) {
        value = value.map(el => {return el.id })
        this.categories = value
      },
      selectedStock: function (value) {
        this.product.stock = value.id
      },
      main_category: function (value) {
        this.product.main_category = value.id
      },
      'product.vat_rate': function () {
        if (this.product.price > 0 && this.grossPrice > 0) {
          console.log('obie')
          this.countGrossPrice(this.product.price)
        }
        else if(this.product.price > 0){
          this.countGrossPrice(this.product.price)
          console.log('licz brutto')
        }
        else{
          console.log('licz netto')
          this.countNetPrice(this.grossPrice)
        }
      },
      'product.price': function (price) {

        if(this.checkIfVatRateSelected()){
          this.countGrossPrice(price)
        }

      },
      grossPrice: function (price) {
        console.log(typeof(price))
        if(this.checkIfVatRateSelected()){
          this.countNetPrice(price)
        }
      },
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
        this.$store.state.products.product.price = this.roundPrice(price / ( 1 + (this.product.vat_rate.rate / 100)))
      },

      countGrossPrice(price){
        this.grossPrice = this.roundPrice(price * (1 + (this.product.vat_rate.rate / 100)))
      },

      saveProduct () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.product.attributeSets = JSON.stringify(this.product.attributeSets)
            this.product.variantSets = JSON.stringify(this.product.variantSets)
            if (this.product.id > 0) {
              axios.put('/products/' + this.product.id, {
                product: this.product,
                categories: this.categories,
              }).then(() => {
                this.$router.push('/products')
                this.$store.commit('clearProduct')
                this.$store.commit('clearSets')
                this.$store.state.selectedRate = ''
                this.$store.state.selectedVendor = ''
                this.$store.state.selectedStock = ''
              })
            } else {

              axios.post('/products', {
                product: this.product,
                categories: this.categories,
              }).then(() => {
                this.$router.push('/products')
                this.$store.commit('clearProduct')
                this.$store.commit('clearSets')
                this.$store.state.selectedRate = ''
                this.$store.state.selectedVendor = ''
                this.$store.state.selectedStock = ''
              })
            }

          }
        })
      },

    },

    created: function () {
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
</style>