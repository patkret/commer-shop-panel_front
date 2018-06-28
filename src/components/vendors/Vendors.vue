<template>
     <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Producenci
                        </span>
            </div>
            <div class="main-header__button" >
                <router-link to="/vendors/add" class="c-form__button c-button" v-if="$route.path !== '/vendors/add'">
                    <span>Dodaj producenta</span>
                </router-link>
                <router-link to="/vendors/list" class="c-form__button c-button" v-if="$route.path !== '/vendors/list'">
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
    name: "vendors",
    data: () => ({

      vendor: ''
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