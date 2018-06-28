<template>
    <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            <router-link to="/variants/list">Zestawy wariantów</router-link></span>
                <!--<span class="c-breadcrumb__item" >Dodaj zestaw</span>-->
            </div>
            <div class="main-header__button">
                <router-link to="/variants/add/variant-add" class="c-form__button c-button"
                             v-if="$route.path === '/variants/list'">
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
  import VariantsSetForm from './VariantsSetForm'
  import VariantsList from './VariantsList'

  export default {
    name: 'variants',
    components: {
      VariantsSetForm,
      VariantsList,
    },
    data: () => ({
      type: 2,
      set: '',

    }),
    methods: {
      changeComponent (type) {
        this.type = type

      },

      editSet (set) {
        this.set = set
        this.type = 3
      },
    },
  }
</script>

<style scoped>
    .active {
        background-color: #F4F4F9;
        border-radius: 5px;
    }
</style>