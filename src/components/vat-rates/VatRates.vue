<template>
    <div id="main-content-with-side-menu">
        <h1 class="card-name">Stawki Vat</h1>
        <div class="side-menu-container">
            <div id="side-menu">
                <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}" @click.prevent="changeComponent(1)">
                    <p>Dodaj stawkę</p>
                </div>
                <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}" @click.prevent="changeComponent(2)">
                    <p>Wszystkie stawki</p>
                </div>
            </div>
        </div>
        <div class="component-container">
            <add-vat-rate v-if="type == 1"></add-vat-rate>
            <vat-rates-list v-if="type == 2"  @singleVatRate="editVatRate"></vat-rates-list>
            <edit-vat-rate v-if="type == 3" :rate="vat_rate"></edit-vat-rate>
        </div>
    </div>
</template>

<script>
    import AddVatRate from './AddVatRate'
    import VatRatesList from './VatRatesList'
    import EditVatRate from "./EditVatRate";
  export default {
    components: {
      EditVatRate,
      AddVatRate,
      VatRatesList,
    },
    name: "vat-rates",
    data: () => ({
      type: 2,
      vat_rate: ''
    }),
    methods:{
      changeComponent(type){
        this.type = type
      },
      editVatRate(vatRate){
        this.type = 3
        this.vat_rate = vatRate
      }
    }
  }
</script>

<style scoped>
    .active{
        background-color: #F4F4F9;
        border-radius: 5px;
    }

</style>