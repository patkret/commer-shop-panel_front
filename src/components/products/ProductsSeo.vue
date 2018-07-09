<template>
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
</template>

<script>
  export default {
    name: "products-seo",
    computed: {
      product: function () {
        return this.$store.getters.getProduct;
      },
    },
    // data() {
    //   return {
    //     metaDescription: '',
    //     metaKeywords: '',
    //     addressUrl: '',
    //   }
    // },
  }
</script>

<style scoped>
    .product-form-container {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-areas: "product-form .";
    }

    .product-form {
        grid-area: product-form;

    }
    .form-row {
         display: grid;
         grid-template-columns: 20% 40px 80%;
         grid-template-areas: "form-label . input-container";
         margin-bottom: 20px;
     }
    .form-label {
        grid-area: form-label;
        justify-self: start;
        align-self: center;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .input-container{
        grid-area: input-container;
        display: flex;
        flex-direction: column;

    }
    .form-input {
        background-color: #ffffff;
        margin-left: 10px;
        border-radius: 5px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border: none;
        font-size: 12px;
        font-weight: 700;
    }
</style>
