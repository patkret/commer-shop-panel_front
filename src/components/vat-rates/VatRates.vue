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
            <vat-rates-list v-if="type == 2"></vat-rates-list>
        </div>
    </div>
</template>

<script>
    import AddVatRate from './AddVatRate'
    import VatRatesList from './VatRatesList'
  export default {
    components: {
      AddVatRate,
      VatRatesList,
    },
    name: "vat-rates",
    data: () => ({
      type: 2
    }),
    methods:{
      changeComponent(type){
        this.type = type
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