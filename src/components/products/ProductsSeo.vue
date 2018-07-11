<template>
    <div>
    <div class="l-wrapper">
        <div style="width: 50%;">
                <div class="c-form__fieldset">
                    <custom-input label="META Description" rules="" v-model="product.meta_description"
                                  min-input-length="3"></custom-input>
                </div>
                <div class="c-form__fieldset">
                    <custom-input label="META Keywords" rules="" v-model="product.meta_keywords"
                                  min-input-length="3"></custom-input>
                </div>
                <div class="c-form__fieldset">
                    <custom-input label="URL" rules="" v-model="product.url"
                                  min-input-length="3"></custom-input>
                </div>

        </div>
    </div>
        <seo-tags></seo-tags>
    </div>
</template>

<script>
    import seoTags from '../misc/seoTags'
  export default {
    name: "products-seo",
    components: {seoTags},
    computed: {
      product: function () {
        return this.$store.getters.getProduct;
      },
    },

  }
</script>

<style scoped>

</style>
