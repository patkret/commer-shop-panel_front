<template>
    <main class="component__container">
        <header class="l-main__header">
            <div class="c-breadcrumb">
                <span class="c-breadcrumb__item">
                    <a href="">Dodaj produkt</a>
                </span>
            </div>

            <div class="c-tabs">
                <ul class="c-tabs__nav">
                    <li v-for="item in items"
                        :class="{'c-tabs__nav-item':true , 'c-tabs__nav-item is-active': currentRoute ===  item.path}" @click="currentRoute = item.path">
                        <router-link :to="item.path">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>

        </header>
        <section class="c-main">
            <router-view></router-view>
        </section>
    </main>

</template>

<script>

  export default {
    name: 'products',
    data: () => ({
      currentRoute: '',
      items: [
        {name: 'Dane podstawowe', path: 'main-info'},
        {name: 'Dane dodatkowe', path: 'additional-info'},
        {name: 'Opisy', path: 'descriptions'},
        {name: 'SEO', path: 'seo'},
        {name: 'Galeria', path: 'gallery'},
        {name: 'Zestaw wariantów', path: 'variant-sets'},
        {name: 'Zestawy atrybutów', path: 'attribute-sets'},
        {name: 'Produkty powiązane', path: 'related-products'},
        {name: 'Lista produktów', path: 'select-related-products'},
      ],
    }),
    watch: {
      '$route' (to, fro) {
        if(to.name === 'MainInfo' && fro.name === 'MainInfoEdit'){
          this.$store.commit('clearProduct')
        }
      }
    },
    methods: {
      getCurrentRoute () {
        this.currentRoute = this.$route.path

        if(Object.keys(this.$route.params).length !== 0){
          this.currentRoute = this.currentRoute.split('/')[3]
        }
        else{
          this.currentRoute = this.currentRoute.split('/')[2]
        }
      },
      fetchData() {
        this.$store.dispatch('fetchRates')
        this.$store.dispatch('fetchStocks')
        this.$store.dispatch('fetchVendors')
        this.$store.dispatch('fetchCategories')
        this.$store.dispatch('fetchVariantSets')
        if(Object.keys(this.$route.params).length !== 0){
          this.$store.dispatch('fetchProduct', this.$route.params.id)
        }
      }
    },
    created: function () {
      this.getCurrentRoute()
      this.fetchData()
    },
    destroyed() {
      this.$store.commit('clearProduct')
      this.$store.commit('clearState')
    }
  }
</script>

<style scoped>

</style>

