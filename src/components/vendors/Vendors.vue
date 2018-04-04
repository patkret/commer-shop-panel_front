<template>
    <div id="main-content-with-side-menu">
        <h1 class="card-name">Producenci</h1>
        <div class="side-menu-container">
            <div id="side-menu">
                <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}" @click.prevent="changeComponent(1)">
                    <p>Dodaj producenta</p>
                </div>
                <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}" @click.prevent="changeComponent(2)">
                    <p>Wszyscy producenci</p>
                </div>
                <div class="side-button" v-if="type == 3" :class="{'side-menu-item' : true, 'side-menu-item active': type == 3}">
                    <p>Edycja producenta</p>
                </div>
            </div>
        </div>
        <div class="component-container">
            <vendor-form v-if="type == 1"></vendor-form>
            <vendors-list v-if="type == 2" @vendor="vendorToEdit"></vendors-list>
            <vendor-form v-if="type == 3" :vendorEdit="vendor"></vendor-form>
        </div>
    </div>
</template>

<script>
    import VendorForm from './VendorForm'
    import VendorsList from './VendorsList'
  export default {
    components: {
      VendorForm,
      VendorsList
    },
    name: "vendors",
    data: () => ({
      type: 2,
      vendor: ''
    }),
    methods:{
      changeComponent(type){
        this.type = type
        this.vendor = ''
      },

      vendorToEdit(vendor){
        this.vendor = vendor
        this.type = 3
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