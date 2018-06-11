<template>
    <div class="l-main__main">
        <header class="l-main__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            <a href="">Asortyment</a>
                        </span>
            </div>

            <div class="c-tabs">
                <ul class="c-tabs__nav">
                    <li :class="{'c-tabs__nav-item':true, 'c-tabs__nav-item is-active': currentRoute === tab.path}" v-for="tab in tabs" @click="setCurrentRoute(tab.path)">
                        <router-link :to="tab.path">{{tab.name}}</router-link>
                    </li>
                </ul>
            </div>

        </header>

        <section class="l-main__content" style="padding: 0">
            <router-view></router-view>
        </section>

    </div>

</template>
<script>

  export default {
    name: 'products-list',

    data () {
      return {
        tabs: [
          {name: 'Wszystkie produkty', path: '/products/list'},
          {name: 'Szkice', path: '/products/drafts'},
          {name: 'Bilety', path: '/products/tickets'},
          {name: 'Zaimportowane', path: '/products/imported'},
        ],
        currentRoute: '',
      }
    },

    methods: {
      setCurrentRoute (route) {
        this.currentRoute = route
      },
    },

    created: function () {
      this.setCurrentRoute(this.$route.path)
    },
  }
</script>