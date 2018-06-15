<template>
    <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Zestaw atrybutów
                        </span>
            </div>
            <div class="main-header__button">
                <router-link to="/attribute-sets/add/categories" class="c-form__button c-button"
                             v-if="$route.path === '/attribute-sets/list'">
                    <span>Dodaj zestaw</span>
                </router-link>
            </div>
        </header>

        <section class="l-main__content" style="padding: 0">
            <router-view></router-view>
        </section>

    </div>
</template>

<script>
  export default {

    name: 'attribute-sets',
    data: () => ({}),
    methods: {},
  }
</script>

<style scoped>

</style>