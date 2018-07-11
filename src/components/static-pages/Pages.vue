<template>
     <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Strony
                        </span>
            </div>
            <div class="main-header__button" >
                <router-link to="/static-pages/add" class="c-form__button c-button" v-if="$route.path !== '/static-pages/add'">
                    <span>Dodaj strone</span>
                </router-link>
                <router-link to="/static-pages/list" class="c-form__button c-button" v-if="$route.path !== '/static-pages/list'">
                    <span>Powrót</span>
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
    name: "static-pages",
    data: () => ({

      page: ''
    }),
    methods:{
    }
  }
</script>

<style scoped>
    .active{
        background-color: #F4F4F9;
        border-radius: 5px;
    }

</style>