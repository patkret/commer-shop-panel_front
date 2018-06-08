<template>
    <ul class="component-nav">
        <li v-for="item in items"
            :class="{'component-nav__item': true, 'component-nav__item is-active': currentRoute == '/product-add/' + item.path}"
            @click="currentRoute = '/product-add/' + item.path">
            <router-link :to="item.path">{{item.name}}</router-link>
        </li>
    </ul>
</template>

<script>
  export default {
    props: ['items'],
    name: 'component-navbar',
    data: () => ({
      currentRoute: '',
    }),
    methods: {
      getCurrentRoute () {
        this.currentRoute = this.$route.path

      },
    },
    created: function () {
      this.getCurrentRoute()
    },
  }
</script>

<style scoped>
    .component-nav {
        display: inline-flex;
        flex-wrap: nowrap;
        height: 45px;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        border-bottom: 1px solid #dddddd;
    }

    .component-nav__item {

        height: 45px;
        line-height: 45px;
        font-size: 1rem;
        white-space: nowrap;
        /*margin-right: 25px;*/
    }

    .is-active {
        border-bottom: 3px solid #2595ec;
    }

</style>