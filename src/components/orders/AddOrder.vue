<template>
    <main class="component__container">
        <header class="l-main__header">
            <div class="c-breadcrumb">
                <span class="c-breadcrumb__item">
                    <a href="">Dodaj zamówienie</a>
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
    name: 'add-order',
    data: () => ({
      currentRoute: '',
      items: [
        {name: 'Dane klienta', path: 'client-info'},
        {name: 'Dane do płatności', path: 'payment-details'},
        {name: 'Dane do wysyłki', path: 'shipping-details'},
        {name: 'Wyszukaj produkty', path: 'seo'},
        {name: 'Dodane produkty', path: 'gallery'},
      ],
    }),
    methods: {
      fetchClients(){
        this.$store.dispatch('fetchClients')
      }
    },
    created() {
      this.currentRoute = 'client-info'
      this.fetchClients()
    }
  }
</script>

<style scoped>

</style>