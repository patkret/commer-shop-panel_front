<template>
    <!-- <div id="main-content-with-side-menu">
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
            <router-view></router-view>
            <vendor-form v-if="type == 1"></vendor-form>
            <vendors-list v-if="type == 2" @vendor="vendorToEdit"></vendors-list>
            <vendor-form v-if="type == 3" :vendorEdit="vendor"></vendor-form>
        </div>
    </div> -->

     <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Producenci
                        </span>
            </div>
            <div class="main-header__button" >
                <router-link to="/vendors/add" class="c-form__button c-button" v-if="$route.path !== '/vendors/add'">
                    <span>Dodaj producenta</span>
                </router-link>
                <router-link to="/vendors/list" class="c-form__button c-button" v-if="$route.path !== '/vendors/list'">
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
  import VendorsList from './VendorsList'
  import AddVendor from './AddVendor'
  import EditVendor from './EditVendor'
  export default {
    components: {
      VendorsList,
      AddVendor,
      EditVendor,
    },
    name: "vendors",
    data: () => ({
      type: 2,
      vendor: ''
    }),
    methods:{
        changeComponent (type) {
        this.type = type
      },
      editVendor (vendor) {
        this.type = 3
        this.vendor = vendor
      },
    }
  }
</script>

<style scoped>
    .active{
        background-color: #F4F4F9;
        border-radius: 5px;
    }

</style>