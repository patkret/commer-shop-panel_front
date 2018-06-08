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
        {name: 'SEO', path: 'seo'},
        {name: 'Galeria', path: 'gallery'},
        {name: 'Zestaw wariantów', path: 'variant-sets'},
        {name: 'Zestawy wariantów', path: 'attribute-sets'},
        {name: 'Produkty powiązane', path: 'linked-products'},
      ],
    }),
    methods: {
      getCurrentRoute () {
        this.currentRoute = this.$route.path
        this.currentRoute = this.currentRoute.split('/')[2]
      },
    },
    created: function () {
      this.getCurrentRoute()
    },

  }
</script>

<style scoped>

</style>

