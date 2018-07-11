<template>
    <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            <router-link to="/description-templates/list">Szablony opisów</router-link></span>
            </div>
            <div class="main-header__button">
                <router-link to="/description-templates/add" class="c-form__button c-button"
                             v-if="$route.path === '/description-templates/list'">
                    <span>Dodaj szablon</span>
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
    name: 'description-templates',
  }
</script>

<style scoped>

</style>