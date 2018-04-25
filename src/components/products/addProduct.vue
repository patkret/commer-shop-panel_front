<template>

    <div class="top-menu-container">
        <div v-if="product.id" class="edit-header form-name">
            <h2 class="edit-heading">{{productName}}</h2>
            <router-link :to="'/products'" tag="button" class="link-button">wróć do listy produktów</router-link>
        </div>

        <h1 class="form-name" v-if="product.id == null">Dodaj produkt</h1>
        <div class="top-menu">
            <ul class="top-menu-items">
                <li @click="changeType(1)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 1}">
                    Dane podstawowe
                </li>
                <li @click="changeType(2)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 2}">Dane dodatkowe
                </li>
                <li @click="changeType(3)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 3}">
                    SEO
                </li>
                <li @click="changeType(4)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 4}">
                    Galeria
                </li>
                <li @click="changeType(5)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 5}">
                    Zestawy atrybutów
                </li>
                <li @click="changeType(6)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 6}">
                    Zestawy wariantów
                </li>

            </ul>
        </div>
        <div class="menu-tab">
            <main-info v-if="type == 1"></main-info>
            <additional-info v-if="type == 2"></additional-info>
            <products-seo v-if="type==3"></products-seo>
            <attribute-sets v-if="type == 5"></attribute-sets>
            <variant-sets v-if="type == 6"></variant-sets>
        </div>
    </div>
</template>

<script>

  import MainInfo from './mainInfo'
  import AdditionalInfo from './additionalInfo'
  import AttributeSets from './attributeSets'
  import VariantSets from './variantSets'
  import ProductsSeo from './ProductsSeo'

  export default {
    components: {
      VariantSets,
      AttributeSets,
      AdditionalInfo,
      MainInfo,
      ProductsSeo,
    },
    computed: {
      product: function () {
        return this.$store.getters.getProduct
      }
    },
    name: 'add-product',
    data: () => ({
      type: 1,
      attributeSets: [],
      productMainInfo: {},
      productName: '',
    }),
    watch: {
      product: function () {
        this.productName = this.product.name
      },
      '$route.path': function (newPath) {
        if(newPath === '/product-add'){
          this.$store.commit('clearProduct')
          this.$store.commit('clearOtherSets')
          this.$store.state.selectedRate = ''
          this.$store.state.selectedVendor = ''
          this.$store.state.selectedStock = ''
        }
      }

    },
    methods: {
      changeType(type) {
        this.type = type
      },

    },

    created: function () {
      let product_id = this.$route.params.item
        if(product_id){
          this.$store.dispatch('getProduct', product_id)
        }

    },

    beforeDestroy: function () {
      this.$store.commit('clearProduct')
    }
  }
</script>

<style scoped>

    .edit-heading {
        text-transform: uppercase;
    }
    .top-menu-container {
        display: grid;
        grid-template-columns: 97% 3%;
        grid-template-rows: 25px 48px 20% 60px 80%;
        grid-template-areas: ". ." "form-name ." "top-menu ." ". .  " "menu-tab . ";
        margin-top: 20px;
        margin-left: 45px;

    }

    .top-menu {
        grid-area: top-menu;
        border-bottom: 1px solid #E5E7ED;
        height: 60px;
        justify-items: start;
        align-self: end;

    }

    .top-menu-items {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0;
        margin-top: 26px;
        font-weight: 700;
        font-size: 12px;
    }

    .top-menu-item {
        text-wrap: none;
        margin-right: 60px;
        cursor: pointer;
        color: #626368;

    }

    .menu-tab {
        grid-area: menu-tab;

    }

    .top-menu-item-active {
        border-bottom: 2px solid #2595ec;
        padding-bottom: 20px;
        color: #000000;
    }

    .form-name {
        grid-area: form-name;
        font-size: 20px;
        font-weight: normal;

    }

    .edit-header{
        display: inline-flex;
        font-size: 12px;
    }

    .edit-header h2{
        margin-right: 50px;
    }

    .link-button{
        background: none;
        border: none;
        color: #2595ec;
        text-decoration: underline #2595ec;
        font-size: 110%;
    }

</style>