<template>
    <main class="component__container">
        <header class="l-main__header">
            <div class="c-breadcrumb">
                <span class="c-breadcrumb__item">
                    <a href="">Lista zamówień</a>
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
    name: 'orders',
    data: () => ({
      currentRoute: '',
      items: [
        {name: 'Wszystkie zamówienia', path: 'list'},
        {name: 'Przedsprzedaż', path: 'presale'},
        {name: 'Opisy', path: 'tickets'},
      ],
    }),
    created() {
      this.currentRoute = 'list'
    }

  }
</script>

<style scoped>
</style>