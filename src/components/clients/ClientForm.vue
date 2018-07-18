<template>
    <main class="component__container">
        <form @submit.prevent="saveClient()">
        <header class="l-main__header">
            <div class="c-breadcrumb">
                <span class="c-breadcrumb__item">
                    <a href="">Dodaj klienta</a>
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
        <div class="h-center">
            <button type="submit" class="c-button c-form__button">
                <span>Zapisz</span>
            </button>
        </div>
        </form>
    </main>

</template>

<script>

  export default {
    name: 'client-form',
    data: () => ({
      currentRoute: '',
      items: [
        {name: 'Dane klienta', path: 'main-info'},
        {name: 'Dane do wysyłki', path: 'shipping-details'},
        {name: 'Rabaty', path: 'seo'},
      ],
    }),
    computed: {
      client() {
        return this.$store.getters.getClient
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
      saveClient() {
        axios.post('clients', {
          client: this.client
        }).then(result => {
          console.log(result)
        })
      }
      // fetchData() {
      //   this.$store.dispatch('fetchRates')
      //   this.$store.dispatch('fetchStocks')
      //   this.$store.dispatch('fetchVendors')
      //   this.$store.dispatch('fetchCategories')
      //   this.$store.dispatch('fetchVariantSets')
      //   if(Object.keys(this.$route.params).length !== 0){
      //     this.$store.dispatch('fetchProduct', this.$route.params.id)
      //   }
      // }
    },
    created: function () {
      this.getCurrentRoute()
      // this.fetchData()
    },
    destroyed() {
      this.$store.commit('clearClientInfo')
      // this.$store.commit('clearState')
    }
  }
</script>

<style scoped>

</style>

