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
                    <div class="c-form__field-wrapper">
                        <input type="text" class="c-form__field" required v-model="product.name">
                        <label class="c-form__placeholder">Nazwa produktu</label>
                    </div>
                </div>
                <div class="c-form__fieldset">
                    <div class="c-form__field-wrapper">
                        <input type="text" class="c-form__field" required>
                        <label class="c-form__placeholder">Kod kreskowy</label>
                    </div>
                </div>
                <div class="c-form__fieldset" @click="toggleVendor = !toggleVendor">
                    <div :class="{'c-form__multiselect js-multiselect': true, 'c-form__multiselect js-multiselect is-opened': toggleVendor}">
                        <span class="c-form__multiselect-name">
                Wybierz producenta
                <span class="c-arrow-down"></span>
                </span>
                        <ul class="c-form__multiselect-menu">

                            <li class="c-form__multiselect-menu-item" v-for="vendor in vendors">
                                <div class="c-form__checkbox">
                                    <input type="checkbox" id="id_checkboxa_4">
                                    <label for="id_checkboxa_4">
                                        <span>{{vendor.name}}</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="c-form__fieldset" @click="toggleCategory = !toggleCategory">
                    <div :class="{'c-form__multiselect js-multiselect': true, 'c-form__multiselect js-multiselect is-opened': toggleCategory}">
                        <span class="c-form__multiselect-name">
                Wybierz kategorię
                <span class="c-arrow-down"></span>
                </span>
                        <ul class="c-form__multiselect-menu">

                            <li class="c-form__multiselect-menu-item" v-for="vendor in vendors">
                                <div class="c-form__checkbox">
                                    <input type="checkbox" :id="vendor.id">
                                    <label>
                                        <span>{{vendor.name}}</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="c-form__fieldset" @click="toggleRate = !toggleRate">
                    <div :class="{'c-form__multiselect js-multiselect': true, 'c-form__multiselect js-multiselect is-opened': toggleRate}">
                        <span class="c-form__multiselect-name">
                Wybierz VAT
                <span class="c-arrow-down"></span>
                </span>
                        <ul class="c-form__multiselect-menu">

                            <li class="c-form__multiselect-menu-item" v-for="rate in vat_rates">
                                <div class="c-form__checkbox">
                                    <input type="checkbox" :id="rate.id">
                                    <label>
                                        <span>{{rate.name}}</span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="c-form__fieldset">
                    <!--<div class="c-form__field-wrapper" @click="showOptions = !showOptions">-->
                    <!--<custom-select :options="stocks" :showOptions="showOptions"  />-->
                    <!--</div>-->

                    <div class="l-table-filters__right" @click="showOptions = !showOptions">
                        <div :class="{'c-dropdown js-dropdown' :true, 'c-dropdown js-dropdown is-opened': showOptions}">
                                <span class="c-dropdown__name">
                                    Magazyn
                                    <span class="c-arrow-down"></span>
                                </span>

                            <ul class="c-dropdown__menu">
                                <li class="c-dropdown__menu-item is-active" v-for="stock in stocks">
                                    <a href="">
                                        {{stock.name}}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!--<div class="c-form__fieldset">-->
                <!--<div class="c-form__field-wrapper ">-->
                <!--<input type="text" class="c-form__field is-invalid" required>-->
                <!--<label class="c-form__placeholder">Ulica</label>-->
                <!--</div>-->
                <!--<div class="c-form__field-wrapper c-form__field-wrapper&#45;&#45;short">-->
                <!--<input type="text" class="c-form__field is-invalid" required>-->
                <!--<label class="c-form__placeholder">M</label>-->
                <!--</div>-->
                <!--<div class="c-form__field-wrapper c-form__field-wrapper&#45;&#45;short">-->
                <!--<input type="text" class="c-form__field is-invalid" required>-->
                <!--<label class="c-form__placeholder">LOK</label>-->
                <!--</div>-->
                <!--</div>-->

                <div class="c-form__fieldset">
                    <div class="c-form__switch">
                        <div class="c-form__switch-label">Aktywność</div>

                        <div class="c-form__switch-control">
                            <input type="checkbox" id="visibility" v-model="product.visibility">
                            <label for="visibility"></label>
                        </div>
                    </div>
                </div>

                <div class="c-form__fieldset">
                    <div class="c-form__field-wrapper c-form__field-wrapper--medium">
                        <input type="text" class="c-form__field" required v-model="product.price">
                        <label class="c-form__placeholder">Cena sprzedaży</label>
                    </div>
                    <div class="c-form__field-wrapper c-form__field-wrapper--medium">
                        <input type="text" class="c-form__field" required>
                        <label class="c-form__placeholder">Cena sprzedaży</label>
                    </div>
                </div>

                <div class="c-form__fieldset">
                    <div class="c-form__field-wrapper c-form__field-wrapper--medium">
                        <input type="text" class="c-form__field" required>
                        <label class="c-form__placeholder">Cena hurtowa</label>
                    </div>
                    <div class="c-form__field-wrapper c-form__field-wrapper--medium">
                        <input type="text" class="c-form__field" required>
                        <label class="c-form__placeholder">Cena hurtowa</label>
                    </div>
                </div>

                <!--<div class="c-form__fieldset">-->
                <!--<div class="c-form__field-wrapper">-->
                <!--<input type="text" class="c-form__field is-valid" required>-->
                <!--<label class="c-form__placeholder">Miejscowość</label>-->
                <!--</div>-->
                <!--</div>-->

                <!--<div class="c-form__fieldset">-->
                <!--<div class="c-form__select">-->
                <!--<span class="c-form__select-name">+48</span>-->
                <!--<span class="c-arrow-down c-form__select-arrow"></span>-->
                <!--&lt;!&ndash; to trzeba przepisać w JS na komponent &ndash;&gt;-->
                <!--<select onchange="event.target.parentNode.querySelector('.c-form__select-name').textContent = event.target.value">-->
                <!--<option value="+48">+48</option>-->
                <!--<option value="+43">+43</option>-->
                <!--<option value="+46">+46</option>-->
                <!--</select>-->
                <!--</div>-->
                <!--<div class="c-form__field-wrapper">-->
                <!--<input type="text" class="c-form__field" required>-->
                <!--<label class="c-form__placeholder">Numer telefonu</label>-->
                <!--</div>-->
                <!--</div>-->

                <!--<div class="c-form__fieldset">-->
                <!--<div class="c-form__field-wrapper">-->
                <!--<input type="email" class="c-form__field" required>-->
                <!--<label class="c-form__placeholder">E-mail</label>-->
                <!--</div>-->
                <!--</div>-->

                <!--<div class="c-form__fieldset">-->
                <!--<div class="c-form__field-wrapper">-->
                <!--<input type="password" class="c-form__field" required>-->
                <!--<label class="c-form__placeholder">Hasło</label>-->
                <!--</div>-->
                <!--</div>-->


                <!--<div class="c-form__fieldset">-->
                <!--<div class="c-form__checkbox">-->
                <!--<input type="checkbox" id="id_checkboxa">-->
                <!--<label for="id_checkboxa">-->
                <!--<span>Wygeneruj automatycznie podczas zapisania</span>-->
                <!--</label>-->
                <!--</div>-->
                <!--</div>-->

                <!--<div class="c-form__fieldset">-->
                <!--<div class="c-form__radio">-->
                <!--<input type="radio" id="id_radio_1" name="nazwa_radio">-->
                <!--<label for="id_radio_1">-->
                <!--<span>Paragon</span>-->
                <!--</label>-->
                <!--</div>-->
                <!--<div class="c-form__radio">-->
                <!--<input type="radio" id="id_radio_2" name="nazwa_radio">-->
                <!--<label for="id_radio_2">-->
                <!--<span>Faktura</span>-->
                <!--</label>-->
                <!--</div>-->
                <!--</div>-->


                <!--<div class="c-form__fieldset" @click="toggleMultiselect = !toggleMultiselect">-->
                <!--<div class="c-form__label">Ustawienia</div>-->
                <!--<div :class="{'c-form__multiselect js-multiselect': true, 'c-form__multiselect js-multiselect is-opened': toggleMultiselect}">-->
                <!--<div class="c-form__checkbox">-->
                <!--<input type="checkbox" id="id_checkboxa_2">-->
                <!--<label for="id_checkboxa_2"></label>-->
                <!--</div>-->
                <!--<span class="c-form__multiselect-name">-->
                <!--Wybierz uprawnienia-->
                <!--<span class="c-arrow-down"></span>-->
                <!--</span>-->
                <!--<ul class="c-form__multiselect-menu">-->
                <!--<li class="c-form__multiselect-menu-item is-active">-->
                <!--<div class="c-form__checkbox">-->
                <!--<input type="checkbox" id="id_checkboxa_3" checked>-->
                <!--<label for="id_checkboxa_3">-->
                <!--<span>Odczyt</span>-->
                <!--</label>-->
                <!--</div>-->
                <!--</li>-->
                <!--<li class="c-form__multiselect-menu-item">-->
                <!--<div class="c-form__checkbox">-->
                <!--<input type="checkbox" id="id_checkboxa_4">-->
                <!--<label for="id_checkboxa_4">-->
                <!--<span>Edycja</span>-->
                <!--</label>-->
                <!--</div>-->
                <!--</li>-->
                <!--</ul>-->
                <!--</div>-->
                <!--</div>-->

                <!--
                    Żeby trick z latającym label działał, pola musza mieć atrybut required
                    Jeśli jednak któreś z pól nie jest wymagane, to trzeba będzie przypisać w JS
                    obsługę zdarzenia submit do formularza i usunąć wszystkim polom atrybut required
                    lub stworzyć latające labele z użyciem JavaScript.
                -->
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
  import customSelect from '../singleSelect'

  export default {
    name: 'main-info',
    props: ['attributeSets',],
    components: {customSelect},
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
        },
      },
      selectedRate: {
        get: function () {
          return this.$store.getters.getVatRate
        },
        set: function (value) {
          this.$store.commit('saveVatRate', value)
        },
      },
      selectedCategories: {
        get: function () {
          return this.$store.getters.getCategory
        },
        set: function (value) {
          this.$store.commit('saveCategories', value)
        },
      },
      selectedStock: {
        get: function () {
          return this.$store.getters.getStock
        },
        set: function (value) {
          this.$store.commit('saveStock', value)
        },
      },
      selectedMainCategory: {
        get: function () {
          return this.$store.getters.getMainCategory
        },
        set: function (value) {
          this.$store.commit('saveMainCategory', value)
        },
      },

      price() {
          return this.product.price
      }

    },
    data: () => ({
      vat_rates: [],
      vendors: [],
      options: [],
      stocks: [],
      categories: [],
      toggleMultiselect: false,
      toggleVendor: false,
      toggleCategory: false,
      showOptions: false,
      toggleRate: false,
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
      price: function (value) {
      }
    },

    methods: {
      nameWithRate ({name, rate}) {
        return `${name} — [${rate}%] `
      },
      nameOnly ({name}) {
        return `${name}`
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

      axios('vat-rates').then(result => {
        this.vat_rates = result.data
      })

      axios('vendors').then(result => {
        this.vendors = result.data
      })
      axios('all-categories').then(result => {
        this.options = result.data
      })
      axios('warehouses').then(result => {
        this.stocks = result.data
      })
    },

    beforeDestroy: function () {

      this.$store.commit('addProduct', this.product)
    },
  }
</script>

<style scoped>
    /*.product-form-container {*/
    /*display: grid;*/
    /*grid-template-columns: 50% 50%;*/
    /*grid-template-areas: "product-form .";*/
    /*}*/

    /*.product-form {*/
    /*grid-area: product-form;*/

    /*}*/

    /*.form-row {*/
    /*display: grid;*/
    /*grid-template-columns: 20% 40px 80%;*/
    /*grid-template-areas: "form-label . input-container";*/
    /*margin-bottom: 20px;*/
    /*}*/

    /*.form-label {*/
    /*grid-area: form-label;*/
    /*justify-self: start;*/
    /*align-self: center;*/
    /*}*/

    /*.input-container {*/
    /*grid-area: input-container;*/
    /*display: flex;*/
    /*flex-direction: column;*/

    /*}*/

    /*.input-container p {*/
    /*position: absolute;*/
    /*margin-left: 205px;*/

    /*}*/

    /*.custom-input {*/
    /*width: 100%;*/
    /*height: 40px;*/
    /*padding-left: 15px;*/
    /*border: none;*/
    /*border-radius: 5px;*/
    /*background-color: #FFFFFF;*/
    /*}*/

    /*.custom-input input {*/
    /*width: 96%;*/
    /*margin-top: 9px;*/
    /*border: none;*/
    /*font-size: 110%;*/
    /*}*/

    /*.inpt-border {*/
    /*border: 1px solid red;*/
    /*border-bottom-left-radius: 0;*/
    /*border-bottom-right-radius: 0;*/
    /*}*/

    /*.validator-help {*/
    /*background-color: red;*/
    /*border-radius: 5px;*/
    /*color: #fff;*/
    /*padding: 12px 0 10px 10px;*/
    /*font-size: 12px;*/
    /*font-weight: 700;*/
    /*border-top-right-radius: 0;*/
    /*border-top-left-radius: 0;*/
    /*margin-right: -17px;*/
    /*}*/

    /*.form-group {*/
    /*margin-left: -13px;*/
    /*}*/

    /*.multiselect .custom__tag {*/
    /*background: linear-gradient(right, #2599E9, #21C7CC);*/
    /*border-radius: 8px;*/
    /*color: #FFFFFF;*/
    /*padding: 4px;*/
    /*margin-right: 5px;*/
    /*margin-bottom: 25px;*/
    /*line-height: 30px;*/
    /*}*/

</style>