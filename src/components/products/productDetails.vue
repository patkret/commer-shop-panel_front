<template>
    <div class="l-wrapper">
        <div style="width: 100%;">
           <div class="header__row">
               <span class="header__name">{{product.name}}</span>
           </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'product-details',
    computed: {
      product() {
        return this.$store.getters.getProduct
      }
    },
    methods: {
      fetchProduct() {
        this.$store.dispatch('fetchProduct', this.$route.params.id)
      }
    },
    created() {
      this.fetchProduct()
    },
    destroyed() {
      this.$store.commit('clearProduct')
      this.$store.commit('clearState')
    }
  }
</script>

<style scoped>
.header__name{
    font-size: 1.1rem;
}
</style>