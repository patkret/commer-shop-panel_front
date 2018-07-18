<template>
     <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Administratorzy
                        </span>
            </div>
            <div class="main-header__button" >
                <router-link to="/users/add" class="c-form__button c-button" v-if="$route.path !== '/users/add'">
                    <span>Dodaj administratora</span>
                </router-link>
                <router-link to="/users/list" class="c-form__button c-button" v-if="$route.path !== '/users/list'">
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
    name: "users",
  
    data: () => {
      return {
          item: ''
      }
    },
    methods: {
  
    }
  }
</script>

<style scoped>

</style>