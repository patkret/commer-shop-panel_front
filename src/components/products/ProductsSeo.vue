<template>
    <div class="product-form-container">
        <form class="product-form" @submit.prevent="saveProduct()">
            <div class="form-row">
                <label class="form-label">Meta description</label>
                <div class="input-container">
                    <input v-model="product.metaDescription" class="form-input " type="text" name="metaDescription">
                </div>

            </div>
            <div class="form-row">
                <label class="form-label">Meta Keywords</label>
                <div class="input-container">
                    <input v-model="product.metaKeywords" class="form-input" type="text" name="metaKeywords">
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">Url</label>
                <div class="input-container">
                    <input v-model="product.addressUrl" class="form-input " type="text" name="addressUrl">
                </div>
            </div>
        </form>
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
    beforeDestroy: function () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('addProduct', this.product)
        }
      })
    },
    data() {
      return {
        metaDescription: '',
        metaKeywords: '',
        addressUrl: '',
      }
    },
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