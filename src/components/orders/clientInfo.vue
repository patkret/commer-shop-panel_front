<template>
    <div class="l-wrapper">
        <transition name="fade">
            <div class="err-info" v-if="errorInfo">
                <p v-for="message in messages" v-show="message.show">{{message.text}}</p>
            </div>
        </transition>
        <div style="width: 50%;">
            <form class="c-form" @submit.prevent="saveProduct">

                <!--<div class="c-form__fieldset">-->
                    <!--<custom-input label="Nazwa produktu" rules="required" v-model="product.name"-->
                                  <!--min-input-length="3"></custom-input>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset">-->
                    <!--<custom-input label="Stan dostępności" rules="required|numeric" v-model="product.stockAvail"-->
                                  <!--min-input-length="1"></custom-input>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset">-->
                    <!--<single-select v-model="product.vat_rate" :options="vatRates" class="select__full-width"-->
                                   <!--placeholder="Stawka VAT"></single-select>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset">-->
                    <!--<single-select v-model="product.stock" :options="stocks" class="select__full-width"-->
                                   <!--placeholder="Magazyn"></single-select>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset">-->
                    <!--<single-select v-model="product.vendor" :options="vendors" class="select__full-width"-->
                                   <!--placeholder="Producent"></single-select>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset">-->
                    <!--<single-select v-model="product.main_category" :options="categories" class="select__full-width"-->
                                   <!--placeholder="Kategoria główna"></single-select>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset">-->
                    <!--<div class="c-form__switch">-->
                        <!--<div class="c-form__switch-label">Aktywność</div>-->

                        <!--<div class="c-form__switch-control">-->
                            <!--<input type="checkbox" id="visibility" v-model="product.visibility">-->
                            <!--<label for="visibility"></label>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset info__row" v-if="warningInfo">-->
                    <!--<span>Aby automatycznie przeliczyć cenę wybierz stawkę VAT</span>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset prices__row">-->
                    <!--<custom-input label="Cena sprzedaży NETTO" v-model="product.price" rules="decimal:2"></custom-input>-->
                    <!--<custom-input label="Cena sprzedaży BRUTTO" v-model="grossPrice" rules="decimal:2"></custom-input>-->
                <!--</div>-->
                <!--<div class="c-form__fieldset prices__row">-->
                    <!--<custom-input label="Cena hurtowa NETTO" v-model="product.wholesale_price"-->
                                  <!--rules="decimal:2"></custom-input>-->
                    <!--<custom-input label="Cena hurtowa BRUTTO" v-model="wholesaleGrossPrice"-->
                                  <!--rules="decimal:2"></custom-input>-->
                <!--</div>-->
                <!--<div class="h-center">-->
                    <!--<button type="submit" class="c-button c-form__button">-->
                        <!--<span>Zapisz</span>-->
                    <!--</button>-->
                <!--</div>-->

            </form>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'client-info',
    methods: {
      saveOrder(){

      }
    }
  }
</script>

<style scoped>

</style>