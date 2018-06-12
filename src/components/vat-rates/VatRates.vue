<template>
    <!--<div id="main-content-with-side-menu">-->
    <!--<h1 class="card-name">Stawki Vat</h1>-->
    <!--<div class="side-menu-container">-->
    <!--<div id="side-menu">-->
    <!--<div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}" @click.prevent="changeComponent(1)">-->
    <!--<p>Dodaj stawkę</p>-->
    <!--</div>-->
    <!--<div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}" @click.prevent="changeComponent(2)">-->
    <!--<p>Wszystkie stawki</p>-->
    <!--</div>-->
    <!--<div class="side-button side-menu-item active" v-if="type == 3">-->
    <!--<p>Edycja stawki</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="component-container">-->
    <!--<add-vat-rate v-if="type == 1"></add-vat-rate>-->
    <!--<vat-rates-list v-if="type == 2"  @singleVatRate="editVatRate"></vat-rates-list>-->
    <!--<edit-vat-rate v-if="type == 3" :rate="vat_rate"></edit-vat-rate>-->
    <!--</div>-->
    <!--</div>-->

    <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Stawki VAT
                        </span>
            </div>
            <div class="main-header__button" >
                <router-link to="/vat-rates/add" class="c-form__button c-button" v-if="$route.path !== '/vat-rates/add'">
                    <span>Dodaj stawkę</span>
                </router-link>
                <router-link to="/vat-rates/list" class="c-form__button c-button" v-if="$route.path !== '/vat-rates/list'">
                    <span>Powrót</span>
                </router-link>
            </div>
        </header>

        <section class="l-main__content" style="padding: 0">
            <router-view></router-view>
        </section>

    </div>
</template>

<script>
  import AddVatRate from './AddVatRate'
  import VatRatesList from './VatRatesList'
  import EditVatRate from './EditVatRate'

  export default {
    components: {
      EditVatRate,
      AddVatRate,
      VatRatesList,
    },
    name: 'vat-rates',
    data: () => ({
      type: 2,
      vat_rate: '',

    }),
    methods: {
      changeComponent (type) {
        this.type = type
      },
      editVatRate (vatRate) {
        this.type = 3
        this.vat_rate = vatRate
      },
    },
  }
</script>

<style scoped>
    .active {
        background-color: #F4F4F9;
        border-radius: 5px;
    }

</style>