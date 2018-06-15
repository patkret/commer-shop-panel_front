<template>
    <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Magazyn
                        </span>
            </div>
            <div class="main-header__button" >
                <router-link to="/stock/add" class="c-form__button c-button" v-if="$route.path === '/stock/list'">
                    <span>Dodaj magazyn</span>
                </router-link>
                <router-link :to="'/stock/items/' + parameter + '/add-to'" class="c-form__button c-button" v-if="$route.path === '/stock/items/' + parameter">
                    <span>Dodaj do magazynu</span>
                </router-link>
                <!--<router-link to="/vat-rates/list" class="c-form__button c-button" v-if="$route.path !== '/vat-rates/list'">-->
                    <!--<span>Powrót</span>-->
                <!--</router-link>-->
            </div>
        </header>

        <section class="l-main__content" style="padding: 0">
            <router-view></router-view>
        </section>

    </div>
</template>
<script>
  export default {
    name: "stock",
    data: () => ({
      parameter: ''
    }),

    beforeUpdate: function () {
      this.parameter = this.$route.params.item
    },

    created: function () {
      this.parameter = this.$route.params.item
      console.log(this.$route.path)
    }
  }
</script>
